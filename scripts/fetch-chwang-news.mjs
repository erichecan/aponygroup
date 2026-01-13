// 出海网新闻抓取脚本 - 2025-01-27
// 从出海网 (chwang.com) 抓取跨境物流相关新闻
// 时间戳：2025-01-27

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
  return `chwang-${timestamp}-${slug}`;
}

// 根据标题和内容自动分类
function categorizeNews(title, content) {
  const text = `${title} ${content}`.toLowerCase();
  
  // 政策法规关键词
  if (text.match(/\b(regulation|policy|law|customs|clearance|compliance|duty|tariff|trade agreement|usmca|nafta|关税|政策|法规|清关|合规)\b/i)) {
    return 'policy';
  }
  
  // 行业动态关键词
  if (text.match(/\b(industry|logistics|supply chain|shipping|warehousing|transport|e-commerce|trend|market|物流|供应链|运输|仓储)\b/i)) {
    return 'industry';
  }
  
  // 公司新闻关键词
  if (text.match(/\b(company|announce|expansion|partnership|acquisition|new facility|warehouse opening|收购|扩张|合作)\b/i)) {
    return 'company';
  }
  
  // 默认归类为知识类
  return 'knowledge';
}

// 从内容提取摘要
function extractSummary(content, maxLength = 200) {
  const plainText = content.replace(/<[^>]*>/g, '').trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  const truncated = plainText.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('。');
  const lastExclamation = truncated.lastIndexOf('！');
  const lastQuestion = truncated.lastIndexOf('？');
  const lastPeriodEn = truncated.lastIndexOf('.');
  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion, lastPeriodEn);
  
  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }
  
  return truncated + '...';
}

// 从 Sitemap 获取新闻链接列表
async function fetchNewsUrlsFromSitemap(sitemapUrl, daysBack = 7, maxUrls = 50) {
  try {
    console.log(`正在从 Sitemap 获取新闻链接: ${sitemapUrl}`);
    const response = await fetch(sitemapUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0; +https://aponygroup.com/news-bot)'
      }
    });
    
    if (!response.ok) {
      console.warn(`无法获取 sitemap: ${response.statusText}`);
      return [];
    }
    
    const xmlText = await response.text();
    const urls = [];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
    
    // 解析 XML sitemap，提取 URL 和日期
    const urlMatches = xmlText.matchAll(/<url[^>]*>([\s\S]*?)<\/url>/gi);
    
    for (const match of urlMatches) {
      const urlContent = match[1];
      const locMatch = urlContent.match(/<loc[^>]*>([^<]+)<\/loc>/i);
      const lastmodMatch = urlContent.match(/<lastmod[^>]*>([^<]+)<\/lastmod>/i);
      
      if (locMatch) {
        const url = locMatch[1].trim();
        let lastmod = lastmodMatch ? lastmodMatch[1].trim() : null;
        
        // 如果 sitemap 中没有日期，使用当前日期
        if (!lastmod) {
          lastmod = new Date().toISOString().split('T')[0];
        }
        
        // 只保留最近 N 天的新闻
        const newsDate = new Date(lastmod);
        if (newsDate >= cutoffDate) {
          urls.push({
            url: url,
            lastmod: lastmod
          });
        }
      }
    }
    
    console.log(`从 sitemap 获取到 ${urls.length} 个新闻链接（最近 ${daysBack} 天）`);
    return urls.slice(0, maxUrls);
  } catch (error) {
    console.error(`解析 sitemap 失败:`, error);
    return [];
  }
}

// 从单个新闻页面提取内容
async function fetchNewsContent(newsUrl) {
  try {
    // 添加延迟，避免请求过快
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = await fetch(newsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0; +https://aponygroup.com/news-bot)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
      }
    });
    
    if (!response.ok) {
      console.warn(`无法获取新闻页面 ${newsUrl}: ${response.statusText}`);
      return null;
    }
    
    const html = await response.text();
    
    // 从 meta 标签提取信息
    const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                      html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
                     html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    const dateMatch = html.match(/<meta\s+property=["']bytedance:published_time["']\s+content=["']([^"']+)["']/i) ||
                     html.match(/<meta\s+property=["']article:published_time["']\s+content=["']([^"']+)["']/i);
    const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    
    if (!titleMatch) {
      console.warn(`无法提取标题: ${newsUrl}`);
      return null;
    }
    
    const title = titleMatch[1].trim();
    const description = descMatch ? descMatch[1].trim() : '';
    
    // 解析日期
    let publishDate = null;
    if (dateMatch) {
      try {
        const dateStr = dateMatch[1].trim();
        publishDate = new Date(dateStr).toISOString().split('T')[0];
      } catch (e) {
        console.warn(`日期解析失败: ${dateMatch[1]}`);
      }
    }
    
    // 如果没有找到日期，使用当前日期
    if (!publishDate) {
      publishDate = new Date().toISOString().split('T')[0];
    }
    
    // 提取正文内容（尝试多个可能的容器）
    let content = description;
    const contentMatches = [
      html.match(/<article[^>]*>([\s\S]*?)<\/article>/i),
      html.match(/<div[^>]*class=["'][^"']*content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i),
      html.match(/<div[^>]*class=["'][^"']*article[^"']*["'][^>]*>([\s\S]*?)<\/div>/i),
    ];
    
    for (const match of contentMatches) {
      if (match && match[1]) {
        // 移除 HTML 标签，保留文本
        const plainText = match[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        if (plainText.length > description.length) {
          content = plainText;
          break;
        }
      }
    }
    
    // 提取图片
    let imageUrl = null;
    if (imageMatch && imageMatch[1]) {
      imageUrl = imageMatch[1].trim();
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = null; // 无效的图片 URL
      }
    }
    
    // 分类
    const category = categorizeNews(title, content);
    
    return {
      id: generateId(title, publishDate),
      title: title,
      summary: extractSummary(description || content, 200),
      content: content || description || title,
      category: category,
      publishDate: publishDate,
      imageUrl: imageUrl || undefined,
      source: 'chwang.com'
    };
  } catch (error) {
    console.error(`获取新闻内容失败 ${newsUrl}:`, error);
    return null;
  }
}

// 过滤与物流相关的新闻 - 2025-01-27 优化关键词列表
function filterLogisticsNews(newsItems) {
  const keywords = [
    // 中文关键词
    '物流', '仓储', '运输', '供应链', '清关', '跨境', '海关',
    '货运', '配送', '货轮', '集装箱', '港口', '船运', '空运',
    '海运', '快递', '履约', '仓库', '库存', '订单', '发货',
    // 英文关键词
    'logistics', 'warehousing', 'shipping', 'supply chain', 'customs',
    'clearance', 'cross-border', 'freight', 'cargo', 'delivery',
    'fulfillment', 'warehouse', 'inventory', 'order', 'shipment',
    'freight forwarder', 'carrier', 'shipper', 'consignee',
    // 电商物流相关
    '电商', 'e-commerce', 'ecommerce', 'fba', 'fbm',
    // 平台相关
    'shopee', 'amazon', '速卖通', 'aliexpress', 'mercadolivre'
  ];
  
  return newsItems.filter(news => {
    const text = `${news.title} ${news.content} ${news.summary}`.toLowerCase();
    return keywords.some(keyword => text.includes(keyword.toLowerCase()));
  });
}

// 主函数：从出海网抓取新闻
async function fetchChwangNews(options = {}) {
  const {
    daysBack = 14,  // 默认 14 天（覆盖一周）
    maxItems = 30,  // 默认 30 条（每周汇总）
    filterLogistics = true
  } = options;
  
  console.log('='.repeat(60));
  console.log('开始从出海网抓取新闻');
  console.log(`时间: ${new Date().toISOString()}`);
  console.log(`配置: 最近 ${daysBack} 天, 最多 ${maxItems} 条`);
  console.log('='.repeat(60));
  
  const sitemapUrl = 'https://www.chwang.com/sitemap/news.xml';
  
  // 步骤 1: 从 sitemap 获取新闻链接
  const newsUrls = await fetchNewsUrlsFromSitemap(sitemapUrl, daysBack, maxItems * 2);
  
  if (newsUrls.length === 0) {
    console.log('未找到符合条件的新闻链接');
    return [];
  }
  
  // 步骤 2: 逐个获取新闻内容
  console.log(`\n开始抓取 ${newsUrls.length} 条新闻的详细内容...`);
  const newsItems = [];
  
  for (let i = 0; i < newsUrls.length && newsItems.length < maxItems; i++) {
    const { url, lastmod } = newsUrls[i];
    console.log(`[${i + 1}/${newsUrls.length}] 正在抓取: ${url.substring(0, 60)}...`);
    
    const newsContent = await fetchNewsContent(url);
    
    if (newsContent) {
      newsItems.push(newsContent);
      console.log(`  ✅ 成功: "${newsContent.title.substring(0, 40)}..." (${newsContent.category})`);
    } else {
      console.log(`  ❌ 失败: 无法提取内容`);
    }
  }
  
  // 步骤 3: 过滤物流相关新闻（如果启用）
  let filteredNews = newsItems;
  if (filterLogistics) {
    console.log(`\n正在过滤物流相关新闻...`);
    const beforeCount = filteredNews.length;
    filteredNews = filterLogisticsNews(filteredNews);
    console.log(`过滤结果: ${beforeCount} -> ${filteredNews.length} 条`);
  }
  
  console.log(`\n抓取完成！共获取 ${filteredNews.length} 条新闻`);
  console.log('='.repeat(60));
  
  return filteredNews;
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchChwangNews({
    daysBack: 14,  // 14 天（覆盖一周）
    maxItems: 10,
    filterLogistics: true
  })
    .then((news) => {
      console.log('\n抓取的新闻:');
      news.forEach((item, index) => {
        console.log(`\n${index + 1}. ${item.title}`);
        console.log(`   分类: ${item.category}, 日期: ${item.publishDate}`);
        console.log(`   摘要: ${item.summary.substring(0, 100)}...`);
      });
      process.exit(0);
    })
    .catch((error) => {
      console.error('抓取失败:', error);
      process.exit(1);
    });
}

export { fetchChwangNews };

