import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lands on `#anchor` links (/services/#ai-audit, /pricing/#loadout, /faq/#pricing). The router scrolls every new page
 * to the top, and React Router doesn't follow fragments on its own, so a page that has anchors calls this. Runs after
 * the scroll-to-top (page effects fire after App's), and again once fonts have settled the layout. `fallback` maps an
 * anchor that a small screen hides (display: none) to the one to land on instead.
 */
export function useHashScroll(fallback: Record<string, string> = {}) {
  const { hash, pathname } = useLocation();
  React.useEffect(() => {
    if (!hash || hash.length < 2) return;
    let id = hash.slice(1);
    try { id = decodeURIComponent(id); } catch { /* keep the raw id */ }
    const go = () => {
      let el = document.getElementById(id);
      if (el && el.offsetParent === null && fallback[id]) el = document.getElementById(fallback[id]);
      el?.scrollIntoView({ block: 'start' });
    };
    go();
    const t = window.setTimeout(go, 150);
    return () => window.clearTimeout(t);
  }, [hash, pathname]);
}
