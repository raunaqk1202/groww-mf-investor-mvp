import React, { useState } from 'react';
import { FUND_TYPES_CATALOG } from '../../data/guideData';
import { FundTypeInfo } from '../../types/guide';
import { Layers, ShieldCheck, AlertCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export const FundTypesCatalog: React.FC = () => {
  const [selectedBroadCat, setSelectedBroadCat] = useState<'All' | 'Equity' | 'Debt' | 'Hybrid'>('All');
  const [expandedType, setExpandedType] = useState<string | null>(FUND_TYPES_CATALOG[0].name);

  const filtered = FUND_TYPES_CATALOG.filter(f => selectedBroadCat === 'All' || f.category === selectedBroadCat);

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
        {(['All', 'Equity', 'Debt', 'Hybrid'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedBroadCat(cat)}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
              selectedBroadCat === cat
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-white dark:bg-[#1E222B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#2B313E] hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {cat} Schemes
          </button>
        ))}
      </div>

      {/* List of Fund Types */}
      <div className="space-y-3">
        {filtered.map(item => {
          const isExpanded = expandedType === item.name;

          return (
            <div
              key={item.name}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-white dark:bg-[#1E222B] border-emerald-500/40 shadow-md'
                  : 'bg-white/60 dark:bg-[#1A1D24] border-gray-200 dark:border-[#2B313E] hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <button
                onClick={() => setExpandedType(isExpanded ? null : item.name)}
                className="w-full p-4 flex items-center justify-between text-left gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900 dark:text-white">{item.name}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.riskLevel === 'Low'
                        ? 'bg-blue-500/10 text-blue-500'
                        : item.riskLevel === 'Moderate'
                        ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                        : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {item.riskLevel} Risk
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Horizon: <strong>{item.idealTimeHorizon}</strong></span>
                    <span>•</span>
                    <span>Benchmark: {item.exampleBenchmark}</span>
                  </div>
                </div>

                <div className="text-gray-400 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3 border-t border-gray-100 dark:border-gray-800 text-xs">
                  {/* SEBI Definition */}
                  <div className="space-y-1">
                    <span className="font-semibold text-gray-500 dark:text-gray-400 block text-[11px]">
                      SEBI Standardized Definition:
                    </span>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      {item.sebiDefinition}
                    </p>
                  </div>

                  {/* Who should invest */}
                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 space-y-1">
                    <span className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Who Should Invest:
                    </span>
                    <p className="leading-relaxed">
                      {item.whoShouldInvest}
                    </p>
                  </div>

                  {/* Key Benefits and Key Risks Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block">Key Benefits:</span>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        {item.keyBenefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500">✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-500/20 space-y-1">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block">Key Risks / Watchouts:</span>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        {item.keyRisks.map((r, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-500">⚠</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
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

