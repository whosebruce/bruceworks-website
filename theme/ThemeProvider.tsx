import React from 'react';
import { DEFAULT_THEME, isThemeId, themeById, type Theme, type ThemeId } from './themes';

// The theme lives on <html data-theme> (index.html sets it before first paint). Picking one re-skins the page at once,
// remembers it for the next visit, and tells every live-demo iframe on the page to wear the matching skin.
const KEY = 'bw.theme';

type Ctx = { theme: Theme; setTheme: (id: ThemeId) => void };
const ThemeContext = React.createContext<Ctx>({ theme: themeById(DEFAULT_THEME), setTheme: () => {} });

const current = (): ThemeId => {
  const t = typeof document !== 'undefined' ? document.documentElement.dataset.theme : null;
  return isThemeId(t) ? t : DEFAULT_THEME;
};

/** Tell one demo frame (or every one on the page) what to wear. */
export function tellDemo(theme: Theme, frame?: HTMLIFrameElement | null) {
  const frames = frame ? [frame] : Array.from(document.querySelectorAll<HTMLIFrameElement>('iframe[data-bw-demo]'));
  for (const f of frames) f.contentWindow?.postMessage({ type: 'bw-demo:theme', ...theme.demo }, window.location.origin);
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [id, setId] = React.useState<ThemeId>(current);
  const theme = themeById(id);

  const setTheme = React.useCallback((next: ThemeId) => {
    const root = document.documentElement;
    root.classList.add('theme-switching');
    root.dataset.theme = next;
    window.setTimeout(() => root.classList.remove('theme-switching'), 320);
    try { localStorage.setItem(KEY, next); } catch { /* private window: the choice lasts this visit */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeById(next).themeColor);
    setId(next);
    tellDemo(themeById(next));
  }, []);

  // another tab picked a theme
  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => { if (e.key === KEY && isThemeId(e.newValue) && e.newValue !== id) setTheme(e.newValue); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [id, setTheme]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => React.useContext(ThemeContext);
