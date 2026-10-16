// The bar across the top of every page (components/AnnouncementBar.tsx). Set `on: false` to take it down. A visitor who
// closes it doesn't see it again until `id` changes, so give a new announcement a new id.
//
// Bruce, 2026-10-16: point family and friends who land on bruceworks.net to the baby's gender-reveal game. The copy
// matches the game's own flyer and link card: it never shows a name, a gender or a date.

export type Announcement = {
  on: boolean;
  id: string;
  tag: string;
  /** Always shown. */
  lead: string;
  /** Shown from small tablets up; phones get the lead and the link only. */
  more?: string;
  link: { label: string; href: string };
};

export const ANNOUNCEMENT: Announcement = {
  on: true,
  id: 'baby-forecast-2026-10',
  tag: 'Family news',
  lead: 'Bruce has a baby on the way. Boy or girl?',
  more: 'Make your call before the big reveal.',
  link: { label: 'Play Baby Forecast', href: 'https://gender.bruceworks.net/' },
};
