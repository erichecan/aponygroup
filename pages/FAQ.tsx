import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Language, STRINGS } from '../types';

interface FAQProps {
  language: Language;
}

interface FAQCategory {
  id: string;
  label: string;
  items: Array<{ question: string; answer: string }>;
}

export const FAQ: React.FC<FAQProps> = ({ language }) => {
  const t = STRINGS[language];
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // 组织FAQ数据 - 2024-12-19 14:30:00
  const faqCategories: FAQCategory[] = [
    {
      id: 'clearance',
      label: t.faqCategoryClearance,
      items: t.faqClearance
    },
    {
      id: 'landing',
      label: t.faqCategoryLanding,
      items: t.faqLanding
    },
    {
      id: 'warehousing',
      label: t.faqCategoryWarehousing,
      items: t.faqWarehousing
    },
    {
      id: 'transport',
      label: t.faqCategoryTransport,
      items: t.faqTransport
    },
    {
      id: 'pricing',
      label: t.faqCategoryPricing,
      items: t.faqPricing
    },
    {
      id: 'other',
      label: t.faqCategoryOther,
      items: t.faqOther
    }
  ];

  const toggleItem = (categoryId: string, itemIndex: number) => {
    const key = `${categoryId}-${itemIndex}`;
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="pt-20 animate-fade-in min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-black py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <HelpCircle size={400} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.faqTitle}</h1>
          <p className="text-lg text-slate-300">{t.faqSubtitle}</p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {faqCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Category Header */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">{category.label}</h2>
              </div>

              {/* FAQ Items */}
              <div className="divide-y divide-slate-100">
                {category.items.map((item, index) => {
                  const itemKey = `${category.id}-${index}`;
                  const isOpen = openItems.has(itemKey);

                  return (
                    <div key={index} className="transition-all">
                      {/* Question */}
                      <button
                        onClick={() => toggleItem(category.id, index)}
                        className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors group"
                      >
                        <span className="flex-1 font-semibold text-slate-900 group-hover:text-[#FF6B35] transition-colors">
                          {item.question}
                        </span>
                        <ChevronDown
                          size={20}
                          className={`text-slate-400 shrink-0 mt-1 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Answer */}
                      {isOpen && (
                        <div className="px-6 pb-5 pt-0 animate-fade-in">
                          <div className="pl-4 border-l-2 border-[#FF6B35] text-slate-700 leading-relaxed">
                            {item.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-orange-50 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-white text-[#FF6B35] font-bold rounded-xl hover:bg-slate-50 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

