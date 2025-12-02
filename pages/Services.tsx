import React from 'react';
import { Warehouse, Ship, Database, Box, Check } from 'lucide-react';
import { Language, STRINGS } from '../types';

interface ServicesProps {
  language: Language;
}

export const Services: React.FC<ServicesProps> = ({ language }) => {
  const t = STRINGS[language];

  const ServiceSection = ({ title, desc, points, icon: Icon, align = 'left' }: any) => (
    <div className="py-16 md:py-24 border-b border-slate-100 last:border-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${align === 'right' ? 'md:grid-flow-dense' : ''}`}>
          <div className={align === 'right' ? 'md:col-start-2' : ''}>
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF6B35] mb-6">
              <Icon size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">{desc}</p>
            <ul className="space-y-4">
              {points.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${align === 'right' ? 'md:col-start-1' : ''} bg-slate-100 rounded-3xl aspect-[4/3] relative overflow-hidden shadow-lg`}>
            {/* Visual Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <Icon size={64} className="text-slate-400 opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-20 animate-fade-in">
      <div className="bg-black py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.servicesPageTitle}</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto px-4">{t.servicesPageSubtitle}</p>
      </div>

      {/* Service Coverage Notice - 2024-12-19 14:50:00 */}
      <div className="bg-[#FF6B35]/10 border-y border-[#FF6B35]/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-700 font-medium">
            {language === 'en' 
              ? '✓ Specialized in US & Canada markets only | Customs Clearance • Landing Services • Warehousing • Transportation'
              : '✓ 专注美加市场 | 清关服务 • 落地服务 • 入仓服务 • 运输服务'
            }
          </p>
        </div>
      </div>

      <ServiceSection 
        title={t.serviceWarehousingTitle}
        desc={t.serviceWarehousingDesc}
        points={t.serviceWarehousingPoints}
        icon={Warehouse}
      />
      
      <ServiceSection 
        title={t.serviceLogisticsTitle}
        desc={t.serviceLogisticsDesc}
        points={t.serviceLogisticsPoints}
        icon={Ship}
        align="right"
      />

      <ServiceSection 
        title={t.serviceWMSTitle}
        desc={t.serviceWMSDesc}
        points={t.serviceWMSPoints}
        icon={Database}
      />

      <ServiceSection 
        title={t.serviceFbaTitle}
        desc={t.serviceFbaDesc}
        points={t.serviceFbaPoints}
        icon={Box}
        align="right"
      />
    </div>
  );
};