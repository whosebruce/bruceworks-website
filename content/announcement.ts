// The bar across the top of every page (components/AnnouncementBar.tsx). Set `on: false` to take it down. A visitor who
// closes it doesn't see it again until `id` changes, so give a new announcement a new id.
//
// Bruce, 2026-10-16: point family and friends who land on bruceworks.net to the baby's gender-reveal game. The copy
// matches the game's own flyer and link card: it never shows a name, a gender or a date.

export type Announcement = {
  on: boolean;
  /** Pages it stays off, so it doesn't compete with their one next step. */
  hideOn?: string[];
  id: string;
  tag: string;
  /** Always shown. */
  lead: string;
  /** Shown from small tablets up; phones get the lead and the link only. */
  more?: string;
  link: { label: string; href: string };
  /** false: no close button, and the bar shows even for someone who closed an earlier one. */
  closable?: boolean;
};

/** When the reveal happens: noon Pacific on 2026-11-15, the same moment the game's own countdown ends. It is never shown
 * on the site; it only decides which words show, so nobody has to deploy at noon. */
export const REVEAL_AT = Date.parse('2026-11-15T12:00:00-08:00');
export const revealed = (now: number = Date.now()) => now >= REVEAL_AT;

// Bruce, 2026-11-15: the family bar has no X and stays on every page ("can the gender card not show an x and stay there").
const BEFORE: Announcement = {
  on: true,
  closable: false,
  hideOn: ['/websites'],
  id: 'baby-forecast-2026-10',
  tag: 'Family news',
  lead: 'Bruce has a baby on the way. Boy or girl?',
  more: 'Make your call before the big reveal.',
  link: { label: 'Play Baby Forecast', href: 'https://gender.bruceworks.net/' },
};

// Bruce, 2026-11-15 ("Update it"): after the reveal the bar says it's in, still without a name, a gender or a date.
// A new id, so someone who closed the first bar sees this one once.
const AFTER: Announcement = {
  ...BEFORE,
  id: 'baby-forecast-reveal-2026-11-15',
  lead: 'Bruce has a baby on the way, and the reveal is in.',
  more: 'Boy or girl? See who called it.',
  link: { label: 'See the reveal', href: 'https://gender.bruceworks.net/' },
};

/** The bar for a given moment: before the reveal, or after it. */
export const announcementAt = (now: number = Date.now()): Announcement => (revealed(now) ? AFTER : BEFORE);

/** The bar as of when the page loaded. */
export const ANNOUNCEMENT: Announcement = announcementAt();
