import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { Check, Chamfer, Display, GridBand, HazardStrip, Loop, SectionHeader, useReveal } from '../components/brand';
import { PageIntro } from '../components/PageIntro';
import { Swipe } from '../components/Swipe';
import { RecordCard, RecordNote, VerifyLink, VerifyPanel, type RecordRow } from '../components/gov/Record';
import { TeamingBand } from '../components/gov/TeamingBand';
import { useHashScroll } from '../components/offers/useHashScroll';
import { LOOPS } from '../content/media';
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

// /government-capabilities/: the verified records (SBA VetCert, SAM.gov, California), what Bruce Works does for
// agencies and primes, and the full procurement record. Every fact comes from content/government.json through
// content/government.ts. scripts/check_government_capabilities.py and scripts/verify-routes.mjs check this page: keep
// the ids (#sba-certifications with its two cards, #sam-registration, #certifications), the link labels, the record
// lines in the paragraphs and exactly four PDF links (view and download for each document).

/** "Active", or "Active / Approved" if a group ever mixes statuses. */
const statusOf = (certs: { status: string }[]) => Array.from(new Set(certs.map((cert) => cert.status))).join(' / ');

const sbaCards = sbaCertifications.certifications.map((cert) => ({
  code: cert.code,
  name: cert.name,
  status: cert.status,
  rows: [
    ['Entrance', cert.entranceDate],
    ['Renewal', cert.renewalDate],
  ] as RecordRow[],
}));

const certifications = californiaCertifications.certifications.map((cert) => ({
  code: cert.code,
  name: cert.name,
  status: cert.status,
  rows: [
    ['Certification ID', californiaCertifications.certificationId],
    ['Effective', cert.effectiveDate],
    ['Valid through', cert.validThrough],
  ] as RecordRow[],
}));

/** The three records, top of the page (what it is, where it's from or what it covers, status): each one jumps to its
 *  section. */
const onRecord = [
  { href: '#sba-certifications', what: sbaCodes, detail: sbaCertifications.programShort, status: statusOf(sbaCertifications.certifications) },
  { href: '#sam-registration', what: samRegistration.verification.system, detail: samRegistration.purpose, status: samRegistration.statusShort },
  { href: '#certifications', what: californiaCodes, detail: 'California', status: statusOf(californiaCertifications.certifications) },
];

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

/** The single full reference: every fact on the page, in one table. */
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

const monoProcurementLabels = ['CA certification ID', 'UEI', 'CAGE', 'SAM NAICS'];

/** On phones the short facts sit two to a row (CA certifications + ID, SAM.gov + dates, UEI + CAGE); from sm up it's
 *  one fact per row. */
const phonePairs = [['CA certifications', 'CA certification ID'], ['SAM.gov', 'SAM active'], ['UEI', 'CAGE']];
const halfOnPhones = (label: string) => {
  const pair = phonePairs.find((p) => p.includes(label));
  if (!pair) return 'col-span-2 sm:col-span-1';
  return pair[0] === label ? 'border-r sm:border-r-0' : '';
};

// The record sections share one layout. Phones and tablets: the words, the cards (a swipe row on phones), the verify
// panel. From xl: the words over the verify panel on the left, the two cards side by side on the right.
const recordGrid = 'mt-6 grid gap-6 md:mt-8 md:gap-8 xl:grid-cols-[1fr_1.25fr] xl:grid-rows-[auto_1fr] xl:gap-x-12';
const recordCards = 'xl:col-start-2 xl:row-span-2 xl:row-start-1';
const recordSide = 'xl:col-start-1 xl:self-start';

const CardRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <Swipe label={label} desktop="md:grid md:grid-cols-2 md:gap-4" item="basis-[86%] sm:basis-[60%]">{children}</Swipe>
);

export const GovernmentCapabilities: React.FC = () => {
  useReveal();
  useHashScroll();
  const sbaVerify = sbaCertifications.verification;
  const samVerify = samRegistration.verification;
  const caVerify = californiaCertifications.verification;
  const creds = LOOPS.credentials;

  return (
    <main>
      <PageIntro
        op="OP-09" tag="Government & prime support"
        title={<>Certified. <span className="sig">Verify it yourself.</span></>}
        sub={<>
          <p>Bruce Works LLC supports agencies, prime contractors, and teaming partners with document and data operations, workflow modernization, project controls, SOPs, and privacy-aware technology implementation.</p>
          <p className="mt-3 text-base font-semibold text-ink md:mt-4 md:text-lg">Available for statewide on-site support, subcontract work, and remote delivery.</p>
        </>}
        actions={
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={documents.capabilityStatement} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <ExternalLink size={18} /> View Capability Statement
            </a>
            <a href={documents.capabilityStatement} download className="btn btn-outline">
              <Download size={18} /> Download PDF
            </a>
            <Link to="/contact/?topic=government" className="btn btn-outline">
              Discuss an Opportunity <ArrowRight size={18} />
            </Link>
          </div>
        }
        aside={
          <Chamfer className="reveal" innerClassName="overflow-hidden">
            {creds && <Loop src={creds.mp4} webm={creds.webm} poster={creds.poster} label={creds.label} className="block aspect-video w-full object-cover" />}
            <p className="label border-t border-line px-4 pb-0.5 pt-3 md:px-5 md:pt-4">On the record</p>
            <ol aria-label="Registration and certification summary">
              {onRecord.map((rec, i) => (
                <li key={rec.href} className="border-t border-line-2 first:border-t-0">
                  <a href={rec.href} className="group flex min-h-[52px] items-center gap-4 px-4 py-2.5 hover:bg-ground-3 md:px-5 md:py-3">
                    <span className="font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">{rec.what}</span>
                      <span className="label">{rec.detail}</span>
                    </span>
                    <span className="chip shrink-0 text-[13px] text-ink-2"><span aria-hidden="true" className="text-signal-text">☑</span> {rec.status}</span>
                    <ArrowDown size={16} aria-hidden="true" className="shrink-0 text-ink-3 group-hover:text-ink" />
                  </a>
                </li>
              ))}
            </ol>
          </Chamfer>
        }
      />

      {/* ── 01 SBA VetCert ── */}
      <GridBand id="sba-certifications" className="scroll-mt-20">
        <div className="py-10 md:py-24">
          <SectionHeader num="01" label="Verified federal certifications" right={<span className="label hidden sm:inline">{sbaCertifications.programShort}</span>} />
          <div className={recordGrid}>
            <div>
              <Display className="reveal text-5xl md:text-6xl">Veteran-owned. <span className="sig">SBA-certified.</span></Display>
              <p className="reveal mt-5 text-ink-2 md:text-lg">
                <strong className="font-semibold text-ink">SBA-Certified SDVOSB and VOSB.</strong> The U.S. Small Business Administration certified {company.legalName} through its Veteran Small Business Certification program (VetCert). The public SBA record was checked before publication. Buyers should confirm current status in {sbaVerify.system} before relying on a certification.
              </p>
            </div>
            <div className={recordCards}>
              <CardRow label="SBA certifications">
                {sbaCards.map((cert) => (
                  <RecordCard key={cert.code} issuer={sbaCertifications.programShort} code={cert.code} name={cert.name} status={cert.status} rows={cert.rows} />
                ))}
              </CardRow>
            </div>
            <VerifyPanel className={`reveal ${recordSide}`} steps={sbaVerify.instructions}>
              <VerifyLink href={sbaVerify.url}>{sbaVerify.label}</VerifyLink>
              {sbaVerify.profileUrl && <VerifyLink href={sbaVerify.profileUrl}>Open the Bruce Works SBA Profile</VerifyLink>}
            </VerifyPanel>
          </div>
        </div>
      </GridBand>

      {/* ── 02 SAM.gov ── */}
      <GridBand id="sam-registration" tone="raised" className="scroll-mt-20">
        <div className="py-10 md:py-24">
          <SectionHeader num="02" label="Verified federal registration" right={<span className="label hidden sm:inline">{samVerify.system}</span>} />
          <div className={recordGrid}>
            <div>
              <Display className="reveal text-5xl md:text-6xl">Registered for <span className="sig">{samRegistration.purpose.toLowerCase()}.</span></Display>
              <p className="reveal mt-5 text-ink-2 md:text-lg">
                <strong className="font-semibold text-ink">SAM.gov {samRegistration.status} — {samRegistration.purpose}.</strong> {company.legalName} became active in SAM.gov on {samRegistration.activeDateLong}. Buyers should confirm current status in {samVerify.system} before relying on this information.
              </p>
            </div>
            <div className={recordCards}>
              <CardRow label="SAM.gov registration and federal identifiers">
                <RecordCard issuer="Registration" code={samVerify.system} name="System for Award Management" status={samRegistration.statusShort}
                  rows={[
                    ['Purpose', samRegistration.purpose],
                    ['Active', samRegistration.activeDate],
                    ['Expires', samRegistration.expirationDate],
                  ]} />
                <RecordCard issuer="Federal identifiers" name={company.legalName} big
                  rows={[
                    ['UEI', identifiers.uei],
                    ['CAGE', identifiers.cage],
                  ]} />
              </CardRow>
            </div>
            <VerifyPanel className={`reveal ${recordSide}`} steps={samVerify.instructions}
              more={<><strong className="font-semibold text-ink">Separate federal records:</strong> SAM.gov holds the federal registration. SBA holds the {sbaCertifications.certifications.map((cert) => cert.code).join(' and ')} certifications and publishes them in {sbaVerify.system}. Check each record in its own official system.</>}>
              <VerifyLink href={samVerify.url}>{samVerify.label}</VerifyLink>
            </VerifyPanel>
          </div>
        </div>
      </GridBand>

      {/* ── 03 California ── */}
      <GridBand id="certifications" className="scroll-mt-20">
        <div className="py-10 md:py-24">
          <SectionHeader num="03" label="Verified state certifications" right={<span className="label hidden sm:inline">{caVerify.system}</span>} />
          <div className={recordGrid}>
            <div>
              <Display className="reveal text-5xl md:text-6xl">Certified for <span className="sig">California.</span></Display>
              <p className="reveal mt-5 text-ink-2 md:text-lg">
                <strong className="font-semibold text-ink">California DVBE and Small Business (Micro).</strong> The official {caVerify.system} public supplier profile was checked before publication. Buyers should always confirm current status in the state system before relying on a certification.
              </p>
            </div>
            <div className={recordCards}>
              <CardRow label="California certifications">
                {certifications.map((cert) => (
                  <RecordCard key={cert.code} issuer="California" code={cert.code} name={cert.name} status={cert.status} rows={cert.rows} />
                ))}
              </CardRow>
            </div>
            <VerifyPanel className={`reveal ${recordSide}`} steps={caVerify.instructions}>
              <VerifyLink href={documents.verificationSummary}>View Verification Summary</VerifyLink>
              <VerifyLink href={documents.verificationSummary} download>Download PDF</VerifyLink>
              <RecordNote title="About the downloadable verification summary:" className="px-4 py-3 md:px-5">
                California does not provide Bruce Works with a conventional certificate PDF through the public search. Our summary reproduces the public record and clearly identifies itself as a Bruce Works document—not a government-issued certificate.
              </RecordNote>
              <VerifyLink href={caVerify.url}>{caVerify.label}</VerifyLink>
            </VerifyPanel>
          </div>
        </div>
      </GridBand>

      {/* ── 04 core capabilities ── */}
      <GridBand id="capabilities" tone="raised" className="scroll-mt-20">
        <div className="py-10 md:py-24">
          <SectionHeader num="04" label="Core capabilities" />
          <div className="mt-6 grid gap-5 md:mt-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-6">
            <Display className="reveal text-5xl md:text-6xl">Work a buyer or prime <span className="sig">can scope.</span></Display>
            <p className="reveal text-ink-2 md:text-lg">Bruce Works focuses on defined deliverables and measurable acceptance criteria—not generic “AI consulting.”</p>
          </div>
          <Swipe label="Core capabilities" desktop="md:grid md:grid-cols-2 md:gap-4" item="basis-[86%] sm:basis-[60%]" className="mt-8 md:mt-10">
            {capabilityCards.map((card, i) => (
              <article key={card.title} className="panel flex h-full flex-col p-5 lg:p-6">
                <p className="font-mono text-sm font-semibold text-alert">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="display mt-3 break-words text-3xl">{card.title}</h3>
                <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-[15px] leading-snug text-ink">
                  {card.points.map((point) => <Check key={point}>{point}</Check>)}
                </ul>
              </article>
            ))}
          </Swipe>
        </div>
      </GridBand>

      {/* ── 05 why Bruce Works, beside the full procurement record ── */}
      <GridBand id="why-bruce-works" className="scroll-mt-20">
        <div className="grid gap-8 py-10 md:gap-12 md:py-24 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeader num="05" label="Why Bruce Works" />
            <Display className="reveal mt-6 text-5xl md:mt-8 md:text-6xl">Discipline <span className="sig">built in.</span></Display>
            <Swipe label="Why Bruce Works" desktop="md:block md:divide-y md:divide-line-2 md:border-y md:border-line" item="basis-[78%] sm:basis-[48%]" className="mt-6 md:mt-8">
              {whyBruceWorks.map(([number, title, body]) => (
                <div key={number} className="panel flex h-full flex-col gap-3 p-5 md:flex-row md:gap-5 md:border-0 md:bg-transparent md:px-0 md:py-4">
                  <span className="font-mono text-sm font-semibold text-alert md:pt-0.5">{number}</span>
                  <span className="text-ink-2"><strong className="block font-semibold text-ink md:inline">{title}</strong> {body}</span>
                </div>
              ))}
            </Swipe>
          </div>

          <aside id="procurement-data" aria-labelledby="procurement-data-heading" className="reveal panel scroll-mt-20 self-start overflow-hidden">
            <div className="border-b border-line px-4 py-4 md:px-6 md:py-5">
              <p className="label">Full record</p>
              <h2 id="procurement-data-heading" className="display mt-2 text-2xl sm:text-3xl md:text-4xl">Company &amp; procurement data</h2>
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-1">
              {procurementData.map(([label, value]) => (
                <div key={label}
                  className={`border-t border-line-2 px-4 py-2.5 first:border-t-0 sm:grid sm:grid-cols-[9.5rem_1fr] sm:items-baseline sm:gap-3 sm:py-3 md:px-6 ${halfOnPhones(label)}`}>
                  <dt className="label mb-0.5 sm:mb-0">{label}</dt>
                  <dd className={`break-words text-[15px] text-ink ${monoProcurementLabels.includes(label) ? 'font-mono font-medium' : 'font-semibold'}`}>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </GridBand>

      <HazardStrip />
      <TeamingBand />
    </main>
  );
};
