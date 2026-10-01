import React from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { ThemeMenu, ThemeRow } from './ThemePicker';
import { NavItem } from '../types';

export const navItems: NavItem[] = [
  { label: 'Command Center', href: '/command-center/' },
  { label: 'Live Demo', href: '/live-demo/' },
  { label: 'Themes', href: '/themes/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Government', href: '/government-capabilities/' },
  { label: 'About', href: '/about-bruce/' },
];

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
          <nav aria-label="Primary navigation" className="hidden min-w-0 items-center gap-1 lg:flex" style={{ zoom: 'var(--label-zoom, 1)' } as React.CSSProperties}>
            {navItems.map((item) => (
              <NavLink key={item.href} to={item.href}
                className={({ isActive }) => `chip whitespace-nowrap px-2.5 py-2 text-[14px] transition-colors xl:px-3 xl:text-[15px] ${item.href === '/about-bruce/' ? 'hidden xl:block' : ''} ${isActive ? 'text-ink' : 'text-ink-3 hover:text-ink'}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><ThemeMenu /></div>
            <Link to="/ai-leverage-audit/" className="btn btn-primary hidden !min-h-[40px] md:inline-flex">Book the audit</Link>
            <button type="button" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center text-ink lg:hidden"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ground lg:hidden">
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
