import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { californiaCertifications, identifiers, samRegistration, sbaCertifications, sbaCodes } from '../content/government';

// The credentials band on Home, read from the government facts file (content/government.json) like every government
// fact on the site; scripts/check_government_capabilities.py checks that it stays that way.
export const GovernmentTrustStrip: React.FC = () => {
  const [dvbe, sbMicro] = californiaCertifications.certifications;
  const cells: [string, string][] = [
    ...sbaCertifications.certifications.map((c) => [c.code, `SBA VetCert · ${c.status}`] as [string, string]),
    [dvbe.code, `California · ${dvbe.status}`],
    ['SAM.gov', `${samRegistration.statusShort} · All awards`],
  ];
  return (
    <section aria-labelledby="government-trust-heading" className="border-y border-line bg-ground-2">
      <div className="container-x grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-line">
        {cells.map(([k, v]) => (
          <Link key={k} to="/government-capabilities/" className="group px-4 py-5 md:px-6">
            <p className="display text-2xl md:text-3xl">{k}</p>
            <p className="label mt-1 group-hover:!text-ink">{v}</p>
          </Link>
        ))}
      </div>
      <div className="border-t border-line-2">
        <div className="container-x flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="label">SBA Certified {sbaCodes} <span className="opacity-50">//</span> {sbMicro.code} <span className="opacity-50">//</span> UEI {identifiers.uei} <span className="opacity-50">//</span> CAGE {identifiers.cage}</p>
            <h2 id="government-trust-heading" className="mt-1 text-sm font-semibold text-ink-2">
              SBA-certified SDVOSB, registered for federal opportunities, and certified for California procurement.
            </h2>
          </div>
          <Link to="/government-capabilities/" className="label flex shrink-0 items-center gap-1.5 hover:!text-ink">Government capabilities <ArrowRight size={13} /></Link>
        </div>
      </div>
    </section>
  );
};
