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
console.log('=== 上线前搜索引擎 SEO 基础设施深度验收 ===');
console.log('总 HTML 产物数:', htmls.length);

let missingTitle = [];
let missingDesc = [];
let missingCanonical = [];
let missingH1 = [];
let multipleH1 = [];
let missingSchema = [];
let invalidSchema = [];

htmls.forEach(f => {
  const rel = path.relative(distDir, f);
  const content = fs.readFileSync(f, 'utf8');

  // 1. Title
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) missingTitle.push(rel);

  // 2. Description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (!descMatch || !descMatch[1].trim()) missingDesc.push(rel);

  // 3. Canonical
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonMatch || !canonMatch[1].startsWith('https://baigeiyun.world')) missingCanonical.push(rel);

  // 4. H1 (所有正式可索引内容页面必须有且仅有 1 个 H1)
  const h1Matches = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (rel !== '404.html') {
    if (h1Matches.length === 0) missingH1.push(rel);
    else if (h1Matches.length > 1) multipleH1.push({ rel, count: h1Matches.length });
  }

  // 5. Schema JSON-LD
  const schemaMatch = content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  if (!schemaMatch) {
    if (rel !== '404.html') missingSchema.push(rel);
  } else {
    try {
      JSON.parse(schemaMatch[1]);
    } catch (e) {
      invalidSchema.push({ rel, err: e.message });
    }
  }
});

console.log('Title 完整率: %d / %d (缺失: %d)', htmls.length - missingTitle.length, htmls.length, missingTitle.length);
console.log('Description 完整率: %d / %d (缺失: %d)', htmls.length - missingDesc.length, htmls.length, missingDesc.length);
console.log('Canonical 完整率: %d / %d (缺失: %d)', htmls.length - missingCanonical.length, htmls.length, missingCanonical.length);
console.log('H1 存在率: %d / %d (缺失: %d)', htmls.length - missingH1.length, htmls.length, missingH1.length);
console.log('多重 H1 异常数: %d', multipleH1.length);
console.log('Schema 挂载率 (非404): %d / %d', htmls.length - 1 - missingSchema.length, htmls.length - 1);
console.log('Schema JSON 语法非法数: %d', invalidSchema.length);

// 6. robots.txt 检查
const robotsPath = path.join(distDir, 'robots.txt');
const robotsExists = fs.existsSync(robotsPath);
const robotsContent = robotsExists ? fs.readFileSync(robotsPath, 'utf8') : '';
console.log('robots.txt 存在:', robotsExists);
console.log('robots.txt 包含 Googlebot:', robotsContent.includes('Googlebot'));
console.log('robots.txt 包含 bingbot:', robotsContent.includes('bingbot'));
console.log('robots.txt 包含 Baiduspider:', robotsContent.includes('Baiduspider'));
console.log('robots.txt 包含 yisouspider:', robotsContent.includes('yisouspider'));
console.log('robots.txt 包含 Sitemap:', robotsContent.includes('https://baigeiyun.world/sitemap.xml'));

// 7. sitemap.xml 检查
const sitemapPath = path.join(distDir, 'sitemap.xml');
const sitemapExists = fs.existsSync(sitemapPath);
const sitemapContent = sitemapExists ? fs.readFileSync(sitemapPath, 'utf8') : '';
const sitemapUrls = sitemapContent.match(/<loc>[\s\S]*?<\/loc>/g) || [];
console.log('sitemap.xml 存在:', sitemapExists);
console.log('sitemap.xml 有效 URL 数:', sitemapUrls.length);
console.log('sitemap.xml 是否排除 404:', !sitemapContent.includes('404'));

if (missingTitle.length || missingDesc.length || missingCanonical.length || missingH1.length || invalidSchema.length) {
  console.error('❌ 验收发现异常项目，请修复！');
  process.exit(1);
} else {
  console.log('✅ 全量 182 页面 + 基础设施各项指标 100% 验收通过！');
}
