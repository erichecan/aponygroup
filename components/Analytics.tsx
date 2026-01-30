// Google Analytics 集成组件
// 时间戳：2025-01-27

import { useEffect } from 'react';

interface AnalyticsProps {
  trackingId?: string;
  enabled?: boolean;
}

export const Analytics: React.FC<AnalyticsProps> = ({ 
  trackingId = import.meta.env.VITE_GA_TRACKING_ID || '',
  enabled = true 
}) => {
  useEffect(() => {
    if (!enabled || !trackingId || typeof window === 'undefined') {
      return;
    }

    // 加载 Google Analytics 4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script1);

    // 初始化 gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    gtag('js', new Date());
    gtag('config', trackingId, {
      page_path: window.location.pathname,
    });

    // 页面浏览跟踪
    const handleRouteChange = () => {
      gtag('config', trackingId, {
        page_path: window.location.pathname,
      });
    };

    // 监听路由变化（对于 SPA）
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [trackingId, enabled]);

  return null;
};

// 声明全局类型
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

