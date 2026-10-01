// The site's themes. Bruce Works wears Field Manual; the others show what a Command Center can look like for a client
// (the same skin idea the OS itself uses: tokens, corners, type). The CSS for each lives in index.css under
// :root[data-theme="<id>"]; this file is what the picker shows and what the live demo is told to wear.
// index.html sets data-theme before first paint from ?theme= or localStorage, so keep the ids in sync with it.

export type ThemeId = 'field-manual' | 'field-day' | 'midnight-plush' | 'harbor' | 'phosphor';

export type Theme = {
  id: ThemeId;
  name: string;
  /** One line on who it's for. */
  tagline: string;
  /** Picker swatches: ground, panel, text, signal. */
  swatch: [string, string, string, string];
  /** What the live demo wears for this theme (the OS's own skin ids). */
  demo: { theme: string; mode: 'dark' | 'light' };
  /** The browser chrome color on phones. */
  themeColor: string;
  brand?: true;
};

export const THEMES: Theme[] = [
  {
    id: 'field-manual', name: 'Field Manual', tagline: 'Night Ops and Signal Yellow. The Bruce Works standard.',
    swatch: ['#15181C', '#1c2023', '#E8E4DA', '#FEB019'], demo: { theme: 'field-manual', mode: 'dark' }, themeColor: '#15181C', brand: true,
  },
  {
    id: 'field-day', name: 'Field Manual // Day', tagline: 'The same standard on Bone paper, for daylight work.',
    swatch: ['#E8E4DA', '#E0DBCE', '#15181C', '#FEB019'], demo: { theme: 'field-manual', mode: 'light' }, themeColor: '#E8E4DA', brand: true,
  },
  {
    id: 'midnight-plush', name: 'Midnight Plush', tagline: 'Soft, rounded and after dark. For a personal command center.',
    swatch: ['#1A1320', '#2D2238', '#F6EAD0', '#FF9DB8'], demo: { theme: 'midnight-plush', mode: 'dark' }, themeColor: '#1A1320',
  },
  {
    id: 'harbor', name: 'Harbor', tagline: 'Clean navy and teal. For a clinic, a firm or an office.',
    swatch: ['#F6F8FB', '#FFFFFF', '#0C2340', '#0E7C86'], demo: { theme: 'harbor', mode: 'light' }, themeColor: '#F6F8FB',
  },
  {
    id: 'phosphor', name: 'Phosphor', tagline: 'Green on black, all mono. For the shop that lives in a terminal.',
    swatch: ['#050806', '#0A100C', '#CFFFD6', '#39FF88'], demo: { theme: 'phosphor', mode: 'dark' }, themeColor: '#050806',
  },
];

export const DEFAULT_THEME: ThemeId = 'field-manual';
export const themeById = (id: string | null | undefined): Theme => THEMES.find((t) => t.id === id) ?? THEMES[0];
export const isThemeId = (id: unknown): id is ThemeId => typeof id === 'string' && THEMES.some((t) => t.id === id);
