// SEO Head 组件 - 动态管理所有 Meta 标签
// 时间戳：2025-01-27

import { useEffect } from 'react';
import { Language, Page } from '../types';
import { getPageSEOData, PageSEOData } from '../utils/seoMetadata';

interface SEOHeadProps {
  page: Page;
  language: Language;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  page,
  language,
  title: customTitle,
  description: customDescription,
  image: customImage,
  url: customUrl,
  article: customArticle
}) => {
  useEffect(() => {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'https://www.aponygroup.com';
    
    const langCode = language === 'en' ? 'en' : 'zh';
    const pageData = getPageSEOData(page, language);
    
    const currentTitle = customTitle || pageData.title;
    const currentDesc = customDescription || pageData.description;
    const currentUrl = customUrl || `${baseUrl}/${langCode}/${page === 'home' ? '' : page}`;
    const ogImage = customImage || pageData.image || `${baseUrl}/assets/og-image.jpg`;
    const articleData = customArticle || pageData.article;

    // 更新 HTML lang 属性
    document.documentElement.lang = langCode;

    // 更新 title
    document.title = currentTitle;

    // 创建或更新 meta 标签的函数
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // 基础 Meta 标签
    setMetaTag('description', currentDesc);
    setMetaTag('keywords', pageData.keywords || 'logistics, warehousing, customs clearance, US, Canada, cross-border, e-commerce, fulfillment, supply chain');
    setMetaTag('author', 'AponyGroup');
    
    // 如果 viewport 已经存在，就不重复添加
    if (!document.querySelector('meta[name="viewport"]')) {
      setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    }

    // Open Graph 标签
    setMetaTag('og:title', currentTitle, true);
    setMetaTag('og:description', currentDesc, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:url', currentUrl, true);
    setMetaTag('og:type', articleData ? 'article' : 'website', true);
    setMetaTag('og:site_name', 'AponyGroup', true);
    setMetaTag('og:locale', language === 'en' ? 'en_US' : 'zh_CN', true);

    // Twitter Card 标签
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', currentTitle);
    setMetaTag('twitter:description', currentDesc);
    setMetaTag('twitter:image', ogImage);

    // 文章特定标签
    if (articleData) {
      if (articleData.publishedTime) {
        setMetaTag('article:published_time', articleData.publishedTime, true);
      }
      if (articleData.modifiedTime) {
        setMetaTag('article:modified_time', articleData.modifiedTime, true);
      }
      if (articleData.author) {
        setMetaTag('article:author', articleData.author, true);
      }
      if (articleData.section) {
        setMetaTag('article:section', articleData.section, true);
      }
      if (articleData.tags) {
        // 移除旧的 article:tag
        document.querySelectorAll('meta[property="article:tag"]').forEach(el => el.remove());
        articleData.tags.forEach((tag) => {
          const tagElement = document.createElement('meta');
          tagElement.setAttribute('property', 'article:tag');
          tagElement.setAttribute('content', tag);
          document.head.appendChild(tagElement);
        });
      }
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // hreflang 标签（多语言支持）
    const addHreflang = (lang: string, href: string) => {
      let hreflangLink = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement;
      if (!hreflangLink) {
        hreflangLink = document.createElement('link');
        hreflangLink.setAttribute('rel', 'alternate');
        hreflangLink.setAttribute('hreflang', lang);
        document.head.appendChild(hreflangLink);
      }
      hreflangLink.setAttribute('href', href);
    };

    // 添加所有语言的 hreflang
    const enUrl = currentUrl.replace(/\/zh\//, '/en/').replace(/\/$/, '') || `${baseUrl}/en/${page === 'home' ? '' : page}`;
    const zhUrl = currentUrl.replace(/\/en\//, '/zh/').replace(/\/$/, '') || `${baseUrl}/zh/${page === 'home' ? '' : page}`;
    
    addHreflang('en', enUrl);
    addHreflang('zh', zhUrl);
    addHreflang('x-default', enUrl); // 默认语言

    // 结构化数据 (Schema.org) - 2025-01-27 修复变量引用错误
    const schemaScript = {
      '@context': 'https://schema.org',
      '@type': articleData ? 'Article' : 'WebSite',
      name: 'AponyGroup',
      url: baseUrl,
      description: currentDesc,
      ...(articleData ? {
        headline: currentTitle,
        datePublished: articleData.publishedTime,
        dateModified: articleData.modifiedTime || articleData.publishedTime,
        author: {
          '@type': 'Organization',
          name: articleData.author || 'AponyGroup'
        }
      } : {
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      })
    };

    // 移除旧的 schema 脚本
    const oldSchemaScript = document.querySelector('script[type="application/ld+json"]');
    if (oldSchemaScript) {
      oldSchemaScript.remove();
    }

    // 添加新的 schema 脚本
    const schemaScriptElement = document.createElement('script');
    schemaScriptElement.type = 'application/ld+json';
    schemaScriptElement.textContent = JSON.stringify(schemaScript);
    document.head.appendChild(schemaScriptElement);

    // Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AponyGroup',
      url: baseUrl,
      logo: `${baseUrl}/assets/logo.png`,
      description: 'Professional logistics and warehousing services for US and Canada markets',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Logistics Way',
        addressLocality: 'Commerce City',
        addressRegion: 'CA',
        postalCode: '90040',
        addressCountry: 'US'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-800-123-4567',
        contactType: 'Customer Service',
        email: 'support@aponyinc.com'
      },
      sameAs: [
        // 可以添加社交媒体链接
      ]
    };

    const orgScriptElement = document.createElement('script');
    orgScriptElement.type = 'application/ld+json';
    orgScriptElement.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScriptElement);

  }, [page, language, customTitle, customDescription, customImage, customUrl, customArticle]);

  return null; // 这个组件不渲染任何内容
};

