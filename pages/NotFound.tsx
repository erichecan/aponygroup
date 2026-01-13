// 404 页面 - 2025-01-27
import React from 'react';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Language, STRINGS, Page } from '../types';

interface NotFoundProps {
  language: Language;
  setPage: (page: Page) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ language, setPage }) => {
  const t = STRINGS[language];

  return (
    <div className="pt-20 min-h-screen bg-slate-50 flex items-center justify-center animate-fade-in">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* 404 数字 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#FF6B35] opacity-20">404</h1>
        </div>

        {/* 标题和描述 */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {language === 'en' ? 'Page Not Found' : '页面未找到'}
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
          {language === 'en'
            ? "Sorry, we couldn't find the page you're looking for. The page may have been moved or deleted."
            : '抱歉，我们找不到您要访问的页面。该页面可能已被移动或删除。'}
        </p>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setPage('home');
              window.scrollTo(0, 0);
            }}
            className="px-6 py-3 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Home size={20} />
            {language === 'en' ? 'Go to Homepage' : '返回首页'}
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-[#FF6B35] rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            {language === 'en' ? 'Go Back' : '返回'}
          </button>
        </div>

        {/* 快速链接 */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">
            {language === 'en' ? 'Popular Pages:' : '常用页面：'}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                setPage('services');
                window.scrollTo(0, 0);
              }}
              className="px-4 py-2 text-sm text-slate-600 hover:text-[#FF6B35] hover:bg-orange-50 rounded-lg transition-all"
            >
              {t.navServices}
            </button>
            <button
              onClick={() => {
                setPage('about');
                window.scrollTo(0, 0);
              }}
              className="px-4 py-2 text-sm text-slate-600 hover:text-[#FF6B35] hover:bg-orange-50 rounded-lg transition-all"
            >
              {t.navAbout}
            </button>
            <button
              onClick={() => {
                setPage('contact');
                window.scrollTo(0, 0);
              }}
              className="px-4 py-2 text-sm text-slate-600 hover:text-[#FF6B35] hover:bg-orange-50 rounded-lg transition-all"
            >
              {t.navContact}
            </button>
            <button
              onClick={() => {
                setPage('faq');
                window.scrollTo(0, 0);
              }}
              className="px-4 py-2 text-sm text-slate-600 hover:text-[#FF6B35] hover:bg-orange-50 rounded-lg transition-all"
            >
              {t.navFAQ}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

