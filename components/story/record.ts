// Bruce's record, newest first: dates and duties as Bruce wrote them, nothing estimated. Experience shows it.
export type Post = { id: string; role: string; org?: string; short: string; from: [number, number]; to: [number, number] | null; dates: string; points: string[] };

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
    id: 'it', role: 'IT', short: 'IT', from: [2019, 8], to: null, dates: 'August 2019 – Present',
    points: [
      'Troubleshoot equipment, configure services and support network connectivity.',
      'Support computer configuration and document technical layouts.',
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

// Years of experience, said without employer, unit or dates (Bruce, 2026-11-01).
export const LOGISTICS_YEARS = '10+ years of logistics, supply, inventory and operations';
export const IT_YEARS = '7+ years of IT, network support, troubleshooting and technical problem solving';
