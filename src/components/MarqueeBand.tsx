const ITEMS = [
  'React', 'Node.js', 'TypeScript', 'React Native',
  'Electron', 'MySQL', 'MongoDB', 'Python',
  'Docker', 'Express', 'Full-Stack', 'Web',
  'Mobile', 'Desktop', 'Backend', 'IA',
];

const text = ITEMS.join('  ·  ') + '  ·  ';

export default function MarqueeBand() {
  return (
    <div className="bg-amber overflow-hidden py-2.5 select-none" aria-hidden="true">
      <div
        className="flex whitespace-nowrap motion-safe:animate-[marquee-x_28s_linear_infinite] motion-reduce:animate-none"
      >
        <span className="font-code text-[10px] tracking-[0.28em] text-canvas/75 flex-shrink-0">
          {text}{text}
        </span>
        <span className="font-code text-[10px] tracking-[0.28em] text-canvas/75 flex-shrink-0" aria-hidden="true">
          {text}{text}
        </span>
      </div>
    </div>
  );
}
