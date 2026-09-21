import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import metadata from '../seo/pages.json';

const setMetaTag = (attribute, key, content) => {
  if (!content) return;

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setCanonical = (url) => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', url);
};

function SEOManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/';
    // Keep password-reset tokens out of public metadata.
    const route = path.startsWith('/reset-password/') ? '/reset-password' : path;
    const meta = metadata.pages[route] || metadata.pages['/'];
    const canonicalUrl = new URL(metadata.pages[route] ? route : '/', metadata.siteUrl).href;
    const imageUrl = new URL('/og/' + meta.image, metadata.siteUrl).href;

    document.title = meta.title;
    setCanonical(canonicalUrl);

    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', imageUrl);

    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', metadata.siteName);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', imageUrl);
  }, [pathname]);

  return null;
}

export default SEOManager;
