import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language, STRINGS, Page } from '../types';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPage: Page;
  setPage: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, setLanguage, currentPage, setPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = STRINGS[language];

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.ZH : Language.EN);
  };

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: t.navHome },
    { id: 'services', label: t.navServices },
    { id: 'about', label: t.navAbout },
    { id: 'tracking', label: t.navTracking },
  ];

  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/20">
              A
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Apony Inc
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === link.id 
                    ? 'text-blue-700 bg-blue-50' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 ml-3">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all"
              >
                <Globe size={16} />
                <span>{language === Language.EN ? 'EN' : 'CN'}</span>
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    currentPage === 'contact' 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
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
                className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold"
              >
                {language === Language.EN ? 'EN' : 'CN'}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-3 py-3 text-base font-medium rounded-md ${
                    currentPage === link.id 
                    ? 'text-blue-700 bg-blue-50' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
               onClick={() => handleNavClick('contact')}
               className="block w-full text-left px-3 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 rounded-md"
            >
              {t.navContact}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};