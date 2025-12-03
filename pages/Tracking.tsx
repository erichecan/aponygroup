import React, { useState } from 'react';
import { PackageSearch, Search, Truck, MapPin, CheckCircle, ShoppingCart } from 'lucide-react';
import { Language, STRINGS } from '../types';

interface TrackingProps {
  language: Language;
}

export const Tracking: React.FC<TrackingProps> = ({ language }) => {
  const t = STRINGS[language];
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if(!trackingId) return;
    setLoading(true);
    setResult(null);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setResult(t.trackingResultMock);
    }, 1500);
  };

  return (
    <div className="pt-20 animate-fade-in min-h-screen bg-slate-50">
      <div className="bg-black py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
             <PackageSearch size={400} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">{t.trackingTitle}</h1>
          <p className="text-lg text-slate-300 mb-8">{t.trackingSubtitle}</p>
          
          <form onSubmit={handleTrack} className="flex gap-2 bg-white p-2 rounded-xl shadow-xl">
            <input 
              type="text" 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder={t.trackingPlaceholder}
              className="flex-1 px-4 py-3 text-slate-900 outline-none rounded-lg font-medium"
            />
            <button 
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold rounded-lg transition-colors disabled:opacity-70 flex items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search size={20} />
              )}
              <span className="hidden sm:inline">{t.trackingButton}</span>
            </button>
          </form>
        </div>
      </div>

      {/* 客户自助下单服务区域 - 2024-12-19 18:00:00 - 使用 frontend-design 重新设计 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">
          {/* 顶部装饰条 */}
          <div className="h-2 bg-gradient-to-r from-[#FF6B35] via-orange-500 to-[#E55A2B]"></div>
          
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* 左侧图标区域 */}
              <div className="md:col-span-3 flex justify-center md:justify-start">
                <div className="relative">
                  {/* 背景装饰圆环 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 to-orange-100 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  {/* 图标容器 */}
                  <div className="relative w-24 h-24 bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <ShoppingCart size={48} className="text-white" />
                  </div>
                </div>
              </div>

              {/* 中间内容区域 */}
              <div className="md:col-span-7 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-[#FF6B35]/20 text-[#FF6B35] text-xs font-semibold uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse"></span>
                  {language === Language.ZH ? '自助服务' : 'Self-Service'}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                  {language === Language.ZH ? '客户自助下单' : 'Customer Portal'}
                </h2>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed max-w-2xl">
                  {language === Language.ZH 
                    ? '快速下单，实时追踪，一站式物流服务管理平台。轻松管理您的订单，查看物流状态，享受便捷的物流体验。' 
                    : 'Quick ordering, real-time tracking, one-stop logistics service management platform. Easily manage your orders, track shipments, and enjoy a seamless logistics experience.'}
                </p>
                
                {/* 功能特点 */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: '📦', text: language === Language.ZH ? '快速下单' : 'Quick Order' },
                    { icon: '📍', text: language === Language.ZH ? '实时追踪' : 'Real-time Track' },
                    { icon: '📊', text: language === Language.ZH ? '数据管理' : 'Data Management' }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700">
                      <span className="text-xl">{feature.icon}</span>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右侧按钮区域 */}
              <div className="md:col-span-2 flex justify-center md:justify-end">
                <a
                  href="https://tms-frontend-v4estohola-df.a.run.app/customer/portal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  {/* 按钮背景动画 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E55A2B] to-[#FF6B35] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="relative z-10">{language === Language.ZH ? '立即下单' : 'Place Order'}</span>
                  <svg className="relative z-10 w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  
                  {/* 按钮光效 */}
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {result && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Truck size={24} />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-slate-900">{trackingId}</h3>
                  <p className="text-green-600 font-medium">{result}</p>
               </div>
             </div>

             {/* Mock Timeline */}
             <div className="space-y-8 relative pl-8 border-l-2 border-slate-100">
                <div className="relative">
                   <div className="absolute -left-[39px] w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
                   <div className="text-sm text-slate-500 mb-1">Today, 09:30 AM</div>
                   <div className="font-bold text-slate-900">Arrived at Distribution Center</div>
                   <div className="text-slate-600 text-sm">Los Angeles, CA</div>
                </div>
                <div className="relative">
                   <div className="absolute -left-[39px] w-5 h-5 bg-slate-200 rounded-full border-4 border-white"></div>
                   <div className="text-sm text-slate-500 mb-1">Yesterday, 14:20 PM</div>
                   <div className="font-bold text-slate-900">Customs Clearance Completed</div>
                   <div className="text-slate-600 text-sm">Long Beach Port, CA</div>
                </div>
                <div className="relative">
                   <div className="absolute -left-[39px] w-5 h-5 bg-slate-200 rounded-full border-4 border-white"></div>
                   <div className="text-sm text-slate-500 mb-1">Oct 24, 18:00 PM</div>
                   <div className="font-bold text-slate-900">Departed Origin Facility</div>
                   <div className="text-slate-600 text-sm">Shenzhen, CN</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};