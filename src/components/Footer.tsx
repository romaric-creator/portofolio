import { PROFILE } from '../data/projects';

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-line bg-canvas">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-extrabold text-ink text-lg">
          TC<span className="text-amber">.</span>
        </span>
        <p className="text-sm text-sand">
          &copy; 2026 {PROFILE.fullName} &mdash; Douala, Cameroun
        </p>
        <a
          href={`https://${PROFILE.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-sand hover:text-amber transition-colors font-medium"
        >
          @romaric-creator
        </a>
      </div>
    </footer>
  );
}
