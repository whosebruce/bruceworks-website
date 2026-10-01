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
  opIntro: null,
  themeMorph: null,
  missionBrief: null,
  credentials: null,
  squad: null,
  ctaClose: null,
  crew: null,
  jot: null,
  office: null,
  studio: null,
  school: null,
  approvals: null,
};
