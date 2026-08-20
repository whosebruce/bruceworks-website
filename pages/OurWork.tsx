import React from 'react';
import { ArrowDown, ArrowRight, BookOpenCheck, CheckCircle2, FileSearch, LayoutDashboard, ShieldCheck, Workflow } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ContactCTA } from '../components/ContactCTA';

const systems = [
  {
    title: 'Mission Control',
    category: 'Owner / Operator Command Center',
    Icon: LayoutDashboard,
    description: 'A real Bruce Works operating surface for task queues, finance visibility, agent work, and business operations. The public view is deliberately sanitized.',
    proof: ['Priority queue', 'Owner approvals', 'Evidence-linked work', 'Operations visibility'],
    panel: (
      <div className="grid gap-2 text-xs sm:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg bg-blue-950 p-3 text-white"><span className="text-cyan-200">Today</span><b className="mt-2 block text-2xl">07</b><span>active items</span></div>
        <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-3">{['Client follow-up', 'Proposal review', 'Document QA'].map((item, i) => <div key={item} className="flex items-center justify-between"><span>{item}</span><span className={i === 0 ? 'text-amber-600' : 'text-emerald-700'}>{i === 0 ? 'Review' : 'Ready'}</span></div>)}</div>
      </div>
    ),
  },
  {
    title: 'Content Studio',
    category: 'Idea-to-Production Workflow',
    Icon: BookOpenCheck,
    description: 'A working content pipeline that moves ideas through research, scripting, review, production, and publishing without losing context.',
    proof: ['Idea intake', 'Research notes', 'Script review', 'Production status'],
    panel: (
      <div className="grid grid-cols-3 gap-2 text-[11px]">
        {['Ideas', 'In review', 'Ready'].map((column, index) => <div key={column} className="rounded-lg border border-gray-200 bg-white p-2"><b className="block text-gray-900">{column}</b><div className={`mt-2 h-12 rounded-md ${index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-amber-100' : 'bg-emerald-100'}`}></div><span className="mt-2 block text-gray-500">{index + 2} items</span></div>)}
      </div>
    ),
  },
  {
    title: 'Document & Procurement Operations',
    category: 'Intake · OCR · Indexing · QA',
    Icon: FileSearch,
    description: 'A privacy-scrubbed process view for receiving documents, extracting text, applying naming and metadata rules, tracking exceptions, and producing accepted records.',
    proof: ['Controlled intake', 'OCR and indexing', 'Exception tracking', 'Acceptance evidence'],
    panel: (
      <div className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:gap-1 lg:gap-2">
        {['Intake', 'OCR', 'Index', 'QA', 'Accepted'].map((step, index) => (
          <React.Fragment key={step}>
            <div className="w-full rounded-md border border-gray-200 bg-white px-3 py-3 text-center font-semibold leading-tight text-gray-700 sm:min-w-0 sm:flex-1 sm:px-1">
              {step}
            </div>
            {index < 4 && (
              <span aria-hidden="true" className="self-center text-gray-400">
                <ArrowDown className="h-3.5 w-3.5 sm:hidden" />
                <ArrowRight className="hidden h-3.5 w-3.5 sm:block" />
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    ),
  },
];

export const OurWork: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Systems in Use"
        subtitle="Real Bruce Works operating patterns—shown through privacy-sanitized views, not fake client screenshots."
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-condensed text-base font-semibold uppercase tracking-[0.12em] text-secondary">First-party proof</p>
            <h2 className="font-display mt-3 text-4xl font-bold leading-[1.05] text-gray-900 lg:text-6xl">The same operating logic Bruce Works sells is used inside Bruce Works.</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">These are stylized, privacy-sanitized views of real internal systems and workflows. They explain the structure without exposing personal, military, financial, credential, or client data.</p>
          </div>

          <div className="space-y-8">
            {systems.map(({ title, category, Icon, description, proof, panel }) => (
              <article key={title} className="grid overflow-hidden rounded-3xl border border-gray-200 bg-lightgrey shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 text-secondary"><Icon className="h-7 w-7" /><span className="font-condensed text-base font-semibold uppercase tracking-[0.1em]">{category}</span></div>
                  <h3 className="font-display mt-4 text-4xl font-bold leading-none text-gray-900">{title}</h3>
                  <p className="mt-5 leading-relaxed text-gray-600">{description}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {proof.map((item) => <li key={item} className="flex items-center gap-2 text-sm font-semibold text-gray-700"><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />{item}</li>)}
                  </ul>
                </div>
                <div className="flex min-h-64 items-center bg-gradient-to-br from-blue-950 via-secondary to-indigo-950 p-6 lg:p-10">
                  <div className="w-full rounded-2xl border border-white/15 bg-white/95 p-5 shadow-2xl">
                    <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3"><b className="text-gray-900">Sanitized system view</b><span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary"><ShieldCheck className="h-3.5 w-3.5" /> No private data</span></div>
                    {panel}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-7 text-amber-950">
            <div className="flex items-start gap-3"><Workflow className="mt-1 h-6 w-6 shrink-0" /><p><strong>What comes next:</strong> approved screenshots and case studies can replace or supplement these views after private details are scrubbed. Bruce Works will not use AI-generated dashboards as proof of delivered work.</p></div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};
