import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Language, Page, STRINGS } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { Analytics } from './components/Analytics';
import { Breadcrumbs } from './components/Breadcrumbs';
import { SkipLink } from './components/SkipLink';
import { ResourcePreloader } from './components/ResourcePreloader';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Tracking } from './pages/Tracking';
import { Login } from './pages/Login';
import { FAQ } from './pages/FAQ';
import { Cases } from './pages/Cases';
import { News } from './pages/News';
import { NotFound } from './pages/NotFound';

// 懒加载重页面组件（性能优化）
const CasesLazy = lazy(() => Promise.resolve({ default: Cases }));
const NewsLazy = lazy(() => Promise.resolve({ default: News }));

export default function App() {
  // 从 localStorage 恢复语言偏好 - 2025-01-27
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('apony-language');
      return (saved === 'en' || saved === 'zh') ? saved as Language : Language.ZH;
    } catch {
      return Language.ZH;
    }
  });
  
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // 保存语言偏好到 localStorage - 2025-01-27
  useEffect(() => {
    try {
      localStorage.setItem('apony-language', language);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
  }, [language]);

  // 处理无效页面 - 显示 404 - 2025-01-27
  const validPages: Page[] = ['home', 'services', 'about', 'contact', 'tracking', 'login', 'faq', 'cases', 'news', 'newsDetail'];
  const isValidPage = validPages.includes(currentPage);

  // 如果页面无效，显示 404
  if (!isValidPage) {
    return (
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-[#FF6B35] flex flex-col">
        <SEOHead page="home" language={language} />
        <Navbar 
          language={language} 
          setLanguage={setLanguage} 
          currentPage="home"
          setPage={setCurrentPage}
        />
        <NotFound language={language} setPage={setCurrentPage} />
        <Footer language={language} setPage={setCurrentPage} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-[#FF6B35] flex flex-col">
      {/* 跳过链接 - 可访问性优化 */}
      <SkipLink />
      
      {/* 资源预加载 - 性能优化 - 2025-01-27 */}
      <ResourcePreloader
        images={[
          '/assets/logo.png',
          '/assets/logo-white-bg.png',
        ]}
      />
      
      {/* Analytics */}
      <Analytics enabled={true} />
      
      {/* SEO Meta Tags */}
      <SEOHead page={currentPage} language={language} />

      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        currentPage={currentPage}
        setPage={setCurrentPage}
      />

      {/* 面包屑导航 - 非首页显示 */}
      {currentPage !== 'home' && (
        <Breadcrumbs 
          currentPage={currentPage} 
          language={language} 
          setPage={setCurrentPage}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-grow" role="main">
        {currentPage === 'home' && <Home language={language} setPage={setCurrentPage} />}
        {currentPage === 'services' && <Services language={language} />}
        {currentPage === 'about' && <About language={language} />}
        {currentPage === 'contact' && <Contact language={language} />}
        {currentPage === 'tracking' && <Tracking language={language} />}
        {currentPage === 'login' && <Login language={language} />}
        {currentPage === 'faq' && <FAQ language={language} />}
        
        {/* 懒加载重页面 */}
        <Suspense fallback={
          <div className="pt-20 min-h-screen bg-slate-50" role="status" aria-live="polite">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                      <div className="aspect-video bg-slate-200"></div>
                      <div className="p-6 space-y-4">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-200 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }>
          {currentPage === 'cases' && <CasesLazy language={language} />}
          {(currentPage === 'news' || currentPage === 'newsDetail') && <NewsLazy language={language} setPage={setCurrentPage} />}
        </Suspense>
      </main>

      <Footer language={language} setPage={setCurrentPage} />
    </div>
  );
}