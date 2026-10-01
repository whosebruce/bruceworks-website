// Every picture and motion loop on the site, in one place. Files live in public/media/. A slot left null renders a
// designed placeholder, so a page never shows a broken image while art is still being made.

export type Still = { src: string; alt: string; w: number; h: number } | null;
export type LoopMedia = { mp4: string; webm?: string; poster: string; label: string } | null;

export const STILLS: Record<string, Still> = {
  heroSquad: { src: '/media/art/hero-squad-five.webp', alt: 'Bruce at a command desk with three monitors, his five AI bots Mira, Apollo, Vulcan, Jade and Otto standing behind him', w: 1600, h: 893 },
  bruceBriefing: { src: '/media/art/bruce-briefing-pointing.webp', alt: 'Bruce pointing to the side, briefing', w: 1289, h: 1600 },
  // Bruce's signature sign (index + middle together, ring + pinky together, thumb out); the call-to-action pose
  bruceSalute: { src: '/media/art/bruce-cta-sign.webp', alt: 'Bruce raising his hand in his signature sign', w: 1289, h: 1600 },
  bruceWhiteboard: { src: '/media/art/bruce-whiteboard-planning.webp', alt: 'Bruce at a whiteboard mapping a workflow, with the outcome circled', w: 1600, h: 1195 },
  mira: { src: '/media/art/bot-mira-data-board.webp', alt: 'Mira, who runs command and the agents, pointing at a board of charts', w: 1600, h: 1600 },
  apollo: { src: '/media/art/bot-apollo-content.webp', alt: 'Apollo, the content bot, with a video camera and a storyboard', w: 1600, h: 1600 },
  jade: { src: '/media/art/bot-jade-research.webp', alt: 'Jade, the research bot, reading a file through a magnifying glass beside a board of linked sources', w: 1600, h: 1600 },
  vulcan: { src: '/media/art/bot-vulcan-builder.webp', alt: 'Vulcan, the builder bot, at a workbench with a screwdriver, a circuit board and a laptop of code', w: 1600, h: 1600 },
  otto: { src: '/media/art/bot-otto-checklist.webp', alt: 'Otto, the ops bot, ticking off a checklist', w: 1600, h: 1600 },
  demoPoster: { src: '/media/art/demo-command-1440.webp', alt: 'The Bruce Works Command Center on sample data, Command view', w: 1440, h: 900 },
};

export const LOOPS: Record<string, LoopMedia> = {
  opIntro: { mp4: '/media/motion/op-intro.mp4', poster: '/media/motion/op-intro.webp', label: 'Motion graphic: OP-01 // Private AI Command Center, then the headline One command center. Your whole operation.' },
  themeMorph: { mp4: '/media/motion/theme-morph.mp4', poster: '/media/motion/theme-morph.webp', label: 'Motion graphic: one command center window changing through five themes' },
  missionBrief: { mp4: '/media/motion/mission-brief.mp4', poster: '/media/motion/mission-brief.webp', label: 'Motion graphic: the four steps, Recon, Build, Train, Command' },
  credentials: { mp4: '/media/motion/credentials.mp4', poster: '/media/motion/credentials.webp', label: 'Motion graphic: SDVOSB, VOSB, DVBE and SAM.gov credential cards, then UEI and CAGE' },
  squad: { mp4: '/media/motion/squad.mp4', poster: '/media/motion/squad.webp', label: 'Motion graphic: Mira, Apollo, Jade, Otto and Vulcan line up with their jobs, then Bruce, founder' },
  ctaClose: { mp4: '/media/motion/cta-close.mp4', poster: '/media/motion/cta-close.webp', label: "Motion graphic: Here's the mission. Here's the gear. Execute. Book the audit, $197" },
  crew: { mp4: '/media/motion/module-crew.mp4', poster: '/media/motion/module-crew.webp', label: 'Motion graphic: Mira, Apollo, Jade, Otto and Vulcan go from standby to working while their log lines type in' },
  jot: { mp4: '/media/motion/module-jot.mp4', poster: '/media/motion/module-jot.webp', label: 'Motion graphic: a checklist ticks itself off and a sticky note drops in' },
  office: { mp4: '/media/motion/module-office.mp4', poster: '/media/motion/module-office.webp', label: 'Motion graphic: a document, a spreadsheet and a slide come together' },
  studio: { mp4: '/media/motion/module-studio.mp4', poster: '/media/motion/module-studio.webp', label: 'Motion graphic: an image generates into a finished poster' },
  school: { mp4: '/media/motion/module-school.mp4', poster: '/media/motion/module-school.webp', label: 'Motion graphic: an assignment goes from due Thursday to submitted' },
  approvals: { mp4: '/media/motion/module-approvals.mp4', poster: '/media/motion/module-approvals.webp', label: 'Motion graphic: an agent asks to restart a service and the request is approved' },
  files: { mp4: '/media/motion/module-files.mp4', poster: '/media/motion/module-files.webp', label: 'Motion graphic: folders open to an estimate PDF in the preview pane while two loose files sort themselves into the client folder' },
  library: { mp4: '/media/motion/module-library.mp4', poster: '/media/motion/module-library.webp', label: 'Motion graphic: a grid of images, videos, audio and documents, each tagged, with one video lifting into a big preview' },
  projects: { mp4: '/media/motion/module-projects.mp4', poster: '/media/motion/module-projects.webp', label: 'Motion graphic: the project scope switches from all to one client and the whole dashboard filters to it' },
  finance: { mp4: '/media/motion/module-finance.mp4', poster: '/media/motion/module-finance.webp', label: 'Motion graphic: an invoice goes from draft to sent to paid while the month’s spending bar fills' },
  pages: { mp4: '/media/motion/module-pages.mp4', poster: '/media/motion/module-pages.webp', label: 'Motion graphic: coming soon: a page is typed in, the slash menu adds a linked database, and its table turns into a board' },
  motion: { mp4: '/media/motion/module-motion.mp4', poster: '/media/motion/module-motion.webp', label: 'Motion graphic: a headline is typed into a title card, rendered to 100 percent and saved as an MP4' },
  voice: { mp4: '/media/motion/module-voice.mp4', poster: '/media/motion/module-voice.webp', label: 'Motion graphic: a script line turns into a voiceover waveform with a playhead and is saved' },
  content: { mp4: '/media/motion/module-content.mp4', poster: '/media/motion/module-content.webp', label: 'Motion graphic: four content cards move from idea to script to shoot to posted' },
  notifications: { mp4: '/media/motion/module-notifications.mp4', poster: '/media/motion/module-notifications.webp', label: 'Motion graphic: reminders, an approval request and a finished job stack under one bell, and a phone gets the push' },
  vault: { mp4: '/media/motion/module-vault.mp4', poster: '/media/motion/module-vault.webp', label: 'Motion graphic: an API key passes through a locked slot to the builder agent, never through a chat' },
  web: { mp4: '/media/motion/module-web.mp4', poster: '/media/motion/module-web.webp', label: 'Motion graphic: a directory of sites with up and down status lights, then a browser opens bruceworks.net' },
  heroSquadLoop: null, // the five-bot loop is on the way; the still shows until then
  miraLoop: { mp4: '/media/motion/loop-mira-data-board.mp4', poster: '/media/motion/loop-mira-data-board-poster.webp', label: 'Mira at a data board that refreshes' },
};
