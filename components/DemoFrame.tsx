import React from 'react';
import { ExternalLink, MonitorPlay } from 'lucide-react';
import { tellDemo, useTheme } from '../theme/ThemeProvider';
import { STILLS } from '../content/media';

// The real Command Center, running in demo mode on sample data (built separately into /demo/). It wears whatever theme
// the site wears: the iframe starts in it, and ThemeProvider tells it when the visitor picks another. Phones get a
// still and a button that opens the demo full screen (a whole app in a small frame is no way to try it).
const DEMO = '/demo/';

export const DemoFrame: React.FC<{ className?: string; height?: string; title?: string }> = ({ className = '', height = 'h-[420px] md:h-[min(78vh,760px)]', title = 'Bruce Works Command Center, live demo' }) => {
  const { theme } = useTheme();
  const box = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef<HTMLIFrameElement>(null);
  const [state, setState] = React.useState<'idle' | 'checking' | 'live' | 'missing'>('idle');
  const [loaded, setLoaded] = React.useState(false);
  const src = `${DEMO}?theme=${theme.demo.theme}&mode=${theme.demo.mode}&embed=1`;
  const [first] = React.useState(src); // later theme changes go by message, not by reloading the frame

  // load only once it's near the screen, and only if the demo build is there
  React.useEffect(() => {
    const el = box.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect(); setState('checking');
      // the demo's own shell carries the OS's instance payload; anything else (a 404 page, the site itself) means no demo
      fetch(DEMO).then((r) => (r.ok ? r.text() : '')).then((t) => setState(t.includes('__BWOS_INSTANCE__') ? 'live' : 'missing')).catch(() => setState('missing'));
    }, { rootMargin: '300px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === 'bw-demo:ready') { setLoaded(true); tellDemo(theme, frame.current); }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [theme]);

  const poster = STILLS.demoPoster;
  return (
    <div ref={box} className={`chamfer ${className}`}>
      <div className="chamfer-in flex flex-col overflow-hidden">
        <div className="flex h-10 shrink-0 items-center gap-3 border-b border-line bg-ground-3 px-3">
          <span className="flex gap-1.5" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 border border-line bg-ground" style={{ borderRadius: 'var(--radius)' }} />)}</span>
          <span className="label truncate">[ Live demo // sample data // {theme.name} ]</span>
          <a href={src.replace('&embed=1', '')} target="_blank" rel="noopener" className="ml-auto hidden items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3 hover:text-ink sm:flex">
            Full screen <ExternalLink size={12} />
          </a>
        </div>
        <div className={`relative bg-ground ${height}`}>
          {state === 'live' && (
            <iframe ref={frame} data-bw-demo title={title} src={first} loading="lazy" onLoad={() => setLoaded(true)}
              className={`absolute inset-0 hidden h-full w-full border-0 md:block ${loaded ? 'opacity-100' : 'opacity-0'}`} allow="clipboard-write" />
          )}
          <div className={`absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center texture ${state === 'live' && loaded ? 'md:hidden' : ''}`}>
            {poster ? <img src={poster.src} alt={poster.alt} width={poster.w} height={poster.h} className="absolute inset-0 h-full w-full object-cover object-left-top opacity-90" /> : null}
            <div className="relative space-y-4">
              <MonitorPlay size={40} className="mx-auto text-signal-text" />
              <p className="display text-3xl md:text-4xl">The real thing, on sample data</p>
              <p className="mx-auto max-w-md text-ink-2">{state === 'missing' ? 'The live demo is being set up. Book a walkthrough and Bruce will show you his own.' : 'Click around the same Command Center Bruce runs his company on. Nothing you do here touches real data.'}</p>
              {state !== 'missing' && <a href={src.replace('&embed=1', '')} className="btn btn-primary md:hidden">Open the live demo</a>}
              {state === 'checking' && <p className="label hidden md:block">Loading the demo…</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
