import React from 'react';
import { RotateCcw, ShieldAlert } from 'lucide-react';

// A sample approval, to show the rule instead of describing it: the agent asks, you answer, and the agent can't answer
// for you. It mirrors the real Approvals page (sample names, nothing is sent anywhere).
type Line = { t: string; who: string; what: string; tone?: 'ok' | 'no' | 'refused' };
const START: Line[] = [
  { t: '0900:04', who: 'Apollo', what: 'Drafted the Hernandez estimate (2 pages) from the job notes.' },
  { t: '0900:05', who: 'Apollo', what: 'Asks to email it to the client. Waiting on you.' },
];

export const ApprovalDrill: React.FC = () => {
  const [state, setState] = React.useState<'waiting' | 'approved' | 'denied'>('waiting');
  const [log, setLog] = React.useState<Line[]>(START);
  const [tries, setTries] = React.useState(0);
  const add = (l: Line) => setLog((p) => [...p, l].slice(-9));
  const [clock, setClock] = React.useState(12); // seconds after 0900, for the sample log
  const stamp = () => { const s = clock + 9; setClock(s); return `09${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

  const answer = (ok: boolean) => {
    if (state !== 'waiting') return;
    setState(ok ? 'approved' : 'denied');
    add({ t: stamp(), who: 'You', what: ok ? 'Approved once, from the dashboard. Apollo sends it.' : 'Denied. Nothing was sent.', tone: ok ? 'ok' : 'no' });
  };
  const selfApprove = () => {
    setTries((n) => n + 1);
    add({ t: stamp(), who: 'Apollo', what: state === 'waiting' ? 'Tries to approve its own request. Refused (403): agents can’t answer approvals.' : 'Tries to answer again. Refused (403), and the first answer stands.', tone: 'refused' });
  };
  const reset = () => { setState('waiting'); setLog(START); setTries(0); setClock(12); };

  return (
    <div className="chamfer"><div className="chamfer-in flex flex-col">
      <div className="hazard h-2" aria-hidden="true" />
      <div className="flex items-center gap-2 border-b border-line bg-ground-3 px-4 py-2.5">
        <ShieldAlert size={16} className="text-signal-text" />
        <span className="label">Needs you // approval</span>
        <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Sample</span>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="label">Apollo wants to</p>
          <p className="display mt-1 text-3xl">Send the estimate</p>
          <p className="mt-2 text-ink-2">To the client’s email, with the 2-page PDF attached.</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">No answer in 10:00 = denied</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row" aria-live="polite">
          {state === 'waiting' ? (<>
            <button type="button" className="btn btn-primary" onClick={() => answer(true)}>Approve once</button>
            <button type="button" className="btn btn-outline" onClick={() => answer(false)}>Deny</button>
          </>) : (
            <p className={`chip flex min-h-[48px] items-center border-theme px-4 text-base ${state === 'approved' ? 'border-signal text-ink' : 'border-line text-ink-2'}`} style={{ borderRadius: 'var(--radius)' }}>
              {state === 'approved' ? '☑ Approved by you' : '☒ Denied by you'}
            </p>
          )}
        </div>
        <div className="border-t border-line-2 pt-4">
          <p className="mb-2 text-sm text-ink-2">Now try what an agent can’t do:</p>
          <button type="button" className="btn btn-outline w-full !border-dashed sm:w-auto" onClick={selfApprove}>Let Apollo approve its own request</button>
        </div>
      </div>
      <ol className="border-t border-line bg-ground px-4 py-3 font-mono text-[12px] leading-relaxed" aria-label="What happened">
        {log.map((l, i) => (
          <li key={i} className="grid grid-cols-[62px_64px_1fr] gap-2">
            <span className="text-ink-3">{l.t}</span>
            <span className={l.who === 'You' ? 'text-signal-text' : 'text-ink-2'}>{l.who.toUpperCase()}</span>
            <span className={l.tone === 'refused' ? 'text-alert' : l.tone ? 'text-ink' : 'text-ink-2'}>{l.what}</span>
          </li>
        ))}
      </ol>
      {(state !== 'waiting' || tries > 0) && (
        <button type="button" onClick={reset} className="flex min-h-[44px] items-center justify-center gap-2 border-t border-line font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 hover:text-ink">
          <RotateCcw size={13} /> Run it again
        </button>
      )}
    </div></div>
  );
};
