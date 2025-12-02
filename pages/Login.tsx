// 系统登录页面 - 数字化系统入口
// Created: 2025-01-27

import React from 'react';
import { ExternalLink, Truck, Package, Warehouse, Ship } from 'lucide-react';
import { Language, STRINGS } from '../types';
import { Logo } from '../components/Logo';

interface LoginProps {
  language: Language;
}

interface SystemCard {
  id: string;
  name: string;
  nameEn: string;
  icon: React.ReactNode;
  url?: string;
  description: string;
  descriptionEn: string;
  color: string;
  bgColor: string;
}

export const Login: React.FC<LoginProps> = ({ language }) => {
  const t = STRINGS[language];
  const isZh = language === 'zh';

  const systems: SystemCard[] = [
    {
      id: 'tms',
      name: 'TMS 系统',
      nameEn: 'TMS System',
      icon: <Truck size={48} />,
      url: 'https://tms-frontend-v4estohola-df.a.run.app/',
      description: '运输管理系统',
      descriptionEn: 'Transportation Management System',
      color: 'text-[#FF6B35]',
      bgColor: 'bg-orange-50 hover:bg-orange-100'
    },
    {
      id: 'dadanbao',
      name: '打单宝系统',
      nameEn: 'Dadanbao System',
      icon: <Package size={48} />,
      description: '订单处理系统',
      descriptionEn: 'Order Processing System',
      color: 'text-[#FF6B35]',
      bgColor: 'bg-orange-50 hover:bg-orange-100'
    },
    {
      id: 'wms',
      name: 'WMS 系统',
      nameEn: 'WMS System',
      icon: <Warehouse size={48} />,
      description: '仓库管理系统',
      descriptionEn: 'Warehouse Management System',
      color: 'text-[#FF6B35]',
      bgColor: 'bg-orange-50 hover:bg-orange-100'
    },
    {
      id: 'ocean',
      name: '海运系统',
      nameEn: 'Ocean Freight System',
      icon: <Ship size={48} />,
      description: '海运物流系统',
      descriptionEn: 'Ocean Freight Logistics System',
      color: 'text-[#FF6B35]',
      bgColor: 'bg-orange-50 hover:bg-orange-100'
    }
  ];

  const handleSystemClick = (system: SystemCard) => {
    if (system.url) {
      window.open(system.url, '_blank', 'noopener,noreferrer');
    } else {
      // 如果系统暂无地址，可以显示提示
      alert(isZh ? `${system.name} 正在开发中，敬请期待！` : `${system.nameEn} is under development, stay tuned!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-20 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="full" showText={false} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {isZh ? '数字化系统入口' : 'Digital System Portal'}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {isZh 
              ? '访问 AponyGroup 的各类业务系统，提升工作效率' 
              : 'Access AponyGroup\'s business systems to improve work efficiency'}
          </p>
        </div>

        {/* Systems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((system) => (
            <button
              key={system.id}
              onClick={() => handleSystemClick(system)}
              disabled={!system.url}
              className={`
                group relative bg-white rounded-2xl p-8 shadow-sm border-2 border-slate-200 
                hover:border-[#FF6B35] hover:shadow-xl transition-all duration-300
                ${system.url ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}
                ${system.bgColor}
              `}
            >
              {/* Icon */}
              <div className={`${system.color} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                {system.icon}
              </div>

              {/* System Name */}
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">
                {isZh ? system.name : system.nameEn}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 text-center mb-4">
                {isZh ? system.description : system.descriptionEn}
              </p>

              {/* Status Badge */}
              <div className="flex items-center justify-center gap-2">
                {system.url ? (
                  <>
                    <span className="text-xs font-semibold text-[#FF6B35]">
                      {isZh ? '立即访问' : 'Access Now'}
                    </span>
                    <ExternalLink size={16} className="text-[#FF6B35]" />
                  </>
                ) : (
                  <span className="text-xs font-semibold text-slate-400">
                    {isZh ? '开发中' : 'Coming Soon'}
                  </span>
                )}
              </div>

              {/* Hover Effect Overlay */}
              {system.url && (
                <div className="absolute inset-0 rounded-2xl bg-[#FF6B35]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            {isZh 
              ? '所有系统将在新窗口中打开' 
              : 'All systems will open in a new window'}
          </p>
        </div>
      </div>
    </div>
  );
};

