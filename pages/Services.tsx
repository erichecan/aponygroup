import React from 'react';
import { Warehouse, Ship, Database, Box, Package, Check } from 'lucide-react'; // 添加Package图标用于一件代发 - 2024-12-19 17:30:00
import { Language, STRINGS } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface ServicesProps {
  language: Language;
}

export const Services: React.FC<ServicesProps> = ({ language }) => {
  const t = STRINGS[language];

  // 服务图片映射 - 2024-12-19 15:20:00
  const serviceImages: Record<string, { src: string; fallback: string }> = {
    warehousing: {
      src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"
    },
    logistics: {
      src: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"
    },
    wms: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
    },
    fba: {
      // 亚马逊仓库/物流中心图片 - 2024-12-19 16:45:00
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"
    },
    dropshipping: {
      // 一件代发/订单履约图片 - 2024-12-19 17:30:00
      // 使用订单处理和包装场景的图片
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80"
    }
  };

  const ServiceSection = ({ title, desc, points, icon: Icon, align = 'left', imageKey }: any) => (
    <div className="py-16 md:py-24 border-b border-slate-100 last:border-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${align === 'right' ? 'md:grid-flow-dense' : ''}`}>
          <div className={align === 'right' ? 'md:col-start-2' : ''}>
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF6B35] mb-6 shadow-sm">
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
          <div className={`${align === 'right' ? 'md:col-start-1' : ''} rounded-3xl aspect-[4/3] relative overflow-hidden shadow-xl group`}>
            {imageKey && serviceImages[imageKey] ? (
              <>
                <ImageWithFallback
                  src={serviceImages[imageKey].src}
                  fallbackSrc={serviceImages[imageKey].fallback}
                  alt={title}
                  className="w-full h-full"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <Icon size={64} className="text-slate-400 opacity-20" />
              </div>
            )}
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
        imageKey="warehousing"
      />
      
      <ServiceSection 
        title={t.serviceLogisticsTitle}
        desc={t.serviceLogisticsDesc}
        points={t.serviceLogisticsPoints}
        icon={Ship}
        align="right"
        imageKey="logistics"
      />

      <ServiceSection 
        title={t.serviceWMSTitle}
        desc={t.serviceWMSDesc}
        points={t.serviceWMSPoints}
        icon={Database}
        imageKey="wms"
      />

      <ServiceSection 
        title={t.serviceFbaTitle}
        desc={t.serviceFbaDesc}
        points={t.serviceFbaPoints}
        icon={Box}
        align="right"
        imageKey="fba"
      />

      <ServiceSection 
        title={t.serviceDropshippingTitle}
        desc={t.serviceDropshippingDesc}
        points={t.serviceDropshippingPoints}
        icon={Package}
        imageKey="dropshipping"
      />
    </div>
  );
};