import React from 'react';
import { ArrowRight, CheckCircle2, Cpu, FileText, Lightbulb, Search, ShieldCheck, Wrench, Zap } from 'lucide-react';
import { Button } from '../components/Button';

const auditIncludes = [
  'A practical review of your current tools, files, notes, workflows, and bottlenecks',
  'A look at repetitive work where AI could actually save time or reduce mistakes',
  'A review of useful hardware you may already own: spare computers, laptops, workstations, servers, NAS devices, and storage',
  'Recommendations for AI tools worth using — and subscriptions you may not need',
  'A first-pass map for a private AI command center if one makes sense for your life or business',
];

const deliverables = [
  'Top AI opportunities',
  'Quick wins you can start with',
  'Tools to use and tools to avoid',
  'Existing-device and local/private AI possibilities',
  'Recommended next steps',
];

const leverageAreas = [
  {
    icon: FileText,
    title: 'Files, notes, and knowledge',
    body: 'Turn scattered documents, SOPs, customer questions, project notes, and ideas into something AI can help you search, summarize, and act on.',
  },
  {
    icon: Wrench,
    title: 'Workflows and operations',
    body: 'Find the recurring admin, writing, planning, estimating, follow-up, and support tasks where AI can become practical help instead of another distraction.',
  },
  {
    icon: Cpu,
    title: 'Devices you already own',
    body: 'A spare laptop, older workstation, mini PC, server, NAS, or storage setup may have hidden value when used for backups, local tools, private knowledge, or AI-ready workflows.',
  },
];

export const AILeverageAudit: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-secondary pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-secondary to-indigo-950" aria-hidden="true"></div>
        <div className="absolute -top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true"></div>
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true"></div>
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-primary backdrop-blur">
              AI Leverage Audit • Bruce Works
            </div>
            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
              Tired of Trying AI and Not Seeing Real Results?
            </h1>
            <p className="mb-8 max-w-3xl text-xl leading-relaxed text-gray-100 md:text-2xl">
              Most AI tools feel disappointing because they are generic. Bruce Works helps you connect AI to your real files, devices, workflows, notes, business processes, and goals.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button onClick={scrollToContact} className="text-lg">
                Book an AI Leverage Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <button
                onClick={() => document.getElementById('what-we-look-for')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                See What We Look For
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 bg-white lg:py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-bold uppercase tracking-widest text-primary">The problem</span>
            <h2 className="mt-3 text-3xl font-black text-gray-900 lg:text-4xl">Most people are using AI backwards.</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              They open a chatbot, ask a generic question, get a generic answer, and decide AI is overhyped. The real value usually shows up when AI has context: your files, your customers, your tools, your repeated tasks, your decisions, and the way you actually work.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ['Generic prompts', 'Generic AI tools do not know your business, your home setup, your clients, or your goals.'],
              ['Too many subscriptions', 'Buying another app is not the same as building a system that saves time and money.'],
              ['No practical roadmap', 'Without a clear first workflow, AI becomes another thing to manage instead of leverage.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-lightgrey p-8 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
                <p className="leading-relaxed text-gray-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="what-we-look-for" className="bg-lightgrey py-20 scroll-mt-28">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="font-bold uppercase tracking-widest text-primary">Hidden leverage</span>
              <h2 className="mt-3 text-3xl font-black text-gray-900 lg:text-4xl">
                You may already own more AI potential than you think.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Bruce Works is not here to sell you another expensive AI subscription first. The audit starts with what you already have: your documents, devices, existing tools, old computers, workflows, and knowledge. Then we figure out what is actually worth using.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                With AI moving fast, rising software costs, and hardware becoming more strategic, a practical setup can help you save money, keep more control, and move faster without chasing every new tool.
              </p>
            </div>
            <div className="space-y-5">
              {leverageAreas.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-5 rounded-2xl bg-white p-6 shadow-md">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-gray-900">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <p className="mt-2 leading-relaxed text-gray-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl bg-secondary p-8 text-white shadow-xl lg:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-gray-900">
                <Search className="h-7 w-7" />
              </div>
              <h2 className="mb-6 text-3xl font-black">What the AI Leverage Audit includes</h2>
              <div className="space-y-4">
                {auditIncludes.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="leading-relaxed text-gray-100">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-lightgrey p-8 shadow-xl lg:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-gray-900">
                <Lightbulb className="h-7 w-7" />
              </div>
              <h2 className="mb-6 text-3xl font-black text-gray-900">What you leave with</h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                The goal is not hype. It is a clear AI Leverage Map showing where AI can actually help and what the first useful move should be.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {deliverables.map((item) => (
                  <div key={item} className="rounded-lg bg-white px-4 py-3 font-semibold text-gray-800 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lightgrey py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-secondary to-indigo-950 p-8 text-white lg:p-10">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden="true"></div>
                <div className="relative rounded-xl border border-white/15 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">AI Leverage Map</span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-gray-200">Example</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-lg bg-white/[0.06] px-4 py-3">
                      <p className="font-bold text-white">Quick win</p>
                      <p className="text-gray-300">A first workflow you can start using this week</p>
                    </div>
                    <div className="rounded-lg bg-white/[0.06] px-4 py-3">
                      <p className="font-bold text-white">Tools</p>
                      <p className="text-gray-300">What is worth keeping — and what to cancel</p>
                    </div>
                    <div className="rounded-lg bg-white/[0.06] px-4 py-3">
                      <p className="font-bold text-white">Devices</p>
                      <p className="text-gray-300">Hidden value in hardware you already own</p>
                    </div>
                    <div className="rounded-lg bg-primary/15 px-4 py-3">
                      <p className="flex items-center gap-2 font-bold text-primary"><Zap className="h-4 w-4" /> Next step</p>
                      <p className="text-gray-200">The first build that actually makes sense</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-sm font-bold uppercase tracking-widest text-primary">What you get</p>
                <h3 className="mt-3 text-2xl font-black text-gray-900">A written map, not a sales pitch.</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Every audit ends with a personal AI Leverage Map: where AI can actually help you, which tools are worth
                  using, what your existing devices can do, and the first practical move to make.
                </p>
                <p className="mt-4 text-gray-600">
                  The audit is personal and practical — built around your real files, workflows, and goals, not generic AI hype.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <ShieldCheck className="mx-auto mb-5 h-14 w-14 text-primary" />
          <h2 className="mx-auto max-w-3xl text-3xl font-black lg:text-4xl">
            Stop guessing which AI tools matter. Start with a practical audit.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-100">
            If you are tired of hearing about AI but not seeing useful results, Bruce Works can help you find the leverage already hiding in your work, files, tools, and devices.
          </p>
          <Button onClick={scrollToContact} className="mt-8 text-lg">
            Book an AI Leverage Audit <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section id="contact-form" className="bg-lightgrey py-20 scroll-mt-28">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="grid lg:grid-cols-2">
              <div className="bg-white p-8 lg:p-12">
                <p className="font-bold uppercase tracking-widest text-primary">Book the audit</p>
                <h2 className="mt-3 text-3xl font-black text-gray-900 lg:text-4xl">Tell Bruce what you are trying to improve.</h2>
                <p className="mt-5 text-lg leading-relaxed text-gray-600">
                  Share what feels scattered, repetitive, expensive, or underused. Bruce Works will use that to start mapping where AI could help and what you may already have available.
                </p>
                <div className="mt-8 space-y-4 text-gray-700">
                  <div className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" /> Small businesses, creators, solo operators, and practical homeowners/operators are welcome.</div>
                  <div className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" /> No passwords, private client data, or sensitive records are needed in this form.</div>
                  <div className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" /> The first goal is clarity: what is worth doing, what is not, and what to build first.</div>
                </div>
              </div>

              <div className="border-t border-gray-100 bg-gray-50 p-8 lg:border-l lg:border-t-0 lg:p-12">
                <form className="space-y-6" action="https://formsubmit.co/bruceworksllc@gmail.com" method="POST">
                  <input type="hidden" name="_subject" value="New AI Leverage Audit request from bruceworks.net" />
                  <input type="hidden" name="_captcha" value="false" />
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                    <input id="name" name="name" type="text" required className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-primary" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
                    <input id="email" name="email" type="email" required className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-primary" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
                    <input id="phone" name="phone" type="tel" className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-primary" placeholder="Best number to reach you" />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">What are you trying to improve?</label>
                    <textarea id="message" name="message" required rows={5} className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-primary" placeholder="Tell me about your business, files, devices, repetitive work, AI tools you've tried, or anything that feels underused or overwhelming."></textarea>
                  </div>
                  <Button fullWidth type="submit">
                    Book an AI Leverage Audit
                  </Button>
                  <p className="text-center text-xs text-gray-500">
                    Please do not submit passwords, account numbers, medical records, or sensitive client data through this form.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
