import React from 'react';
import { ExternalLink, MonitorPlay } from 'lucide-react';
import { tellDemo, useTheme } from '../theme/ThemeProvider';
import { STILLS } from '../content/media';

// The real Command Center, running in demo mode on sample data (built separately into /demo/). It wears whatever theme
// the site wears: the iframe starts in it, and ThemeProvider tells it when the visitor picks another.
// The demo is a whole app (about 2 MB on first load), so it never loads on its own where it isn't the point of the page:
// pages show a still of it with a Launch button, and only the Live Demo page (`autoLoad`) starts it right away. Phones
// never get the frame (a whole app in a small box is no way to try it); they get a button that opens it full screen.
const DEMO = '/demo/';

const useWide = () => {
  const q = '(min-width: 768px)';
  const [wide, setWide] = React.useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  React.useEffect(() => {
    const m = window.matchMedia(q), on = () => setWide(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return wide;
};

export const DemoFrame: React.FC<{ className?: string; height?: string; title?: string; autoLoad?: boolean }> = ({
  className = '', height = 'h-[420px] md:h-[min(78vh,760px)]', title = 'Bruce Works Command Center, live demo', autoLoad = false,
}) => {
  const { theme } = useTheme();
  const wide = useWide();
  const frame = React.useRef<HTMLIFrameElement>(null);
  const [launched, setLaunched] = React.useState(autoLoad);
  const [state, setState] = React.useState<'idle' | 'checking' | 'live' | 'missing'>('idle');
  const [loaded, setLoaded] = React.useState(false);
  const src = `${DEMO}?theme=${theme.demo.theme}&mode=${theme.demo.mode}&embed=1`;
  const full = src.replace('&embed=1', '');
  const [first, setFirst] = React.useState(src); // later theme changes go by message, not by reloading the frame

  // only once launched on a wide screen, and only if the demo build is there: its shell carries the OS's instance
  // payload; anything else (a 404 page, the site itself) means no demo
  React.useEffect(() => {
    if (!launched || !wide || state !== 'idle') return;
    setFirst(src); setState('checking');
    fetch(DEMO).then((r) => (r.ok ? r.text() : '')).then((t) => setState(t.includes('__BWOS_INSTANCE__') ? 'live' : 'missing')).catch(() => setState('missing'));
  }, [launched, wide, state, src]);

  React.useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === 'bw-demo:ready') { setLoaded(true); tellDemo(theme, frame.current); }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [theme]);

  const poster = STILLS.demoPoster;
  const showFrame = wide && state === 'live';
  return (
    <div className={`chamfer ${className}`}>
      <div className="chamfer-in flex flex-col overflow-hidden">
        <div className="flex h-10 shrink-0 items-center gap-3 border-b border-line bg-ground-3 px-3">
          <span className="flex gap-1.5" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 border border-line bg-ground" style={{ borderRadius: 'var(--radius)' }} />)}</span>
          <span className="label truncate">[ Live demo // sample data // {theme.name} ]</span>
          <a href={full} target="_blank" rel="noopener" className="ml-auto hidden items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3 hover:text-ink sm:flex">
            Full screen <ExternalLink size={12} />
          </a>
        </div>
        <div className={`relative bg-ground ${height}`}>
          {showFrame && (
            <iframe ref={frame} data-bw-demo title={title} src={first} onLoad={() => setLoaded(true)}
              className={`absolute inset-0 h-full w-full border-0 ${loaded ? 'opacity-100' : 'opacity-0'}`} allow="clipboard-write" />
          )}
          {!(showFrame && loaded) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
              {poster && (
                <picture>
                  <source media="(max-width: 767px)" srcSet="/media/art/demo-command-390.webp" />
                  <img src={poster.src} alt="" width={poster.w} height={poster.h} loading={autoLoad ? 'eager' : 'lazy'} decoding="async"
                    {...({ fetchpriority: autoLoad ? 'high' : 'auto' } as Record<string, string>)} className="absolute inset-0 h-full w-full object-cover object-left-top" />
                </picture>
              )}
              <div aria-hidden="true" className="absolute inset-0 bg-ground/75" />
              <div className="relative space-y-4">
                <MonitorPlay size={40} className="mx-auto text-signal-text" />
                <p className="display text-3xl md:text-4xl">The real thing, on sample data</p>
                <p className="mx-auto max-w-md text-ink-2">{state === 'missing' ? 'The live demo is being set up. Book a walkthrough and Bruce will show you his own.' : 'Click around the same Command Center Bruce runs his company on. Nothing you do here touches real data.'}</p>
                {state !== 'missing' && (wide
                  ? (!launched && <button type="button" onClick={() => setLaunched(true)} className="btn btn-primary">Launch the live demo</button>)
                  : <a href={full} className="btn btn-primary">Open the live demo</a>)}
                {launched && wide && state !== 'missing' && <p className="label">Loading the demo…</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
