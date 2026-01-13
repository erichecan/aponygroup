// 面包屑导航组件 - 2025-01-27
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Language, Page, STRINGS } from '../types';

interface BreadcrumbsProps {
  currentPage: Page;
  language: Language;
  setPage: (page: Page) => void;
  customItems?: Array<{ label: string; page?: Page }>;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage,
  language,
  setPage,
  customItems
}) => {
  const t = STRINGS[language];

  const getPageLabel = (page: Page): string => {
    switch (page) {
      case 'home': return t.navHome;
      case 'services': return t.navServices;
      case 'about': return t.navAbout;
      case 'contact': return t.navContact;
      case 'tracking': return t.navTracking;
      case 'login': return t.navLogin;
      case 'faq': return t.navFAQ;
      case 'cases': return t.navCases;
      case 'news': return t.navNews;
      default: return '';
    }
  };

  const breadcrumbs: Array<{ label: string; page?: Page }> = customItems || [
    { label: t.navHome, page: 'home' },
    ...(currentPage !== 'home' ? [{ label: getPageLabel(currentPage) }] : [])
  ];

  if (breadcrumbs.length <= 1) {
    return null; // 首页不需要面包屑
  }

  return (
    <nav 
      className="bg-slate-50 border-b border-slate-200 py-3 px-4"
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li
                key={index}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && (
                  <ChevronRight size={16} className="text-slate-400 mx-2" aria-hidden="true" />
                )}
                
                {isLast ? (
                  <span 
                    className="text-slate-600 font-medium"
                    aria-current="page"
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      if (item.page) {
                        setPage(item.page);
                        window.scrollTo(0, 0);
                      }
                    }}
                    className="text-slate-600 hover:text-[#FF6B35] transition-colors flex items-center gap-1"
                    itemProp="item"
                  >
                    {index === 0 && <Home size={16} />}
                    <span itemProp="name">{item.label}</span>
                  </button>
                )}
                
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

