const fs = require('node:fs');
const path = require('node:path');
const metadata = require('../src/seo/pages.json');

const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');
const template = fs.readFileSync(path.join(build, 'index.html'), 'utf8');
const block = /<meta name="app-seo-start"[^>]*>[\s\S]*?<meta name="app-seo-end"[^>]*>/;
if (!block.test(template)) throw new Error('SEO template markers are missing from build/index.html');

const escape = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

const redirects = [];
for (const [route, page] of Object.entries(metadata.pages)) {
  const url = new URL(route, metadata.siteUrl).href;
  const imagePath = page.image.startsWith('/') ? page.image : `/og/${page.image}`;
  const image = new URL(imagePath, metadata.siteUrl).href;
  if (!fs.existsSync(path.join(build, imagePath))) {
    throw new Error(`Missing OG image: ${page.image}`);
  }
  const tags = [
    '<meta name="app-seo-start" content="">',
    `<title>${escape(page.title)}</title>`,
    `<link rel="canonical" href="${escape(url)}">`,
    ...Object.entries({
      description: page.description,
      'twitter:card': 'summary_large_image',
      'twitter:title': page.title,
      'twitter:description': page.description,
      'twitter:image': image,
    }).map(([name, value]) => `<meta name="${name}" content="${escape(value)}">`),
    ...Object.entries({
      'og:type': 'website',
      'og:site_name': metadata.siteName,
      'og:title': page.title,
      'og:description': page.description,
      'og:url': url,
      'og:image': image,
    }).map(([property, value]) => `<meta property="${property}" content="${escape(value)}">`),
    '<meta name="app-seo-end" content="">',
  ].join('\n');

  // Preserve bundled React scripts and styles in every page shell.
  const destination = route === '/' ? '/index.html' : `/page-meta${route}.html`;
  const output = path.join(build, destination);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, template.replace(block, () => tags));
  if (route !== '/') {
    redirects.push(`${route} ${destination} 200`, `${route}/ ${destination} 200`);
  }
}

// Keep token URLs intact for React Router, but serve generic reset metadata.
redirects.push('/reset-password/* /page-meta/reset-password.html 200');
const fallback = fs.readFileSync(path.join(root, 'public/_redirects'), 'utf8');
fs.writeFileSync(path.join(build, '_redirects'), `${redirects.join('\n')}\n${fallback}`);
console.log(`Generated metadata HTML for ${Object.keys(metadata.pages).length} routes.`);
