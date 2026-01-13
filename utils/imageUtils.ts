// 图片工具函数 - WebP 支持、响应式图片生成
// 时间戳：2025-01-27

/**
 * 生成响应式图片 srcset
 * @param baseUrl 基础图片 URL
 * @param widths 宽度数组，例如 [400, 800, 1200]
 * @returns srcset 字符串
 */
export function generateSrcSet(baseUrl: string, widths: number[]): string {
  return widths
    .map(width => {
      const separator = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${separator}w=${width} ${width}w`;
    })
    .join(', ');
}

/**
 * 生成 WebP 格式的图片 URL（针对 Unsplash）
 * @param url 原始图片 URL
 * @returns WebP 格式的 URL
 */
export function convertToWebP(url: string): string {
  if (!url.includes('unsplash.com')) return url;
  const separator = url.includes('?') ? '&' : '?';
  // 如果已经有 fm 参数，替换它
  if (url.includes('fm=')) {
    return url.replace(/fm=[^&]*/, 'fm=webp');
  }
  return `${url}${separator}fm=webp`;
}

/**
 * 生成响应式图片 srcset（WebP）
 * @param baseUrl 基础图片 URL
 * @param widths 宽度数组
 * @returns WebP srcset 字符串
 */
export function generateWebPSrcSet(baseUrl: string, widths: number[]): string {
  const webpUrl = convertToWebP(baseUrl);
  return generateSrcSet(webpUrl, widths);
}

/**
 * 检测浏览器是否支持 WebP
 */
export function checkWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * 获取图片的合适尺寸
 * @param size 大小类型
 * @returns 宽度数组
 */
export function getImageWidths(size: 'small' | 'medium' | 'large' | 'hero' = 'medium'): number[] {
  switch (size) {
    case 'small':
      return [320, 640];
    case 'medium':
      return [400, 800, 1200];
    case 'large':
      return [800, 1200, 1920];
    case 'hero':
      return [640, 1024, 1920, 2560];
    default:
      return [400, 800, 1200];
  }
}

/**
 * 生成图片的 sizes 属性
 * @param breakpoints 断点配置
 * @returns sizes 字符串
 */
export function generateSizes(breakpoints?: Record<string, string>): string {
  if (!breakpoints) {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  }

  const entries = Object.entries(breakpoints).sort((a, b) => {
    const widthA = parseInt(a[0].replace(/\D/g, '')) || 0;
    const widthB = parseInt(b[0].replace(/\D/g, '')) || 0;
    return widthB - widthA; // 从大到小排序
  });

  return entries.map(([breakpoint, size]) => {
    if (breakpoint.includes('max-width')) {
      return `(${breakpoint}) ${size}`;
    }
    return `(min-width: ${breakpoint}) ${size}`;
  }).join(', ');
}

