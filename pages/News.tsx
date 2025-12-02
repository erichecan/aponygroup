import React, { useState } from 'react';
import { Newspaper, Calendar, ArrowRight, Filter, Clock } from 'lucide-react';
import { Language, STRINGS, NewsItem, Page } from '../types';

interface NewsProps {
  language: Language;
  setPage?: (page: Page) => void;
}

type NewsFilter = 'all' | 'company' | 'industry' | 'policy' | 'knowledge';

export const News: React.FC<NewsProps> = ({ language, setPage }) => {
  const t = STRINGS[language];
  const [selectedFilter, setSelectedFilter] = useState<NewsFilter>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // 获取过滤后的新闻 - 2024-12-19 14:40:00
  const filteredNews = selectedFilter === 'all'
    ? t.newsItems
    : t.newsItems.filter(news => news.category === selectedFilter);

  // 按日期排序（最新的在前）
  const sortedNews = [...filteredNews].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  const filterOptions: { id: NewsFilter; label: string }[] = [
    { id: 'all', label: t.newsFilterAll },
    { id: 'company', label: t.newsFilterCompany },
    { id: 'industry', label: t.newsFilterIndustry },
    { id: 'policy', label: t.newsFilterPolicy },
    { id: 'knowledge', label: t.newsFilterKnowledge }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'company': return 'bg-blue-100 text-blue-700';
      case 'industry': return 'bg-green-100 text-green-700';
      case 'policy': return 'bg-orange-100 text-orange-700';
      case 'knowledge': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === Language.EN ? 'en-US' : 'zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRelatedNews = (currentNews: NewsItem) => {
    return t.newsItems
      .filter(news => news.id !== currentNews.id && news.category === currentNews.category)
      .slice(0, 3);
  };

  // 如果选择了新闻，显示详情
  if (selectedNews) {
    const relatedNews = getRelatedNews(selectedNews);
    
    return (
      <div className="pt-20 animate-fade-in min-h-screen bg-slate-50">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <button
            onClick={() => setSelectedNews(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-[#FF6B35] transition-colors"
          >
            <ArrowRight size={20} className="rotate-180" />
            <span>{t.newsBackToList}</span>
          </button>
        </div>

        {/* News Detail */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(selectedNews.category)}`}>
                  {filterOptions.find(opt => opt.id === selectedNews.category)?.label}
                </span>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Calendar size={16} />
                  <span>{formatDate(selectedNews.publishDate)}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {selectedNews.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {selectedNews.summary}
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="prose prose-slate max-w-none">
                <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedNews.content}
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedNews.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.newsRelatedArticles}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedNews.map((news) => (
                  <div
                    key={news.id}
                    onClick={() => setSelectedNews(news)}
                    className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(news.category)}`}>
                          {filterOptions.find(opt => opt.id === news.category)?.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                        {news.summary}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock size={14} />
                        <span>{formatDate(news.publishDate)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    );
  }

  // 新闻列表视图
  return (
    <div className="pt-20 animate-fade-in min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-black py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <Newspaper size={400} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.newsTitle}</h1>
          <p className="text-lg text-slate-300">{t.newsSubtitle}</p>
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

      {/* News List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedNews.map((news) => (
            <article
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
            >
              {/* News Image Placeholder */}
              {news.imageUrl ? (
                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                  <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <Newspaper size={48} className="text-slate-400" />
                </div>
              )}

              {/* News Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(news.category)}`}>
                    {filterOptions.find(opt => opt.id === news.category)?.label}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar size={14} />
                    <span>{formatDate(news.publishDate)}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#FF6B35] transition-colors line-clamp-2">
                  {news.title}
                </h2>

                <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {news.summary}
                </p>

                <button className="text-[#FF6B35] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t.newsReadMore}
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {sortedNews.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No news found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

