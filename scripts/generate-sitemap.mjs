// 生成 Sitemap XML 文件
// 时间戳：2025-01-27

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.aponygroup.com';
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

// 页面列表
const pages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'services', priority: '0.9', changefreq: 'weekly' },
  { path: 'about', priority: '0.8', changefreq: 'monthly' },
  { path: 'contact', priority: '0.8', changefreq: 'monthly' },
  { path: 'tracking', priority: '0.7', changefreq: 'monthly' },
  { path: 'faq', priority: '0.7', changefreq: 'monthly' },
  { path: 'cases', priority: '0.8', changefreq: 'weekly' },
  { path: 'news', priority: '0.8', changefreq: 'daily' },
  { path: 'login', priority: '0.5', changefreq: 'monthly' },
];

const languages = ['en', 'zh'];

function generateSitemap() {
  const urls = [];
  
  // 为每种语言和每个页面生成 URL
  languages.forEach(lang => {
    pages.forEach(page => {
      const url = page.path 
        ? `${BASE_URL}/${lang}/${page.path}`
        : `${BASE_URL}/${lang}`;
      
      urls.push({
        loc: url,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: page.changefreq,
        priority: page.priority
      });
      
      // 添加不带语言前缀的版本（默认）
      if (lang === 'en') {
        const defaultUrl = page.path 
          ? `${BASE_URL}/${page.path}`
          : BASE_URL;
        
        urls.push({
          loc: defaultUrl,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: page.changefreq,
          priority: page.priority
        });
      }
    });
  });

  // 生成 XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${url.loc.replace('/zh/', '/en/') || url.loc.replace(BASE_URL, `${BASE_URL}/en`)}" />
    <xhtml:link rel="alternate" hreflang="zh" href="${url.loc.replace('/en/', '/zh/') || url.loc.replace(BASE_URL, `${BASE_URL}/zh`)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${url.loc.replace('/zh/', '/en/') || url.loc.replace(BASE_URL, `${BASE_URL}/en`)}" />
  </url>`).join('\n')}
</urlset>`;

  // 确保 public 目录存在
  const publicDir = path.dirname(SITEMAP_PATH);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 写入文件
  fs.writeFileSync(SITEMAP_PATH, xml, 'utf-8');
  
  console.log(`✅ Sitemap 已生成: ${SITEMAP_PATH}`);
  console.log(`   包含 ${urls.length} 个 URL`);
}

generateSitemap();

