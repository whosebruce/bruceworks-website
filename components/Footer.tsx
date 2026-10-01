import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BTile, HazardStrip } from './brand';
import { ThemeRow } from './ThemePicker';

const cols: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  { title: 'Command Center', links: [
    { label: 'What it does', href: '/command-center/' }, { label: 'Live demo', href: '/live-demo/' }, { label: 'Themes', href: '/themes/' },
    { label: 'Pricing', href: '/pricing/' }, { label: 'Systems in use', href: '/our-work/' },
  ] },
  { title: 'Work with Bruce', links: [
    { label: 'AI Leverage Audit', href: '/ai-leverage-audit/' }, { label: 'Services', href: '/services/' }, { label: 'Why Bruce Works', href: '/why-hire-bruce/' },
    { label: 'Why us', href: '/why-us/' }, { label: 'FAQ', href: '/faq/' }, { label: 'Contact', href: '/contact/' },
  ] },
  { title: 'Company', links: [
    { label: 'About Bruce', href: '/about-bruce/' }, { label: 'Experience', href: '/experience/' }, { label: 'Government capabilities', href: '/government-capabilities/' },
    { label: 'Privacy policy', href: '/privacy-policy/', external: true }, { label: 'SMS terms', href: '/sms-consent/', external: true },
  ] },
];

export const Footer: React.FC = () => (
  <footer className="mt-auto border-t border-line bg-ground">
    <HazardStrip />
    <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
      <div className="space-y-5">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Bruce Works home">
          <BTile size={36} /><span className="display text-2xl leading-none text-ink">BRUCE<span className="sig">WORKS</span></span>
        </Link>
        <p className="max-w-sm text-ink-2">One private command center for your work, your files and your AI agents. Built to the way you run your day, on hardware you own.</p>
        <ul className="space-y-2.5 text-sm text-ink-2">
          <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-signal-text" /> San Diego based · California service · remote nationwide</li>
          <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0 text-signal-text" /> <span>Toll-free intake <a className="text-ink hover:underline" href="tel:+18668296757">(866) 829-6757</a> · Bruce direct <a className="text-ink hover:underline" href="tel:+16195379720">619-537-9720</a></span></li>
          <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0 text-signal-text" /> <a className="text-ink hover:underline" href="mailto:info@bruceworks.net">info@bruceworks.net</a></li>
        </ul>
        <div className="flex gap-2">
          {[
            ['https://www.youtube.com/@bruceworks', 'Bruce Works on YouTube', 'YT'],
            ['https://www.instagram.com/bruceworksai/', 'Bruce Works on Instagram', 'IG'],
            ['https://www.facebook.com/bruceworksai', 'Bruce Works on Facebook', 'FB'],
          ].map(([href, label, tag]) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="grid h-10 w-12 place-items-center border-theme border-line font-mono text-xs font-semibold tracking-[0.12em] text-ink-2 hover:border-ink-3 hover:text-ink" style={{ borderRadius: 'var(--radius)' }}>{tag}</a>
          ))}
        </div>
      </div>
      {cols.map((c) => (
        <div key={c.title}>
          <h3 className="label mb-4 !text-ink">{c.title}</h3>
          <ul className="space-y-2.5">
            {c.links.map((l) => <li key={l.href}>{l.external ? <a href={l.href} className="text-ink-2 hover:text-ink">{l.label}</a> : <Link to={l.href} className="text-ink-2 hover:text-ink">{l.label}</Link>}</li>)}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-line-2">
      <div className="container-x flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
          © {new Date().getFullYear()} Bruce Works LLC <span className="opacity-50">//</span> SDVOSB · VOSB (SBA VetCert) <span className="opacity-50">//</span> CA DVBE 2053352 <span className="opacity-50">//</span> UEI N7YPC6B6YNC5 <span className="opacity-50">//</span> CAGE 246J3
        </p>
        <div className="flex flex-wrap items-center gap-3"><span className="label">Theme</span><ThemeRow compact /></div>
      </div>
    </div>
  </footer>
);
