// 资源预加载组件 - 性能优化
// 时间戳：2025-01-27

import { useEffect } from 'react';

interface ResourcePreloaderProps {
  images?: string[];
  fonts?: string[];
  routes?: string[];
}

/**
 * 资源预加载组件
 * 预加载关键资源以提升性能
 */
export const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({
  images = [],
  fonts = [],
  routes = []
}) => {
  useEffect(() => {
    // 预加载图片
    images.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // 预加载字体
    fonts.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = href;
      document.head.appendChild(link);
    });

    // 预连接重要域名
    const domains = [
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // 预获取路由（如果使用路由预加载）
    routes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }, [images, fonts, routes]);

  return null;
};

