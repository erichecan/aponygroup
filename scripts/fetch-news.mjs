// 新闻抓取脚本 - 2025-01-27
// 每周自动抓取物流行业相关新闻
// 时间戳：2025-01-27

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchChwangNews } from './fetch-chwang-news.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 生成唯一 ID
function generateId(title, date) {
  const timestamp = new Date(date).getTime();
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
  return `news-${timestamp}-${slug}`;
}

// 根据标题和内容自动分类
function categorizeNews(title, content) {
  const text = `${title} ${content}`.toLowerCase();
  
  // 政策法规关键词
  if (text.match(/\b(regulation|policy|law|customs|clearance|compliance|duty|tariff|trade agreement|usmca|nafta)\b/i)) {
    return 'policy';
  }
  
  // 行业动态关键词
  if (text.match(/\b(industry|logistics|supply chain|shipping|warehousing|transport|e-commerce|trend|market)\b/i)) {
    return 'industry';
  }
  
  // 公司新闻关键词
  if (text.match(/\b(company|announce|expansion|partnership|acquisition|new facility|warehouse opening)\b/i)) {
    return 'company';
  }
  
  // 默认归类为知识类
  return 'knowledge';
}

// 从新闻内容提取摘要
function extractSummary(content, maxLength = 200) {
  // 移除 HTML 标签
  const plainText = content.replace(/<[^>]*>/g, '').trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // 尝试在句子边界截断
  const truncated = plainText.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastExclamation = truncated.lastIndexOf('!');
  const lastQuestion = truncated.lastIndexOf('?');
  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);
  
  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }
  
  return truncated + '...';
}

// 从 RSS Feed 抓取新闻
async function fetchFromRSSFeed(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch RSS feed from ${url}: ${response.statusText}`);
      return [];
    }
    
    const text = await response.text();
    
    // 简单的 RSS 解析（实际项目中可以使用 rss-parser 库）
    const items = [];
    
    // 使用正则表达式提取 RSS 项目
    const itemMatches = text.matchAll(/<item[^>]*>([\s\S]*?)<\/item>/gi);
    
    for (const match of itemMatches) {
      const itemContent = match[1];
      
      const titleMatch = itemContent.match(/<title[^>]*>([^<]+)<\/title>/i);
      const linkMatch = itemContent.match(/<link[^>]*>([^<]+)<\/link>/i);
      const pubDateMatch = itemContent.match(/<pubDate[^>]*>([^<]+)<\/pubDate>/i);
      const descriptionMatch = itemContent.match(/<description[^>]*>([^<]+)<\/description>/i);
      
      if (titleMatch && pubDateMatch) {
        const title = titleMatch[1].trim();
        const publishDate = new Date(pubDateMatch[1].trim()).toISOString().split('T')[0];
        const description = descriptionMatch ? descriptionMatch[1].trim() : '';
        const link = linkMatch ? linkMatch[1].trim() : '';
        
        // 只抓取最近 30 天的新闻
        const newsDate = new Date(publishDate);
        const daysDiff = (Date.now() - newsDate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysDiff > 30) continue;
        
        items.push({
          id: generateId(title, publishDate),
          title: title,
          summary: extractSummary(description || title, 200),
          content: description || title,
          category: categorizeNews(title, description || ''),
          publishDate: publishDate,
          imageUrl: undefined
        });
      }
    }
    
    return items;
  } catch (error) {
    console.error(`Error fetching RSS feed from ${url}:`, error);
    return [];
  }
}

// 从 Sitemap XML 获取新闻链接
async function fetchFromSitemap(sitemapUrl) {
  try {
    const response = await fetch(sitemapUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch sitemap from ${sitemapUrl}: ${response.statusText}`);
      return [];
    }
    
    const text = await response.text();
    const urls = [];
    
    // 解析 XML sitemap，提取 URL
    const urlMatches = text.matchAll(/<loc[^>]*>([^<]+)<\/loc>/gi);
    
    for (const match of urlMatches) {
      urls.push(match[1].trim());
    }
    
    console.log(`从 sitemap 获取到 ${urls.length} 个 URL`);
    return urls.slice(0, 50); // 限制最多处理 50 个链接
  } catch (error) {
    console.error(`Error fetching sitemap from ${sitemapUrl}:`, error);
    return [];
  }
}

// 从出海网 HTML 页面抓取新闻（简化版 - 需要根据实际 HTML 结构调整）
async function fetchFromChwangHTML() {
  try {
    const url = 'https://www.chwang.com/news';
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
      }
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch HTML from ${url}: ${response.statusText}`);
      return [];
    }
    
    const html = await response.text();
    const items = [];
    
    // 注意：这里的解析规则需要根据出海网的实际 HTML 结构调整
    // 以下是示例解析逻辑，实际使用时需要查看页面源码并调整
    
    // 尝试从 HTML 中提取新闻项
    // 这里需要根据实际页面结构调整正则表达式
    
    console.log('HTML 解析功能需要根据实际页面结构定制');
    return items;
  } catch (error) {
    console.error(`Error fetching HTML from chwang.com:`, error);
    return [];
  }
}

// 新闻源配置
const NEWS_SOURCES = [
  // 出海网 - 企业跨境出海综合服务平台
  // 时间戳：2025-01-27 - 添加出海网作为新闻源
  {
    name: '出海网 - 跨境物流新闻',
    type: 'sitemap',
    url: 'https://www.chwang.com/sitemap/news.xml', // 新闻 sitemap
    enabled: true, // ✅ 已启用 - 2025-01-27
    source: 'chwang',
    filter: true, // 只抓取与物流相关的新闻
    maxItems: 30, // 最多抓取 30 条（每周汇总）
    daysBack: 14 // 抓取最近 14 天的新闻（覆盖一周）
  },
  // RSS Feed 示例（如果网站提供）
  {
    name: 'Logistics Industry News RSS',
    type: 'rss',
    url: 'https://example.com/logistics-news.rss',
    enabled: false
  }
];

// 生成示例新闻（用于演示和测试）
function generateSampleNews() {
  const today = new Date();
  const sampleNews = [];
  
  // 生成最近 7 天的示例新闻
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const categories = ['company', 'industry', 'policy', 'knowledge'];
    const category = categories[i % categories.length];
    
    const newsTemplates = {
      company: {
        titles: [
          'AponyGroup Expands Warehouse Network in California',
          'New Partnership to Enhance Logistics Services',
          'Warehouse Technology Upgrade Improves Efficiency'
        ],
        summaries: [
          'We are excited to announce the expansion of our warehouse facilities.',
          'A new strategic partnership will benefit our clients.',
          'Technology improvements lead to better service delivery.'
        ]
      },
      industry: {
        titles: [
          'E-commerce Logistics Trends for 2025',
          'Supply Chain Resilience in Global Trade',
          'Innovation in Last-Mile Delivery Solutions'
        ],
        summaries: [
          'Industry experts predict significant changes in e-commerce logistics.',
          'Businesses are adapting to global supply chain challenges.',
          'New technologies are transforming delivery services.'
        ]
      },
      policy: {
        titles: [
          'New Customs Regulations Effective This Month',
          'Trade Agreement Updates Affect Import Costs',
          'Updated Documentation Requirements Announced'
        ],
        summaries: [
          'Important regulatory changes that may affect your shipments.',
          'Trade policies impact logistics operations.',
          'New compliance requirements for international shipping.'
        ]
      },
      knowledge: {
        titles: [
          'Understanding USMCA Trade Benefits',
          'Best Practices for Warehouse Management',
          'Guide to Efficient Customs Clearance'
        ],
        summaries: [
          'Learn how trade agreements can benefit your business.',
          'Tips for optimizing warehouse operations.',
          'Step-by-step guide to smooth customs clearance.'
        ]
      }
    };
    
    const templates = newsTemplates[category];
    const index = i % templates.titles.length;
    
    sampleNews.push({
      id: generateId(templates.titles[index], dateStr),
      title: templates.titles[index],
      summary: templates.summaries[index],
      content: `${templates.summaries[index]} This article provides detailed information about the topic. More content will be available when connected to real news sources.`,
      category: category,
      publishDate: dateStr,
      imageUrl: undefined
    });
  }
  
  return sampleNews;
}

// 主函数：抓取并保存新闻
async function fetchAndSaveNews() {
  console.log('开始抓取新闻...');
  console.log(`时间: ${new Date().toISOString()}`);
  
  let allNews = [];
  
  // 从配置的新闻源抓取
  for (const source of NEWS_SOURCES) {
    if (!source.enabled) {
      console.log(`跳过未启用的新闻源: ${source.name}`);
      continue;
    }
    
    console.log(`正在从 ${source.name} 抓取新闻...`);
    
    try {
      if (source.type === 'rss') {
        const news = await fetchFromRSSFeed(source.url);
        allNews = allNews.concat(news);
        console.log(`从 ${source.name} 抓取到 ${news.length} 条新闻`);
      } else if (source.type === 'sitemap' && source.source === 'chwang') {
        // 使用出海网专用抓取函数
        const news = await fetchChwangNews({
          daysBack: source.daysBack || 14,  // 默认 14 天（覆盖一周）
          maxItems: source.maxItems || 30,  // 默认 30 条（每周汇总）
          filterLogistics: source.filter !== false
        });
        allNews = allNews.concat(news);
        console.log(`从 ${source.name} 抓取到 ${news.length} 条新闻`);
      } else if (source.type === 'sitemap') {
        // 通用 sitemap 处理（如果需要）
        console.log(`暂不支持通用 sitemap 类型，跳过 ${source.name}`);
      }
    } catch (error) {
      console.error(`从 ${source.name} 抓取新闻失败:`, error);
      // 继续处理其他新闻源
    }
  }
  
  // 如果没有从真实源抓取到新闻，使用示例数据
  if (allNews.length === 0) {
    console.log('未配置真实新闻源，使用示例数据...');
    allNews = generateSampleNews();
  }
  
  // 加载现有新闻
  const newsDataPath = path.join(__dirname, '../public/data/news.json');
  let existingNews = [];
  
  try {
    if (fs.existsSync(newsDataPath)) {
      const existingData = JSON.parse(fs.readFileSync(newsDataPath, 'utf-8'));
      existingNews = Array.isArray(existingData.news) ? existingData.news : [];
    }
  } catch (error) {
    console.error('读取现有新闻数据失败:', error);
  }
  
  // 合并新闻，避免重复
  const existingIds = new Set(existingNews.map(n => n.id));
  const newNews = allNews.filter(n => !existingIds.has(n.id));
  
  // 合并并排序（最新的在前）
  const mergedNews = [...newNews, ...existingNews].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  
  // 只保留最近 100 条新闻
  const latestNews = mergedNews.slice(0, 100);
  
  // 确保 data 目录存在
  const dataDir = path.dirname(newsDataPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // 保存新闻数据
  const newsData = {
    lastUpdated: new Date().toISOString(),
    totalCount: latestNews.length,
    news: latestNews
  };
  
  fs.writeFileSync(newsDataPath, JSON.stringify(newsData, null, 2), 'utf-8');
  
  console.log(`新闻抓取完成！`);
  console.log(`新增新闻: ${newNews.length} 条`);
  console.log(`总新闻数: ${latestNews.length} 条`);
  console.log(`数据已保存到: ${newsDataPath}`);
  
  return newsData;
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchAndSaveNews()
    .then(() => {
      console.log('脚本执行成功');
      process.exit(0);
    })
    .catch((error) => {
      console.error('脚本执行失败:', error);
      process.exit(1);
    });
}

export { fetchAndSaveNews };
