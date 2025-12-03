import React from 'react';
import { Target, Flag, History, Users } from 'lucide-react';
import { Language, STRINGS } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

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
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
            <Target className="w-10 h-10 text-[#FF6B35] mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t.missionTitle}</h3>
            <p className="text-slate-600 leading-relaxed">{t.missionDesc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
            <Flag className="w-10 h-10 text-[#FF6B35] mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t.visionTitle}</h3>
            <p className="text-slate-600 leading-relaxed">{t.visionDesc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
            <History className="w-10 h-10 text-[#FF6B35] mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t.historyTitle}</h3>
            <p className="text-slate-600 leading-relaxed line-clamp-4">{t.historyDesc}</p>
          </div>
        </div>

        {/* Company Story Section with Image - 2024-12-19 15:25:00 */}
        <div className="mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.historyTitle}</h2>
               <p className="text-slate-600 leading-relaxed text-lg">{t.historyDesc}</p>
             </div>
             <div className="aspect-video rounded-2xl relative overflow-hidden shadow-xl group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80"
                  fallbackSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                  alt="Professional team working together"
                  className="w-full h-full"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>
          </div>
        </div>

        {/* Warehouse Facility Section - 2024-12-19 15:25:00 */}
        <div className="mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl relative overflow-hidden shadow-xl order-2 md:order-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"
                fallbackSrc="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&q=80"
                alt="Modern warehouse facility"
                className="w-full h-full"
                objectFit="cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                {language === 'en' ? 'Our Facilities' : '我们的设施'}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                {language === 'en' 
                  ? 'Our strategically located warehouses in the US and Canada are equipped with state-of-the-art technology and security systems. We ensure your products are stored safely and shipped efficiently.'
                  : '我们在美加战略布局的仓库配备了先进的技术和安全系统。我们确保您的产品安全存储并高效发货。'
                }
              </p>
              <ul className="space-y-3">
                {[
                  language === 'en' ? '24/7 Security Monitoring' : '24/7 安全监控',
                  language === 'en' ? 'Climate-Controlled Storage' : '温控存储',
                  language === 'en' ? 'Real-Time Inventory Tracking' : '实时库存追踪',
                  language === 'en' ? 'Fast Order Fulfillment' : '快速订单履行'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <div className="w-2 h-2 bg-[#FF6B35] rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};