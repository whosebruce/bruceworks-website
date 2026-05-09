import React from 'react';
import { Hero } from '../components/Hero';
import { ValueProps } from '../components/ValueProps';
import { FeatureSection } from '../components/FeatureSection';
import { QuoteSection } from '../components/QuoteSection';
import { FAQ } from '../components/FAQ';
import { ContactCTA } from '../components/ContactCTA';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />

      <section className="py-20">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Your life or business should not only live in your head.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Most people use AI like a search box. That helps a little, but the real value comes when AI understands your goals, projects, documents, workflows, and the way you actually work. Bruce Works helps organize that context into a private Command Center so AI can help you take action.
          </p>
        </div>
      </section>

      <ValueProps />

      <div id="services-preview">
        <FeatureSection
          title="Personal AI Command Center"
          headline="Turn scattered notes, files, and ideas into an assistant system."
          description="A private AI Command Center gives your assistant the memory and structure it needs to help with planning, tasks, documents, decisions, and recurring workflows."
          points={[
            "Private knowledge vault for goals, notes, files, and projects",
            "Custom assistant instructions/persona",
            "Dashboards for goals, projects, tasks, and weekly review",
            "Starter workflows for repeated tasks",
            "Training so you can actually use it"
          ]}
          image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Organized digital workspace"
          align="left"
        />

        <FeatureSection
          title="Business AI Ops System"
          headline="Document what lives in your head and turn it into repeatable workflows."
          description="For small businesses, creators, and operators who need better follow-up, admin support, SOPs, content systems, client workflows, and practical AI help."
          points={[
            "Business knowledge vault and process documentation",
            "Client/admin follow-up workflows",
            "Proposal, email, and document templates",
            "Content or operations pipeline",
            "Optional monthly AI Ops support"
          ]}
          image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Small business planning session"
          align="right"
        />
      </div>

      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Start with a focused audit, then build only what is actually useful.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              ['Audit', 'Review your tools, files, workflows, pain points, and goals.'],
              ['Map', 'Identify what should be organized, documented, automated, or turned into a workflow.'],
              ['Build', 'Create your vault, assistant instructions, templates, and first workflows.'],
              ['Train', 'Learn how to use the system in plain English.'],
              ['Improve', 'Add support, automations, hardware, and better workflows over time.']
            ].map(([title, body], index) => (
              <div key={title} className="bg-lightgrey rounded-xl p-6 border border-gray-100">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-gray-900 mb-4">{index + 1}</div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection />
      <FAQ />
      <ContactCTA />
    </main>
  );
};
