import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 180;
const SPHERE_RADIUS = 2.8;
const LINE_DISTANCE = 1.2;
const ROTATION_SPEED = 0.0012;
const MOUSE_INFLUENCE = 0.4;

export default function ParticleSphere({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Read CSS variable for amber color
    const style = getComputedStyle(document.documentElement);
    const amberHex = style.getPropertyValue('--c-amber').trim() || '#b94a1e';
    const amberColor = new THREE.Color(amberHex);
    const dimColor = new THREE.Color(amberHex).multiplyScalar(0.3);

    // Generate sphere points with slight randomness
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = SPHERE_RADIUS * (0.85 + Math.random() * 0.3);
      positions.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ));
    }

    // Particles (points)
    const particleGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(PARTICLE_COUNT * 3);
    const sizeArray = new Float32Array(PARTICLE_COUNT);
    positions.forEach((p, i) => {
      posArray[i * 3] = p.x;
      posArray[i * 3 + 1] = p.y;
      posArray[i * 3 + 2] = p.z;
      sizeArray[i] = 1.5 + Math.random() * 2;
    });
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: amberColor,
      size: 0.04,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lines between close particles
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const linePairs: [number, number][] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        if (positions[i].distanceTo(positions[j]) < LINE_DISTANCE) {
          linePairs.push([i, j]);
          linePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z,
          );
          lineColors.push(
            dimColor.r, dimColor.g, dimColor.b,
            dimColor.r, dimColor.g, dimColor.b,
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    const linePosAttr = new THREE.Float32BufferAttribute(linePositions, 3);
    const lineColAttr = new THREE.Float32BufferAttribute(lineColors, 3);
    lineGeometry.setAttribute('position', linePosAttr);
    lineGeometry.setAttribute('color', lineColAttr);

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Group for rotation
    const group = new THREE.Group();
    group.add(particles);
    group.add(lines);
    scene.add(group);
    scene.remove(particles);
    scene.remove(lines);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation
    let frame = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;

      // Auto rotation + mouse influence
      targetRotation.current.y += ROTATION_SPEED;
      targetRotation.current.x += ROTATION_SPEED * 0.3;

      group.rotation.y += (targetRotation.current.y + mouseRef.current.x * MOUSE_INFLUENCE - group.rotation.y) * 0.03;
      group.rotation.x += (targetRotation.current.x + mouseRef.current.y * MOUSE_INFLUENCE * 0.5 - group.rotation.x) * 0.03;

      // Gentle float
      group.position.y = Math.sin(frame * 0.008) * 0.15;

      // Update particle positions with subtle pulse
      const posAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
      const linePosArr = linePosAttr.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const base = positions[i];
        const pulse = 1 + Math.sin(frame * 0.015 + i * 0.3) * 0.03;
        posAttr.setXYZ(i, base.x * pulse, base.y * pulse, base.z * pulse);
      }
      posAttr.needsUpdate = true;

      // Update line positions
      for (let l = 0; l < linePairs.length; l++) {
        const [a, b] = linePairs[l];
        const pa = positions[a];
        const pb = positions[b];
        const pulseA = 1 + Math.sin(frame * 0.015 + a * 0.3) * 0.03;
        const pulseB = 1 + Math.sin(frame * 0.015 + b * 0.3) * 0.03;
        linePosArr[l * 6] = pa.x * pulseA;
        linePosArr[l * 6 + 1] = pa.y * pulseA;
        linePosArr[l * 6 + 2] = pa.z * pulseA;
        linePosArr[l * 6 + 3] = pb.x * pulseB;
        linePosArr[l * 6 + 4] = pb.y * pulseB;
        linePosArr[l * 6 + 5] = pb.z * pulseB;
      }
      linePosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
