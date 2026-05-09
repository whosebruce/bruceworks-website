import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  {
    question: "Is this just ChatGPT?",
    answer: "No. ChatGPT is a brain you can talk to. A Command Center is the system around it: your private knowledge vault, assistant instructions, workflows, templates, automations, and support."
  },
  {
    question: "Is this just Obsidian?",
    answer: "No. Obsidian or a Markdown vault can be the memory layer, but the Command Center also includes assistant setup, workflows, structure, templates, and optional automations or hardware."
  },
  {
    question: "Do I need to be technical?",
    answer: "No. Bruce Works handles the setup and teaches you how to use the system in plain English."
  },
  {
    question: "Can this run locally?",
    answer: "Parts of it can. Local-first storage, backups, and private hardware setups are available. Fully local AI depends on your hardware and use case."
  },
  {
    question: "What should I start with?",
    answer: "Start with an AI Audit. We look at your current setup, identify the highest-value opportunities, and map the first version before overcomplicating anything."
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
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Practical answers before your first AI Audit.</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-lg text-gray-800 text-left">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-primary flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0 ml-4" />
                )}
              </button>

              <div
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
