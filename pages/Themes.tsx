import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check as CheckIcon, MonitorPlay } from 'lucide-react';
import { Check, Display, GridBand, HazardStrip, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { ThemeRow } from '../components/ThemePicker';
import { Swipe } from '../components/Swipe';
import { AuditBand } from '../components/AuditBand';
import { ThemeFrame, ThemeSample } from '../components/product/ThemeFrame';
import { ThemeMorph, ThemePickList } from '../components/product/ThemePicks';
import { TokenSheet } from '../components/product/TokenSheet';
import { useHashScroll } from '../components/product/useHashScroll';
import { CLIENT_THEMES, HOUSE_THEMES, type Theme } from '../theme/themes';
import { useTheme } from '../theme/ThemeProvider';
import { ADD_ONS, TIERS } from '../content/pricing';

// /themes/: every theme as a large card with a live preview that wears its own theme (components/product/ThemeFrame.tsx
// explains how), "Wear it" to put the whole site in it, what a theme decides, and how a client's own gets made.
// The house themes and the client themes are both read from theme/themes.ts, so a new theme there shows up here.

// prices come from content/pricing.ts (approved)
const OPERATOR = TIERS.find((t) => t.id === 'operator')?.name ?? 'full';
const THEME_PRICE = ADD_ONS.find((a) => a.name === 'Custom theme')?.price ?? '';

const MAKE = [
  ['01', 'Brand pull', 'Send me your logo and your colors, or a site or a flyer you like. I pull the palette, the type and the corners from it.'],
  ['02', 'Tokens, not code', 'Your theme is a short sheet of decisions: grounds, ink, one signal color, fonts, corners, line weight. It lives in its own folder, outside the code.'],
  ['03', 'The details', 'Your logo in the title bar and on the login page, your icon on the phone’s home screen, your browser-bar color, dark and light versions, and portraits for your agents if you want them.'],
  ['04', 'Updates keep it', 'When the Command Center updates, your theme folder isn’t touched. New features show up already wearing your look.'],
];

export const Themes: React.FC = () => {
  useReveal();
  useHashScroll();
  return (
    <main>
      {/* "It wears your brand" (moved here from Home) */}
      <PageIntro op="OP-03" tag="Themes"
        title={<>It wears <span className="sig">your brand.</span></>}
        sub={<>
          <p>Colors, type, corners, your logo. A law office gets calm navy, a bakery gets warm and round, a garage gets Field Manual. Same engine underneath, and new features roll in without touching your look.</p>
          <p className="mt-4 text-lg">This whole site runs on the same idea. Pick one:</p>
          <ThemePickList themes={HOUSE_THEMES} className="mt-5 max-w-xl" />
          <a href="#clients" className="label mt-4 inline-flex min-h-[44px] items-center hover:!text-ink">+ {CLIENT_THEMES.length} built for clients ↓</a>
        </>}
        aside={<ThemeMorph />}
      />

      {/* ── 01 the gallery ── */}
      <GridBand id="gallery" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="01" label="The gallery" right={<span className="label hidden sm:inline">{HOUSE_THEMES.length} house · {CLIENT_THEMES.length} client</span>} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Every theme, <span className="sig">side by side.</span></Display>
            <p className="reveal text-lg text-ink-2">Each preview wears its own theme, whatever this page is wearing. Hit “Wear it” and the whole site follows, and so does the live demo.</p>
          </div>
          <p className="label reveal mt-12">House themes</p>
          <Swipe label="House themes" desktop="md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-3" item="basis-[86%] sm:basis-[62%]" className="reveal mt-4">
            {HOUSE_THEMES.map((t) => <ThemeCard key={t.id} t={t} />)}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 02 built for clients ── */}
      <GridBand id="clients" tone="raised" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="02" label="Built for clients" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Made from <span className="sig">real brands.</span></Display>
            <p className="reveal text-lg text-ink-2">Themes built from brand kits I made for clients: their colors, their type, their corners. Tokens only. Their logos and artwork stay theirs.</p>
          </div>
          {CLIENT_THEMES.length ? (
            <Swipe label="Client themes" desktop="md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-3" item="basis-[86%] sm:basis-[62%]" className="reveal mt-10">
              {CLIENT_THEMES.map((t) => <ThemeCard key={t.id} t={t} />)}
            </Swipe>
          ) : (
            <div className="reveal panel mt-10 p-8 text-center"><p className="label">Client themes // coming</p><p className="mt-3 text-ink-2">Themes from brands I’ve built, shown with each client’s OK.</p></div>
          )}
        </div>
      </GridBand>

      {/* ── 03 what a theme decides ── */}
      <GridBand id="tokens" className="scroll-mt-28">
        <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <SectionHeader num="03" label="What a theme decides" />
            <Display className="reveal mt-8 text-5xl md:text-6xl">A sheet of decisions. <span className="sig">Not a rebuild.</span></Display>
            <p className="reveal mt-6 text-lg text-ink-2">Every color, corner and typeface on this site comes from a short list of tokens, and so does every screen in the Command Center. Here’s the sheet this page is wearing right now. Pick another theme and watch it rewrite.</p>
            <div className="reveal mt-6"><ThemeRow compact /></div>
          </div>
          <div className="reveal"><TokenSheet /></div>
        </div>
      </GridBand>

      {/* ── 04 how yours gets made ── */}
      <GridBand id="custom" tone="raised" className="scroll-mt-28">
        <div className="py-16 md:py-24">
          <SectionHeader num="04" label="Your own theme" right={<Link to="/pricing/" className="label hover:!text-ink">Pricing →</Link>} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <Display className="reveal text-5xl md:text-6xl">Your colors. Your type. <span className="sig">No code changes.</span></Display>
            <p className="reveal text-lg text-ink-2">A custom theme is how your Command Center stops looking like mine and starts looking like your company. It’s built once, it lives outside the code, and every update keeps it.</p>
          </div>
          <Swipe label="How a custom theme gets made" desktop="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4" item="basis-[80%] sm:basis-[48%]" className="reveal mt-10">
            {MAKE.map(([n, t, d]) => (
              <div key={n} className="panel h-full p-6">
                <p className="font-mono text-sm font-semibold text-alert">{n}</p>
                <p className="display mt-4 text-3xl">{t}</p>
                <p className="mt-3 text-ink-2">{d}</p>
              </div>
            ))}
          </Swipe>
          <div className="reveal mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="panel p-6">
              <p className="label">What to send me</p>
              <ul className="mt-4 grid gap-3 text-ink sm:grid-cols-2">
                <Check>Your logo, SVG or PNG</Check>
                <Check>Your colors, or something you like the look of</Check>
                <Check>Your fonts, if you have them</Check>
                <Check>Three words for how it should feel</Check>
              </ul>
            </div>
            <div className="panel p-6">
              <p className="label">Straight talk</p>
              <p className="mt-4 text-ink-2">A few small things stay fixed, like the yellow DEMO band and the scrollbars. I’ll tell you which before we start. A custom theme comes with the {OPERATOR} build, or as a {THEME_PRICE} add-on: <Link to="/pricing/" className="font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4">see the tiers</Link>.</p>
            </div>
          </div>
        </div>
      </GridBand>

      <section className="border-t border-line">
        <div className="container-x flex flex-col gap-6 py-12 md:py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-2xl gap-5">
            <MonitorPlay size={36} className="mt-1 hidden shrink-0 text-signal-text sm:block" />
            <div>
              <Display className="text-4xl md:text-5xl">See it on the real thing.</Display>
              <p className="mt-3 text-lg text-ink-2">The live demo wears whatever theme you pick here. Open it and click around.</p>
            </div>
          </div>
          <Link to="/live-demo/" className="btn btn-primary">Open the live demo <ArrowRight size={18} /></Link>
        </div>
      </section>

      <HazardStrip />
      <AuditBand />
    </main>
  );
};

/** One theme: its name, a live preview wearing it, its swatches, Wear it and Try it in the demo. */
const ThemeCard: React.FC<{ t: Theme }> = ({ t }) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const on = theme.id === t.id;
  return (
    <article className={`relative flex h-full flex-col overflow-hidden ${on ? 'border-theme border-signal bg-ground-2' : 'panel'}`} style={on ? { borderRadius: 'var(--radius-lg)' } : undefined} aria-label={`${t.name} theme`}>
      <div className="flex min-h-[5.75rem] items-start gap-3 px-4 pb-3 pt-4">
        <div className="min-w-0 flex-1">
          <h3 className="chip text-xl text-ink">{t.name}</h3>
          <p className="mt-0.5 text-sm text-ink-3">{t.tagline}</p>
        </div>
        {t.brand && <span className="chip shrink-0 border-theme border-line px-2 py-0.5 text-xs text-ink-2" style={{ borderRadius: 'var(--radius)' }}>Bruce Works</span>}
        {t.client && <span className="chip shrink-0 border-theme border-line px-2 py-0.5 text-xs text-ink-2" style={{ borderRadius: 'var(--radius)' }}>Client</span>}
      </div>
      <div className="border-y border-line">
        <ThemeFrame theme={t.id} height={380} title={`${t.name} preview`}><ThemeSample name={t.name} /></ThemeFrame>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-2 p-4">
        <span aria-hidden="true" className="mr-auto flex overflow-hidden border border-line" style={{ borderRadius: 'var(--radius)' }}>
          {t.swatch.map((c, i) => <span key={i} className="h-6 w-5" style={{ background: c }} />)}
        </span>
        {on ? (
          <span className="chip flex min-h-[44px] items-center gap-1.5 px-2 text-[15px] text-ink"><CheckIcon size={16} className="text-signal-text" /> Wearing</span>
        ) : (
          <button type="button" onClick={() => setTheme(t.id)} className="btn btn-outline !min-h-[44px] !px-4">Wear it</button>
        )}
        <button type="button" onClick={() => { if (!on) setTheme(t.id); navigate('/live-demo/'); }} className="btn btn-outline !min-h-[44px] !px-3" aria-label={`Open the live demo in ${t.name}`}>
          <MonitorPlay size={16} /><span className="hidden sm:inline">Demo</span>
        </button>
      </div>
    </article>
  );
};
