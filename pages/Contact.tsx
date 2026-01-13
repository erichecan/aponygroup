import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Language, STRINGS } from '../types';
import { ContactForm } from '../components/ContactForm';

interface ContactProps {
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = STRINGS[language];

  const handleFormSubmit = async (formData: any) => {
    // 表单提交逻辑已移至 ContactForm 组件内部
    // 如果需要自定义处理，可以在这里添加
    // 目前使用默认的 API 提交逻辑
    return Promise.resolve();
  };

  return (
    <div className="pt-20 animate-fade-in bg-slate-50 min-h-screen">
      <div className="bg-black py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">{t.contactTitle}</h1>
        <p className="text-slate-300">{t.contactSubtitle}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">{t.locationsTitle}</h3>
              <div className="space-y-6">
                <div>
                   <div className="flex items-start gap-3 mb-2">
                     <MapPin className="w-5 h-5 text-[#FF6B35] mt-1" />
                     <span className="font-semibold text-slate-800">{t.locationUS}</span>
                   </div>
                   <p className="pl-8 text-sm text-slate-500">123 Logistics Way, Commerce City, CA 90040</p>
                </div>
                <div>
                   <div className="flex items-start gap-3 mb-2">
                     <MapPin className="w-5 h-5 text-[#FF6B35] mt-1" />
                     <span className="font-semibold text-slate-800">{t.locationCA}</span>
                   </div>
                   <p className="pl-8 text-sm text-slate-500">456 Bay Street, Toronto, ON M5H 2Y4, Canada</p>
                </div>
              </div>
              {/* Service Coverage Notice - 2024-12-19 15:00:00 */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-500 italic">
                  {language === 'en' 
                    ? 'We serve US and Canada markets exclusively.'
                    : '我们仅服务美加市场。'
                  }
                </p>
              </div>
            </div>

            <div className="bg-[#FF6B35] p-8 rounded-2xl shadow-lg text-white">
              <h3 className="text-xl font-bold mb-6">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>support@aponyinc.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+1 (800) 123-4567</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form - 使用改进的表单组件 - 2025-01-27 */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 h-full">
              <ContactForm language={language} onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};