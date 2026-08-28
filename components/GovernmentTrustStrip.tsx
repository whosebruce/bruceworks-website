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
              <p className="mb-1 flex flex-wrap items-center gap-x-4 gap-y-1 font-condensed text-base font-bold uppercase tracking-[0.08em] text-secondary">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> SAM.gov Active</span>
                <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4" /> California Certified DVBE</span>
                <span className="inline-flex items-center gap-1.5"><FileCheck2 className="h-4 w-4" /> SB (Micro)</span>
              </p>
              <h2 id="government-trust-heading" className="text-2xl font-black text-gray-900">
                Registered for federal opportunities and certified for California procurement.
              </h2>
              <p className="mt-2 flex max-w-3xl flex-wrap gap-x-4 gap-y-1 text-gray-700">
                <span>SAM.gov Active Registration · All Awards</span>
                <span>UEI: <strong className="font-mono text-[0.95em]">N7YPC6B6YNC5</strong></span>
                <span>CAGE: <strong className="font-mono text-[0.95em]">246J3</strong></span>
                <span>California Certification ID: <strong className="font-mono text-[0.95em]">2053352</strong></span>
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
