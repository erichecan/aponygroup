// 优化的图片组件 - 支持 WebP、响应式图片、srcset
// 时间戳：2025-01-27

import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
  srcSet?: {
    webp?: string[];
    jpg?: string[];
  };
  priority?: boolean; // 优先级加载（用于首屏图片）
}

/**
 * 优化的图片组件
 * 支持 WebP 格式、响应式图片、懒加载、错误处理
 * 时间戳：2025-01-27
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  lazy = true,
  aspectRatio,
  objectFit = 'cover',
  sizes = '100vw',
  srcSet,
  priority = false
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [webpSupported, setWebpSupported] = useState<boolean | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  // 检测 WebP 支持
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    setWebpSupported(checkWebPSupport());
  }, []);

  // 懒加载：使用 Intersection Observer
  useEffect(() => {
    if (!lazy || isInView || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lazy, isInView, priority]);

  const handleError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else {
      // 显示占位符
      setImageSrc('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23f1f5f9" width="800" height="600"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E');
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // 生成响应式 srcset
  const generateSrcSet = (images: string[] | undefined) => {
    if (!images || images.length === 0) return undefined;
    return images.join(', ');
  };

  // 转换 URL 为 WebP（如果支持）
  const convertToWebP = (url: string): string => {
    if (!webpSupported || !url.includes('unsplash.com')) return url;
    // Unsplash 支持通过 URL 参数转换为 WebP
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}fm=webp`;
  };

  const containerStyle: React.CSSProperties = {
    aspectRatio: aspectRatio || undefined,
    position: 'relative',
    overflow: 'hidden'
  };

  const supportsWebP = webpSupported === true;
  const webpSrc = supportsWebP ? convertToWebP(imageSrc) : imageSrc;
  const webpFallback = supportsWebP && fallbackSrc ? convertToWebP(fallbackSrc) : fallbackSrc;

  return (
    <div ref={imgRef} className={`relative ${className}`} style={containerStyle}>
      {!isInView && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" aria-hidden="true" />
      )}
      {isInView && (
        <picture>
          {/* WebP 格式（如果支持） */}
          {supportsWebP && srcSet?.webp && (
            <source
              srcSet={generateSrcSet(srcSet.webp)}
              sizes={sizes}
              type="image/webp"
            />
          )}
          
          {/* JPG/PNG 格式 */}
          {srcSet?.jpg && (
            <source
              srcSet={generateSrcSet(srcSet.jpg)}
              sizes={sizes}
            />
          )}

          {/* 默认图片 */}
          <img
            src={webpSrc}
            alt={alt}
            onError={handleError}
            onLoad={handleLoad}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectFit }}
            loading={lazy && !priority ? 'lazy' : 'eager'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            sizes={sizes}
            srcSet={srcSet?.jpg ? generateSrcSet(srcSet.jpg) : undefined}
          />
        </picture>
      )}
    </div>
  );
};

