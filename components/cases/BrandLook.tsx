import React from 'react';
import { Check, Display, HazardStrip } from '../brand';
import { themeById } from '../../theme/themes';
import { useTheme } from '../../theme/ThemeProvider';
import type { CaseStudy } from '../../content/case-studies';
import { WearButton } from './Wear';

// "How it looks": the client's palette (the four colours their theme is built on, named the way their brand kit names
// them), their type and shape rules, and a specimen card drawn with nothing but the site's tokens. Not wearing their
// theme, the specimen shows whatever the site is wearing and says so; wearing it, the specimen (and the page) is theirs.

const ROLES = ['Ground', 'Panel', 'Text', 'Signal'] as const;

export const BrandLook: React.FC<{ cs: CaseStudy }> = ({ cs }) => {
  const { theme } = useTheme();
  const target = themeById(cs.theme);
  const wearing = theme.id === cs.theme;

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div>
        <Display className="reveal text-4xl md:text-5xl">Their palette. <span className="sig">Their type.</span></Display>

        <h3 className="label mt-10">Palette</h3>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ROLES.map((role, i) => (
            <li key={role} className="panel overflow-hidden">
              <span aria-hidden="true" className="block h-16 border-b border-line md:h-20" style={{ background: target.swatch[i] }} />
              <span className="block px-3 py-3">
                <span className="block text-sm font-semibold leading-snug text-ink">{cs.look.palette[i]}</span>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{role}</span>
              </span>
            </li>
          ))}
        </ul>
        {cs.look.note && <p className="mt-4 text-sm text-ink-3">{cs.look.note}</p>}

        <h3 className="label mt-10">Type</h3>
        <dl className="mt-4 divide-y divide-line-2 border-y border-line-2">
          {cs.look.type.map((t) => (
            <div key={t.role} className="grid gap-1 py-3 sm:grid-cols-[140px_1fr] sm:gap-4">
              <dt className="label">{t.role}</dt>
              <dd className="text-ink">{t.face}</dd>
            </div>
          ))}
        </dl>

        <h3 className="label mt-10">House rules</h3>
        <ul className="mt-4 space-y-3 text-ink-2">
          {cs.look.rules.map((r) => <Check key={r}>{r}</Check>)}
        </ul>
      </div>

      <figure className="reveal lg:sticky lg:top-24 lg:self-start">
        <div className="panel overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-ground-3 px-4 py-2.5">
            <span className="label truncate">Specimen // {theme.name}</span>
            <span className="ml-auto hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 sm:inline">{wearing ? 'Theirs' : 'Not theirs yet'}</span>
          </div>
          <div className="texture p-6 md:p-8">
            <p className="label">{cs.kind}</p>
            <p className="display mt-3 text-4xl md:text-5xl">{cs.client}</p>
            <p className="mt-4 text-ink-2">{cs.summary}</p>
            <div aria-hidden="true" className="mt-6 flex flex-wrap gap-3">
              <span className="btn btn-primary">Primary</span>
              <span className="btn btn-outline">Outline</span>
            </div>
            <div aria-hidden="true" className="mt-6 grid grid-cols-3 gap-2">
              {['bg-ground', 'bg-ground-2', 'bg-ground-3', 'bg-line', 'bg-ink-3', 'bg-alert'].map((c) => (
                <span key={c} className={`h-6 border border-line ${c}`} style={{ borderRadius: 'var(--radius)' }} />
              ))}
            </div>
          </div>
          <HazardStrip height={10} />
        </div>
        <figcaption className="mt-4 text-ink-2">
          {wearing
            ? <>Drawn with the site's tokens, and right now the tokens are {cs.client}'s.</>
            : <>Drawn with the site's tokens, so right now it's in {theme.name}. Wear {cs.client}'s theme to see this card, and the whole page, in theirs.</>}
        </figcaption>
        <WearButton theme={cs.theme} client={cs.client} className="mt-4 w-full sm:w-auto" />
      </figure>
    </div>
  );
};
