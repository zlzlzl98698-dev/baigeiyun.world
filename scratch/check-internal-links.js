const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'docs', '.vitepress', 'dist');

function getHtmlFiles(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) res.push(...getHtmlFiles(full));
    else if (f.endsWith('.html')) res.push(full);
  });
  return res;
}

const htmls = getHtmlFiles(distDir);
let totalInternalLinks = 0;
let brokenLinks = [];

htmls.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi);
  for (const m of matches) {
    let href = m[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }
    totalInternalLinks++;
    let cleanHref = href.split('#')[0].split('?')[0];
    if (!cleanHref || cleanHref === '/') {
      cleanHref = '/index.html';
    } else if (cleanHref.endsWith('/')) {
      cleanHref += 'index.html';
    } else if (!cleanHref.endsWith('.html')) {
      cleanHref += '.html';
    }
    let targetPath;
    if (cleanHref.startsWith('/')) {
      targetPath = path.join(distDir, cleanHref.slice(1));
    } else {
      targetPath = path.resolve(path.dirname(f), cleanHref);
    }
    if (!fs.existsSync(targetPath)) {
      brokenLinks.push({ from: path.relative(distDir, f), href, targetPath });
    }
  }
});

console.log('Total internal links checked:', totalInternalLinks);
console.log('Broken internal links count:', brokenLinks.length);
if (brokenLinks.length > 0) {
  console.log('Broken link samples:', brokenLinks.slice(0, 5));
}
