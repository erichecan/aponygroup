import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Language, STRINGS } from '../types';

interface ContactProps {
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = STRINGS[language];
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Logic to send email would go here
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
                     <span className="font-semibold text-slate-800">{t.locationCN}</span>
                   </div>
                   <p className="pl-8 text-sm text-slate-500">Longhua District, Shenzhen, China</p>
                </div>
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

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 h-full">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for contacting us. We will respond shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{t.formName}</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{t.formEmail}</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t.formSubject}</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t.formMessage}</label>
                    <textarea required rows={5} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-black hover:bg-[#1a1a1a] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                    {t.formSubmit}
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};