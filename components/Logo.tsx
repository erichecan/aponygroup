// Logo 组件 - 公司 Logo（橙色字母 A）
// Created: 2025-01-27

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-16 h-16 text-3xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* 橙色字母 A Logo */}
      <div className={`${sizeClasses[size]} bg-[#FF6B35] rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-[#FF6B35]/30`}>
        A
      </div>
      {showText && (
        <span className={`font-bold text-slate-900 ${
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl'
        }`}>
          Apony Inc
        </span>
      )}
    </div>
  );
};

