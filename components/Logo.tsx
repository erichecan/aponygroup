// Logo 组件 - 使用公司 Logo 图片
// Created: 2025-01-27

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo 图片 */}
      <img 
        src="/assets/logo.png" 
        alt="AponyGroup Logo" 
        className={`${sizeClasses[size]} object-contain`}
        onError={(e) => {
          // 如果图片加载失败，显示备用方案
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      {/* 备用方案（如果图片不存在） */}
      <div className={`${sizeClasses[size]} bg-[#FF6B35] rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-[#FF6B35]/30 hidden`}>
        A
      </div>
      {showText && (
        <span className={`font-bold text-slate-900 ${
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl'
        }`}>
          AponyGroup
        </span>
      )}
    </div>
  );
};

