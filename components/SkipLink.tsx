// 跳过链接组件 - 可访问性优化 - 2025-01-27
import React from 'react';

export const SkipLink: React.FC = () => {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FF6B35] focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
};

