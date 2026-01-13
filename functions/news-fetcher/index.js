// Cloud Function: 新闻抓取 - 2025-01-27
// 每周自动执行的新闻抓取函数
// 时间戳：2025-01-27

const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// 初始化 GCS 客户端
const storage = new Storage({
  projectId: '882380127696'
});

// 新闻数据接口（与前端保持一致）
const NEWS_STRUCTURE = {
  id: '',
  title: '',
  summary: '',
  content: '',
  category: 'industry', // 'company' | 'industry' | 'policy' | 'knowledge'
  publishDate: '',
  imageUrl: ''
};

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
  
  if (text.match(/\b(regulation|policy|law|customs|clearance|compliance|duty|tariff|trade agreement|usmca|nafta)\b/i)) {
    return 'policy';
  }
  
  if (text.match(/\b(industry|logistics|supply chain|shipping|warehousing|transport|e-commerce|trend|market)\b/i)) {
    return 'industry';
  }
  
  if (text.match(/\b(company|announce|expansion|partnership|acquisition|new facility|warehouse opening)\b/i)) {
    return 'company';
  }
  
  return 'knowledge';
}

// 从内容提取摘要
function extractSummary(content, maxLength = 200) {
  const plainText = content.replace(/<[^>]*>/g, '').trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
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
    const items = [];
    
    const itemMatches = [...text.matchAll(/<item[^>]*>([\s\S]*?)<\/item>/gi)];
    
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

// 生成示例新闻（用于演示）
function generateSampleNews() {
  const today = new Date();
  const sampleNews = [];
  
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

// 保存新闻数据到 GCS
async function saveNewsToGCS(newsData) {
  const bucketName = 'apony-website-assets';
  const fileName = 'data/news.json';
  
  try {
    // 尝试创建 bucket（如果不存在）
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    
    await file.save(JSON.stringify(newsData, null, 2), {
      contentType: 'application/json',
      metadata: {
        cacheControl: 'public, max-age=3600'
      }
    });
    
    console.log(`新闻数据已保存到 GCS: gs://${bucketName}/${fileName}`);
    return true;
  } catch (error) {
    console.error('保存到 GCS 失败:', error);
    return false;
  }
}

// Cloud Function 入口点
functions.http('fetchNews', async (req, res) => {
  console.log('新闻抓取函数被触发');
  console.log(`时间: ${new Date().toISOString()}`);
  
  try {
    let allNews = [];
    
    // 这里可以配置多个新闻源
    // 目前使用示例数据，实际使用时需要配置真实的 RSS feeds
    
    // 示例：从 RSS feed 抓取
    // const news = await fetchFromRSSFeed('https://example.com/rss');
    // allNews = allNews.concat(news);
    
    // 如果没有配置真实源，使用示例数据
    if (allNews.length === 0) {
      console.log('使用示例新闻数据...');
      allNews = generateSampleNews();
    }
    
    // 加载现有新闻（从 GCS）
    let existingNews = [];
    
    try {
      const bucketName = 'apony-website-assets';
      const fileName = 'data/news.json';
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(fileName);
      
      const [exists] = await file.exists();
      if (exists) {
        const [contents] = await file.download();
        const existingData = JSON.parse(contents.toString());
        existingNews = Array.isArray(existingData.news) ? existingData.news : [];
      }
    } catch (error) {
      console.log('读取现有新闻失败（可能是首次运行）:', error.message);
    }
    
    // 合并新闻，避免重复
    const existingIds = new Set(existingNews.map(n => n.id));
    const newNews = allNews.filter(n => !existingIds.has(n.id));
    
    // 合并并排序
    const mergedNews = [...newNews, ...existingNews].sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    
    // 只保留最近 100 条
    const latestNews = mergedNews.slice(0, 100);
    
    // 保存新闻数据
    const newsData = {
      lastUpdated: new Date().toISOString(),
      totalCount: latestNews.length,
      news: latestNews
    };
    
    await saveNewsToGCS(newsData);
    
    console.log(`新闻抓取完成！新增: ${newNews.length} 条，总计: ${latestNews.length} 条`);
    
    res.status(200).json({
      success: true,
      message: 'News fetched successfully',
      stats: {
        newCount: newNews.length,
        totalCount: latestNews.length,
        lastUpdated: newsData.lastUpdated
      }
    });
  } catch (error) {
    console.error('新闻抓取失败:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

