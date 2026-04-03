import { PROFILE } from '../data/projects';
import '../styles/footer.css';

interface FooterProps {
  addRevealElement: (el: HTMLElement | null) => void;
}

const Footer: React.FC<FooterProps> = ({ addRevealElement }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section reveal-element" ref={addRevealElement}>
      <div className="footer-content">
        <p>&copy; {currentYear} — {PROFILE.fullName}</p>
        <p className="footer-tagline">Construit avec passion à Douala.</p>
      </div>
    </footer>
  );
};

export default Footer;
