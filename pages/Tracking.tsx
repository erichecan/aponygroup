import React, { useState } from 'react';
import { PackageSearch, Search, Truck, MapPin, CheckCircle } from 'lucide-react';
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