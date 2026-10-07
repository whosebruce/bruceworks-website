/**
 * Government facts for the React pages. The data lives in government.json so
 * the build check (scripts/check_government_capabilities.py) and the route
 * shell generator read the exact same values. Edit the JSON, not this file.
 */
import facts from './government.json';

export interface VerificationSource {
  system: string;
  label: string;
  url: string;
  profileUrl?: string;
  instructions: string;
}

export interface SbaCertification {
  code: string;
  name: string;
  status: string;
  entranceDate: string;
  renewalDate: string;
}

export interface CaliforniaCertification {
  code: string;
  name: string;
  status: string;
  effectiveDate: string;
  validThrough: string;
}

export interface GovernmentFacts {
  company: {
    legalName: string;
    owner: string;
    servicePosture: string;
    email: string;
    phone: string;
  };
  identifiers: {
    uei: string;
    cage: string;
  };
  samRegistration: {
    status: string;
    statusShort: string;
    purpose: string;
    activeDate: string;
    activeDateLong: string;
    expirationDate: string;
    expirationDateLong: string;
    naics: string[];
    verification: VerificationSource;
  };
  sbaCertifications: {
    program: string;
    programShort: string;
    certifications: SbaCertification[];
    verification: VerificationSource;
  };
  californiaCertifications: {
    certificationId: string;
    certifications: CaliforniaCertification[];
    verification: VerificationSource;
  };
  contractAwards: {
    awards: string[];
  };
  documents: {
    capabilityStatement: string;
    verificationSummary: string;
  };
}

export const government: GovernmentFacts = facts;

export const { company, identifiers, samRegistration, sbaCertifications, californiaCertifications, documents } =
  government;

/** "541618 · 541511 · …" in the order SAM.gov lists them (primary first). */
export const naicsLine = samRegistration.naics.join(' · ');

/** "SDVOSB · VOSB" */
export const sbaCodes = sbaCertifications.certifications.map((cert) => cert.code).join(' · ');

/** "DVBE · SB (Micro)" */
export const californiaCodes = californiaCertifications.certifications.map((cert) => cert.code).join(' · ');

/** What Bruce Works does for agencies and primes (the four cards on /government-capabilities/, and its markdown). */
export const GOV_CAPABILITIES: { title: string; points: string[] }[] = [
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

/** "Why Bruce Works" on /government-capabilities/: number, title, line. */
export const GOV_WHY: [string, string, string][] = [
  ['01', 'Operations plus technology.', 'Military logistics, supply accountability, controlled workflows, documentation, and hands-on systems implementation.'],
  ['02', 'Privacy-aware delivery.', 'Explicit data boundaries, local/offline options, controlled access, and documented handling procedures.'],
  ['03', 'Pilot first.', 'Prove a bounded workflow, acceptance standard, and reporting method before scaling.'],
  ['04', 'Owner-operated accountability.', 'Direct involvement in planning, communication, quality, and delivery.'],
  ['05', 'Clear handoff.', 'Documented workflows, staff training, and usable operational materials—not an unexplained black box.'],
];
