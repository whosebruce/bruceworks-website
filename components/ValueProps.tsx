import React from 'react';
import { BrainCircuit, FolderKanban, ShieldCheck, Workflow, MonitorSmartphone, LifeBuoy } from 'lucide-react';
import { ValueProp } from '../types';

const props: ValueProp[] = [
  {
    title: "Private Knowledge Vault",
    description: "Organize your notes, files, goals, projects, documents, and business knowledge into a system your assistant can use.",
    icon: <FolderKanban size={40} className="text-primary" />
  },
  {
    title: "Custom AI Assistant",
    description: "Give AI the context, instructions, preferences, and workflows it needs to help like a practical digital operator.",
    icon: <BrainCircuit size={40} className="text-primary" />
  },
  {
    title: "Practical Workflows",
    description: "Turn repeated tasks into templates and workflows for planning, content, admin, follow-up, documentation, and decision support.",
    icon: <Workflow size={40} className="text-primary" />
  },
  {
    title: "Privacy-Aware Setup",
    description: "Choose the right mix of cloud convenience, local-first storage, backups, and optional dedicated hardware for your needs.",
    icon: <ShieldCheck size={40} className="text-primary" />
  },
  {
    title: "Use It From Anywhere",
    description: "Build around the way you actually work — computer, phone, chat interface, documents, and your existing tools.",
    icon: <MonitorSmartphone size={40} className="text-primary" />
  },
  {
    title: "Support as It Grows",
    description: "Your Command Center can improve every month with new workflows, better templates, automations, and support.",
    icon: <LifeBuoy size={40} className="text-primary" />
  }
];

export const ValueProps: React.FC = () => {
  return (
    <section className="bg-lightgrey py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">AI is more useful when it understands your world.</h2>
          <p className="text-gray-600 text-lg">Bruce Works builds the system around the AI: memory, workflows, structure, and support.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {props.map((prop, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="flex justify-center mb-6">
                {prop.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{prop.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button onClick={() => document.getElementById('services-preview')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-900 hover:text-yellow-600 font-bold hover:underline text-lg inline-flex items-center gap-2">
            See Command Center services <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
