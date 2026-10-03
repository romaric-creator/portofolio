import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { useTranslation } from '../i18n';

const FONT_URL = 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/fonts/droid/droid_serif_bold.typeface.json';

const VOWELS = new Set(['a','e','i','o','u','é','è','ê','à','â','î','ô','û','J','l']);

const CHAR_SIZE = 1.5;
const LINE_HEIGHT = 2.6;
const DEPTH = 0.45;

export default function Text3D({ className = '' }: { className?: string }) {
  const { t, locale } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const LINES = t.text3d.lines;
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Scene + camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 200);
    camera.position.set(0, 0, 24);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(6, 10, 14);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xe8611a, 1.2);
    rim.position.set(-8, -4, -6);
    scene.add(rim);
    const fill = new THREE.PointLight(0xffa040, 1.0, 60);
    fill.position.set(0, 6, 10);
    scene.add(fill);

    const cssAmber = getComputedStyle(document.documentElement).getPropertyValue('--c-amber').trim() || '#b94a1e';
    const amberColor = new THREE.Color(cssAmber);

    type CharState = {
      mesh: THREE.Mesh;
      target: THREE.Vector3;
      targetRot: THREE.Euler;
      origin: THREE.Vector3;
      phase: 'flying-in' | 'assembled' | 'flying-out';
      delay: number;
      isVowel: boolean;
      speed: number;
    };

    const chars: CharState[] = [];
    const group = new THREE.Group();
    scene.add(group);

    const groupTarget = new THREE.Euler();
    let autoY = 0;

    const loader = new FontLoader();
    loader.load(FONT_URL, (font) => {
      if (disposed) return;

      const frontMat = new THREE.MeshStandardMaterial({ color: amberColor, metalness: 0.4, roughness: 0.3 });
      const sideMat  = new THREE.MeshStandardMaterial({ color: amberColor.clone().multiplyScalar(0.45), metalness: 0.5, roughness: 0.35 });

      const lineWidths: number[] = [];
      LINES.forEach(line => {
        let lw = 0;
        for (const ch of line) {
          if (ch === ' ') { lw += CHAR_SIZE * 0.55; continue; }
          const geo = new TextGeometry(ch, { font, size: CHAR_SIZE, depth: DEPTH, curveSegments: 6, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 3 });
          geo.computeBoundingBox();
          lw += (geo.boundingBox!.max.x - geo.boundingBox!.min.x) + CHAR_SIZE * 0.08;
          geo.dispose();
        }
        lineWidths.push(lw);
      });

      const totalH = LINES.length * LINE_HEIGHT;
      let charIdx = 0;

      LINES.forEach((line, li) => {
        let curX = -lineWidths[li] / 2;
        const baseY = totalH / 2 - li * LINE_HEIGHT;

        for (const ch of line) {
          if (ch === ' ') { curX += CHAR_SIZE * 0.55; continue; }

          const geo = new TextGeometry(ch, { font, size: CHAR_SIZE, depth: DEPTH, curveSegments: 6, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 3 });
          geo.computeBoundingBox();
          const cw = geo.boundingBox!.max.x - geo.boundingBox!.min.x;
          const mesh = new THREE.Mesh(geo, [frontMat, sideMat]);

          const target = new THREE.Vector3(curX, baseY, 0);

          const scatter = 18;
          const origin = new THREE.Vector3(
            (Math.random() - 0.5) * scatter * 2,
            (Math.random() - 0.5) * scatter,
            (Math.random() - 0.5) * scatter - 8,
          );

          mesh.position.copy(origin);
          mesh.rotation.set(
            (Math.random() - 0.5) * Math.PI * 2,
            (Math.random() - 0.5) * Math.PI * 2,
            (Math.random() - 0.5) * Math.PI * 2,
          );

          group.add(mesh);

          chars.push({
            mesh,
            target,
            targetRot: new THREE.Euler(0, 0, 0),
            origin,
            phase: 'flying-in',
            delay: charIdx * 60 + Math.random() * 20,
            isVowel: VOWELS.has(ch),
            speed: 0.04 + Math.random() * 0.03,
          });

          curX += cw + CHAR_SIZE * 0.08;
          charIdx++;
        }
      });
    }, undefined, (err) => {
      console.warn('Font load failed', err);
    });

    // Mouse
    const onMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    let frame = 0;
    let animId: number;

    const lerpV3 = (a: THREE.Vector3, b: THREE.Vector3, t: number) => {
      a.x += (b.x - a.x) * t;
      a.y += (b.y - a.y) * t;
      a.z += (b.z - a.z) * t;
    };
    const lerpE = (a: THREE.Euler, bx: number, by: number, bz: number, t: number) => {
      a.x += (bx - a.x) * t;
      a.y += (by - a.y) * t;
      a.z += (bz - a.z) * t;
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;

      autoY += 0.0006;
      groupTarget.y = autoY + mouseRef.current.x * 0.22;
      groupTarget.x = mouseRef.current.y * 0.1;
      group.rotation.y += (groupTarget.y - group.rotation.y) * 0.035;
      group.rotation.x += (groupTarget.x - group.rotation.x) * 0.035;
      group.position.y = Math.sin(frame * 0.005) * 0.18;

      const cycleFrame = frame % 700;

      chars.forEach((c) => {
        const localFrame = frame - c.delay;
        if (localFrame < 0) return;

        if (localFrame < 100) {
          lerpV3(c.mesh.position, c.target, c.speed);
          lerpE(c.mesh.rotation, 0, 0, 0, c.speed);
          c.phase = 'flying-in';
        } else {
          if (c.isVowel && cycleFrame > 380 && cycleFrame < 500) {
            const escapeTarget = new THREE.Vector3(
              c.target.x + (Math.random() - 0.5) * 20,
              c.target.y + (Math.random() - 0.5) * 10 + 5,
              c.target.z - 8,
            );
            lerpV3(c.mesh.position, escapeTarget, 0.06);
            lerpE(c.mesh.rotation, Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5, 0.05);
            c.phase = 'flying-out';
          } else if (c.phase === 'flying-out' || localFrame > 100) {
            lerpV3(c.mesh.position, c.target, 0.07);
            lerpE(c.mesh.rotation, 0, 0, 0, 0.07);
            c.phase = 'assembled';
          }
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (!nw || !nh) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      chars.forEach(c => { c.mesh.geometry.dispose(); });
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return <div ref={containerRef} className={className} />;
}
