// Every picture and motion loop on the site, in one place. Files live in public/media/. A slot left null renders a
// designed placeholder, so a page never shows a broken image while art is still being made.

export type Still = { src: string; alt: string; w: number; h: number } | null;
export type LoopMedia = { mp4: string; webm?: string; poster: string; label: string } | null;

export const STILLS: Record<string, Still> = {
  heroSquad: { src: '/media/art/hero-squad-command-desk.webp', alt: 'Bruce at a command desk with three monitors, his four AI bots Mira, Apollo, Jade and Otto standing behind him', w: 1600, h: 893 },
  bruceBriefing: { src: '/media/art/bruce-briefing-pointing.webp', alt: 'Bruce pointing to the side, briefing', w: 1289, h: 1600 },
  bruceSalute: { src: '/media/art/bruce-cta-thumbs-up.webp', alt: 'Bruce giving a thumbs-up', w: 1289, h: 1600 },
  bruceWhiteboard: { src: '/media/art/bruce-whiteboard-planning.webp', alt: 'Bruce at a whiteboard mapping a workflow, with the outcome circled', w: 1600, h: 1195 },
  mira: { src: '/media/art/bot-mira-data-board.webp', alt: 'Mira, the command and data bot, pointing at a board of charts', w: 1600, h: 1600 },
  apollo: { src: '/media/art/bot-apollo-wiring-automation.webp', alt: 'Apollo, the automations bot, wiring cables into a junction box', w: 1600, h: 1600 },
  jade: { src: '/media/art/bot-jade-camera-storyboard.webp', alt: 'Jade, the content bot, with a camera and a storyboard', w: 1600, h: 1600 },
  otto: { src: '/media/art/bot-otto-checklist.webp', alt: 'Otto, the ops bot, ticking off a checklist', w: 1600, h: 1600 },
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
  heroSquadLoop: { mp4: '/media/motion/loop-hero-squad.mp4', poster: '/media/motion/loop-hero-squad-poster.webp', label: 'Bruce and his four bots at the command desk, moving slightly' },
  miraLoop: { mp4: '/media/motion/loop-mira-data-board.mp4', poster: '/media/motion/loop-mira-data-board-poster.webp', label: 'Mira at a data board that refreshes' },
  apolloLoop: { mp4: '/media/motion/loop-apollo-wiring.mp4', poster: '/media/motion/loop-apollo-wiring-poster.webp', label: 'Apollo wiring an automation, light pulsing along the cables' },
};
