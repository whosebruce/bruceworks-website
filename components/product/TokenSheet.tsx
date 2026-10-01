import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

// "This is everything a theme decides": the tokens the page is wearing right now, read live from the page, so picking
// another theme rewrites the sheet. Nothing here is a fixed color; the swatches are the token classes themselves.
const COLORS: { token: string; name: string; cls: string }[] = [
  { token: '--c-ground', name: 'Ground', cls: 'bg-ground' },
  { token: '--c-ground-2', name: 'Panel', cls: 'bg-ground-2' },
  { token: '--c-ground-3', name: 'Raised', cls: 'bg-ground-3' },
  { token: '--c-line', name: 'Line', cls: 'bg-line' },
  { token: '--c-ink', name: 'Ink', cls: 'bg-ink' },
  { token: '--c-ink-3', name: 'Muted', cls: 'bg-ink-3' },
  { token: '--c-signal', name: 'Signal', cls: 'bg-signal' },
  { token: '--c-alert', name: 'Alert', cls: 'bg-alert' },
];
const SHAPE: { token: string; name: string; show?: (v: string) => string }[] = [
  { token: '--font-display', name: 'Headline face', show: first },
  { token: '--font-body', name: 'Body face', show: first },
  { token: '--display-case', name: 'Headline case', show: (v) => (v === 'none' ? 'As typed' : 'All caps') },
  { token: '--radius', name: 'Corners', show: (v) => (v === '0px' ? 'Square' : v) },
  { token: '--border-w', name: 'Line weight' },
  { token: '--chamfer', name: 'Cut corner', show: (v) => (v === '0px' ? 'None' : v) },
];

function first(stack: string) { return stack.split(',')[0].replace(/['"]/g, '').trim(); }
function hex(channels: string) {
  const n = channels.trim().split(/\s+/).map(Number);
  return n.length === 3 && n.every((x) => Number.isFinite(x)) ? '#' + n.map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase() : channels;
}

export const TokenSheet: React.FC = () => {
  const { theme } = useTheme();
  const [vals, setVals] = React.useState<Record<string, string>>({});
  React.useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const read = () => setVals(Object.fromEntries([...COLORS, ...SHAPE].map((t) => [t.token, cs.getPropertyValue(t.token).trim()])));
    read();
  }, [theme.id]);

  return (
    <div className="chamfer"><div className="chamfer-in">
      <div className="flex items-center gap-2 border-b border-line bg-ground-3 px-4 py-2.5">
        <span className="label truncate">Theme sheet // {theme.name}</span>
        <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Live</span>
      </div>
      <div className="grid gap-px bg-line-2 sm:grid-cols-2">
        <ul className="grid grid-cols-2 gap-px bg-line-2">
          {COLORS.map((c) => (
            <li key={c.token} className="flex items-center gap-3 bg-ground-2 px-4 py-3">
              <span aria-hidden="true" className={`h-8 w-8 shrink-0 border border-line ${c.cls}`} style={{ borderRadius: 'var(--radius)' }} />
              <span className="min-w-0"><span className="block text-sm font-semibold text-ink">{c.name}</span><span className="block truncate font-mono text-[11px] text-ink-3">{vals[c.token] ? hex(vals[c.token]) : '…'}</span></span>
            </li>
          ))}
        </ul>
        <ul className="grid content-start gap-px bg-line-2">
          {SHAPE.map((s) => { const v = vals[s.token] ?? ''; return (
            <li key={s.token} className="flex items-baseline justify-between gap-4 bg-ground-2 px-4 py-3">
              <span className="text-sm font-semibold text-ink">{s.name}</span>
              <span className="truncate font-mono text-[12px] text-ink-2">{v ? (s.show ? s.show(v) : v) : '…'}</span>
            </li>
          ); })}
          <li className="bg-ground-2 px-4 py-3">
            <span className="block text-sm font-semibold text-ink">Stripe</span>
            <span aria-hidden="true" className="hazard mt-2 block h-3 w-full" />
          </li>
        </ul>
      </div>
    </div></div>
  );
};
