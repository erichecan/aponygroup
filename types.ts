export enum Language {
  EN = 'en',
  ZH = 'zh'
}

export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  isError?: boolean;
}

export type Page = 'home' | 'services' | 'about' | 'contact' | 'tracking';

export interface TranslationResource {
  // Navigation
  navHome: string;
  navServices: string;
  navWarehousing: string;
  navAbout: string;
  navContact: string;
  navTracking: string;

  // Hero (Home)
  heroTitle: string;
  heroSubtitle: string;
  heroCTA: string;
  heroSecondaryCTA: string;

  // Stats
  statWarehouses: string;
  statExperience: string;
  statDelivery: string;

  // Home Content
  servicesTitle: string;
  servicesSubtitle: string;
  whyChooseUs: string;
  
  // Services Page
  servicesPageTitle: string;
  servicesPageSubtitle: string;
  
  serviceWarehousingTitle: string;
  serviceWarehousingDesc: string;
  serviceWarehousingPoints: string[];

  serviceLogisticsTitle: string;
  serviceLogisticsDesc: string;
  serviceLogisticsPoints: string[];

  serviceWMSTitle: string;
  serviceWMSDesc: string;
  serviceWMSPoints: string[];

  serviceFbaTitle: string;
  serviceFbaDesc: string;
  serviceFbaPoints: string[];

  // About Page
  aboutTitle: string;
  aboutSubtitle: string;
  missionTitle: string;
  missionDesc: string;
  visionTitle: string;
  visionDesc: string;
  historyTitle: string;
  historyDesc: string;
  
  // Contact Page
  contactTitle: string;
  contactSubtitle: string;
  formName: string;
  formEmail: string;
  formSubject: string;
  formMessage: string;
  formSubmit: string;
  locationsTitle: string;
  locationUS: string;
  locationCN: string;

  // Tracking Page
  trackingTitle: string;
  trackingSubtitle: string;
  trackingPlaceholder: string;
  trackingButton: string;
  trackingResultMock: string;

  // Footer
  footerAbout: string;
  rights: string;

  // Chat Widget
  chatTitle: string;
  chatSubtitle: string;
  placeholder: string;
  send: string;
  clear: string;
  loading: string;
  welcomeTitle: string;
  welcomeText: string;
  errorGeneric: string;
}

export const STRINGS: Record<Language, TranslationResource> = {
  [Language.EN]: {
    navHome: "Home",
    navServices: "Services",
    navWarehousing: "Warehousing",
    navAbout: "About Us",
    navContact: "Contact",
    navTracking: "Track Order",

    heroTitle: "Global Logistics & Overseas Warehousing Solutions",
    heroSubtitle: "Apony Inc provides efficient, secure, and digitized supply chain services. From warehousing to last-mile delivery, we empower your global commerce.",
    heroCTA: "View Services",
    heroSecondaryCTA: "Track Shipment",

    statWarehouses: "Global Warehouses",
    statExperience: "Years Experience",
    statDelivery: "On-Time Delivery",

    servicesTitle: "Our Core Services",
    servicesSubtitle: "Comprehensive solutions tailored for cross-border e-commerce",
    whyChooseUs: "Why Choose Apony?",
    
    // Services Page
    servicesPageTitle: "Comprehensive Logistics Solutions",
    servicesPageSubtitle: "End-to-end supply chain management tailored for cross-border e-commerce sellers and global brands.",
    
    serviceWarehousingTitle: "Overseas Warehousing",
    serviceWarehousingDesc: "Our US-based warehousing network ensures your products are stored securely and shipped rapidly. We handle B2C fulfillment and B2B distribution with 99.9% inventory accuracy.",
    serviceWarehousingPoints: [
      "24-Hour Outbound SLA",
      "Real-time Inventory Sync",
      "Returns Management & Refurbishment",
      "Custom Packaging & Kitting"
    ],

    serviceLogisticsTitle: "Global Logistics",
    serviceLogisticsDesc: "From factory floor to customer door. We provide flexible ocean and air freight solutions to get your inventory to the US efficiently.",
    serviceLogisticsPoints: [
      "Ocean Freight (FCL/LCL)",
      "Air Cargo & Express",
      "Customs Clearance",
      "Last Mile Delivery Optimization"
    ],

    serviceWMSTitle: "Smart WMS Technology",
    serviceWMSDesc: "Our proprietary Warehouse Management System (WMS) gives you complete visibility and control over your supply chain from anywhere in the world.",
    serviceWMSPoints: [
      "API Integration (Shopify, Amazon, Walmart)",
      "Real-time Order Tracking",
      "Automated Routing Logic",
      "Data Analytics & Reporting"
    ],

    serviceFbaTitle: "FBA Services",
    serviceFbaDesc: "Maximize your Amazon business with our specialized FBA prep and transfer services. We ensure compliance with Amazon's strict requirements.",
    serviceFbaPoints: [
      "FBA Prep & Labeling",
      "FBA Transfer/Replenishment",
      "Removal Order Handling",
      "Transit Warehousing"
    ],

    // About Page
    aboutTitle: "About Apony Inc",
    aboutSubtitle: "Bridging the gap between global manufacturing and local delivery since 2019.",
    missionTitle: "Our Mission",
    missionDesc: "To simplify global trade by providing reliable, technology-driven logistics infrastructure that empowers businesses to scale without borders.",
    visionTitle: "Our Vision",
    visionDesc: "To be the world's most trusted partner in cross-border e-commerce logistics, setting the standard for speed, transparency, and service.",
    historyTitle: "Our Story",
    historyDesc: "Founded with a single warehouse in California, Apony Inc has grown into a global logistics network. We recognized early on that software and service must go hand-in-hand. Today, we serve over 500+ clients ranging from emerging DTC brands to Fortune 500 manufacturers.",

    // Contact Page
    contactTitle: "Get in Touch",
    contactSubtitle: "Have questions about our rates or services? Our team is ready to help.",
    formName: "Your Name",
    formEmail: "Email Address",
    formSubject: "Subject",
    formMessage: "Message",
    formSubmit: "Send Message",
    locationsTitle: "Our Locations",
    locationUS: "Los Angeles, CA (Headquarters)",
    locationCN: "Shenzhen, China (Operations Center)",

    // Tracking
    trackingTitle: "Track Your Shipment",
    trackingSubtitle: "Enter your tracking number or order ID to get real-time status updates.",
    trackingPlaceholder: "e.g., APY123456789",
    trackingButton: "Track",
    trackingResultMock: "Status: In Transit - Arrived at Distribution Center (Los Angeles, CA)",

    footerAbout: "Apony Inc is a leading logistics provider specializing in overseas warehousing and global distribution services.",
    rights: "© 2024 Apony Inc. All rights reserved.",

    chatTitle: "Apony Support",
    chatSubtitle: "AI Assistant",
    placeholder: "Ask about rates, tracking...",
    send: "Send",
    clear: "Clear Chat",
    loading: "Thinking...",
    welcomeTitle: "How can we help?",
    welcomeText: "I am Apony's AI assistant. Ask me about our warehouse locations, shipping rates, or services.",
    errorGeneric: "Connection error. Please try again."
  },
  [Language.ZH]: {
    navHome: "首页",
    navServices: "服务项目",
    navWarehousing: "海外仓储",
    navAbout: "关于我们",
    navContact: "联系我们",
    navTracking: "运单追踪",

    heroTitle: "全球物流与海外仓一站式解决方案",
    heroSubtitle: "Apony Inc 提供高效、安全、数字化的供应链服务。从海外仓储到末端派送，我们为您的跨境贸易赋能。",
    heroCTA: "查看服务",
    heroSecondaryCTA: "运单追踪",

    statWarehouses: "全球仓库",
    statExperience: "行业经验",
    statDelivery: "准时送达",

    servicesTitle: "核心业务",
    servicesSubtitle: "专为跨境电商量身定制的综合解决方案",
    whyChooseUs: "为什么选择 Apony？",

    // Services Page
    servicesPageTitle: "全方位物流解决方案",
    servicesPageSubtitle: "为跨境电商卖家和全球品牌量身定制的端到端供应链管理服务。",
    
    serviceWarehousingTitle: "海外仓储",
    serviceWarehousingDesc: "我们的全美仓储网络确保您的产品安全存储并快速发货。我们支持 B2C 一件代发和 B2B 分销，库存准确率高达 99.9%。",
    serviceWarehousingPoints: [
      "24小时出库时效保障",
      "实时库存同步",
      "退换货管理与翻新",
      "定制包装与组合销售"
    ],

    serviceLogisticsTitle: "全球物流",
    serviceLogisticsDesc: "从工厂到客户手中。我们提供灵活的海运和空运解决方案，帮助您高效地将库存运送至美国。",
    serviceLogisticsPoints: [
      "海运整柜/拼箱 (FCL/LCL)",
      "空运与快递服务",
      "双清包税",
      "末端派送优化"
    ],

    serviceWMSTitle: "智能 WMS 系统",
    serviceWMSDesc: "我们自研的仓库管理系统 (WMS) 让您无论身在何处，都能对供应链拥有完全的可视化和控制权。",
    serviceWMSPoints: [
      "API 集成 (Shopify, Amazon, Walmart)",
      "实时订单追踪",
      "智能路由算法",
      "数据分析与报表"
    ],

    serviceFbaTitle: "FBA 服务",
    serviceFbaDesc: "通过我们专业的 FBA 预处理和中转服务，最大化您的亚马逊业务。我们确保符合亚马逊严格的入库要求。",
    serviceFbaPoints: [
      "FBA 贴标与换标",
      "FBA 中转补货",
      "移除订单处理",
      "暂存与周转"
    ],

    // About Page
    aboutTitle: "关于 Apony Inc",
    aboutSubtitle: "自2019年起，致力于连接全球制造与本地交付。",
    missionTitle: "我们的使命",
    missionDesc: "通过提供可靠、技术驱动的物流基础设施，简化全球贸易，赋能企业实现无国界扩展。",
    visionTitle: "我们的愿景",
    visionDesc: "成为全球最值得信赖的跨境电商物流合作伙伴，树立速度、透明度和服务的新标准。",
    historyTitle: "发展历程",
    historyDesc: "Apony Inc 成立于加利福尼亚州，最初只有一个仓库，现已发展成为全球物流网络。我们很早就认识到软件与服务必须相辅相成。如今，我们服务于 500 多家客户，涵盖新兴 DTC 品牌到世界 500 强制造商。",

    // Contact Page
    contactTitle: "联系我们",
    contactSubtitle: "对我们的费率或服务有疑问？我们的团队随时为您提供帮助。",
    formName: "您的姓名",
    formEmail: "电子邮箱",
    formSubject: "主题",
    formMessage: "留言内容",
    formSubmit: "发送消息",
    locationsTitle: "办公地点",
    locationUS: "美国洛杉矶 (总部)",
    locationCN: "中国深圳 (运营中心)",

    // Tracking
    trackingTitle: "货物追踪",
    trackingSubtitle: "输入您的追踪号码或订单 ID 以获取实时状态更新。",
    trackingPlaceholder: "例如：APY123456789",
    trackingButton: "查询",
    trackingResultMock: "状态：运输中 - 已到达分拨中心 (Los Angeles, CA)",

    footerAbout: "Apony Inc 是一家领先的物流服务商，专注于海外仓储和全球分销服务。",
    rights: "© 2024 Apony Inc. 保留所有权利。",

    chatTitle: "Apony 客服",
    chatSubtitle: "AI 智能助手",
    placeholder: "咨询运费、查询单号...",
    send: "发送",
    clear: "清空",
    loading: "思考中...",
    welcomeTitle: "有什么可以帮您？",
    welcomeText: "我是 Apony 的 AI 助手。您可以咨询关于仓库位置、物流时效或业务合作的问题。",
    errorGeneric: "连接错误，请重试。"
  }
};