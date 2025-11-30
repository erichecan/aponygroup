import React from 'react';
import { Warehouse, Plane, Ship, BarChart3, ArrowRight, PackageCheck, CheckCircle2 } from 'lucide-react';
import { Language, STRINGS, Page } from '../types';

interface HomeProps {
  language: Language;
  setPage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ language, setPage }) => {
  const t = STRINGS[language];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B35] rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF6B35] rounded-full blur-[128px] opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/50 text-[#FF6B35] text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse"></span>
            Apony Inc Logistics
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8 max-w-4xl leading-[1.1]">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => {setPage('services'); window.scrollTo(0,0)}}
              className="px-8 py-4 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-xl font-semibold transition-all shadow-lg shadow-[#FF6B35]/25 flex items-center justify-center gap-2"
            >
              {t.heroCTA}
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => {setPage('tracking'); window.scrollTo(0,0)}}
              className="px-8 py-4 bg-black hover:bg-[#1a1a1a] text-white border border-[#FF6B35]/30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <PackageCheck size={18} className="text-[#FF6B35]" />
              {t.heroSecondaryCTA}
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative border-t border-[#FF6B35]/20 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: t.statWarehouses, value: "12+" },
              { label: t.statExperience, value: "5 Yrs" },
              { label: "SKUs Managed", value: "100K+" },
              { label: t.statDelivery, value: "99.9%" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left md:pl-8 md:border-l border-slate-800 first:border-0">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400 uppercase tracking-wide font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Snippet */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.servicesTitle}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.servicesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF6B35] mb-6 group-hover:bg-[#FF6B35] group-hover:text-white transition-colors">
                <Warehouse size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.serviceWarehousingTitle}</h3>
              <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">{t.serviceWarehousingDesc}</p>
              <button onClick={() => {setPage('services'); window.scrollTo(0,0)}} className="inline-flex items-center text-[#FF6B35] font-semibold hover:gap-2 transition-all">
                Learn more <ArrowRight size={16} className="ml-1" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF6B35] mb-6 group-hover:bg-[#FF6B35] group-hover:text-white transition-colors">
                <div className="flex">
                  <Plane size={24} className="-mr-1" />
                  <Ship size={24} className="-ml-1 translate-y-2" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.serviceLogisticsTitle}</h3>
              <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">{t.serviceLogisticsDesc}</p>
              <button onClick={() => {setPage('services'); window.scrollTo(0,0)}} className="inline-flex items-center text-[#FF6B35] font-semibold hover:gap-2 transition-all">
                Learn more <ArrowRight size={16} className="ml-1" />
              </button>
            </div>

             <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF6B35] mb-6 group-hover:bg-[#FF6B35] group-hover:text-white transition-colors">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.serviceWMSTitle}</h3>
              <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">{t.serviceWMSDesc}</p>
              <button onClick={() => {setPage('services'); window.scrollTo(0,0)}} className="inline-flex items-center text-[#FF6B35] font-semibold hover:gap-2 transition-all">
                Learn more <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#FF6B35] text-xs font-bold uppercase tracking-wider mb-6">
                Apony Inc Advantage
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                {t.whyChooseUs}
              </h2>
              <div className="space-y-8">
                {/* We can re-use these, or make them unique to home */}
                {[
                  { title: "Speed & Efficiency", desc: "Optimized routes and 99.9% inventory accuracy ensure your products reach customers faster." },
                  { title: "Cost Effective", desc: "Competitive storage rates and shipping discounts through our established carrier network." },
                  { title: "Secure & Reliable", desc: "24/7 surveillance and professional handling of all goods, ensuring peace of mind." },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-[#FF6B35]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden relative shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-slate-800/5 backdrop-blur-sm border-t border-white/20 p-8 flex items-end justify-between">
                       <div className="flex flex-col gap-2">
                          <div className="w-32 h-4 bg-slate-400/50 rounded-full"></div>
                          <div className="w-24 h-4 bg-slate-400/30 rounded-full"></div>
                       </div>
                       <div className="w-16 h-16 bg-[#FF6B35] rounded-2xl flex items-center justify-center text-white shadow-lg">
                          <Warehouse size={32} />
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};