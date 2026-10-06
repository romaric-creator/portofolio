import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useTranslation } from '../i18n';

const ease = [0.23, 1, 0.32, 1] as const;

/* ─── Data ─── */
interface GalleryItem {
  src: string;
  caption: string;
  captionFr: string;
}

interface GalleryAlbum {
  id: string;
  title: string;
  titleFr: string;
  subtitle: string;
  subtitleFr: string;
  year: string;
  tag: string;
  tagFr: string;
  items: GalleryItem[];
}

const ALBUMS: GalleryAlbum[] = [
  {
    id: 'lafrique-qui-innove',
    title: "L'Afrique Qui Innove — Competition",
    titleFr: "L'Afrique Qui Innove — Concours",
    subtitle: 'African tech innovation TV competition — finalist appearance',
    subtitleFr: 'Concours télévisé d\'innovation tech africaine — participation en tant que finaliste',
    year: '2025',
    tag: 'Event',
    tagFr: 'Événement',
    items: [
      { src: '/screenshots/lafi-2.jpg', caption: 'On set — L\'Afrique Qui Innove', captionFr: 'Sur le plateau — L\'Afrique Qui Innove' },
      { src: '/screenshots/lafi-1.jpg', caption: 'Waiting before the pitch', captionFr: 'Attente avant le pitch' },
      { src: '/screenshots/lafi-3.jpg', caption: 'The team — group photo', captionFr: 'L\'équipe — photo de groupe' },
      { src: '/screenshots/lafi-4.jpg', caption: 'Team portrait', captionFr: 'Portrait d\'équipe' },
      { src: '/screenshots/lafi-5.jpg', caption: 'During the competition', captionFr: 'Pendant la compétition' },
    ],
  },
  {
    id: 'techflow',
    title: 'TechFlow — Repair Shop Manager',
    titleFr: 'TechFlow — Gestion d\'atelier de réparation',
    subtitle: 'Desktop app for managing repair tickets, billing and clients',
    subtitleFr: 'Application desktop de gestion de tickets, facturation et clients pour ateliers tech',
    year: '2026',
    tag: 'Desktop app',
    tagFr: 'App desktop',
    items: [
      { src: '/screenshots/techflow-login.png', caption: 'Login screen', captionFr: 'Écran de connexion' },
      { src: '/screenshots/techflow-dashboard.png', caption: 'Dashboard — real-time overview', captionFr: 'Tableau de bord — vue temps réel' },
      { src: '/screenshots/techflow-tickets.png', caption: 'Active repairs — ticket list', captionFr: 'Maintenance active — liste des tickets' },
      { src: '/screenshots/techflow-ticket-detail.png', caption: 'Ticket detail — WhatsApp notification', captionFr: 'Détail ticket — notification WhatsApp' },
      { src: '/screenshots/techflow-billing.png', caption: 'Billing — invoice management', captionFr: 'Facturation — gestion des factures' },
      { src: '/screenshots/techflow-reports.png', caption: 'Accounting reports', captionFr: 'Rapports comptabilité' },
      { src: '/screenshots/techflow-clients.png', caption: 'Client management', captionFr: 'Gestion des clients' },
    ],
  },
  {
    id: 'vitasang-app',
    title: 'VitaSang — App Screenshots',
    titleFr: 'VitaSang — Captures de l\'app',
    subtitle: 'Blood donation coordination mobile platform',
    subtitleFr: 'Plateforme mobile de coordination du don de sang',
    year: '2026',
    tag: 'Mobile app',
    tagFr: 'App mobile',
    items: [
      { src: '/screenshots/vitasang-1.jpg', caption: 'Home screen', captionFr: 'Écran d\'accueil' },
      { src: '/screenshots/vitasang-2.jpg', caption: 'Donor matching', captionFr: 'Matching donneurs' },
      { src: '/screenshots/vitasang-3.jpg', caption: 'Hospital requests', captionFr: 'Demandes hôpitaux' },
      { src: '/screenshots/vitasang-4.jpg', caption: 'Admin dashboard', captionFr: 'Dashboard admin' },
    ],
  },
  {
    id: 'gourmi-iq',
    title: 'Gourmi IQ — Platform',
    titleFr: 'Gourmi IQ — Plateforme',
    subtitle: 'Multi-tenant restaurant SaaS with AI copilot',
    subtitleFr: 'SaaS restaurant multi-tenant avec copilote IA',
    year: '2026',
    tag: 'SaaS · AI',
    tagFr: 'SaaS · IA',
    items: [
      { src: '/screenshots/gourmi-orders.png', caption: 'Order management', captionFr: 'Gestion des commandes' },
      { src: '/screenshots/gourmi-menu.png', caption: 'Menu management', captionFr: 'Gestion du menu' },
      { src: '/screenshots/gourmi-researcher.png', caption: 'AI food researcher — Ndolé', captionFr: 'Menu Researcher IA — Ndolé' },
      { src: '/screenshots/gourmi-categories.png', caption: 'Category management', captionFr: 'Gestion des catégories' },
      { src: '/screenshots/gourmi-tables.png', caption: 'Table management + QR codes', captionFr: 'Gestion des tables + QR codes' },
      { src: '/screenshots/gourmi-users.png', caption: 'User management', captionFr: 'Gestion des utilisateurs' },
      { src: '/screenshots/gourmi-menu-form.png', caption: 'Menu item creation', captionFr: 'Création d\'un plat' },
    ],
  },
];

/* ─── Lightbox ─── */
function Lightbox({
  items,
  startIdx,
  onClose,
  locale,
}: {
  items: GalleryItem[];
  startIdx: number;
  onClose: () => void;
  locale: string;
}) {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx(i => (i - 1 + items.length) % items.length);
  const next = () => setIdx(i => (i + 1) % items.length);
  const item = items[idx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors"
      >
        <X size={18} />
      </button>

      <div
        className="relative flex items-center gap-4 px-4 w-full max-w-5xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={prev}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={item.src}
            alt={locale === 'fr' ? item.captionFr : item.caption}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 max-h-[80vh] object-contain rounded-xl"
          />
        </AnimatePresence>

        <button
          onClick={next}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-5 text-center">
        <p className="font-body text-white/70 text-sm">
          {locale === 'fr' ? item.captionFr : item.caption}
        </p>
        <p className="font-code text-[10px] tracking-widest uppercase text-white/30 mt-1">
          {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Album Card ─── */
function AlbumSection({
  album,
  locale,
}: {
  album: GalleryAlbum;
  locale: string;
}) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const title = locale === 'fr' ? album.titleFr : album.title;
  const subtitle = locale === 'fr' ? album.subtitleFr : album.subtitle;
  const tag = locale === 'fr' ? album.tagFr : album.tag;

  return (
    <section className="mb-20">
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            items={album.items}
            startIdx={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            locale={locale}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="font-code text-[10px] tracking-widest uppercase text-amber">{tag}</span>
          <span className="w-px h-3 bg-line" />
          <span className="font-code text-[10px] tracking-widest uppercase text-dust">{album.year}</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">{title}</h2>
        <p className="text-sand text-sm mt-1">{subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {album.items.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease }}
            onClick={() => setLightboxIdx(i)}
            className="group relative overflow-hidden rounded-xl bg-surface aspect-video cursor-pointer"
          >
            <img
              src={item.src}
              alt={locale === 'fr' ? item.captionFr : item.caption}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <p className="font-body text-white text-[11px] leading-tight">
                {locale === 'fr' ? item.captionFr : item.caption}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function Gallery() {
  const { locale } = useTranslation();

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-canvas/80 backdrop-blur-xl border-b border-line/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-code text-[11px] tracking-widest uppercase text-dust hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} />
            {locale === 'fr' ? 'Retour au portfolio' : 'Back to portfolio'}
          </Link>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 font-code text-[11px] tracking-widest uppercase text-dust hover:text-amber transition-colors"
          >
            {locale === 'fr' ? 'Voir les projets' : 'View projects'}
            <ExternalLink size={11} />
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="font-code text-[10px] tracking-[0.2em] uppercase text-amber">
            {locale === 'fr' ? 'Galerie' : 'Gallery'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-ink leading-[1.06] mt-3">
            {locale === 'fr' ? (
              <>Captures &<br /><em className="text-amber italic">moments clés.</em></>
            ) : (
              <>Screenshots &<br /><em className="text-amber italic">key moments.</em></>
            )}
          </h1>
          <p className="text-sand text-base sm:text-lg mt-5 max-w-xl">
            {locale === 'fr'
              ? "Un aperçu visuel des projets livrés, interfaces réelles et événements marquants."
              : "A visual walkthrough of delivered projects, real interfaces and key milestones."}
          </p>
        </motion.div>
      </div>

      {/* Albums */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="h-px bg-line mb-16" />
        {ALBUMS.map(album => (
          <AlbumSection key={album.id} album={album} locale={locale} />
        ))}
      </div>
    </div>
  );
}
