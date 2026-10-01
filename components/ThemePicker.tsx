import React from 'react';
import { Check as CheckIcon, Palette } from 'lucide-react';
import { THEMES, type Theme } from '../theme/themes';
import { useTheme } from '../theme/ThemeProvider';

// Two ways to try a theme: the compact menu in the header, and a row of swatches (the hero, the Themes page).

const Swatch: React.FC<{ t: Theme; size?: number }> = ({ t, size = 18 }) => (
  <span aria-hidden="true" className="inline-flex shrink-0 overflow-hidden border border-black/20" style={{ width: size * 2, height: size, borderRadius: 'var(--radius)' }}>
    {t.swatch.map((c, i) => <span key={i} style={{ background: c, flex: i === 3 ? 1.4 : 1 }} />)}
  </span>
);

export const ThemeMenu: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const box = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close); document.addEventListener('keydown', close);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', close); };
  }, [open]);
  return (
    <div ref={box} className="relative">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-2 border-theme border-line px-3 text-ink-2 hover:border-ink-3 hover:text-ink" style={{ borderRadius: 'var(--radius)' }}>
        <Palette size={16} /><span className="hidden font-mono text-[11px] font-semibold uppercase tracking-[0.14em] xl:inline">Theme</span><Swatch t={theme} size={10} />
      </button>
      {open && (
        <div role="listbox" aria-label="Site theme" className="absolute right-0 top-12 z-50 w-[300px] border-theme border-line bg-ground-2 p-2" style={{ borderRadius: 'var(--radius-lg)' }}>
          <p className="label px-2 pb-2 pt-1">Try a theme. The whole site and the demo follow.</p>
          {THEMES.map((t) => (
            <button key={t.id} type="button" role="option" aria-selected={t.id === theme.id} onClick={() => { setTheme(t.id); setOpen(false); }}
              className={`flex w-full items-center gap-3 px-2 py-2 text-left hover:bg-ground-3 ${t.id === theme.id ? 'bg-ground-3' : ''}`} style={{ borderRadius: 'var(--radius)' }}>
              <Swatch t={t} />
              <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-ink">{t.name}</span><span className="block truncate text-xs text-ink-3">{t.tagline}</span></span>
              {t.id === theme.id && <CheckIcon size={16} className="text-signal-text" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/** Big swatch buttons in a row: for the hero and the Themes page. */
export const ThemeRow: React.FC<{ className?: string; compact?: boolean }> = ({ className = '', compact }) => {
  const { theme, setTheme } = useTheme();
  return (
    <div role="radiogroup" aria-label="Try a theme" className={`flex flex-wrap gap-2 ${className}`}>
      {THEMES.map((t) => (
        <button key={t.id} type="button" role="radio" aria-checked={t.id === theme.id} onClick={() => setTheme(t.id)}
          className={`flex items-center gap-2 border-theme px-3 py-2 text-left text-sm font-semibold transition-colors ${t.id === theme.id ? 'border-signal bg-signal/10 text-ink' : 'border-line text-ink-2 hover:border-ink-3 hover:text-ink'}`}
          style={{ borderRadius: 'var(--radius)' }}>
          <Swatch t={t} size={compact ? 10 : 12} /><span className="whitespace-nowrap">{t.name}</span>
        </button>
      ))}
    </div>
  );
};
