// 网站搜索组件 - 2025-01-27
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock } from 'lucide-react';
import { Language, Page } from '../types';

interface SearchResult {
  type: 'page' | 'news' | 'case';
  title: string;
  description: string;
  url: Page | string;
  keywords?: string[];
}

interface SearchBarProps {
  language: Language;
  onSelect?: (result: SearchResult) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  language,
  onSelect,
  placeholder
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 搜索索引（可以从 API 或配置文件加载）
  const searchIndex: SearchResult[] = [
    // 页面
    {
      type: 'page',
      title: language === 'en' ? 'Services' : '服务项目',
      description: language === 'en' ? 'Logistics and warehousing services' : '物流和仓储服务',
      url: 'services',
      keywords: ['service', 'logistics', 'warehouse', '服务', '物流', '仓储']
    },
    {
      type: 'page',
      title: language === 'en' ? 'About Us' : '关于我们',
      description: language === 'en' ? 'Learn about AponyGroup' : '了解 AponyGroup',
      url: 'about',
      keywords: ['about', 'company', '关于', '公司']
    },
    {
      type: 'page',
      title: language === 'en' ? 'Contact' : '联系我们',
      description: language === 'en' ? 'Get in touch with us' : '联系我们',
      url: 'contact',
      keywords: ['contact', 'email', 'phone', '联系', '邮箱', '电话']
    },
    {
      type: 'page',
      title: language === 'en' ? 'Case Studies' : '成功案例',
      description: language === 'en' ? 'View our success stories' : '查看我们的成功案例',
      url: 'cases',
      keywords: ['case', 'study', 'success', '案例', '成功']
    },
    {
      type: 'page',
      title: language === 'en' ? 'News' : '新闻资讯',
      description: language === 'en' ? 'Latest news and updates' : '最新新闻和资讯',
      url: 'news',
      keywords: ['news', 'update', '新闻', '资讯']
    },
    {
      type: 'page',
      title: language === 'en' ? 'FAQ' : '常见问题',
      description: language === 'en' ? 'Frequently asked questions' : '常见问题',
      url: 'faq',
      keywords: ['faq', 'question', 'help', '问题', '帮助']
    },
    {
      type: 'page',
      title: language === 'en' ? 'Tracking' : '货物追踪',
      description: language === 'en' ? 'Track your shipment' : '追踪您的货物',
      url: 'tracking',
      keywords: ['track', 'shipment', 'order', '追踪', '货物', '订单']
    },
  ];

  // 从 localStorage 加载搜索历史
  useEffect(() => {
    try {
      const saved = localStorage.getItem('apony-search-history');
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      }
    } catch (error) {
      console.warn('Failed to load search history:', error);
    }
  }, []);

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // 搜索功能
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const queryLower = searchQuery.toLowerCase();
    const matched = searchIndex.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(queryLower);
      const descMatch = item.description.toLowerCase().includes(queryLower);
      const keywordMatch = item.keywords?.some(kw => 
        kw.toLowerCase().includes(queryLower) || queryLower.includes(kw.toLowerCase())
      );
      return titleMatch || descMatch || keywordMatch;
    });

    setResults(matched.slice(0, 8)); // 最多显示 8 个结果
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
    setIsOpen(true);
  };

  const handleSelect = (result: SearchResult) => {
    // 保存搜索历史
    if (query.trim() && !recentSearches.includes(query.trim())) {
      const newHistory = [query.trim(), ...recentSearches].slice(0, 5);
      setRecentSearches(newHistory);
      try {
        localStorage.setItem('apony-search-history', JSON.stringify(newHistory));
      } catch (error) {
        console.warn('Failed to save search history:', error);
      }
    }

    setQuery('');
    setResults([]);
    setIsOpen(false);
    
    if (onSelect) {
      onSelect(result);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const clearHistory = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('apony-search-history');
    } catch (error) {
      console.warn('Failed to clear search history:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* 搜索输入框 */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Search size={20} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || (language === 'en' ? 'Search...' : '搜索...')}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all bg-white"
          aria-label={language === 'en' ? 'Search' : '搜索'}
          aria-expanded={isOpen}
          aria-controls="search-results"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35] rounded"
            aria-label={language === 'en' ? 'Clear search' : '清除搜索'}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* 搜索结果下拉框 */}
      {isOpen && (
        <div
          id="search-results"
          className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-slate-200 max-h-96 overflow-y-auto z-50"
          role="listbox"
        >
          {query && results.length > 0 && (
            <>
              <div className="p-2 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {language === 'en' ? 'Results' : '搜索结果'}
              </div>
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(result)}
                  className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors focus:outline-none focus:bg-orange-50"
                  role="option"
                >
                  <div className="font-semibold text-slate-900">{result.title}</div>
                  <div className="text-sm text-slate-600 mt-0.5">{result.description}</div>
                </button>
              ))}
            </>
          )}

          {query && results.length === 0 && (
            <div className="p-4 text-center text-slate-500">
              {language === 'en' ? 'No results found' : '未找到结果'}
            </div>
          )}

          {!query && recentSearches.length > 0 && (
            <>
              <div className="p-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {language === 'en' ? 'Recent Searches' : '最近搜索'}
                </span>
                <button
                  onClick={clearHistory}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {language === 'en' ? 'Clear' : '清除'}
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    performSearch(search);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors focus:outline-none focus:bg-orange-50 flex items-center gap-2"
                >
                  <Clock size={16} className="text-slate-400" />
                  <span className="text-slate-700">{search}</span>
                </button>
              ))}
            </>
          )}

          {!query && recentSearches.length === 0 && (
            <div className="p-4 text-center text-slate-500 text-sm">
              {language === 'en' 
                ? 'Start typing to search...' 
                : '开始输入以搜索...'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

