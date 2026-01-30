import React, { useState } from 'react';
import { Menu, X, Globe, Search } from 'lucide-react';
import { Language, STRINGS, Page } from '../types';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPage: Page;
  setPage: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, setLanguage, currentPage, setPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const t = STRINGS[language];

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.ZH : Language.EN);
  };

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: t.navHome },
    { id: 'services', label: t.navServices },
    { id: 'about', label: t.navAbout },
    { id: 'cases', label: t.navCases },
    { id: 'news', label: t.navNews },
    { id: 'tracking', label: t.navTracking },
    { id: 'faq', label: t.navFAQ },
    { id: 'login', label: t.navLogin },
  ];

  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
    setShowSearch(false);
    window.scrollTo(0, 0);
  };

  const handleSearchSelect = (result: { url: Page | string; type: string }) => {
    if (typeof result.url === 'string' && (result.url as Page)) {
      handleNavClick(result.url as Page);
    }
    setShowSearch(false);
  };

  return (
    <nav
      className="fixed w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <button
            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 rounded-lg"
            onClick={() => handleNavClick('home')}
            aria-label={language === Language.EN ? 'Go to homepage' : '返回首页'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('home');
              }
            }}
          >
            <Logo size="full" showText={false} />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1" role="menubar">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                role="menuitem"
                aria-current={currentPage === link.id ? 'page' : undefined}
                className={`px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 ${currentPage === link.id
                  ? 'text-[#FF6B35] bg-orange-50'
                  : 'text-slate-600 hover:text-[#FF6B35] hover:bg-orange-50'
                  }`}
              >
                {link.label}
              </button>
            ))}

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 ml-3">
              {/* 搜索按钮 - 2025-01-27 */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-lg text-slate-600 hover:text-[#FF6B35] hover:bg-orange-50 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2"
                aria-label={language === Language.EN ? 'Search' : '搜索'}
                aria-expanded={showSearch}
              >
                <Search size={20} />
              </button>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all"
              >
                <Globe size={16} />
                <span>{language === Language.EN ? 'EN' : 'CN'}</span>
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${currentPage === 'contact'
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-black text-white hover:bg-[#1a1a1a]'
                  }`}
              >
                {t.navContact}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2"
              aria-label={language === Language.EN ? 'Switch to Chinese' : '切换到英文'}
            >
              {language === Language.EN ? 'EN' : 'CN'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 rounded p-1"
              aria-label={language === Language.EN ? 'Toggle menu' : '切换菜单'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 搜索栏 - 桌面端 - 2025-01-27 */}
      {showSearch && (
        <div className="hidden md:block border-t border-slate-100 bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar
              language={language}
              onSelect={handleSearchSelect}
            />
          </div>
        </div>
      )}

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg"
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                role="menuitem"
                aria-current={currentPage === link.id ? 'page' : undefined}
                className={`block w-full text-left px-3 py-3 text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-inset ${currentPage === link.id
                  ? 'text-[#FF6B35] bg-orange-50'
                  : 'text-slate-600 hover:bg-orange-50'
                  }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              role="menuitem"
              className="block w-full text-left px-3 py-3 text-base font-medium text-[#FF6B35] hover:bg-orange-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-inset"
            >
              {t.navContact}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};