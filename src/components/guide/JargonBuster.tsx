import React, { useState } from 'react';
import { Search, BookOpen, Lightbulb, HelpCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { TERMINOLOGIES } from '../../data/guideData';
import { TerminologyItem } from '../../types/guide';

export const JargonBuster: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(TERMINOLOGIES[0].term);

  const categories = ['All', 'Basics', 'Costs & Taxes', 'Performance', 'Safety & Structure'];

  const filteredTerms = TERMINOLOGIES.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.simpleExplanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Header */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search mutual fund terms (e.g. NAV, Expense Ratio, Exit Load)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-[#1E222B] text-gray-600 dark:text-gray-400 border border-transparent dark:border-[#2B313E] hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms List */}
      <div className="space-y-3">
        {filteredTerms.map(item => {
          const isExpanded = expandedTerm === item.term;

          return (
            <div
              key={item.term}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-white dark:bg-[#1E222B] border-emerald-500/40 shadow-md'
                  : 'bg-white/60 dark:bg-[#1A1D24] border-gray-200 dark:border-[#2B313E] hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              {/* Collapsed Header */}
              <button
                onClick={() => setExpandedTerm(isExpanded ? null : item.term)}
                className="w-full p-4 flex items-center justify-between text-left gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900 dark:text-white">{item.term}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    {item.simpleExplanation}
                  </p>
                </div>
                <div className="text-gray-400 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expanded Card Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3 border-t border-gray-100 dark:border-gray-800 text-xs">
                  {/* Full Explanation */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.simpleExplanation}
                  </p>

                  {/* Why it matters */}
                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      Why This Matters For You:
                    </span>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.whyItMattersForYou}
                    </p>
                  </div>

                  {/* Analogy & Example - Full Horizontal Width Covering the Screen */}
                  <div className="grid grid-cols-1 gap-2.5 text-xs w-full">
                    <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800">
                      <span className="font-semibold text-gray-500 dark:text-gray-400 block mb-0.5">Real-World Analogy:</span>
                      <span className="text-gray-700 dark:text-gray-300">{item.realWorldAnalogy}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800">
                      <span className="font-semibold text-gray-500 dark:text-gray-400 block mb-0.5">Example:</span>
                      <span className="text-gray-700 dark:text-gray-300">{item.example}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

