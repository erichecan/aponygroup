import React, { useState } from 'react';
import { Briefcase, TrendingUp, CheckCircle2, Filter, X } from 'lucide-react';
import { Language, STRINGS, CaseStudy } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface CasesProps {
  language: Language;
}

type CaseFilter = 'all' | 'clearance' | 'landing' | 'warehousing' | 'transport' | 'comprehensive';

export const Cases: React.FC<CasesProps> = ({ language }) => {
  const t = STRINGS[language];
  const [selectedFilter, setSelectedFilter] = useState<CaseFilter>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // 获取过滤后的案例 - 2024-12-19 14:35:00
  const filteredCases = selectedFilter === 'all'
    ? t.cases
    : t.cases.filter(caseItem => caseItem.category === selectedFilter);

  const filterOptions: { id: CaseFilter; label: string }[] = [
    { id: 'all', label: t.casesFilterAll },
    { id: 'clearance', label: t.casesFilterClearance },
    { id: 'landing', label: t.casesFilterLanding },
    { id: 'warehousing', label: t.casesFilterWarehousing },
    { id: 'transport', label: t.casesFilterTransport },
    { id: 'comprehensive', label: t.casesFilterComprehensive }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'clearance': return 'bg-blue-100 text-blue-700';
      case 'landing': return 'bg-green-100 text-green-700';
      case 'warehousing': return 'bg-purple-100 text-purple-700';
      case 'transport': return 'bg-orange-100 text-orange-700';
      case 'comprehensive': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // 案例图片映射 - 2024-12-19 19:10:00 - 更新所有类别图片
  const getCaseImage = (category: string) => {
    switch (category) {
      case 'clearance':
        // 清关服务：海关检查/清关场景
        return {
          src: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
          fallback: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
        };
      case 'landing':
        // 落地服务：港口/码头场景
        return {
          src: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
          fallback: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80"
        };
      case 'warehousing':
        // 仓储服务：零售行业/仓库场景 - 2024-12-19 16:45:00
        return {
          src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
          fallback: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
        };
      case 'transport':
        // 运输服务：卡车/物流运输场景
        return {
          src: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
          fallback: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
        };
      case 'comprehensive':
        // 综合解决方案：物流网络/供应链场景
        return {
          src: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
          fallback: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
        };
      default:
        return {
          src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
          fallback: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80"
        };
    }
  };

  return (
    <div className="pt-20 animate-fade-in min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-black py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <Briefcase size={400} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.casesTitle}</h1>
          <p className="text-lg text-slate-300">{t.casesSubtitle}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 flex-wrap">
          <Filter size={20} className="text-slate-600" />
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedFilter(option.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === option.id
                  ? 'bg-[#FF6B35] text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((caseItem) => {
            const caseImage = getCaseImage(caseItem.category);
            return (
              <div
                key={caseItem.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => setSelectedCase(caseItem)}
              >
                {/* Case Image - 2024-12-19 15:30:00 */}
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={caseImage.src}
                    fallbackSrc={caseImage.fallback}
                    alt={caseItem.title}
                    className="w-full h-full"
                    objectFit="cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-white/90 ${getCategoryColor(caseItem.category)}`}>
                      {filterOptions.find(opt => opt.id === caseItem.category)?.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Case Header */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#FF6B35] transition-colors">
                    {caseItem.title}
                  </h3>

                  {/* Case Preview */}
                  <div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-500 mb-1">{t.caseClientBackground}</h4>
                        <p className="text-slate-700 text-sm line-clamp-2">{caseItem.clientBackground}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-500 mb-1">{t.caseChallenge}</h4>
                        <p className="text-slate-700 text-sm line-clamp-2">{caseItem.challenge}</p>
                      </div>
                    </div>

                    {/* Metrics Preview */}
                    {caseItem.metrics && caseItem.metrics.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex flex-wrap gap-2">
                          {caseItem.metrics.slice(0, 2).map((metric, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button className="mt-4 text-[#FF6B35] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t.caseViewDetails}
                      <TrendingUp size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No cases found for this category.</p>
          </div>
        )}
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(selectedCase.category)}`}>
                  {filterOptions.find(opt => opt.id === selectedCase.category)?.label}
                </span>
                <h2 className="text-2xl font-bold text-slate-900">{selectedCase.title}</h2>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#FF6B35]" />
                  {t.caseClientBackground}
                </h3>
                <p className="text-slate-700 leading-relaxed">{selectedCase.clientBackground}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#FF6B35]" />
                  {t.caseChallenge}
                </h3>
                <p className="text-slate-700 leading-relaxed">{selectedCase.challenge}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#FF6B35]" />
                  {t.caseSolution}
                </h3>
                <p className="text-slate-700 leading-relaxed">{selectedCase.solution}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#FF6B35]" />
                  {t.caseResult}
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">{selectedCase.result}</p>
                
                {selectedCase.metrics && selectedCase.metrics.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {selectedCase.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-700 mb-1">{metric}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-6 py-2 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#E55A2B] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

