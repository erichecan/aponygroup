import React, { useState } from 'react';
import { PackageSearch, Search, Truck, ShoppingCart, ArrowRight } from 'lucide-react';
import { Language, STRINGS, Language as LangEnum } from '../types';

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

  // 自助服务卡片组件 - 2024-12-19 18:50:00 - 使用 frontend-design 风格
  const ServiceCard = ({ 
    icon: Icon, 
    badge, 
    title, 
    description, 
    features, 
    buttonText, 
    buttonHref,
    buttonOnClick,
    children 
  }: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    badge: string;
    title: string;
    description: string;
    features: Array<{ icon: string; text: string }>;
    buttonText: string;
    buttonHref?: string;
    buttonOnClick?: () => void;
    children?: React.ReactNode;
  }) => (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
      {/* 顶部装饰条 */}
      <div className="h-2 bg-gradient-to-r from-[#FF6B35] via-orange-500 to-[#E55A2B]"></div>
      
      <div className="p-8 md:p-10 flex-1 flex flex-col">
        {/* 图标和徽章区域 */}
        <div className="flex items-start justify-between mb-6">
          <div className="relative">
            {/* 背景装饰圆环 */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 to-orange-100 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            {/* 图标容器 */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Icon size={40} className="text-white" />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-[#FF6B35]/20 text-[#FF6B35] text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse"></span>
            {badge}
          </div>
        </div>

        {/* 标题和描述 */}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-slate-600 mb-6 text-base leading-relaxed">
          {description}
        </p>
        
        {/* 功能特点 */}
        {features && features.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-700">
                <span className="text-lg">{feature.icon}</span>
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* 自定义内容区域（用于运单跟踪的查询表单） */}
        {children && (
          <div className="flex-1 mb-6">
            {children}
          </div>
        )}

        {/* 按钮区域 */}
        <div className="mt-auto">
          {buttonHref ? (
            <a
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden w-full justify-center whitespace-nowrap"
            >
              {/* 按钮背景动画 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#E55A2B] to-[#FF6B35] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative z-10 whitespace-nowrap">{buttonText}</span>
              <ArrowRight className="relative z-10 w-5 h-5 flex-shrink-0 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
              
              {/* 按钮光效 */}
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </a>
          ) : buttonOnClick ? (
            <button
              onClick={buttonOnClick}
              disabled={loading}
              className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden w-full justify-center whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {/* 按钮背景动画 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#E55A2B] to-[#FF6B35] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              
              {loading ? (
                <>
                  <div className="relative z-10 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></div>
                  <span className="relative z-10 whitespace-nowrap">{language === LangEnum.ZH ? '查询中...' : 'Tracking...'}</span>
                </>
              ) : (
                <>
                  <Search className="relative z-10 w-5 h-5 flex-shrink-0" />
                  <span className="relative z-10 whitespace-nowrap">{buttonText}</span>
                </>
              )}
              
              {/* 按钮光效 */}
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </button>
          ) : (
            <button
              type="submit"
              form="tracking-form"
              disabled={loading || !trackingId}
              className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden w-full justify-center whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {/* 按钮背景动画 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#E55A2B] to-[#FF6B35] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              
              {loading ? (
                <>
                  <div className="relative z-10 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></div>
                  <span className="relative z-10 whitespace-nowrap">{language === LangEnum.ZH ? '查询中...' : 'Tracking...'}</span>
                </>
              ) : (
                <>
                  <Search className="relative z-10 w-5 h-5 flex-shrink-0" />
                  <span className="relative z-10 whitespace-nowrap">{buttonText}</span>
                </>
              )}
              
              {/* 按钮光效 */}
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-20 animate-fade-in min-h-screen bg-slate-50">
      {/* 页面标题区域 - 2024-12-19 18:50:00 */}
      <div className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {language === LangEnum.ZH ? '自助服务' : 'Self Service'}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {language === LangEnum.ZH 
              ? '快速下单，实时追踪，一站式物流服务管理平台' 
              : 'Quick ordering, real-time tracking, one-stop logistics service management platform'}
          </p>
        </div>
      </div>

      {/* 两个服务卡片并排 - 2024-12-19 18:50:00 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 左侧：自助下单卡片 */}
          <ServiceCard
            icon={ShoppingCart}
            badge={language === LangEnum.ZH ? '自助服务' : 'Self-Service'}
            title={language === LangEnum.ZH ? '客户自助下单' : 'Customer Portal'}
            description={language === LangEnum.ZH 
              ? '快速下单，实时追踪，一站式物流服务管理平台。轻松管理您的订单，查看物流状态，享受便捷的物流体验。' 
              : 'Quick ordering, real-time tracking, one-stop logistics service management platform. Easily manage your orders, track shipments, and enjoy a seamless logistics experience.'}
            features={[
              { icon: '📦', text: language === LangEnum.ZH ? '快速下单' : 'Quick Order' },
              { icon: '📍', text: language === LangEnum.ZH ? '实时追踪' : 'Real-time Track' },
              { icon: '📊', text: language === LangEnum.ZH ? '数据管理' : 'Data Management' }
            ]}
            buttonText={language === LangEnum.ZH ? '立即下单' : 'Place Order'}
            buttonHref="https://tms-frontend-v4estohola-df.a.run.app/customer/portal"
          />

          {/* 右侧：运单跟踪卡片 */}
          <ServiceCard
            icon={PackageSearch}
            badge={language === LangEnum.ZH ? '运单查询' : 'Track Order'}
            title={language === LangEnum.ZH ? '运单跟踪' : 'Track Shipment'}
            description={language === LangEnum.ZH 
              ? '输入您的追踪号码或订单ID，实时查询货物状态和物流信息，随时掌握您的货物位置。' 
              : 'Enter your tracking number or order ID to get real-time status updates and logistics information.'}
            features={[
              { icon: '🔍', text: language === LangEnum.ZH ? '快速查询' : 'Quick Search' },
              { icon: '📍', text: language === LangEnum.ZH ? '实时位置' : 'Real-time Location' },
              { icon: '📋', text: language === LangEnum.ZH ? '详细轨迹' : 'Detailed Timeline' }
            ]}
            buttonText={language === LangEnum.ZH ? '查询运单' : 'Track Order'}
            buttonHref={undefined}
            buttonOnClick={undefined}
          >
            {/* 查询表单 */}
            <form onSubmit={handleTrack} className="space-y-4" id="tracking-form">
              <input 
                type="text" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder={t.trackingPlaceholder}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-slate-900 font-medium"
              />
            </form>

            {/* 查询结果显示 */}
            {result && (
              <div className="mt-6 pt-6 border-t border-slate-100 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Truck size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-900">{trackingId}</h3>
                    <p className="text-sm text-green-600 font-medium">{result}</p>
                  </div>
                </div>

                {/* 简化的时间线 */}
                <div className="space-y-4 relative pl-6 border-l-2 border-slate-100">
                  <div className="relative">
                    <div className="absolute -left-[21px] w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                    <div className="text-xs text-slate-500 mb-1">Today, 09:30 AM</div>
                    <div className="text-sm font-bold text-slate-900">Arrived at Distribution Center</div>
                    <div className="text-xs text-slate-600">Los Angeles, CA</div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] w-4 h-4 bg-slate-200 rounded-full border-2 border-white"></div>
                    <div className="text-xs text-slate-500 mb-1">Yesterday, 14:20 PM</div>
                    <div className="text-sm font-bold text-slate-900">Customs Clearance Completed</div>
                    <div className="text-xs text-slate-600">Long Beach Port, CA</div>
                  </div>
                </div>
              </div>
            )}
          </ServiceCard>
        </div>
      </div>
    </div>
  );
};
