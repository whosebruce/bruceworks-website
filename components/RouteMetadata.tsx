import React from 'react';
import { useLocation } from 'react-router-dom';
import seo from '../seo/routes.json';

const setAttr = (selector: string, attribute: string, value: string) => {
  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
};

/**
 * Keeps the document head in sync with seo/routes.json during client-side
 * navigation. Direct requests are covered by the per-route static shells
 * written at build time from the same JSON source.
 */
export const RouteMetadata: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const route = seo.routes.find((entry) => entry.path === normalized) as
      | { path: string; title: string; description: string; robots: string; ogDescription?: string }
      | undefined;
    const title = route ? route.title : seo.notFound.title;
    const description = route ? route.description : seo.notFound.description;
    const ogDescription = route?.ogDescription ?? description;
    const robots = route ? route.robots : seo.notFound.robots;
    const url = `${seo.site.origin}${normalized}`;

    document.title = title;
    setAttr('meta[name="description"]', 'content', description);
    setAttr('meta[name="robots"]', 'content', robots);
    setAttr('link[rel="canonical"]', 'href', url);
    setAttr('meta[property="og:url"]', 'content', url);
    setAttr('meta[property="og:title"]', 'content', title);
    setAttr('meta[property="og:description"]', 'content', ogDescription);
    setAttr('meta[name="twitter:url"]', 'content', url);
    setAttr('meta[name="twitter:title"]', 'content', title);
    setAttr('meta[name="twitter:description"]', 'content', ogDescription);
  }, [pathname]);

  return null;
};
