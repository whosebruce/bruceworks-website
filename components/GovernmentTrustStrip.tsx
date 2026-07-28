import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, FileCheck2, ShieldCheck } from 'lucide-react';

export const GovernmentTrustStrip: React.FC = () => {
  return (
    <section aria-labelledby="government-trust-heading" className="border-y border-amber-200 bg-amber-50">
      <div className="container mx-auto px-6 py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="hidden rounded-xl bg-secondary p-3 text-primary sm:block" aria-hidden="true">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <p className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold uppercase tracking-wider text-secondary">
                <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4" /> California Certified DVBE</span>
                <span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1.5"><FileCheck2 className="h-4 w-4" /> SB (Micro)</span>
              </p>
              <h2 id="government-trust-heading" className="text-2xl font-black text-gray-900">
                Bruce Works LLC is ready for government and prime-contractor conversations.
              </h2>
              <p className="mt-2 max-w-3xl text-gray-700">
                Certification ID <strong>2053352</strong> · Approved 07/01/2026–06/30/2028 · Document and data operations, workflow modernization, project controls, and defined subcontract workshare.
              </p>
            </div>
          </div>
          <Link
            to="/government-capabilities/"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3 font-bold text-white transition-colors hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Government Capabilities <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
