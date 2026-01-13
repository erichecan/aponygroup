// 性能监控和优化工具
// 时间戳：2025-01-27

/**
 * 测量页面性能指标
 */
export function measurePerformance() {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  try {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (!navigation) {
      return null;
    }

    const metrics = {
      // DNS 查询时间
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      
      // TCP 连接时间
      tcp: navigation.connectEnd - navigation.connectStart,
      
      // TLS 握手时间（如果使用 HTTPS）
      tls: navigation.secureConnectionStart 
        ? navigation.connectEnd - navigation.secureConnectionStart 
        : 0,
      
      // 请求响应时间
      request: navigation.responseStart - navigation.requestStart,
      
      // 响应下载时间
      response: navigation.responseEnd - navigation.responseStart,
      
      // DOM 处理时间
      domProcessing: navigation.domComplete - navigation.domInteractive,
      
      // 页面加载总时间
      loadComplete: navigation.loadEventEnd - navigation.fetchStart,
      
      // First Contentful Paint
      fcp: 0,
      
      // Largest Contentful Paint
      lcp: 0,
      
      // Cumulative Layout Shift
      cls: 0,
      
      // First Input Delay
      fid: 0,
    };

    // 获取 Web Vitals（如果可用）
    if ('PerformanceObserver' in window) {
      // FCP
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
            }
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        // Ignore errors
      }

      // LCP
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Ignore errors
      }
    }

    return metrics;
  } catch (error) {
    console.warn('Failed to measure performance:', error);
    return null;
  }
}

/**
 * 延迟加载非关键资源
 */
export function deferNonCriticalResources() {
  // 延迟加载字体
  const fontLinks = document.querySelectorAll('link[rel="stylesheet"][href*="font"]');
  fontLinks.forEach(link => {
    link.setAttribute('media', 'print');
    link.setAttribute('onload', "this.media='all'");
  });
}

/**
 * 优化图片加载
 */
export function optimizeImageLoading() {
  // 为图片添加 loading="lazy"（如果还没有）
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    // 只对首屏外的图片添加 lazy loading
    if (!isInViewport(img as HTMLElement)) {
      img.setAttribute('loading', 'lazy');
    }
  });
}

/**
 * 检查元素是否在视口内
 */
function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * 记录性能指标到 Analytics
 */
export function logPerformanceMetrics(metrics: any) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'web_vitals', {
      event_category: 'Performance',
      value: Math.round(metrics.loadComplete),
      non_interaction: true,
    });
  }
}

