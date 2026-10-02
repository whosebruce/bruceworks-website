import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

// Bruce's own Cal.com (self-hosted at schedule.bruceworks.net), embedded inline. Only the booking page loads it. The
// calendar wears the visitor's theme: light or dark from the theme, and its brand, background, text and border
// colors from the site's tokens, re-sent whenever the theme changes.
export const CAL_ORIGIN = 'https://schedule.bruceworks.net';
export type CalState = 'loading' | 'ready' | 'failed';

type CalApi = ((...args: unknown[]) => void) & { ns: Record<string, (...args: unknown[]) => void>; loaded?: boolean; q?: unknown[] };
declare global { interface Window { Cal?: CalApi } }

/** Cal.com's loader, as its embed snippet sets it up: calls queue until embed.js arrives. */
function cal(): CalApi {
  const w = window as Window;
  if (!w.Cal) {
    const push = (api: { q: unknown[] }, args: unknown) => api.q.push(args);
    const C = function (this: unknown, ...args: unknown[]) {
      const c = w.Cal as CalApi & { q: unknown[] };
      if (!c.loaded) {
        c.ns = {}; c.q = c.q || [];
        const s = document.createElement('script'); s.src = `${CAL_ORIGIN}/embed/embed.js`; s.async = true;
        document.head.appendChild(s); c.loaded = true;
      }
      if (args[0] === 'init') {
        const api = Object.assign((...a: unknown[]) => push(api, a), { q: [] as unknown[] });
        const ns = args[1];
        if (typeof ns === 'string') { c.ns[ns] = c.ns[ns] || api; push(c.ns[ns] as unknown as { q: unknown[] }, args); push(c, ['initNamespace', ns]); }
        else push(c, args);
        return;
      }
      push(c, args);
    } as unknown as CalApi;
    w.Cal = C;
  }
  return w.Cal;
}

const rgb = (name: string) => `rgb(${getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).join(' ')})`;
const themeVars = () => ({
  'cal-brand': rgb('--c-signal'), 'cal-brand-emphasis': rgb('--c-signal-text'), 'cal-brand-text': rgb('--c-signal-ink'),
  'cal-bg': rgb('--c-ground-2'), 'cal-bg-muted': rgb('--c-ground-3'), 'cal-bg-subtle': rgb('--c-ground-3'), 'cal-bg-emphasis': rgb('--c-line'),
  'cal-text': rgb('--c-ink-2'), 'cal-text-emphasis': rgb('--c-ink'), 'cal-text-subtle': rgb('--c-ink-3'), 'cal-text-muted': rgb('--c-ink-3'),
  'cal-border': rgb('--c-line'), 'cal-border-subtle': rgb('--c-line-2'), 'cal-border-emphasis': rgb('--c-ink-3'),
});

/** One inline calendar for one event link (`whosebruce/ai-audit`). Mount it once per link and hide the inactive one. */
export const CalInline: React.FC<{ link: string; onState?: (s: CalState) => void; onBooked?: () => void; className?: string }> = ({ link, onState, onBooked, className = '' }) => {
  const { theme } = useTheme();
  const ns = React.useMemo(() => link.replace(/[^a-z0-9]/gi, '-'), [link]);
  const el = React.useRef<HTMLDivElement>(null);
  const cb = React.useRef({ onState, onBooked }); cb.current = { onState, onBooked };
  const started = React.useRef(false);
  const mode = React.useRef(theme.demo.mode); mode.current = theme.demo.mode;

  React.useEffect(() => {
    if (started.current || !el.current) return;
    started.current = true;
    const C = cal();
    C('init', ns, { origin: CAL_ORIGIN });
    const api = (...a: unknown[]) => C.ns[ns](...a);
    api('inline', { elementOrSelector: `#cal-${ns}`, calLink: link, config: { layout: 'month_view', theme: mode.current } });
    api('ui', { theme: mode.current, cssVarsPerTheme: { light: themeVars(), dark: themeVars() }, hideEventTypeDetails: false, layout: 'month_view' });
    let settled = false;
    const set = (s: CalState) => { if (s !== 'loading') settled = true; cb.current.onState?.(s); };
    api('on', { action: 'linkReady', callback: () => set('ready') });
    api('on', { action: 'linkFailed', callback: () => set('failed') });
    api('on', { action: 'bookingSuccessful', callback: () => cb.current.onBooked?.() });
    api('on', { action: 'bookingSuccessfulV2', callback: () => cb.current.onBooked?.() });
    // Bruce's server is a home lab: if the calendar hasn't answered in 15 s, say so (it can still arrive later)
    const t = window.setTimeout(() => { if (!settled) cb.current.onState?.('failed'); }, 15000);
    return () => window.clearTimeout(t);
  }, [link, ns]);

  // a theme change re-skins the calendar without reloading it
  React.useEffect(() => {
    const C = window.Cal; if (!C?.ns?.[ns]) return;
    const id = window.setTimeout(() => C.ns[ns]('ui', { theme: theme.demo.mode, cssVarsPerTheme: { light: themeVars(), dark: themeVars() } }), 60);
    return () => window.clearTimeout(id);
  }, [theme.id, theme.demo.mode, ns]);

  return <div id={`cal-${ns}`} ref={el} className={`w-full ${className}`} />;
};
