import React from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { ThemeMenu, ThemeRow } from './ThemePicker';
import { useTheme } from '../theme/ThemeProvider';

type Leaf = { label: string; href: string; blurb: string };
type Entry = { key: string; label: string; href: string } | { key: string; label: string; items: Leaf[] };

// The top bar: three short groups that open into a panel (each page with one line on what's there), and the two pages
// buyers and agencies go straight to, Pricing and Government, as plain links (Bruce, 2026-10-01).
export const NAV: Entry[] = [
  { key: 'product', label: 'Product', items: [
    { label: 'Command Center', href: '/command-center/', blurb: 'One private dashboard for your files, docs, tasks and AI agents.' },
    { label: 'Live Demo', href: '/live-demo/', blurb: 'Click around the real thing, on sample data.' },
    { label: 'Themes', href: '/themes/', blurb: 'Your Command Center in your brand, or one of ours.' },
    { label: 'Services', href: '/services/', blurb: 'The audit, the build and the training, done for you.' },
  ] },
  { key: 'work', label: 'Work', items: [
    { label: 'Case Studies', href: '/case-studies/', blurb: 'Five clients: what they needed and what got built.' },
    { label: 'Systems in Use', href: '/our-work/', blurb: 'What Bruce Works runs on, every day.' },
    { label: 'Field Notes', href: '/field-notes/', blurb: 'Plain talk on one system instead of twelve apps.' },
  ] },
  { key: 'pricing', label: 'Pricing', href: '/pricing/' },
  { key: 'government', label: 'Government', href: '/government-capabilities/' },
  { key: 'about', label: 'About', items: [
    { label: 'About Bruce', href: '/about-bruce/', blurb: 'Marine Corps veteran, building in San Diego.' },
    { label: 'Experience', href: '/experience/', blurb: 'The service record behind the work.' },
    { label: 'Why hire Bruce', href: '/why-hire-bruce/', blurb: 'Who you get, and the standard he holds.' },
    { label: 'FAQ', href: '/faq/', blurb: 'Straight answers on the system, privacy and price.' },
    { label: 'Contact', href: '/contact/', blurb: 'Audits, builds, hosting and government work.' },
  ] },
];

const inGroup = (items: Leaf[], path: string) => items.some((i) => path === i.href || (i.href !== '/' && path.startsWith(i.href)));

// When a theme's font is too wide for the bar, the entries first close up (.nav-tight: less padding and tracking); if
// they still don't fit, entries drop out in this order: About, then Work. They stay reachable from the menu button,
// which shows whenever anything has dropped. Pricing and Government never drop.
const DROP_ORDER = ['about', 'work'];

/** Whether the entries need closing up, and how many (from DROP_ORDER) have to hide for the rest to fit. Measured, so
 * it holds for every theme's font. */
function useNavFit(nav: React.RefObject<HTMLElement>) {
  const { theme } = useTheme();
  const [fit, setFit] = React.useState({ tight: false, dropped: 0 });
  React.useLayoutEffect(() => {
    const el = nav.current; if (!el) return;
    const measure = () => {
      if (!el.offsetParent || el.querySelector('[data-nav-panel]')) return; // hidden below xl, or a panel is open
      const entries = Array.from(el.children) as HTMLElement[];
      const byKey = (k: string) => entries.find((a) => a.dataset.key === k);
      const was = entries.map((a) => a.style.display);
      const wasTight = el.classList.contains('nav-tight');
      const over = () => el.scrollWidth > el.clientWidth + 1;
      entries.forEach((a) => { a.style.display = 'block'; });
      el.classList.remove('nav-tight');
      const tight = over();
      if (tight) el.classList.add('nav-tight');
      let n = 0;
      while (n < DROP_ORDER.length && over()) { const a = byKey(DROP_ORDER[n]); if (a) a.style.display = 'none'; n++; }
      entries.forEach((a, i) => { a.style.display = was[i]; });
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

// labels in the bar scale with the theme's label zoom (wide theme fonts); the panels keep full size
const TOP = 'nav-top chip flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[15px] transition-colors';
const zoom = { zoom: 'var(--label-zoom, 1)' } as React.CSSProperties;

/** One group in the bar: a button that opens its panel on hover (mouse) or click/tap/keyboard. A disclosure, so screen
 * readers hear "Product, collapsed, button" and the panel is a plain list of links. */
const Group: React.FC<{ entry: Extract<Entry, { items: Leaf[] }>; open: boolean; setOpen: React.Dispatch<React.SetStateAction<string | null>>; align: 'left' | 'right'; hidden: boolean }> = ({ entry, open, setOpen, align, hidden }) => {
  const { pathname } = useLocation();
  const wrap = React.useRef<HTMLDivElement>(null);
  const btn = React.useRef<HTMLButtonElement>(null);
  const leave = React.useRef<number>();
  const by = React.useRef<string>('mouse'); // what pressed the button: a mouse click only opens (hover already did)
  const active = inGroup(entry.items, pathname);
  const id = `nav-panel-${entry.key}`;
  const links = () => Array.from(wrap.current?.querySelectorAll<HTMLAnchorElement>(`#${id} a`) ?? []);
  // a group only ever closes itself: leaving Product for About must not close About
  const closeMine = () => setOpen((p) => (p === entry.key ? null : p));
  const hover = (on: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(leave.current);
    if (on) setOpen(entry.key); else leave.current = window.setTimeout(closeMine, 140);
  };
  const onKey = (e: React.KeyboardEvent) => {
    const all = links(); const i = all.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === 'Escape' && open) { e.preventDefault(); setOpen(null); btn.current?.focus(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) setOpen(entry.key); requestAnimationFrame(() => { const now = links(); now[Math.min(i + 1, now.length - 1)]?.focus(); }); }
    else if (e.key === 'ArrowUp' && i >= 0) { e.preventDefault(); (i === 0 ? btn.current : all[i - 1])?.focus(); }
  };
  return (
    <div ref={wrap} data-key={entry.key} className={`relative ${hidden ? 'hidden' : ''}`} onPointerEnter={hover(true)} onPointerLeave={hover(false)} onKeyDown={onKey}
      onBlur={(e) => { if (!wrap.current?.contains(e.relatedTarget as Node)) closeMine(); }}>
      <button ref={btn} type="button" aria-expanded={open} aria-controls={id} onPointerDown={(e) => { by.current = e.pointerType; }}
        onClick={(e) => { const mouse = e.detail > 0 && by.current === 'mouse'; by.current = ''; setOpen(mouse || !open ? entry.key : null); }}
        className={`${TOP} ${open || active ? 'text-ink' : 'text-ink-3 hover:text-ink'}`} style={zoom}>
        {entry.label}<ChevronDown size={14} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div id={id} data-nav-panel className={`absolute top-full z-50 pt-2 ${align === 'right' ? 'right-0' : 'left-0'}`}>
          <ul className="panel w-[22rem] p-2 shadow-[0_18px_40px_-18px_rgb(var(--c-ink)/0.45)]" style={{ borderRadius: 'var(--radius)' }}>
            {entry.items.map((i) => (
              <li key={i.href}>
                <NavLink to={i.href} onClick={() => setOpen(null)}
                  className={({ isActive }) => `block px-3 py-2.5 transition-colors hover:bg-ground-3 focus-visible:bg-ground-3 ${isActive ? 'bg-ground-3' : ''}`}
                  style={{ borderRadius: 'var(--radius)' }}>
                  <span className="block font-semibold text-ink">{i.label}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-ink-2">{i.blurb}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Wordmark: React.FC = () => (
  <span className="flex items-center gap-2.5">
    <Logo size={34} title="" />
    <span className="display text-[22px] leading-none tracking-[0.04em] text-ink">BRUCE<span className="sig">WORKS</span></span>
  </span>
);

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [panel, setPanel] = React.useState<string | null>(null);
  const { pathname } = useLocation();
  const navRef = React.useRef<HTMLElement>(null);
  const { tight, dropped } = useNavFit(navRef);
  const hide = new Set(DROP_ORDER.slice(0, dropped));
  const menuAt = dropped ? '' : 'xl:hidden'; // the menu button stays on at xl+ while any entry is hidden

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => { setOpen(false); setPanel(null); }, [pathname]);
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  // a click anywhere else closes an open panel
  React.useEffect(() => {
    if (!panel) return;
    const off = (e: PointerEvent) => { if (!navRef.current?.contains(e.target as Node)) setPanel(null); };
    document.addEventListener('pointerdown', off);
    return () => document.removeEventListener('pointerdown', off);
  }, [panel]);

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
          <nav ref={navRef} aria-label="Primary navigation" className={`hidden min-w-0 items-center gap-1 xl:flex ${tight ? 'nav-tight' : ''}`}>
            {NAV.map((e, n) => 'items' in e
              ? <Group key={e.key} entry={e} open={panel === e.key} setOpen={setPanel} align={n === NAV.length - 1 ? 'right' : 'left'} hidden={hide.has(e.key)} />
              : (
                <div key={e.key} data-key={e.key}>
                  <NavLink to={e.href} className={({ isActive }) => `${TOP} ${isActive ? 'text-ink' : 'text-ink-3 hover:text-ink'}`} style={zoom}>{e.label}</NavLink>
                </div>
              ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><ThemeMenu /></div>
            <Link to="/book/" className="btn btn-primary hidden !min-h-[40px] md:inline-flex">Book the audit</Link>
            <button type="button" onClick={() => setOpen(!open)} className={`grid h-10 w-10 place-items-center text-ink ${menuAt}`}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className={`fixed inset-x-0 bottom-0 top-16 z-40 lg:top-[100px] overflow-y-auto bg-ground ${menuAt}`}>
          <nav aria-label="Mobile navigation" className="container-x py-4">
            <ul>
              {[{ label: 'Home', href: '/' }, ...NAV.filter((e): e is Extract<Entry, { href: string }> => 'href' in e)].map((l) => (
                <li key={l.href}><Link to={l.href} className="display block border-b border-line-2 py-3.5 text-3xl text-ink">{l.label}</Link></li>
              ))}
            </ul>
            {NAV.filter((e): e is Extract<Entry, { items: Leaf[] }> => 'items' in e).map((g) => (
              <section key={g.key} aria-label={g.label} className="mt-7">
                <p className="label">{g.label}</p>
                <ul className="mt-1">
                  {g.items.map((i) => (
                    <li key={i.href}><Link to={i.href} className="display block border-b border-line-2 py-2.5 text-2xl text-ink">{i.label}</Link></li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
          <div className="container-x space-y-4 pb-10 pt-4">
            <p className="label">Try a theme</p>
            <ThemeRow compact />
            <Link to="/book/" className="btn btn-primary w-full">Book the $197 audit</Link>
            <a href="tel:+18668296757" className="btn btn-outline w-full"><Phone size={16} /> (866) 829-6757</a>
          </div>
        </div>
      )}
    </header>
  );
};
