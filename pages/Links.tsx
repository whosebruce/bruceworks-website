import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Globe } from 'lucide-react';
import { Logo } from '../components/Logo';
import { BbbSeal } from '../components/BbbSeal';
import { SOCIAL } from '../components/Footer';
import { FIT_CALL } from '../content/pricing';
import { BUILT, HERO } from '../content/home';

// /links/: Bruce's own link-in-bio page, in place of a Linktree, for the Instagram bio (Bruce, 2026-11-17). Most visits
// come from Instagram on a phone, so it's phone first and short: the name and the homepage line, then big tap targets in
// this order: book the free call, the website, the BBB profile (BBB's dynamic seal with "Click for Review"), the products
// the site already links to, and the channels in the footer. Every link here is already on the site somewhere; the BBB
// profile is the one this page adds. No prices (outside /pricing/ only the three doors show, and this page needs none),
// and nothing personal in the list: Baby Forecast stays off it. The family bar shows here like on every page (Bruce,
// 2026-11-15); the Field Brief pop-up doesn't (content/field-brief.ts).
// scripts/verify-routes.mjs holds the order, the seal, the tap sizes and the no-prices rule.

const PRODUCTS = BUILT.filter((p) => ['Bruce Works OS', 'Redlyn', 'Chalklyn'].includes(p.name));

const radius = { borderRadius: 'var(--radius)' } as React.CSSProperties;
const row = 'flex min-h-[64px] w-full items-center gap-3 border-theme border-line bg-ground-2 px-4 py-3 text-left hover:border-ink-3';

/** A row's words: what it is, and one small line under it. */
const Words: React.FC<{ title: string; sub: string }> = ({ title, sub }) => (
  <span className="min-w-0 flex-1">
    <span className="block font-semibold leading-snug text-ink">{title}</span>
    <span className="block text-sm leading-snug text-ink-3">{sub}</span>
  </span>
);

export const Links: React.FC = () => (
  <main className="pb-16 pt-8 md:pb-24 md:pt-14">
    <div className="mx-auto w-full max-w-md px-5">
      <div className="flex flex-col items-center text-center">
        <Logo size={64} title="" />
        <h1 className="display mt-4 text-[min(3rem,11vw)] leading-none text-ink">BRUCE<span className="sig">WORKS</span></h1>
        <p className="mt-3 text-balance text-lg leading-snug text-ink-2">{HERO.headline.join('')}</p>
      </div>

      <ul className="mt-8 space-y-3" aria-label="Start here">
        <li>
          <Link to={FIT_CALL} className="btn btn-primary w-full !min-h-[60px] text-lg">Book a free call <ArrowRight size={20} aria-hidden="true" /></Link>
          <p className="mt-2 text-balance text-center text-sm text-ink-3">{HERO.fine}</p>
        </li>
        <li>
          <Link to="/" className={row} style={radius}>
            <Globe size={24} aria-hidden="true" className="shrink-0 text-signal-text" />
            <Words title="The website" sub="bruceworks.net" />
            <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-ink-3" />
          </Link>
        </li>
        <li>
          {/* BBB's own seal badge (components/BbbSeal.tsx), with no card around the seal; no rating in words */}
          <div data-bbb className="flex flex-col items-center border-y border-line-2 py-5">
            <p className="label">Business trust</p>
            <BbbSeal lazy={false} className="mt-3" />
          </div>
        </li>
      </ul>

      <h2 className="label mb-3 mt-10">Built here</h2>
      <ul className="space-y-3">
        {PRODUCTS.map((p) => {
          const l = p.links[0];
          const inside = (
            <>
              {/* each product's own app icon, with app-icon corners in every theme (as on the homepage) */}
              <img src={p.logo} alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-[22%]" />
              <Words title={p.name} sub={l.external ? `${p.chip} · ${l.label}` : l.label} />
              {l.external
                ? <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-ink-3" />
                : <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-ink-3" />}
            </>
          );
          return (
            <li key={p.name}>
              {l.external
                ? <a href={l.href} target="_blank" rel="noopener noreferrer" className={row} style={radius}>{inside}</a>
                : <Link to={l.href} className={row} style={radius}>{inside}</Link>}
            </li>
          );
        })}
      </ul>

      <h2 className="label mb-3 mt-10">Follow along</h2>
      <ul className="grid grid-cols-2 gap-3">
        {SOCIAL.map(({ href, name, label, path }) => (
          <li key={href}>
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`${row} justify-center`} style={radius}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor" fillRule="evenodd" className="shrink-0 text-ink"><path d={path} /></svg>
              <span className="font-semibold text-ink">{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </main>
);
