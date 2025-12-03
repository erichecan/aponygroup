import React, { useState, useEffect, useRef } from 'react';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * 带备用方案的图片组件
 * 支持懒加载、响应式、错误处理
 * Created: 2024-12-19 15:10:00
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  lazy = true,
  aspectRatio,
  objectFit = 'cover'
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);

  // 懒加载：使用 Intersection Observer
  useEffect(() => {
    if (!lazy || isInView) return;

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
  }, [lazy, isInView]);

  const handleError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else {
      // 如果备用图片也失败，显示占位符
      setImageSrc('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23f1f5f9" width="800" height="600"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E');
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const containerStyle: React.CSSProperties = {
    aspectRatio: aspectRatio || undefined,
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div ref={imgRef} className={`relative ${className}`} style={containerStyle}>
      {!isInView && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
          loading={lazy ? 'lazy' : 'eager'}
        />
      )}
    </div>
  );
};

