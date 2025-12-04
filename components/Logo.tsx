// Logo 组件 - 使用公司 Logo 图片
// Created: 2025-01-27
// Updated: 2025-01-27 15:30:00 - 添加 variant 属性支持白色背景版本用于 Footer
// Updated: 2025-01-27 16:45:00 - 添加 xl 和 footer 尺寸选项，优化 Footer 显示

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'footer';
  showText?: boolean;
  className?: string;
  variant?: 'default' | 'white-bg'; // 默认使用透明背景，white-bg 使用白色背景（适用于黑色背景区域）
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = false,
  className = '',
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',  // 96x96px - 更大的选项
    full: 'w-[160px] h-[58px]',  // 160x58px - 原始比例
    footer: 'w-[200px] h-auto max-h-[72px]'  // Footer 专用尺寸，保持宽高比
  };

  // 根据 variant 选择对应的 logo 图片
  const logoSrc = variant === 'white-bg' 
    ? '/assets/logo-white-bg.png' 
    : '/assets/logo.png';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo 图片 */}
      <img 
        src={logoSrc} 
        alt="AponyGroup Logo" 
        className={`${sizeClasses[size]} object-contain transition-all duration-300`}
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
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-3xl' : 'text-4xl'
        }`}>
          AponyGroup
        </span>
      )}
    </div>
  );
};

