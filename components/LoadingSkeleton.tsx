// 加载骨架屏组件 - 2025-01-27
import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'image' | 'list' | 'news' | 'case';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'card',
  count = 1,
  className = ''
}) => {
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
      <div className="aspect-video bg-slate-200"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
      </div>
    </div>
  );

  const SkeletonText = () => (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
      <div className="h-4 bg-slate-200 rounded w-4/5"></div>
    </div>
  );

  const SkeletonImage = () => (
    <div className="aspect-video bg-slate-200 rounded-lg animate-pulse"></div>
  );

  const SkeletonList = () => (
    <div className="space-y-3 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const SkeletonNews = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
      <div className="aspect-video bg-slate-200"></div>
      <div className="p-6 space-y-4">
        <div className="h-3 bg-slate-200 rounded w-20"></div>
        <div className="h-5 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-4/5"></div>
        <div className="flex items-center gap-2 pt-2">
          <div className="h-4 w-24 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonCase = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
      <div className="aspect-video bg-slate-200"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
          <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return <SkeletonCard />;
      case 'text':
        return <SkeletonText />;
      case 'image':
        return <SkeletonImage />;
      case 'list':
        return <SkeletonList />;
      case 'news':
        return <SkeletonNews />;
      case 'case':
        return <SkeletonCase />;
      default:
        return <SkeletonCard />;
    }
  };

  if (count > 1) {
    return (
      <div className={className}>
        {[...Array(count)].map((_, i) => (
          <div key={i}>{renderSkeleton()}</div>
        ))}
      </div>
    );
  }

  return <div className={className}>{renderSkeleton()}</div>;
};

// 专用的页面加载骨架屏
export const PageLoadingSkeleton: React.FC = () => (
  <div className="pt-20 min-h-screen bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-12 bg-slate-200 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-slate-200 rounded w-1/2"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <LoadingSkeleton type="card" count={3} />
        </div>
      </div>
    </div>
  </div>
);

