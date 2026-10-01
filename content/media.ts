// Every picture and motion loop on the site, in one place. Files live in public/media/. A slot left null renders a
// designed placeholder, so a page never shows a broken image while art is still being made.

export type Still = { src: string; alt: string; w: number; h: number } | null;
export type LoopMedia = { mp4: string; webm?: string; poster: string; label: string } | null;

export const STILLS: Record<string, Still> = {
  heroSquad: null,
  bruceBriefing: null,
  bruceSalute: null,
  bruceWhiteboard: null,
  mira: null,
  apollo: null,
  jade: null,
  otto: null,
  demoPoster: null,
};

export const LOOPS: Record<string, LoopMedia> = {
  opIntro: { mp4: '/media/motion/op-intro.mp4', poster: '/media/motion/op-intro.webp', label: 'Motion graphic: OP-01 // Private AI Command Center, then the headline One command center. Your whole operation.' },
  themeMorph: { mp4: '/media/motion/theme-morph.mp4', poster: '/media/motion/theme-morph.webp', label: 'Motion graphic: one command center window changing through five themes' },
  missionBrief: { mp4: '/media/motion/mission-brief.mp4', poster: '/media/motion/mission-brief.webp', label: 'Motion graphic: the four steps, Recon, Build, Train, Command' },
  credentials: { mp4: '/media/motion/credentials.mp4', poster: '/media/motion/credentials.webp', label: 'Motion graphic: SDVOSB, VOSB, DVBE and SAM.gov credential cards, then UEI and CAGE' },
  squad: { mp4: '/media/motion/squad.mp4', poster: '/media/motion/squad.webp', label: 'Motion graphic: Mira, Apollo, Jade and Otto line up, then Bruce, founder' },
  ctaClose: { mp4: '/media/motion/cta-close.mp4', poster: '/media/motion/cta-close.webp', label: "Motion graphic: Here's the mission. Here's the gear. Execute. Book the audit, $197" },
  crew: { mp4: '/media/motion/module-crew.mp4', poster: '/media/motion/module-crew.webp', label: 'Motion graphic: agents go from standby to working while a log line types in' },
  jot: { mp4: '/media/motion/module-jot.mp4', poster: '/media/motion/module-jot.webp', label: 'Motion graphic: a checklist ticks itself off and a sticky note drops in' },
  office: { mp4: '/media/motion/module-office.mp4', poster: '/media/motion/module-office.webp', label: 'Motion graphic: a document, a spreadsheet and a slide come together' },
  studio: { mp4: '/media/motion/module-studio.mp4', poster: '/media/motion/module-studio.webp', label: 'Motion graphic: an image generates into a finished poster' },
  school: { mp4: '/media/motion/module-school.mp4', poster: '/media/motion/module-school.webp', label: 'Motion graphic: an assignment goes from due Thursday to submitted' },
  approvals: { mp4: '/media/motion/module-approvals.mp4', poster: '/media/motion/module-approvals.webp', label: 'Motion graphic: an agent asks to restart a service and the request is approved' },
};
