import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import homeOgImage from '../images/header-bg2.jpg';
import signupOgImage from '../images/signupbg.png';
import loginOgImage from '../images/insulet2.png';
import guidelinesOgImage from '../images/cg-banner.jpg';
import dashboardOgImage from '../images/image1.png';
import analyticsOgImage from '../images/image2.png';
import profileOgImage from '../images/profile-image1.jpg';
import notificationsOgImage from '../images/image3.png';
import defaultOgImage from '../images/site-logo.png';

const SITE_URL = 'https://omnipodcreatormarketplace.com';
const DEFAULT_TITLE = 'Omnipod Creator Marketplace';
const DEFAULT_DESCRIPTION = 'A place for the Omnipod community to share lived experiences through authentic storytelling.';

const pageMeta = {
  '/': {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    image: homeOgImage,
  },
  '/insulet-member-login': {
    title: 'Insulet Member Login | Omnipod Creator Marketplace',
    description: 'Insulet team members can access the Omnipod Creator Marketplace admin experience.',
    image: defaultOgImage,
  },
  '/omnipod-creator-login': {
    title: 'Creator Login | Omnipod Creator Marketplace',
    description: 'Log in to upload content, manage submissions, and track Creator Marketplace activity.',
    image: loginOgImage,
  },
  '/omnipod-creator-signup': {
    title: 'Creator Signup | Omnipod Creator Marketplace',
    description: 'Join the Omnipod Creator Marketplace and share authentic content with the Omnipod community.',
    image: signupOgImage,
  },
  '/dashboard': {
    title: 'Creator Dashboard | Omnipod Creator Marketplace',
    description: 'Upload content, review creator resources, and view marketplace activity from your creator dashboard.',
    image: dashboardOgImage,
  },
  '/analytics': {
    title: 'Analytics Overview | Omnipod Creator Marketplace',
    description: 'Review performance metrics for approved Omnipod Creator Marketplace content.',
    image: analyticsOgImage,
  },
  '/profile': {
    title: 'Creator Profile | Omnipod Creator Marketplace',
    description: 'Manage your submitted content, review approval status, and update your creator profile.',
    image: profileOgImage,
  },
  '/content-guidelines': {
    title: 'Content Guidelines | Omnipod Creator Marketplace',
    description: 'Review Omnipod Creator Marketplace content guidelines before submitting photos or videos.',
    image: guidelinesOgImage,
  },
  '/social-media-policy': {
    title: 'Social Media Policy | Omnipod Creator Marketplace',
    description: 'Read the social media policy for Omnipod Creator Marketplace content submissions.',
    image: defaultOgImage,
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Omnipod Creator Marketplace',
    description: 'Read how Insulet processes personal data for Omnipod products, services, and creator marketplace activity.',
    image: defaultOgImage,
  },
  '/notifications': {
    title: 'Notifications | Omnipod Creator Marketplace',
    description: 'View updates about your Omnipod Creator Marketplace submissions and account activity.',
    image: notificationsOgImage,
  },
  '/forgot-password': {
    title: 'Forgot Password | Omnipod Creator Marketplace',
    description: 'Request a password reset link for your Omnipod Creator Marketplace account.',
    image: loginOgImage,
  },
  '/reset-password': {
    title: 'Reset Password | Omnipod Creator Marketplace',
    description: 'Reset your Omnipod Creator Marketplace account password.',
    image: loginOgImage,
  },
  '/docusign/callback': {
    title: 'Agreement Complete | Omnipod Creator Marketplace',
    description: 'Your Omnipod Creator Marketplace content agreement status is being confirmed.',
    image: defaultOgImage,
  },
};

const findMeta = (pathname) => {
  if (pathname.startsWith('/reset-password')) {
    return pageMeta['/reset-password'];
  }

  return pageMeta[pathname] || pageMeta['/'];
};

const absoluteUrl = (path) => {
  if (!path) return `${SITE_URL}/logo512.png`;
  if (/^https?:\/\//i.test(path)) return path;

  return new URL(path, SITE_URL).toString();
};

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
    const meta = findMeta(pathname);
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
    const imageUrl = absoluteUrl(meta.image);

    document.title = meta.title;
    setCanonical(canonicalUrl);

    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', imageUrl);

    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', DEFAULT_TITLE);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', imageUrl);
  }, [pathname]);

  return null;
}

export default SEOManager;
