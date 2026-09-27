const ITEMS = [
  'Applications métier', 'SaaS', 'Automatisation',
  'React', 'Node.js', 'TypeScript', 'React Native',
  'Electron', 'Web', 'Mobile', 'Desktop', 'Backend',
];

const text = ITEMS.join('  ·  ') + '  ·  ';

export default function MarqueeBand() {
  return (
    <div className="bg-ink overflow-hidden py-3.5 select-none" aria-hidden="true">
      <div
        className="flex whitespace-nowrap motion-safe:animate-[marquee-x_30s_linear_infinite] motion-reduce:animate-none"
      >
        <span className="font-code text-[11px] tracking-[0.2em] text-canvas/50 flex-shrink-0">
          {text}{text}
        </span>
        <span className="font-code text-[11px] tracking-[0.2em] text-canvas/50 flex-shrink-0" aria-hidden="true">
          {text}{text}
        </span>
      </div>
    </div>
  );
}
