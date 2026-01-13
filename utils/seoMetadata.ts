// SEO 元数据配置 - 2025-01-27
// 为每个页面提供 SEO 元数据

import { Language, Page, STRINGS } from '../types';

export interface PageSEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export function getPageSEOData(page: Page, language: Language, extraData?: Partial<PageSEOData>): PageSEOData {
  const t = STRINGS[language];
  const baseTitle = 'AponyGroup';
  const baseDescription = language === 'en'
    ? 'Professional logistics and warehousing services for US and Canada markets. Customs clearance, landing services, warehousing, and transportation solutions.'
    : '专业的美国和加拿大物流与仓储服务。清关、落地服务、仓储和运输解决方案。';

  const defaultData: Record<Page, Omit<PageSEOData, 'article'>> = {
    home: {
      title: `${t.heroTitle} | ${baseTitle}`,
      description: t.heroSubtitle,
      keywords: 'US logistics, Canada logistics, warehousing, customs clearance, cross-border e-commerce, fulfillment',
    },
    services: {
      title: `${t.servicesPageTitle} | ${baseTitle}`,
      description: t.servicesPageSubtitle,
      keywords: 'logistics services, warehousing services, customs clearance, landing services, FBA prep, WMS',
    },
    about: {
      title: `${t.aboutTitle} | ${baseTitle}`,
      description: t.aboutSubtitle,
      keywords: 'about AponyGroup, logistics company, US Canada logistics provider, company history',
    },
    contact: {
      title: `${t.contactTitle} | ${baseTitle}`,
      description: t.contactSubtitle,
      keywords: 'contact AponyGroup, logistics inquiry, customer service, support',
    },
    tracking: {
      title: `${t.trackingTitle} | ${baseTitle}`,
      description: t.trackingSubtitle,
      keywords: 'track shipment, order tracking, logistics tracking, shipment status',
    },
    login: {
      title: `${t.navLogin} | ${baseTitle}`,
      description: language === 'en'
        ? 'Access your AponyGroup account. Manage orders, track shipments, and view reports.'
        : '登录您的 AponyGroup 账户。管理订单、追踪货物、查看报表。',
      keywords: 'login, customer portal, account access, order management',
    },
    faq: {
      title: `${t.faqTitle} | ${baseTitle}`,
      description: t.faqSubtitle,
      keywords: 'FAQ, frequently asked questions, logistics questions, customs clearance FAQ',
    },
    cases: {
      title: `${t.navCases} | ${baseTitle}`,
      description: language === 'en'
        ? 'Success stories and case studies from AponyGroup clients. See how we help businesses succeed in US and Canada markets.'
        : 'AponyGroup 客户的成功案例。了解我们如何帮助企业在美国和加拿大市场取得成功。',
      keywords: 'case studies, success stories, client testimonials, logistics case studies',
    },
    news: {
      title: `${t.navNews} | ${baseTitle}`,
      description: language === 'en'
        ? 'Latest news and updates about logistics industry, customs regulations, and AponyGroup company news.'
        : '物流行业最新资讯、海关法规更新和 AponyGroup 公司新闻。',
      keywords: 'logistics news, industry news, customs regulations, logistics updates',
    },
    newsDetail: {
      title: `${t.navNews} | ${baseTitle}`,
      description: baseDescription,
      keywords: 'logistics news, industry news',
    },
  };

  const pageData = defaultData[page] || defaultData.home;

  return {
    ...pageData,
    ...extraData,
    image: extraData?.image || '/assets/og-image.jpg',
  };
}

