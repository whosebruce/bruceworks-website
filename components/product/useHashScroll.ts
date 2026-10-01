import React from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll to #section after the page renders (the router itself starts every page at the top). */
export function useHashScroll() {
  const { hash, pathname } = useLocation();
  React.useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 60);
    return () => window.clearTimeout(t);
  }, [hash, pathname]);
}
