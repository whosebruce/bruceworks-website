// Bruce's record, newest first: dates and duties as Bruce wrote them, nothing estimated. Experience shows it; About
// counts the years from it (so "N+ years" stays true as time passes).
export type Post = { id: string; role: string; org: string; short: string; from: [number, number]; to: [number, number] | null; dates: string; points: string[] };

export const RECORD: Post[] = [
  {
    id: 'bw', role: 'CEO / Systems Builder', org: 'Bruce Works LLC', short: 'Bruce Works LLC', from: [2022, 4], to: null, dates: 'April 2022 – Present',
    points: [
      'Build practical systems for clients using AI, documentation, templates, technical setup and hands-on support.',
      'Help owner-led service businesses organize scattered information into usable workflows.',
      'Develop the AI Leverage Audit, the client-owned Command Center Foundation, bounded workflow builds and support offers.',
    ],
  },
  {
    id: 'nsw', role: 'Supply Technician', org: 'Naval Special Warfare Center Ranges West', short: 'NSW Center Ranges West', from: [2019, 11], to: null, dates: 'November 2019 – Present',
    points: [
      'Maintain records for assets across range sites and support disposal, ordering and equipment accountability.',
      'Use logistics systems including DPAS and ETIDS to track property and support operational readiness.',
      'Assist range managers with supplies, equipment requests and documentation for high-value assets.',
    ],
  },
  {
    id: 'arng', role: 'Information Technology Specialist', org: 'California Army National Guard', short: 'CA Army National Guard', from: [2019, 8], to: null, dates: 'August 2019 – Present',
    points: [
      'Troubleshoot equipment, configure services, support network connectivity and document technical layouts.',
      'Run and terminate long-distance ethernet, support computer configuration and help keep systems operational.',
      'Work across secure communication, file service, SharePoint, VOIP and related technical environments.',
    ],
  },
  {
    id: 'usmc', role: 'Logistics Supervisor / Logistics Clerk / Facilities Manager', org: 'United States Marine Corps', short: 'U.S. Marine Corps', from: [2016, 4], to: [2019, 8], dates: 'April 2016 – August 2019',
    points: [
      'Led, mentored and trained personnel supporting logistics and deployment readiness.',
      'Coordinated training operations and logistical support across multiple military branches.',
      'Managed facilities requests, inspections, equipment readiness and high-value inventory with zero-loss accountability.',
    ],
  },
];

const months = (from: [number, number], to: [number, number] | null, now = new Date()) =>
  ((to ? to[0] : now.getFullYear()) - from[0]) * 12 + ((to ? to[1] : now.getMonth() + 1) - from[1]);

/** Whole years served in the given posts (they don't overlap within a lane, so their months add up). */
export const yearsIn = (ids: string[]) => Math.floor(RECORD.filter((p) => ids.includes(p.id)).reduce((m, p) => m + months(p.from, p.to), 0) / 12);
