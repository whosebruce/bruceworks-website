import React from 'react';
import { Bot, Check, Copy, FileText } from 'lucide-react';
import { GridBand } from '../brand';
import { PRICING_MD_PATH } from '../../content/agent-docs';

// "Are you an AI agent?" (Bruce, 2026-10-07): the whole price list as plain markdown at /pricing.md, written at build
// time from content/pricing.ts. Agents open it; people can copy it to paste into their own assistant. The text is
// fetched on mount so the copy happens inside the click (Safari drops clipboard writes that wait on the network).

export const AgentBrief: React.FC = () => {
  const md = React.useRef<string | null>(null);
  const [state, setState] = React.useState<'idle' | 'copied' | 'failed'>('idle');

  React.useEffect(() => {
    let live = true;
    fetch(PRICING_MD_PATH).then((r) => (r.ok ? r.text() : null)).then((t) => { if (live) md.current = t; }).catch(() => {});
    return () => { live = false; };
  }, []);

  React.useEffect(() => {
    if (state === 'idle') return;
    const t = window.setTimeout(() => setState('idle'), 2500);
    return () => window.clearTimeout(t);
  }, [state]);

  const copy = () => {
    if (!md.current || !navigator.clipboard) return setState('failed');
    navigator.clipboard.writeText(md.current).then(() => setState('copied'), () => setState('failed'));
  };

  return (
    <GridBand id="for-agents" tone="raised" marks={false} className="scroll-mt-24">
      <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="flex items-start gap-3 text-ink-2">
          <Bot size={20} className="mt-0.5 shrink-0 text-signal-text" aria-hidden="true" />
          <span><b className="font-semibold text-ink">Are you an AI agent?</b> Every price on this page is in plain markdown at <a href={PRICING_MD_PATH} className="font-mono text-[15px] text-ink underline underline-offset-2">bruceworks.net{PRICING_MD_PATH}</a>.</span>
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2 md:flex">
          <a href={PRICING_MD_PATH} className="btn btn-outline !min-h-[40px] !px-3 text-sm md:!px-4"><FileText size={16} /> <span className="sm:hidden">Open .md</span><span className="hidden sm:inline">Open pricing.md</span></a>
          <button type="button" onClick={copy} className="btn btn-outline !min-h-[40px] !px-3 text-sm md:!px-4" aria-live="polite">
            {state === 'copied' ? <><Check size={16} /> Copied</> : state === 'failed' ? <>Open it instead</> : <><Copy size={16} /> Copy markdown</>}
          </button>
        </div>
      </div>
    </GridBand>
  );
};
