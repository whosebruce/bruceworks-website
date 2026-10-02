import React from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { ThemeMenu, ThemeRow } from './ThemePicker';
import { useTheme } from '../theme/ThemeProvider';
import { NavItem } from '../types';

export const navItems: NavItem[] = [
  { label: 'Command Center', href: '/command-center/' },
  { label: 'Live Demo', href: '/live-demo/' },
  { label: 'Themes', href: '/themes/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Government', href: '/government-capabilities/' },
  { label: 'About', href: '/about-bruce/' },
];

// When a theme's font is too wide for the bar, the links first close up (.nav-tight: less padding and tracking); if they
// still don't fit, links drop out in this order: About, then Government, then Themes. Dropped links stay reachable from
// the menu button, which shows whenever anything has dropped.
const DROP_ORDER = ['/about-bruce/', '/government-capabilities/', '/themes/'];

/** Whether the links need closing up, and how many (from DROP_ORDER) have to hide for the rest to fit. Measured, so it
 * holds for every theme's font. */
function useNavFit(nav: React.RefObject<HTMLElement>) {
  const { theme } = useTheme();
  const [fit, setFit] = React.useState({ tight: false, dropped: 0 });
  React.useLayoutEffect(() => {
    const el = nav.current; if (!el) return;
    const measure = () => {
      if (!el.offsetParent) return; // the bar is hidden below xl; the menu has every link there
      const links = Array.from(el.children) as HTMLElement[];
      const byHref = (h: string) => links.find((a) => a.getAttribute('href') === h);
      const was = links.map((a) => a.style.display);
      const wasTight = el.classList.contains('nav-tight');
      const over = () => el.scrollWidth > el.clientWidth + 1;
      links.forEach((a) => { a.style.display = 'block'; });
      el.classList.remove('nav-tight');
      const tight = over();
      if (tight) el.classList.add('nav-tight');
      let n = 0;
      while (n < DROP_ORDER.length && over()) { const a = byHref(DROP_ORDER[n]); if (a) a.style.display = 'none'; n++; }
      links.forEach((a, i) => { a.style.display = was[i]; });
      el.classList.toggle('nav-tight', wasTight);
      setFit((f) => (f.tight === tight && f.dropped === n ? f : { tight, dropped: n }));
    };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(el.parentElement ?? el);
    document.fonts?.ready.then(measure);
    document.fonts?.addEventListener?.('loadingdone', measure);
    return () => { ro.disconnect(); document.fonts?.removeEventListener?.('loadingdone', measure); };
  }, [nav, theme.id]);
  return fit;
}

const Wordmark: React.FC = () => (
  <span className="flex items-center gap-2.5">
    <Logo size={34} title="" />
    <span className="display text-[22px] leading-none tracking-[0.04em] text-ink">BRUCE<span className="sig">WORKS</span></span>
  </span>
);

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const navRef = React.useRef<HTMLElement>(null);
  const { tight, dropped } = useNavFit(navRef);
  const hide = new Set(DROP_ORDER.slice(0, dropped));
  const menuAt = dropped ? '' : 'xl:hidden'; // the menu button stays on at xl+ while any link is hidden

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => setOpen(false), [pathname]);
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <div className="hidden border-b border-line-2 bg-ground lg:block">
        <div className="container-x flex h-9 items-center justify-between font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
          <span>SBA VetCert <span className="text-ink-2">SDVOSB · VOSB</span> <span className="opacity-50">//</span> California <span className="text-ink-2">DVBE</span> <span className="opacity-50">//</span> SAM.gov active</span>
          <a href="tel:+18668296757" className="flex items-center gap-1.5 hover:text-ink"><Phone size={12} /> (866) 829-6757</a>
        </div>
      </div>
      <div className={`border-b transition-colors ${scrolled || open ? 'border-line bg-ground/95 backdrop-blur-sm' : 'border-transparent bg-ground'}`}>
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link to="/" className="home-link shrink-0" aria-label="Back to Bruce Works home"><Wordmark /></Link>
          <nav ref={navRef} aria-label="Primary navigation" className={`hidden min-w-0 items-center gap-1 overflow-hidden xl:flex ${tight ? 'nav-tight' : ''}`} style={{ zoom: 'var(--label-zoom, 1)' } as React.CSSProperties}>
            {navItems.map((item) => (
              <NavLink key={item.href} to={item.href}
                className={({ isActive }) => `chip whitespace-nowrap px-2.5 py-2 text-[14px] transition-colors xl:px-3 xl:text-[15px] ${hide.has(item.href) ? 'hidden' : ''} ${isActive ? 'text-ink' : 'text-ink-3 hover:text-ink'}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><ThemeMenu /></div>
            <Link to="/ai-leverage-audit/" className="btn btn-primary hidden !min-h-[40px] md:inline-flex">Book the audit</Link>
            <button type="button" onClick={() => setOpen(!open)} className={`grid h-10 w-10 place-items-center text-ink ${menuAt}`}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className={`fixed inset-x-0 bottom-0 top-16 z-40 lg:top-[100px] overflow-y-auto bg-ground ${menuAt}`}>
          <nav aria-label="Mobile navigation" className="container-x flex flex-col py-4">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Services', href: '/services/' }, { label: 'FAQ', href: '/faq/' }, { label: 'Contact', href: '/contact/' }].map((item) => (
              <Link key={item.href} to={item.href} className="display border-b border-line-2 py-4 text-3xl text-ink">{item.label}</Link>
            ))}
          </nav>
          <div className="container-x space-y-4 pb-10">
            <p className="label">Try a theme</p>
            <ThemeRow compact />
            <Link to="/ai-leverage-audit/" className="btn btn-primary w-full">Book the $197 audit</Link>
            <a href="tel:+18668296757" className="btn btn-outline w-full"><Phone size={16} /> (866) 829-6757</a>
          </div>
        </div>
      )}
    </header>
  );
};
