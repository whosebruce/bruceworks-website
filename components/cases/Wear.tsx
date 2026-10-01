import React from 'react';
import { Palette, Undo2 } from 'lucide-react';
import { DEFAULT_THEME, themeById, type ThemeId } from '../../theme/themes';
import { useTheme } from '../../theme/ThemeProvider';

// "Wear their theme": puts a client's theme on the whole site, and takes it off again. Taking it off goes back to the
// house theme the visitor had before (remembered for this visit), so trying three clients in a row and then taking the
// last one off doesn't strand you in the second one.

let lastHouse: ThemeId | null = null;

export function useWear(target: ThemeId) {
  const { theme, setTheme } = useTheme();
  const wearing = theme.id === target;
  const back = themeById(lastHouse ?? DEFAULT_THEME);
  const wear = React.useCallback(() => {
    if (theme.id === target) return;
    if (!theme.client) lastHouse = theme.id;
    setTheme(target);
  }, [theme, target, setTheme]);
  const takeOff = React.useCallback(() => setTheme(back.id), [back.id, setTheme]);
  return { wearing, wear, takeOff, toggle: wearing ? takeOff : wear, back, current: theme };
}

/** The button. Not wearing: "Wear their theme". Wearing: "Take it off" (back to the house theme). */
export const WearButton: React.FC<{ theme: ThemeId; client: string; primary?: boolean; className?: string }> = ({ theme, client, primary, className = '' }) => {
  const { wearing, toggle, back } = useWear(theme);
  return (
    <button type="button" onClick={toggle}
      aria-label={wearing ? `Take off ${client}'s theme and go back to ${back.name}` : `Wear ${client}'s theme on this whole site`}
      className={`btn ${primary && !wearing ? 'btn-primary' : 'btn-outline'} ${className}`}>
      {wearing ? <><Undo2 size={16} aria-hidden="true" /> Take it off</> : <><Palette size={16} aria-hidden="true" /> Wear their theme</>}
    </button>
  );
};

/** One polite announcement per page when the theme changes (the buttons themselves change label). */
export const WearStatus: React.FC = () => {
  const { theme } = useTheme();
  const first = React.useRef(true);
  const [msg, setMsg] = React.useState('');
  React.useEffect(() => {
    if (first.current) { first.current = false; return; }
    setMsg(`This site is now wearing ${theme.name}.`);
  }, [theme.id, theme.name]);
  return <p role="status" aria-live="polite" className="sr-only">{msg}</p>;
};

/** The client's four brand colours from the theme definition (ground, panel, text, signal), as a strip. */
export const ThemeSwatch: React.FC<{ theme: ThemeId; className?: string; height?: number }> = ({ theme, className = '', height = 12 }) => (
  <span aria-hidden="true" className={`flex overflow-hidden border border-line ${className}`} style={{ height, borderRadius: 'var(--radius)' }}>
    {themeById(theme).swatch.map((c, i) => <span key={i} style={{ background: c, flex: i === 3 ? 1.4 : 1 }} />)}
  </span>
);
