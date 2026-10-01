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
