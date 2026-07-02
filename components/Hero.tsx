import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FolderLock, MessageSquare, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Button } from './Button';

const trustChips = [
  { icon: ShieldCheck, label: 'Private-first setup' },
  { icon: Workflow, label: 'Practical workflows' },
  { icon: FolderLock, label: 'Your data stays yours' },
];

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-secondary">
      {/* Layered gradient mesh background */}
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
            <Link
              to="/ai-leverage-audit"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-primary backdrop-blur transition-colors hover:bg-white/15"
            >
              <Sparkles className="h-4 w-4" />
              New: The AI Leverage Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Build Your Private <span className="bg-gradient-to-r from-primary via-yellow-300 to-cyan-300 bg-clip-text text-transparent">AI Command Center</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-100 mb-8 font-light leading-relaxed max-w-2xl">
              Bruce Works helps individuals, creators, and small businesses turn scattered notes, files, ideas, and
              workflows into a private AI assistant system — so you stay organized, move faster, and get more done.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" className="text-lg shadow-lg shadow-primary/20" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Book an AI Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('what-is-command-center')?.scrollIntoView({ behavior: 'smooth' })}>
                What Is a Command Center?
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustChips.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-sm text-gray-200">
                  <Icon className="h-4 w-4 text-primary" /> {label}
                </span>
              ))}
            </div>
          </div>

          {/* Mock Command Center panel */}
          <div className="relative hidden md:block animate-fade-in-up" aria-hidden="true">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-transparent to-primary/20 blur-2xl"></div>
            <div className="relative rounded-2xl border border-white/15 bg-white/[0.06] shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
                <span className="h-3 w-3 rounded-full bg-red-400/70"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-400/70"></span>
                <span className="h-3 w-3 rounded-full bg-green-400/70"></span>
                <span className="ml-3 text-sm font-semibold text-gray-300">Your AI Command Center</span>
              </div>
              <div className="space-y-4 p-5">
                <div className="rounded-lg bg-white/[0.06] p-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Today's brief</p>
                  <div className="space-y-2.5 text-sm text-gray-200">
                    <p className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 flex-shrink-0 text-cyan-300" /> Weekly review drafted from your notes</p>
                    <p className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 flex-shrink-0 text-cyan-300" /> 3 client follow-ups queued</p>
                    <p className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 flex-shrink-0 text-cyan-300" /> Project files organized &amp; searchable</p>
                  </div>
                </div>
                <div className="rounded-lg bg-white/[0.06] p-4">
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                    <MessageSquare className="h-4 w-4" /> Assistant
                  </p>
                  <p className="rounded-lg rounded-tl-none bg-secondary/70 border border-white/10 px-3.5 py-2.5 text-sm leading-relaxed text-gray-100">
                    "Based on your project vault, here's a plan for the week — want me to draft the proposal first?"
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Knowledge vault', 'Workflows', 'Templates', 'Local option'].map((chip) => (
                    <span key={chip} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-200">{chip}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-white/15 bg-secondary/90 px-4 py-3 shadow-xl backdrop-blur">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold text-white">Private by design</span>
            </div>
          </div>
        </div>

        <p className="text-gray-300 mt-12 max-w-2xl">
          Private knowledge vaults. Custom AI assistants. Practical workflows. Optional local hardware and monthly support.
        </p>
      </div>
    </section>
  );
};
