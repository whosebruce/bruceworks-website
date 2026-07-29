import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FolderLock, MessageSquare, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Button } from './Button';

const trustChips = [
  { icon: ShieldCheck, label: 'Client-owned tools' },
  { icon: Workflow, label: 'One useful workflow at a time' },
  { icon: FolderLock, label: 'Clear data boundaries' },
];

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-secondary to-indigo-950" aria-hidden="true"></div>
      <div className="absolute -top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" aria-hidden="true"></div>
      <div className="absolute top-1/3 -left-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true"></div>
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
        }}
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-in-up">
            <p className="mb-4 font-condensed text-base font-semibold uppercase tracking-[0.14em] text-cyan-200">
              San Diego-based · Serving clients across California and remotely nationwide
            </p>
            <Link
              to="/ai-leverage-audit/"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-primary backdrop-blur transition-colors hover:bg-white/15"
            >
              <Sparkles className="h-4 w-4" />
              Start with the AI Leverage Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <h1 className="font-display text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.02]">
              Get the business out of your head and into a <span className="bg-gradient-to-r from-primary via-yellow-300 to-cyan-300 bg-clip-text text-transparent">system you own.</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-100 mb-8 font-light leading-relaxed max-w-2xl">
              Bruce Works helps owner-led service businesses organize scattered knowledge, document how work gets done, and build practical AI-assisted workflows inside tools they control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" className="text-lg shadow-lg shadow-primary/20" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Request an AI Leverage Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link
                to="/our-work/"
                className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-6 py-3 text-base font-bold text-white transition-colors duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                See Systems in Use
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustChips.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-sm text-gray-200">
                  <Icon className="h-4 w-4 text-primary" /> {label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative hidden md:block animate-fade-in-up" aria-label="Illustrative client-owned operations system">
            <div className="absolute -inset-6 rounded-xl bg-gradient-to-br from-cyan-400/20 via-transparent to-primary/20 blur-2xl"></div>
            <div className="relative rounded-xl border border-white/15 bg-white/[0.06] shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
                <span className="h-3 w-3 rounded-full bg-red-400/70"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-400/70"></span>
                <span className="h-3 w-3 rounded-full bg-green-400/70"></span>
                <span className="ml-3 text-sm font-semibold text-gray-300">Your Business Operating System</span>
              </div>
              <div className="space-y-4 p-5">
                <div className="rounded-md bg-white/[0.06] p-4">
                  <p className="mb-3 font-condensed text-sm font-semibold uppercase tracking-[0.12em] text-primary">Today's operations brief</p>
                  <div className="space-y-2.5 text-sm text-gray-200">
                    <p className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 flex-shrink-0 text-cyan-300" /> New inquiries captured in one place</p>
                    <p className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 flex-shrink-0 text-cyan-300" /> Follow-ups prepared from approved templates</p>
                    <p className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 flex-shrink-0 text-cyan-300" /> SOPs and project files organized</p>
                  </div>
                </div>
                <div className="rounded-md bg-white/[0.06] p-4">
                  <p className="mb-2 flex items-center gap-2 font-condensed text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                    <MessageSquare className="h-4 w-4" /> Assistant
                  </p>
                  <p className="rounded-md rounded-tl-none bg-secondary/70 border border-white/10 px-3.5 py-2.5 text-sm leading-relaxed text-gray-100">
                    "The estimate is ready for review, the customer follow-up is drafted, and the project handoff checklist is attached."
                  </p>
                </div>
                <div className="flex flex-nowrap items-center gap-1.5 overflow-hidden">
                  <span className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2 text-[10px] font-semibold leading-none text-white lg:text-[11px]">
                    <ShieldCheck className="h-3 w-3 shrink-0 text-primary" /> Client-owned
                  </span>
                  {['Knowledge', 'Workflows', 'Templates', 'Handoff'].map((chip) => (
                    <span key={chip} className="inline-flex h-7 shrink-0 items-center rounded-md border border-white/15 bg-white/10 px-2 text-[10px] font-semibold leading-none text-gray-200 lg:text-[11px]">{chip}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-300 mt-12 max-w-3xl">
          We do not sell autonomous digital employees or host client data by default. Systems are designed around client-owned accounts, storage, subscriptions, and hardware wherever practical.
        </p>
      </div>
    </section>
  );
};
