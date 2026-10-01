import React from 'react';
import { Chamfer, Loop } from '../brand';
import { THEMES, type Theme } from '../../theme/themes';
import { useTheme } from '../../theme/ThemeProvider';
import { LOOPS } from '../../content/media';

// The "It wears your brand" pieces that moved from Home to /themes/: a compact pick-a-theme card and the small live mock
// that re-skins with the site (until the theme-morph motion loop exists).

export const ThemeSwatch: React.FC<{ t: Theme; className?: string }> = ({ t, className = 'h-10 w-10' }) => (
  <span aria-hidden="true" className={`grid shrink-0 grid-cols-2 overflow-hidden border border-line ${className}`} style={{ borderRadius: 'var(--radius)' }}>
    {t.swatch.map((c, i) => <span key={i} style={{ background: c }} />)}
  </span>
);

export const ThemePickCard: React.FC<{ t: Theme }> = ({ t }) => {
  const { theme, setTheme } = useTheme();
  const on = theme.id === t.id;
  return (
    <button type="button" onClick={() => setTheme(t.id)} aria-pressed={on}
      className={`flex w-full items-center gap-3 border-theme p-3 text-left transition-colors ${on ? 'border-signal bg-signal/10' : 'border-line hover:border-ink-3'}`} style={{ borderRadius: 'var(--radius)' }}>
      <ThemeSwatch t={t} />
      <span className="min-w-0"><span className="block font-semibold text-ink">{t.name}</span><span className="block truncate text-xs text-ink-3">{t.tagline}</span></span>
    </button>
  );
};

export const ThemePickList: React.FC<{ className?: string; themes?: Theme[] }> = ({ className = '', themes = THEMES }) => (
  <ul className={`grid gap-2 sm:grid-cols-2 ${className}`}>
    {themes.map((t) => <li key={t.id}><ThemePickCard t={t} /></li>)}
  </ul>
);

/** The theme-morph loop when it exists; until then a small live mock that re-skins with the site. */
export const ThemeMorph: React.FC = () => {
  const loop = LOOPS.themeMorph;
  if (loop) return <Chamfer><Loop src={loop.mp4} webm={loop.webm} poster={loop.poster} label={loop.label} className="block w-full" /></Chamfer>;
  return (
    <Chamfer innerClassName="p-0">
      <div className="flex h-9 items-center gap-2 border-b border-line bg-ground-3 px-3"><span className="label">Command // today</span></div>
      <div className="grid grid-cols-[52px_1fr]">
        <div className="space-y-3 border-r border-line bg-ground p-3">{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className={`h-6 w-6 ${i === 1 ? 'bg-signal' : 'bg-ground-3'}`} style={{ borderRadius: 'var(--radius)' }} />)}</div>
        <div className="space-y-4 p-5">
          <p className="display text-4xl">Morning, Alex.</p>
          <div className="grid grid-cols-2 gap-3">
            {[['Due today', '3'], ['Agents working', '2']].map(([k, v]) => <div key={k} className="panel p-3"><p className="label">{k}</p><p className="display text-3xl">{v}</p></div>)}
          </div>
          <ul className="panel divide-y divide-line-2 text-sm">{['Send the Hernandez estimate', 'Chapter 5 quiz', 'Edit the skit intro'].map((x, i) => <li key={x} className="flex items-center gap-3 px-3 py-2.5 text-ink"><span className="sig">{i === 2 ? '☐' : '☑'}</span>{x}</li>)}</ul>
          <span className="btn btn-primary !min-h-[40px]">New task</span>
        </div>
      </div>
    </Chamfer>
  );
};
