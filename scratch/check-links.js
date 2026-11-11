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
let externalLinks = 0;
let safeLinks = 0;
let unsafeLinks = [];

htmls.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.matchAll(/<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi);
  for (const m of matches) {
    const tag = m[0];
    const url = m[1];
    if (!url.includes('baigeiyun.world') && !url.includes('schema.org') && !url.includes('w3.org')) {
      externalLinks++;
      const hasNofollow = /rel=["'][^"']*nofollow[^"']*["']/i.test(tag);
      const hasSponsored = /rel=["'][^"']*sponsored[^"']*["']/i.test(tag);
      if (hasNofollow && hasSponsored) {
        safeLinks++;
      } else {
        unsafeLinks.push({ f: path.relative(distDir, f), url, tag });
      }
    }
  }
});

console.log('Total external commercial links:', externalLinks);
console.log('Safe external links (nofollow sponsored):', safeLinks);
console.log('Unsafe external links count:', unsafeLinks.length);
if (unsafeLinks.length > 0) {
  console.log('Unsafe link samples:', unsafeLinks.slice(0, 5));
}
