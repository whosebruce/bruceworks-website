import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  {
    question: "Is this just ChatGPT?",
    answer: "No. ChatGPT or another assistant may be one tool inside the system. Bruce Works organizes the business knowledge, instructions, workflows, templates, review points, and handoff around it."
  },
  {
    question: "Is this just Obsidian?",
    answer: "No. Obsidian, Google Drive, Microsoft 365, Notion, or another client-owned tool may hold part of the system. The engagement is about the operating structure and workflow—not forcing one app."
  },
  {
    question: "Do I need to be technical?",
    answer: "No. Bruce Works documents the system in plain English, trains the owner or team, and provides a handoff guide."
  },
  {
    question: "Can this run locally?",
    answer: "Parts of it can. Local-first storage, backups, and private hardware setups are available when the business need justifies them. Fully local AI depends on the hardware, workflow, support boundary, and use case."
  },
  {
    question: "What should I start with?",
    answer: "Start with the AI Leverage Audit. The pilot maps the current workflow, identifies the top three opportunities, defines data boundaries, and ends with a 30-day action plan and a clear recommendation."
  },
  {
    question: "Does Bruce Works host autonomous bots or hold my business data?",
    answer: "Not by default. Systems are designed around client-owned accounts, storage, subscriptions, credentials, and hardware wherever practical. Any exception must be explicitly scoped and approved."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-[1.05]">Frequently Asked Questions</h2>
          <p className="text-gray-600">Practical answers before your first AI Audit.</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
              >
                <span className="font-semibold text-lg text-gray-800 text-left">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-primary flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0 ml-4" />
                )}
              </button>

              <div
                id={`faq-panel-${index}`}
                className={`transition-all duration-300 ease-in-out bg-gray-50 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 py-4 text-gray-600 leading-relaxed border-t border-gray-100">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
