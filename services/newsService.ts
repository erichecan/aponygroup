// 新闻数据服务 - 2025-01-27
// 从 JSON 文件或静态数据加载新闻
// 时间戳：2025-01-27

import { NewsItem } from '../types';

interface NewsDataResponse {
  lastUpdated: string;
  totalCount: number;
  news: NewsItem[];
}

// 从 JSON 文件加载新闻数据
export async function loadNewsFromJSON(): Promise<NewsItem[]> {
  try {
    const response = await fetch('/data/news.json');
    if (!response.ok) {
      throw new Error(`Failed to load news: ${response.statusText}`);
    }
    
    const data: NewsDataResponse = await response.json();
    
    // 验证数据格式
    if (!data.news || !Array.isArray(data.news)) {
      throw new Error('Invalid news data format');
    }
    
    return data.news;
  } catch (error) {
    console.error('Failed to load news from JSON:', error);
    // 返回空数组，前端会使用静态数据作为后备
    return [];
  }
}

// 检查新闻数据是否可用
export async function checkNewsDataAvailable(): Promise<boolean> {
  try {
    const response = await fetch('/data/news.json', { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// 合并新闻数据（动态 + 静态）
export function mergeNewsData(
  dynamicNews: NewsItem[],
  staticNews: NewsItem[]
): NewsItem[] {
  // 如果动态新闻为空，返回静态新闻
  if (dynamicNews.length === 0) {
    return staticNews;
  }
  
  // 合并并去重
  const newsMap = new Map<string, NewsItem>();
  
  // 先添加动态新闻（优先级更高）
  dynamicNews.forEach(news => {
    newsMap.set(news.id, news);
  });
  
  // 添加静态新闻（如果 ID 不存在）
  staticNews.forEach(news => {
    if (!newsMap.has(news.id)) {
      newsMap.set(news.id, news);
    }
  });
  
  // 转换为数组并按日期排序
  const mergedNews = Array.from(newsMap.values());
  mergedNews.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  
  return mergedNews;
}

