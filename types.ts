export enum Language {
  EN = 'en',
  ZH = 'zh'
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: 'clearance' | 'landing' | 'warehousing' | 'transport' | 'comprehensive';
  clientBackground: string;
  challenge: string;
  solution: string;
  result: string;
  metrics?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'company' | 'industry' | 'policy' | 'knowledge';
  publishDate: string;
  imageUrl?: string;
}

export type Page = 'home' | 'services' | 'about' | 'contact' | 'tracking' | 'login' | 'faq' | 'cases' | 'news' | 'newsDetail';

export interface TranslationResource {
  // Navigation
  navHome: string;
  navServices: string;
  navWarehousing: string;
  navAbout: string;
  navContact: string;
  navTracking: string;
  navLogin: string;
  navFAQ: string;
  navCases: string;
  navNews: string;

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
  locationCA: string;

  // Tracking Page
  trackingTitle: string;
  trackingSubtitle: string;
  trackingPlaceholder: string;
  trackingButton: string;
  trackingResultMock: string;

  // Footer
  footerAbout: string;
  rights: string;

  // FAQ Page
  faqTitle: string;
  faqSubtitle: string;
  faqCategoryClearance: string;
  faqCategoryLanding: string;
  faqCategoryWarehousing: string;
  faqCategoryTransport: string;
  faqCategoryPricing: string;
  faqCategoryOther: string;
  faqClearance: FAQItem[];
  faqLanding: FAQItem[];
  faqWarehousing: FAQItem[];
  faqTransport: FAQItem[];
  faqPricing: FAQItem[];
  faqOther: FAQItem[];

  // Cases Page
  casesTitle: string;
  casesSubtitle: string;
  casesFilterAll: string;
  casesFilterClearance: string;
  casesFilterLanding: string;
  casesFilterWarehousing: string;
  casesFilterTransport: string;
  casesFilterComprehensive: string;
  caseClientBackground: string;
  caseChallenge: string;
  caseSolution: string;
  caseResult: string;
  caseViewDetails: string;
  cases: CaseStudy[];

  // News Page
  newsTitle: string;
  newsSubtitle: string;
  newsFilterAll: string;
  newsFilterCompany: string;
  newsFilterIndustry: string;
  newsFilterPolicy: string;
  newsFilterKnowledge: string;
  newsReadMore: string;
  newsBackToList: string;
  newsRelatedArticles: string;
  newsPublishedOn: string;
  newsItems: NewsItem[];
}

export const STRINGS: Record<Language, TranslationResource> = {
  [Language.EN]: {
    navHome: "Home",
    navServices: "Services",
    navWarehousing: "Warehousing",
    navAbout: "About Us",
    navContact: "Contact",
    navTracking: "Track Order",
    navLogin: "System Login",
    navFAQ: "FAQ",
    navCases: "Case Studies",
    navNews: "News",

    heroTitle: "US & Canada Logistics & Warehousing Solutions",
    heroSubtitle: "AponyGroup specializes exclusively in US and Canada markets. We provide customs clearance, landing services, warehousing, and transportation solutions for your North American operations.",
    heroCTA: "View Services",
    heroSecondaryCTA: "Track Shipment",

    statWarehouses: "US & Canada Warehouses",
    statExperience: "Years Experience",
    statDelivery: "On-Time Delivery",

    servicesTitle: "Our Core Services",
    servicesSubtitle: "Comprehensive solutions tailored for cross-border e-commerce",
    whyChooseUs: "Why Choose AponyGroup?",
    
    // Services Page
    servicesPageTitle: "US & Canada Logistics Solutions",
    servicesPageSubtitle: "Comprehensive logistics services focused exclusively on US and Canada markets: customs clearance, landing services, warehousing, and transportation.",
    
    serviceWarehousingTitle: "US & Canada Warehousing",
    serviceWarehousingDesc: "Our strategically located warehouses in the US and Canada ensure your products are stored securely and shipped rapidly. We handle B2C fulfillment and B2B distribution with 99.9% inventory accuracy, exclusively serving the North American market.",
    serviceWarehousingPoints: [
      "24-Hour Outbound SLA",
      "Real-time Inventory Sync",
      "Returns Management & Refurbishment",
      "Custom Packaging & Kitting"
    ],

    serviceLogisticsTitle: "US & Canada Logistics",
    serviceLogisticsDesc: "Specialized logistics services for US and Canada markets. We provide customs clearance, port landing services, and efficient transportation solutions across North America.",
    serviceLogisticsPoints: [
      "US & Canada Customs Clearance",
      "Port Landing & Cargo Pickup",
      "Cross-Border Transportation (US-Canada)",
      "Last Mile Delivery in US & Canada"
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
    aboutTitle: "About AponyGroup",
    aboutSubtitle: "Specializing in US & Canada logistics services since 2019. We focus exclusively on North American markets.",
    missionTitle: "Our Mission",
    missionDesc: "To simplify US and Canada logistics by providing reliable customs clearance, landing services, warehousing, and transportation solutions that empower businesses to succeed in North American markets.",
    visionTitle: "Our Vision",
    visionDesc: "To be the most trusted logistics partner for US and Canada operations, setting the standard for speed, transparency, and service in North American logistics.",
    historyTitle: "Our Story",
    historyDesc: "Founded with a single warehouse in California, AponyGroup has grown into a specialized US and Canada logistics provider. We focus exclusively on North American markets, providing customs clearance, landing services, warehousing, and transportation. Today, we serve over 500+ clients across the US and Canada, ranging from emerging DTC brands to established manufacturers.",

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
    locationCA: "Toronto, ON (Canada Office)",

    // Tracking
    trackingTitle: "Track Your Shipment",
    trackingSubtitle: "Enter your tracking number or order ID to get real-time status updates.",
    trackingPlaceholder: "e.g., APY123456789",
    trackingButton: "Track",
    trackingResultMock: "Status: In Transit - Arrived at Distribution Center (Los Angeles, CA)",

    footerAbout: "AponyGroup is a leading logistics provider specializing in overseas warehousing and global distribution services.",
    rights: "© 2024 AponyGroup. All rights reserved.",

    // FAQ Page
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Find answers to common questions about our US & Canada logistics services",
    faqCategoryClearance: "Customs Clearance",
    faqCategoryLanding: "Landing Services",
    faqCategoryWarehousing: "Warehousing Services",
    faqCategoryTransport: "Transportation Services",
    faqCategoryPricing: "Pricing & Quotes",
    faqCategoryOther: "Other Questions",
    faqClearance: [
      {
        question: "What is the customs clearance process for US and Canada?",
        answer: "Our customs clearance process includes document preparation, customs declaration submission, duty and tax calculation, and clearance approval. We handle all paperwork and coordinate with customs authorities to ensure smooth clearance. Typical clearance time is 1-3 business days for standard shipments."
      },
      {
        question: "What documents are required for customs clearance?",
        answer: "Required documents typically include commercial invoice, packing list, bill of lading or air waybill, customs declaration form, and any product-specific certificates (such as FDA, FCC, etc.). We will provide you with a complete checklist based on your shipment type."
      },
      {
        question: "How long does customs clearance take?",
        answer: "Standard customs clearance typically takes 1-3 business days. However, this can vary based on shipment type, value, and any additional inspections required. We provide real-time updates throughout the clearance process."
      },
      {
        question: "How are customs duties and taxes calculated?",
        answer: "Customs duties and taxes are calculated based on the declared value of goods, HS code classification, country of origin, and applicable trade agreements. We provide detailed cost breakdowns before shipment to help you plan accordingly."
      }
    ],
    faqLanding: [
      {
        question: "What happens after my goods arrive at the destination port?",
        answer: "Upon arrival, we handle cargo pickup from the port, customs clearance, and transportation to our warehouse or your designated location. We provide real-time tracking updates throughout the landing process."
      },
      {
        question: "What services are included in landing services?",
        answer: "Our landing services include port cargo pickup, customs clearance coordination, cargo inspection, documentation handling, and transportation to final destination. We ensure a seamless transition from port to warehouse or delivery point."
      },
      {
        question: "How quickly can goods be processed after landing?",
        answer: "We typically process and clear goods within 24-48 hours of port arrival, depending on customs requirements. Express processing options are available for time-sensitive shipments."
      }
    ],
    faqWarehousing: [
      {
        question: "What is the warehousing process?",
        answer: "Our warehousing process includes receiving inspection, inventory management, storage, order fulfillment, and outbound shipping. We provide real-time inventory visibility through our system and maintain 99.9% inventory accuracy."
      },
      {
        question: "What do I need to prepare before warehousing?",
        answer: "Before warehousing, you'll need to provide product information, SKU details, packaging requirements, and shipping labels. We'll provide a pre-warehousing checklist to ensure smooth onboarding. All products should be properly labeled and packaged according to our guidelines."
      },
      {
        question: "How is inventory managed?",
        answer: "We use advanced WMS technology to track inventory in real-time. You can access inventory levels, receive low-stock alerts, and view detailed reports through our online portal. Regular cycle counts ensure accuracy."
      },
      {
        question: "What are the storage fees?",
        answer: "Storage fees are calculated based on cubic feet or square feet used, storage duration, and any special handling requirements. We offer competitive rates and provide detailed pricing upon request. Long-term storage discounts are available."
      }
    ],
    faqTransport: [
      {
        question: "What are the shipping times for US and Canada?",
        answer: "Shipping times vary by service level: Standard ground shipping within US takes 3-7 business days, expedited takes 1-3 business days. Canada shipping typically takes 5-10 business days. Express options are available for faster delivery."
      },
      {
        question: "What transportation options are available?",
        answer: "We offer various transportation options including ground freight, air freight, express delivery, and specialized transport for oversized or hazardous goods. We can also provide multi-modal solutions combining different transport methods for optimal cost and speed."
      },
      {
        question: "How do you ensure safe transportation?",
        answer: "We work with certified carriers, use proper packaging and handling procedures, provide cargo insurance options, and offer real-time tracking. All shipments are handled by trained professionals following industry best practices."
      },
      {
        question: "Can you handle cross-border shipping between US and Canada?",
        answer: "Yes, we specialize in US-Canada cross-border shipping. We handle all customs documentation, duty payments, and coordinate with border authorities to ensure smooth transit. We have extensive experience with NAFTA/USMCA regulations."
      }
    ],
    faqPricing: [
      {
        question: "How are service fees calculated?",
        answer: "Service fees are calculated based on shipment volume, weight, dimensions, service type, and destination. We provide transparent pricing with no hidden fees. Contact us for a customized quote based on your specific needs."
      },
      {
        question: "Do you offer volume discounts?",
        answer: "Yes, we offer competitive volume discounts for regular customers and large shipments. Discounts are based on monthly shipping volume and contract terms. Contact our sales team to discuss pricing options."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods including wire transfer, ACH, credit cards, and payment terms for qualified customers. Payment terms and methods can be discussed during account setup."
      }
    ],
    faqOther: [
      {
        question: "What areas do you serve?",
        answer: "We specialize in US and Canada logistics services only. We do not provide domestic China services or front-end services. Our focus is on customs clearance, landing services, warehousing, and transportation within the US and Canada markets."
      },
      {
        question: "How do I track my shipment?",
        answer: "You can track your shipment using our online tracking system. Simply enter your tracking number or order ID on our tracking page. We provide real-time updates on shipment status, location, and estimated delivery time."
      },
      {
        question: "What if I have a problem with my shipment?",
        answer: "Our customer service team is available to assist with any issues. Contact us immediately if you encounter problems, and we'll work to resolve them quickly. We have a dedicated support team available during business hours."
      }
    ],

    // Cases Page
    casesTitle: "Success Stories",
    casesSubtitle: "Real solutions for real businesses in US & Canada logistics",
    casesFilterAll: "All Cases",
    casesFilterClearance: "Clearance Services",
    casesFilterLanding: "Landing Services",
    casesFilterWarehousing: "Warehousing Services",
    casesFilterTransport: "Transportation Services",
    casesFilterComprehensive: "Comprehensive Solutions",
    caseClientBackground: "Client Background",
    caseChallenge: "Business Challenge",
    caseSolution: "Our Solution",
    caseResult: "Results",
    caseViewDetails: "View Details",
    cases: [
      {
        id: "case1",
        title: "E-commerce Brand: Fast-Track US Market Entry",
        category: "comprehensive",
        clientBackground: "A growing e-commerce brand looking to expand into the US market with consumer electronics products.",
        challenge: "Needed to navigate complex US customs regulations, establish warehousing, and set up efficient distribution across multiple states within tight timelines.",
        solution: "We provided end-to-end services including customs clearance, port landing, warehousing setup, and multi-state distribution. Our team handled all documentation and coordinated with customs authorities to ensure smooth entry.",
        result: "Successfully launched in US market within 6 weeks. Achieved 99.5% on-time delivery rate and reduced logistics costs by 25% compared to previous provider.",
        metrics: ["6 weeks to market", "99.5% on-time delivery", "25% cost reduction"]
      },
      {
        id: "case2",
        title: "Manufacturer: Streamlined Canada Customs Clearance",
        category: "clearance",
        clientBackground: "A manufacturing company shipping industrial equipment to Canada on a regular basis.",
        challenge: "Frequent delays in customs clearance causing production schedule disruptions and customer dissatisfaction.",
        solution: "We established a dedicated customs clearance process with pre-prepared documentation, established relationships with Canadian customs, and implemented real-time tracking.",
        result: "Reduced average clearance time from 5 days to 1.5 days. Eliminated 95% of clearance delays and improved customer satisfaction significantly.",
        metrics: ["1.5 days clearance time", "95% delay reduction"]
      },
      {
        id: "case3",
        title: "Retailer: Multi-Warehouse Distribution Network",
        category: "warehousing",
        clientBackground: "A retail chain requiring storage and distribution across multiple US regions.",
        challenge: "Needed efficient warehousing solutions with fast order fulfillment and inventory management across multiple locations.",
        solution: "We set up a network of strategically located warehouses, implemented our WMS for real-time inventory visibility, and optimized fulfillment routes.",
        result: "Achieved 24-hour order fulfillment SLA. Reduced shipping costs by 30% through optimized warehouse locations and improved inventory turnover by 40%.",
        metrics: ["24-hour fulfillment", "30% cost reduction", "40% inventory improvement"]
      }
    ],

    // News Page
    newsTitle: "News & Insights",
    newsSubtitle: "Stay updated with industry news, policy changes, and logistics knowledge",
    newsFilterAll: "All News",
    newsFilterCompany: "Company News",
    newsFilterIndustry: "Industry Updates",
    newsFilterPolicy: "Policy & Regulations",
    newsFilterKnowledge: "Logistics Knowledge",
    newsReadMore: "Read More",
    newsBackToList: "Back to News",
    newsRelatedArticles: "Related Articles",
    newsPublishedOn: "Published on",
    newsItems: [
      {
        id: "news1",
        title: "New US Customs Regulations Effective January 2024",
        summary: "Important updates to US customs procedures that may affect your shipments. Learn about the new documentation requirements and compliance standards.",
        content: "The US Customs and Border Protection (CBP) has implemented new regulations effective January 2024. These changes affect documentation requirements, duty calculations, and clearance procedures. Key updates include enhanced data requirements for commercial invoices, new HS code classifications for certain product categories, and updated security screening protocols. We recommend reviewing your shipping documentation to ensure compliance. Our team is available to assist with any questions or concerns about these changes.",
        category: "policy",
        publishDate: "2024-01-15"
      },
      {
        id: "news2",
        title: "AponyGroup Expands Warehouse Network in California",
        summary: "We're excited to announce the opening of our new 50,000 sq ft warehouse facility in Los Angeles, increasing our storage capacity and improving service delivery.",
        content: "AponyGroup is pleased to announce the opening of our new state-of-the-art warehouse facility in Los Angeles, California. This 50,000 square foot facility features advanced inventory management systems, climate-controlled storage areas, and enhanced security measures. The expansion increases our total storage capacity by 30% and enables us to serve more clients with faster fulfillment times. The new facility is strategically located near major transportation hubs, reducing shipping times and costs for our clients.",
        category: "company",
        publishDate: "2024-01-10"
      },
      {
        id: "news3",
        title: "Understanding USMCA Trade Agreement Benefits",
        summary: "Learn how the USMCA trade agreement can benefit your cross-border shipments between US, Canada, and Mexico.",
        content: "The United States-Mexico-Canada Agreement (USMCA) replaced NAFTA and offers significant benefits for cross-border trade. Understanding these benefits can help reduce costs and streamline your logistics operations. Key advantages include reduced or eliminated tariffs for qualifying goods, simplified customs procedures, and enhanced intellectual property protections. To qualify for USMCA benefits, products must meet specific rules of origin requirements. Our customs clearance team can help determine if your products qualify and assist with the necessary documentation.",
        category: "knowledge",
        publishDate: "2024-01-05"
      },
      {
        id: "news4",
        title: "E-commerce Logistics Trends for 2024",
        summary: "Industry experts predict continued growth in e-commerce logistics with focus on speed, sustainability, and technology integration.",
        content: "The e-commerce logistics industry continues to evolve rapidly. Key trends for 2024 include increased demand for same-day and next-day delivery, greater emphasis on sustainable packaging and carbon-neutral shipping options, and deeper integration of AI and automation in warehouse operations. Companies are also investing more in last-mile delivery optimization and customer experience enhancements. These trends reflect changing consumer expectations and the need for logistics providers to adapt quickly.",
        category: "industry",
        publishDate: "2024-01-01"
      }
    ]
  },
  [Language.ZH]: {
    navHome: "首页",
    navServices: "服务项目",
    navWarehousing: "海外仓储",
    navAbout: "关于我们",
    navContact: "联系我们",
    navTracking: "运单追踪",
    navLogin: "系统登录",
    navFAQ: "常见问题",
    navCases: "成功案例",
    navNews: "新闻资讯",

    heroTitle: "美加物流与仓储一站式解决方案",
    heroSubtitle: "AponyGroup 专注美加市场，提供清关、落地服务、仓储和运输等全方位物流解决方案，助力您的北美业务。",
    heroCTA: "查看服务",
    heroSecondaryCTA: "运单追踪",

    statWarehouses: "美加仓库",
    statExperience: "行业经验",
    statDelivery: "准时送达",

    servicesTitle: "核心业务",
    servicesSubtitle: "专为跨境电商量身定制的综合解决方案",
    whyChooseUs: "为什么选择 AponyGroup？",

    // Services Page
    servicesPageTitle: "美加物流解决方案",
    servicesPageSubtitle: "专注于美加市场的全方位物流服务：清关、落地服务、入仓、运输一站式解决方案。",
    
    serviceWarehousingTitle: "美加仓储",
    serviceWarehousingDesc: "我们在美加战略布局的仓储网络确保您的产品安全存储并快速发货。我们支持 B2C 一件代发和 B2B 分销，库存准确率高达 99.9%，专注服务北美市场。",
    serviceWarehousingPoints: [
      "24小时出库时效保障",
      "实时库存同步",
      "退换货管理与翻新",
      "定制包装与组合销售"
    ],

    serviceLogisticsTitle: "美加物流",
    serviceLogisticsDesc: "专注于美加市场的专业物流服务。我们提供清关、港口落地服务和高效的美加运输解决方案。",
    serviceLogisticsPoints: [
      "美加清关服务",
      "港口落地与提货",
      "美加跨境运输",
      "美加末端派送"
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
    aboutTitle: "关于 AponyGroup",
    aboutSubtitle: "自2019年起，专注美加物流服务，深耕北美市场。",
    missionTitle: "我们的使命",
    missionDesc: "通过提供可靠的美加清关、落地服务、仓储和运输解决方案，简化美加物流流程，助力企业在北美市场取得成功。",
    visionTitle: "我们的愿景",
    visionDesc: "成为美加市场最值得信赖的物流合作伙伴，在北美物流领域树立速度、透明度和服务的新标准。",
    historyTitle: "发展历程",
    historyDesc: "AponyGroup 成立于加利福尼亚州，最初只有一个仓库，现已发展成为专业的美加物流服务商。我们专注北美市场，提供清关、落地服务、仓储和运输服务。如今，我们服务于美加市场 500 多家客户，涵盖新兴 DTC 品牌到知名制造商。",

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
    locationCA: "加拿大多伦多 (加拿大办公室)",

    // Tracking
    trackingTitle: "货物追踪",
    trackingSubtitle: "输入您的追踪号码或订单 ID 以获取实时状态更新。",
    trackingPlaceholder: "例如：APY123456789",
    trackingButton: "查询",
    trackingResultMock: "状态：运输中 - 已到达分拨中心 (Los Angeles, CA)",

    footerAbout: "AponyGroup 是一家领先的物流服务商，专注于海外仓储和全球分销服务。",
    rights: "© 2024 AponyGroup. 保留所有权利。",

    // FAQ Page
    faqTitle: "常见问题",
    faqSubtitle: "了解我们美加物流服务的常见问题解答",
    faqCategoryClearance: "清关服务",
    faqCategoryLanding: "落地服务",
    faqCategoryWarehousing: "入仓服务",
    faqCategoryTransport: "运输服务",
    faqCategoryPricing: "费用与报价",
    faqCategoryOther: "其他问题",
    faqClearance: [
      {
        question: "美加清关流程是什么？",
        answer: "我们的清关流程包括文件准备、报关提交、税费计算和清关审批。我们处理所有文件工作并与海关协调，确保顺利清关。标准货物的清关时间通常为1-3个工作日。"
      },
      {
        question: "清关需要哪些文件？",
        answer: "通常需要的文件包括商业发票、装箱单、提单或空运单、报关单，以及任何产品特定的证书（如FDA、FCC等）。我们会根据您的货物类型提供完整的文件清单。"
      },
      {
        question: "清关时效如何？",
        answer: "标准清关通常需要1-3个工作日。但是，这可能会根据货物类型、价值和所需的额外检查而有所不同。我们在整个清关过程中提供实时更新。"
      },
      {
        question: "清关费用如何计算？",
        answer: "清关税费根据货物的申报价值、HS编码分类、原产国和适用的贸易协定计算。我们会在发货前提供详细的成本明细，帮助您做好规划。"
      }
    ],
    faqLanding: [
      {
        question: "货物到达目的港后如何处理？",
        answer: "货物到达后，我们负责从港口提货、清关，并运输到我们的仓库或您指定的地点。我们在整个落地过程中提供实时跟踪更新。"
      },
      {
        question: "落地服务包含哪些内容？",
        answer: "我们的落地服务包括港口提货、清关协调、货物检验、文件处理以及运输到最终目的地。我们确保从港口到仓库或交付点的无缝衔接。"
      },
      {
        question: "货物落地后多久可以处理？",
        answer: "我们通常在港口到达后24-48小时内处理和清关货物，具体取决于海关要求。对于时间敏感的货物，我们提供加急处理选项。"
      }
    ],
    faqWarehousing: [
      {
        question: "入仓流程是怎样的？",
        answer: "我们的入仓流程包括收货检验、库存管理、存储、订单履行和出库发货。我们通过系统提供实时库存可见性，并保持99.9%的库存准确率。"
      },
      {
        question: "入仓前需要准备什么？",
        answer: "入仓前，您需要提供产品信息、SKU详情、包装要求和运输标签。我们会提供入仓前检查清单，确保顺利入仓。所有产品应根据我们的指南正确标记和包装。"
      },
      {
        question: "如何管理库存？",
        answer: "我们使用先进的WMS技术实时跟踪库存。您可以通过我们的在线门户访问库存水平、接收低库存警报并查看详细报告。定期循环盘点确保准确性。"
      },
      {
        question: "仓储费用如何计算？",
        answer: "仓储费用根据使用的立方英尺或平方英尺、存储时长以及任何特殊处理要求计算。我们提供有竞争力的价格，并根据要求提供详细定价。长期存储可享受折扣。"
      }
    ],
    faqTransport: [
      {
        question: "美加运输时效如何？",
        answer: "运输时间因服务级别而异：美国境内标准陆运需要3-7个工作日，加急需要1-3个工作日。加拿大运输通常需要5-10个工作日。我们提供快速选项以满足更快的交付需求。"
      },
      {
        question: "运输方式有哪些选择？",
        answer: "我们提供多种运输方式，包括陆运、空运、快递服务，以及超大或危险品的专业运输。我们还可以提供结合不同运输方式的多式联运解决方案，以实现最佳成本和速度。"
      },
      {
        question: "如何确保运输安全？",
        answer: "我们与认证承运商合作，使用适当的包装和处理程序，提供货物保险选项，并提供实时跟踪。所有货物都由遵循行业最佳实践的专业人员处理。"
      },
      {
        question: "可以处理美加跨境运输吗？",
        answer: "是的，我们专门从事美加跨境运输。我们处理所有海关文件、税费支付，并与边境当局协调以确保顺利过境。我们在NAFTA/USMCA法规方面拥有丰富经验。"
      }
    ],
    faqPricing: [
      {
        question: "服务费用如何计算？",
        answer: "服务费用根据货物体积、重量、尺寸、服务类型和目的地计算。我们提供透明的定价，无隐藏费用。请联系我们根据您的具体需求提供定制报价。"
      },
      {
        question: "是否有批量折扣？",
        answer: "是的，我们为常客和大批量货物提供有竞争力的批量折扣。折扣基于月度运输量和合同条款。请联系我们的销售团队讨论定价选项。"
      },
      {
        question: "接受哪些付款方式？",
        answer: "我们接受多种付款方式，包括电汇、ACH、信用卡，以及为合格客户提供的付款条件。付款条件和方式可在账户设置期间讨论。"
      }
    ],
    faqOther: [
      {
        question: "服务范围是什么？",
        answer: "我们专注于美加物流服务，不提供国内中国服务或前端服务。我们的重点是美加市场的清关、落地服务、仓储和运输。"
      },
      {
        question: "如何追踪我的货物？",
        answer: "您可以使用我们的在线追踪系统追踪货物。只需在我们的追踪页面输入您的追踪号码或订单ID。我们提供货物状态、位置和预计交付时间的实时更新。"
      },
      {
        question: "如果我的货物出现问题怎么办？",
        answer: "我们的客户服务团队随时为您提供帮助。如果您遇到问题，请立即联系我们，我们将快速解决。我们在营业时间内有专门的支持团队。"
      }
    ],

    // Cases Page
    casesTitle: "成功案例",
    casesSubtitle: "真实的美加物流解决方案案例",
    casesFilterAll: "全部案例",
    casesFilterClearance: "清关服务",
    casesFilterLanding: "落地服务",
    casesFilterWarehousing: "入仓服务",
    casesFilterTransport: "运输服务",
    casesFilterComprehensive: "综合解决方案",
    caseClientBackground: "客户背景",
    caseChallenge: "业务挑战",
    caseSolution: "解决方案",
    caseResult: "实施效果",
    caseViewDetails: "查看详情",
    cases: [
      {
        id: "case1",
        title: "电商品牌：快速进入美国市场",
        category: "comprehensive",
        clientBackground: "一家成长中的电商品牌，希望将消费电子产品扩展到美国市场。",
        challenge: "需要在紧张的时间表内应对复杂的美国海关法规，建立仓储，并在多个州建立高效的分销网络。",
        solution: "我们提供端到端服务，包括清关、港口落地、仓储设置和多州分销。我们的团队处理所有文件工作，并与海关协调，确保顺利进入。",
        result: "在6周内成功进入美国市场。实现了99.5%的准时交付率，与之前的供应商相比，物流成本降低了25%。",
        metrics: ["6周进入市场", "99.5%准时交付", "成本降低25%"]
      },
      {
        id: "case2",
        title: "制造商：简化加拿大清关流程",
        category: "clearance",
        clientBackground: "一家定期向加拿大运输工业设备的制造公司。",
        challenge: "清关频繁延误，导致生产计划中断和客户不满。",
        solution: "我们建立了专门的清关流程，预先准备文件，与加拿大海关建立关系，并实施实时跟踪。",
        result: "将平均清关时间从5天减少到1.5天。消除了95%的清关延误，显著提高了客户满意度。",
        metrics: ["1.5天清关时间", "减少95%延误"]
      },
      {
        id: "case3",
        title: "零售商：多仓库分销网络",
        category: "warehousing",
        clientBackground: "一家需要在多个美国地区进行存储和分销的零售连锁店。",
        challenge: "需要高效的仓储解决方案，具有快速订单履行和跨多个地点的库存管理。",
        solution: "我们建立了战略定位的仓库网络，实施WMS以实现实时库存可见性，并优化履行路线。",
        result: "实现了24小时订单履行SLA。通过优化的仓库位置，运输成本降低了30%，库存周转率提高了40%。",
        metrics: ["24小时履行", "成本降低30%", "库存改善40%"]
      }
    ],

    // News Page
    newsTitle: "新闻资讯",
    newsSubtitle: "了解行业动态、政策变化和物流知识",
    newsFilterAll: "全部资讯",
    newsFilterCompany: "公司新闻",
    newsFilterIndustry: "行业动态",
    newsFilterPolicy: "政策法规",
    newsFilterKnowledge: "物流知识",
    newsReadMore: "阅读全文",
    newsBackToList: "返回列表",
    newsRelatedArticles: "相关文章",
    newsPublishedOn: "发布时间",
    newsItems: [
      {
        id: "news1",
        title: "2024年1月生效的美国海关新法规",
        summary: "可能影响您货物运输的美国海关程序重要更新。了解新的文件要求和合规标准。",
        content: "美国海关和边境保护局（CBP）已实施2024年1月生效的新法规。这些变化影响文件要求、税费计算和清关程序。主要更新包括商业发票的增强数据要求、某些产品类别的新HS编码分类，以及更新的安全检查协议。我们建议审查您的运输文件以确保合规。我们的团队可协助解答有关这些变化的任何问题或疑虑。",
        category: "policy",
        publishDate: "2024-01-15"
      },
      {
        id: "news2",
        title: "AponyGroup在加利福尼亚州扩展仓库网络",
        summary: "我们很高兴地宣布在洛杉矶开设新的50,000平方英尺仓库设施，增加存储容量并改善服务交付。",
        content: "AponyGroup很高兴地宣布在加利福尼亚州洛杉矶开设我们新的最先进仓库设施。这个50,000平方英尺的设施配备了先进的库存管理系统、温控存储区域和增强的安全措施。此次扩展使我们的总存储容量增加了30%，使我们能够为更多客户提供服务，并实现更快的履行时间。新设施战略性地位于主要交通枢纽附近，减少了客户的运输时间和成本。",
        category: "company",
        publishDate: "2024-01-10"
      },
      {
        id: "news3",
        title: "了解USMCA贸易协定优势",
        summary: "了解USMCA贸易协定如何使您在美国、加拿大和墨西哥之间的跨境运输受益。",
        content: "美墨加协定（USMCA）取代了NAFTA，为跨境贸易提供了显著优势。了解这些优势可以帮助降低成本并简化您的物流运营。主要优势包括符合条件的商品的关税减免或取消、简化的海关程序以及增强的知识产权保护。要获得USMCA优势，产品必须满足特定的原产地规则要求。我们的清关团队可以帮助确定您的产品是否符合条件，并协助处理必要的文件。",
        category: "knowledge",
        publishDate: "2024-01-05"
      },
      {
        id: "news4",
        title: "2024年电商物流趋势",
        summary: "行业专家预测电商物流将继续增长，重点关注速度、可持续性和技术集成。",
        content: "电商物流行业继续快速发展。2024年的主要趋势包括对当日和次日送达的需求增加、更强调可持续包装和碳中和运输选项，以及AI和自动化在仓库运营中的更深层次集成。公司还在最后里程交付优化和客户体验增强方面投入更多。这些趋势反映了不断变化的消费者期望以及物流提供商需要快速适应的需求。",
        category: "industry",
        publishDate: "2024-01-01"
      }
    ]
  }
};