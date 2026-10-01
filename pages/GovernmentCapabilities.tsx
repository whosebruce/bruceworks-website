import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ExternalLink, ArrowRight } from 'lucide-react';
import {
  californiaCertifications,
  californiaCodes,
  company,
  documents,
  identifiers,
  naicsLine,
  samRegistration,
  sbaCertifications,
  sbaCodes,
} from '../content/government';

const sbaCards = sbaCertifications.certifications.map((cert) => ({
  name: cert.name,
  status: cert.status,
  rows: [
    ['Certification', cert.code],
    ['Program', sbaCertifications.programShort],
    ['Status', cert.status],
    ['Entrance', cert.entranceDate],
    ['Renewal', cert.renewalDate],
  ],
}));

const certifications = californiaCertifications.certifications.map((cert) => ({
  name: cert.name,
  status: cert.status,
  rows: [
    ['Certification', cert.code],
    ['Certification ID', californiaCertifications.certificationId],
    ['Effective', cert.effectiveDate],
    ['Valid through', cert.validThrough],
  ],
}));

const capabilityCards = [
  {
    title: 'Records & Data Operations',
    points: [
      'Records inventory and reconciliation',
      'Digitization pilot planning and management',
      'OCR, indexing, metadata, and data cleanup',
      'File naming, migration preparation, and document QA',
      'Exception tracking and acceptance controls',
    ],
  },
  {
    title: 'SOPs & Program Controls',
    points: [
      'SOP and manual development',
      'Process maps and responsibility matrices',
      'Intake, inventory, risk, issue, and exception trackers',
      'Status reporting and continuity packages',
      'Closeout and handoff documentation',
    ],
  },
  {
    title: 'Workflow Modernization',
    points: [
      'Current-state workflow assessment',
      'Secure intake and document-routing design',
      'Lightweight dashboards and operational trackers',
      'Approved automation and private AI workflows',
      'Knowledge bases, training, and implementation handoff',
    ],
  },
  {
    title: 'Prime & Subcontract Support',
    points: [
      'Project coordination and agency communication',
      'QA, reconciliation, and acceptance management',
      'Documentation, reporting, and local implementation',
      'Defined commercially useful workshare',
      'Teaming support for specialized or scaled delivery',
    ],
  },
];

const whyBruceWorks = [
  ['01', 'Operations plus technology.', 'Military logistics, supply accountability, controlled workflows, documentation, and hands-on systems implementation.'],
  ['02', 'Privacy-aware delivery.', 'Explicit data boundaries, local/offline options, controlled access, and documented handling procedures.'],
  ['03', 'Pilot first.', 'Prove a bounded workflow, acceptance standard, and reporting method before scaling.'],
  ['04', 'Owner-operated accountability.', 'Direct involvement in planning, communication, quality, and delivery.'],
  ['05', 'Clear handoff.', 'Documented workflows, staff training, and usable operational materials—not an unexplained black box.'],
];

const procurementData: Array<[string, string]> = [
  ['Legal name', company.legalName],
  ['Service posture', company.servicePosture],
  ...sbaCertifications.certifications.map(
    (cert): [string, string] => [`SBA ${cert.code}`, `${cert.status} · Entrance ${cert.entranceDate} · Renewal ${cert.renewalDate}`]
  ),
  ['CA certifications', californiaCodes],
  ['CA certification ID', californiaCertifications.certificationId],
  ['SAM.gov', `${samRegistration.status} · ${samRegistration.purpose}`],
  ['SAM active', `${samRegistration.activeDate} · Expires ${samRegistration.expirationDate}`],
  ['UEI', identifiers.uei],
  ['CAGE', identifiers.cage],
  ['SAM NAICS', naicsLine],
  ['Contact', `${company.email} · ${company.phone}`],
];

const heroSummary: Array<[string, string, boolean?]> = [
  ['SBA Certified', sbaCodes],
  ['SAM.gov', `${samRegistration.statusShort} · ${samRegistration.purpose}`],
  ['Unique Entity ID', identifiers.uei, true],
  ['CAGE Code', identifiers.cage, true],
  ['California', californiaCodes],
];

const monoProcurementLabels = ['CA certification ID', 'UEI', 'CAGE', 'SAM NAICS'];

export const GovernmentCapabilities: React.FC = () => {
  const sbaVerify = sbaCertifications.verification;
  const samVerify = samRegistration.verification;
  const caVerify = californiaCertifications.verification;

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary pt-32 pb-20 lg:pt-44 lg:pb-24 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-secondary to-indigo-950" aria-hidden="true"></div>
        <div className="absolute -top-40 right-0 h-[26rem] w-[26rem] rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true"></div>
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true"></div>
        <div className="container relative z-10 mx-auto px-6">
          <p className="font-condensed text-base font-bold uppercase tracking-[0.12em] text-cyan-200">
            Bruce Works LLC · Government &amp; Prime Contractor Support
          </p>
          <h1 className="font-display mb-6 mt-3 max-w-4xl text-5xl font-extrabold leading-[1.02] md:text-7xl">
            SBA-certified SDVOSB, active in SAM.gov, and California-certified for practical operations and technology support.
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-blue-100 md:text-xl">
            Bruce Works LLC supports agencies, prime contractors, and teaming partners with document and data operations, workflow modernization, project controls, SOPs, and privacy-aware technology implementation.
          </p>
          <p className="mt-4 max-w-3xl font-semibold text-cyan-100">Available for statewide on-site support, subcontract work, and remote delivery.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={documents.capabilityStatement} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-bold text-gray-900 transition-colors hover:bg-yellow-500">
              <ExternalLink className="h-5 w-5" /> View Capability Statement
            </a>
            <a href={documents.capabilityStatement} download className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-6 py-3 font-bold text-white transition-colors hover:bg-white/20">
              <Download className="h-5 w-5" /> Download PDF
            </a>
            <Link
              to="/contact/?topic=government"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-6 py-3 font-bold text-white transition-colors hover:bg-white/20"
            >
              Discuss an Opportunity <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div
            className="mt-10 grid max-w-6xl grid-cols-1 overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur sm:grid-cols-2 lg:grid-cols-5"
            aria-label="Registration and certification summary"
          >
            {heroSummary.map(([label, value, mono]) => (
              <div key={label} className="border-b border-white/15 p-5 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:last:col-span-2 sm:last:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:col-span-1 lg:last:border-r-0">
                <small className="block font-condensed text-sm font-semibold uppercase tracking-[0.1em] text-blue-200">{label}</small>
                <strong className={`mt-1 block text-lg ${mono ? 'font-mono font-semibold' : ''}`}>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SBA VetCert certifications */}
      <section id="sba-certifications" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="font-condensed text-base font-bold uppercase tracking-[0.1em] text-secondary">Verified federal certifications</p>
            <h2 className="font-display mb-4 mt-2 text-4xl font-bold leading-[1.05] text-gray-900 lg:text-6xl">
              SBA-Certified SDVOSB and VOSB
            </h2>
            <p className="text-lg text-gray-600">
              The U.S. Small Business Administration certified {company.legalName} through its Veteran Small Business Certification program (VetCert). The public SBA record was checked before publication. Buyers should confirm current status in {sbaVerify.system} before relying on a certification.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {sbaCards.map((cert) => (
              <article key={cert.name} className="rounded-2xl border border-blue-200 bg-white p-8 shadow-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-emerald-800">
                  {cert.status}
                </span>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{cert.name}</h3>
                <dl className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[140px_1fr]">
                  {cert.rows.map(([term, value]) => (
                    <React.Fragment key={term}>
                      <dt className="font-bold text-gray-500">{term}</dt>
                      <dd className="m-0 font-mono text-[15px] text-gray-900">{value}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={sbaVerify.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-6 py-3 font-bold text-white transition-colors hover:bg-blue-900"
            >
              {sbaVerify.label} <ExternalLink className="h-4 w-4" />
            </a>
            {sbaVerify.profileUrl && (
              <a
                href={sbaVerify.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-secondary bg-white px-6 py-3 font-bold text-secondary transition-colors hover:bg-blue-50"
              >
                Open the Bruce Works SBA Profile <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          <p className="mt-5 text-gray-600">
            <strong>Official search instructions:</strong> {sbaVerify.instructions}
          </p>
        </div>
      </section>

      {/* Federal registration */}
      <section id="sam-registration" className="bg-blue-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="font-condensed text-base font-bold uppercase tracking-[0.1em] text-secondary">Verified federal registration</p>
            <h2 className="font-display mb-4 mt-2 text-4xl font-bold leading-[1.05] text-gray-900 lg:text-6xl">
              SAM.gov {samRegistration.status} — {samRegistration.purpose}
            </h2>
            <p className="text-lg text-gray-600">
              {company.legalName} became active in SAM.gov on {samRegistration.activeDateLong}. The registration is valid through {samRegistration.expirationDateLong}. Buyers should confirm current status in SAM.gov before relying on this information.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-blue-200 bg-white p-8 shadow-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-emerald-800">
                {samRegistration.status}
              </span>
              <h3 className="mt-4 text-xl font-bold text-gray-900">System for Award Management</h3>
              <dl className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[140px_1fr]">
                {[
                  ['Purpose', samRegistration.purpose],
                  ['Active', samRegistration.activeDate],
                  ['Expires', samRegistration.expirationDate],
                ].map(([term, value]) => (
                  <React.Fragment key={term}>
                    <dt className="font-bold text-gray-500">{term}</dt>
                    <dd className="m-0 font-mono text-[15px] text-gray-900">{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </article>

            <article className="rounded-2xl border border-blue-200 bg-white p-8 shadow-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-blue-800">
                Federal Identifiers
              </span>
              <h3 className="mt-4 text-xl font-bold text-gray-900">{company.legalName}</h3>
              <dl className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[140px_1fr]">
                {[
                  ['UEI', identifiers.uei],
                  ['CAGE', identifiers.cage],
                ].map(([term, value]) => (
                  <React.Fragment key={term}>
                    <dt className="font-bold text-gray-500">{term}</dt>
                    <dd className="m-0 font-mono text-[15px] font-semibold text-gray-900">{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </article>
          </div>

          <div className="mt-8 border-l-4 border-secondary bg-white p-5 text-gray-800">
            <strong>Separate federal records:</strong> SAM.gov holds the federal registration. SBA holds the SDVOSB and VOSB certifications and publishes them in {sbaVerify.system}. Check each record in its own official system.
          </div>

          <div className="mt-7">
            <a
              href={samVerify.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-6 py-3 font-bold text-white transition-colors hover:bg-blue-900"
            >
              {samVerify.label} <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-4 text-gray-600">
              <strong>Official search instructions:</strong> {samVerify.instructions}
            </p>
          </div>
        </div>
      </section>

      {/* California certifications */}
      <section id="certifications" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="font-condensed text-base font-bold uppercase tracking-[0.1em] text-secondary">Verified state certifications</p>
            <h2 className="font-display mb-4 mt-2 text-4xl font-bold leading-[1.05] text-gray-900 lg:text-6xl">
              California DVBE and Small Business (Micro)
            </h2>
            <p className="text-lg text-gray-600">
              The official Cal eProcure public supplier profile was checked before publication. Buyers should always confirm current status in the state system before relying on a certification.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {certifications.map((cert) => (
              <article key={cert.name} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-amber-800">
                  {cert.status}
                </span>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{cert.name}</h3>
                <dl className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[140px_1fr]">
                  {cert.rows.map(([term, value]) => (
                    <React.Fragment key={term}>
                      <dt className="font-bold text-gray-500">{term}</dt>
                      <dd className="m-0 font-mono text-[15px] text-gray-900">{value}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <div className="mt-8 border-l-4 border-primary bg-amber-50 p-5 text-amber-900">
            <strong>About the downloadable verification summary:</strong> California does not provide Bruce Works with a conventional certificate PDF through the public search. Our summary reproduces the public record and clearly identifies itself as a Bruce Works document—not a government-issued certificate.
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={documents.verificationSummary}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-bold text-gray-900 transition-colors hover:bg-yellow-500"
            >
              <ExternalLink className="h-5 w-5" /> View Verification Summary
            </a>
            <a
              href={documents.verificationSummary}
              download
              className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-6 py-3 font-bold text-white transition-colors hover:bg-blue-900"
            >
              <Download className="h-5 w-5" /> Download PDF
            </a>
            <a
              href={caVerify.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-secondary bg-white px-6 py-3 font-bold text-secondary transition-colors hover:bg-blue-50"
            >
              {caVerify.label} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-5 text-gray-600">
            <strong>Official search instructions:</strong> {caVerify.instructions}
          </p>
        </div>
      </section>

      {/* Core capabilities */}
      <section id="capabilities" className="bg-lightgrey py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="font-condensed text-base font-bold uppercase tracking-[0.1em] text-secondary">Core capabilities</p>
            <h2 className="font-display mb-4 mt-2 text-4xl font-bold leading-[1.05] text-gray-900 lg:text-6xl">
              Specific work a buyer or prime can scope.
            </h2>
            <p className="text-lg text-gray-600">
              Bruce Works focuses on defined deliverables and measurable acceptance criteria—not generic “AI consulting.”
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {capabilityCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-gray-200 bg-white p-8">
                <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bruce Works + procurement data */}
      <section className="py-20">
        <div className="container mx-auto grid grid-cols-1 items-start gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-condensed text-base font-bold uppercase tracking-[0.1em] text-secondary">Why Bruce Works</p>
            <h2 className="font-display mb-6 mt-2 text-4xl font-bold leading-[1.05] text-gray-900 lg:text-6xl">
              Operational discipline with practical systems thinking.
            </h2>
            <div className="space-y-4">
              {whyBruceWorks.map(([number, title, body]) => (
                <div key={number} className="flex items-start gap-4">
                  <b className="font-display text-xl font-extrabold leading-6 text-secondary">{number}</b>
                  <span className="text-gray-700">
                    <strong className="text-gray-900">{title}</strong> {body}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside className="overflow-hidden rounded-2xl bg-blue-950 text-white shadow-xl" aria-label="Procurement data">
            <h3 className="border-b border-white/15 p-6 text-xl font-bold">Company &amp; Procurement Data</h3>
            <div>
              {procurementData.map(([label, value]) => (
                <div key={label} className="grid grid-cols-1 gap-1 border-b border-white/10 px-6 py-3.5 last:border-b-0 sm:grid-cols-[145px_1fr] sm:gap-4">
                  <span className="font-condensed text-[15px] font-semibold uppercase tracking-[0.06em] text-blue-200">{label}</span>
                  <span className={monoProcurementLabels.includes(label) ? 'font-mono text-[15px] font-medium' : 'font-bold'}>{value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-gradient-to-br from-secondary to-blue-950 p-9 text-white lg:flex-row lg:items-center lg:p-11">
            <div>
              <h2 className="font-display mb-3 text-4xl font-bold leading-[1.05] lg:text-5xl">Have a requirement or teaming gap?</h2>
              <p className="max-w-2xl text-blue-100">
                Send the scope, due date, delivery location, and expected workshare. Bruce Works will respond with a fit assessment before making capability or pricing commitments.
              </p>
            </div>
            <Link
              to="/contact/?topic=government"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-bold text-gray-900 transition-colors hover:bg-yellow-500"
            >
              Contact Bruce Works <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
