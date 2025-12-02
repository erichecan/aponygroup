import React from 'react';
import { Target, Flag, History, Users } from 'lucide-react';
import { Language, STRINGS } from '../types';

interface AboutProps {
  language: Language;
}

export const About: React.FC<AboutProps> = ({ language }) => {
  const t = STRINGS[language];

  return (
    <div className="pt-20 animate-fade-in">
      <div className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t.aboutTitle}</h1>
          <p className="text-xl text-slate-600 leading-relaxed">{t.aboutSubtitle}</p>
        </div>
      </div>

      {/* Service Coverage Notice - 2024-12-19 14:55:00 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-2xl p-6 text-center">
          <p className="text-slate-700 font-semibold text-lg mb-2">
            {language === 'en' ? 'Service Coverage' : '服务范围'}
          </p>
          <p className="text-slate-600">
            {language === 'en' 
              ? 'We specialize exclusively in US and Canada markets. Our services include customs clearance, landing services, warehousing, and transportation within North America.'
              : '我们专注美加市场，提供清关、落地服务、仓储和运输等全方位物流服务。'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <Target className="w-10 h-10 text-[#FF6B35] mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t.missionTitle}</h3>
            <p className="text-slate-600 leading-relaxed">{t.missionDesc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <Flag className="w-10 h-10 text-[#FF6B35] mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t.visionTitle}</h3>
            <p className="text-slate-600 leading-relaxed">{t.visionDesc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <History className="w-10 h-10 text-[#FF6B35] mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t.historyTitle}</h3>
            <p className="text-slate-600 leading-relaxed line-clamp-4">{t.historyDesc}</p>
          </div>
        </div>

        <div className="mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.historyTitle}</h2>
               <p className="text-slate-600 leading-relaxed text-lg">{t.historyDesc}</p>
             </div>
             <div className="aspect-video bg-slate-200 rounded-2xl relative overflow-hidden">
                {/* Abstract Office/Warehouse Visual */}
                <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                   <Users size={64} className="text-slate-400" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};