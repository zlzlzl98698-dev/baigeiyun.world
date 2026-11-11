const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');

function scanDir(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (f === '.vitepress' || f === 'public' || f.endsWith('.md')) {
      if (fs.statSync(full).isDirectory()) {
        if (f !== 'cache' && f !== 'dist' && f !== 'images') {
          files.push(...scanDir(full));
        }
      } else {
        files.push(full);
      }
    } else if (fs.statSync(full).isDirectory()) {
      files.push(...scanDir(full));
    }
  });
  return files;
}

const allFiles = scanDir(docsDir);
console.log('Total files scanned for indexing controls:', allFiles.length);

let findings = [];

allFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (/noindex/i.test(content) && !f.endsWith('.htaccess') && !f.endsWith('robots.txt')) {
    findings.push({ file: path.relative(docsDir, f), pattern: 'noindex' });
  }
  if (/Disallow:\s*\//i.test(content)) {
    findings.push({ file: path.relative(docsDir, f), pattern: 'Disallow: /' });
  }
  if (/X-Robots-Tag/i.test(content)) {
    findings.push({ file: path.relative(docsDir, f), pattern: 'X-Robots-Tag' });
  }
});

console.log('Findings count:', findings.length);
if (findings.length > 0) {
  console.log('Details:', findings);
} else {
  console.log('Clean! Zero accidental noindex, Disallow: /, or X-Robots-Tag found in source files.');
}
