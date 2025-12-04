import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Language, STRINGS, Page } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  language: Language;
  setPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, setPage }) => {
  const t = STRINGS[language];

  return (
    <footer className="bg-black text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Company Info - 2025-01-27 16:45:00 - 优化 Logo 显示区域 */}
          <div className="col-span-1 md:col-span-2">
            {/* Logo 区域 - 使用 frontend-design 原则设计 */}
            <div className="mb-10">
              <div className="inline-block group">
                {/* Logo 外层容器 - 添加精致视觉效果 */}
                <div className="relative">
                  {/* 装饰性背景光晕效果 */}
                  <div className="absolute -inset-2 bg-white/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Logo 主体 */}
                  <div className="relative transform group-hover:scale-[1.02] transition-all duration-300 ease-out">
                    <Logo 
                      size="footer" 
                      showText={false} 
                      variant="white-bg" 
                      className="drop-shadow-[0_4px_12px_rgba(255,255,255,0.15)] filter brightness-100 hover:brightness-110 transition-all duration-300" 
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 公司描述 */}
            <p className="max-w-xs text-slate-400 leading-relaxed mb-6 text-sm">
              {t.footerAbout}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">{t.navServices}</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => {setPage('services'); window.scrollTo(0,0)}} className="hover:text-[#FF6B35] transition-colors text-left">{t.serviceWarehousingTitle}</button></li>
              <li><button onClick={() => {setPage('services'); window.scrollTo(0,0)}} className="hover:text-[#FF6B35] transition-colors text-left">{t.serviceLogisticsTitle}</button></li>
              <li><button onClick={() => {setPage('services'); window.scrollTo(0,0)}} className="hover:text-[#FF6B35] transition-colors text-left">{t.serviceFbaTitle}</button></li>
              <li><button onClick={() => {setPage('tracking'); window.scrollTo(0,0)}} className="hover:text-[#FF6B35] transition-colors text-left">{t.navTracking}</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => {setPage('cases'); window.scrollTo(0,0)}} className="hover:text-[#FF6B35] transition-colors text-left">{t.navCases}</button></li>
              <li><button onClick={() => {setPage('news'); window.scrollTo(0,0)}} className="hover:text-[#FF6B35] transition-colors text-left">{t.navNews}</button></li>
              <li><button onClick={() => {setPage('faq'); window.scrollTo(0,0)}} className="hover:text-[#FF6B35] transition-colors text-left">{t.navFAQ}</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">{t.navContact}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#FF6B35] shrink-0 mt-0.5" />
                <span>123 Logistics Way, Commerce City, CA 90040</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#FF6B35] shrink-0" />
                <span>support@aponyinc.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#FF6B35] shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#FF6B35]/20 pt-8 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
           <p>{t.rights}</p>
           <div className="flex gap-6">
              <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
              <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
           </div>
        </div>
      </div>
    </footer>
  );
};