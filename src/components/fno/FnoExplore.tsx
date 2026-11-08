import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  ArrowRight, 
  Activity, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface FnoExploreProps {
  onOpenMutualFunds: () => void;
  onOpenAiMitra?: () => void;
  onOpenGuide?: () => void;
  isFirstTimeInvestor: boolean;
}

export const FnoExplore: React.FC<FnoExploreProps> = ({
  onOpenMutualFunds,
  onOpenAiMitra,
  onOpenGuide,
  isFirstTimeInvestor
}) => {
  const [selectedSegment, setSelectedSegment] = useState<'options' | 'futures'>('options');
  const [activeExpiry, setActiveExpiry] = useState<string>('This Week');

  const indices = [
    { name: 'NIFTY 50', value: '24,148.20', change: '+104.30 (+0.43%)', isPositive: true },
    { name: 'BANK NIFTY', value: '51,820.40', change: '-82.10 (-0.16%)', isPositive: false },
    { name: 'FINNIFTY', value: '23,450.10', change: '+65.20 (+0.28%)', isPositive: true },
    { name: 'MIDCPNIFTY', value: '12,650.00', change: '+105.80 (+0.84%)', isPositive: true }
  ];

  const mostActiveContracts = [
    { symbol: 'NIFTY 24200 CE', expiry: '14 Nov', ltp: '₹142.50', change: '+18.4%', isPositive: true, oi: '1.24 Cr', volume: '4.8M' },
    { symbol: 'NIFTY 24100 PE', expiry: '14 Nov', ltp: '₹98.20', change: '-14.2%', isPositive: false, oi: '98.5 L', volume: '3.9M' },
    { symbol: 'BANKNIFTY 52000 CE', expiry: '14 Nov', ltp: '₹310.00', change: '+5.2%', isPositive: true, oi: '42.1 L', volume: '2.1M' },
    { symbol: 'BANKNIFTY 51500 PE', expiry: '14 Nov', ltp: '₹245.80', change: '-8.5%', isPositive: false, oi: '38.6 L', volume: '1.8M' },
    { symbol: 'RELIANCE 2800 CE', expiry: '28 Nov', ltp: '₹34.10', change: '+12.6%', isPositive: true, oi: '18.2 L', volume: '850K' }
  ];

  return (
    <div className="p-3.5 sm:p-5 max-w-4xl mx-auto space-y-4 pb-24 animate-fade-in">
      
      {/* 1. Indices Ticker Ribbon */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {indices.map((idx) => (
          <div
            key={idx.name}
            className="shrink-0 p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] min-w-[150px] shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{idx.name}</span>
              {idx.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5 text-[#00D09C]" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
              )}
            </div>
            <div className="mt-1">
              <span className="text-sm font-extrabold text-gray-900 dark:text-white block font-mono">
                {idx.value}
              </span>
              <span className={`text-[10px] font-semibold ${idx.isPositive ? 'text-[#00D09C]' : 'text-rose-500'}`}>
                {idx.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. SEBI MANDATORY RISK DISCLOSURE FOR BEGINNERS */}
      <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 shadow-sm space-y-2.5">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                SEBI Risk Disclosure for Retail Investors
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 font-bold">
                Regulatory Notice
              </span>
            </div>
            <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-200">
              <strong>9 out of 10 individual traders in equity Futures and Options incurred net losses</strong> (averaging ₹50,000 per trader). F&O involves extreme leverage and short expiration timeframes.
            </p>
            {isFirstTimeInvestor && (
              <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed font-medium">
                As a first-time investor, SEBI and Groww strongly advise building a steady wealth foundation through disciplined <strong>Mutual Fund SIPs</strong> before exploring complex derivative trading.
              </p>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
          <button
            onClick={onOpenMutualFunds}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00D09C] hover:bg-emerald-400 text-black font-extrabold text-xs shadow-xs transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Switch to Safe Mutual Funds SIP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {onOpenAiMitra && (
            <button
              onClick={onOpenAiMitra}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E222B] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 font-bold text-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#00D09C]" />
              <span>Ask AI Mitra: F&O vs Mutual Funds</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Segment Toggles (Options / Futures) */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center p-1 rounded-2xl bg-gray-100 dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] text-xs font-bold">
          <button
            onClick={() => setSelectedSegment('options')}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              selectedSegment === 'options'
                ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Options (Calls & Puts)
          </button>
          <button
            onClick={() => setSelectedSegment('futures')}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              selectedSegment === 'futures'
                ? 'bg-white dark:bg-[#121212] text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Futures Contracts
          </button>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <Activity className="w-3.5 h-3.5 text-[#5367FF]" />
          <span>Live NSE Data</span>
        </div>
      </div>

      {/* 4. Most Active Contracts Table / Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
            Most active contracts on Groww
          </h3>
          <span className="text-xs text-gray-400">Expiry: 14 Nov 2024</span>
        </div>

        <div className="space-y-2">
          {mostActiveContracts.map((contract) => (
            <div
              key={contract.symbol}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] hover:border-[#5367FF]/40 shadow-xs hover:shadow-md transition-all flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white font-mono">
                    {contract.symbol}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 font-medium">
                    {contract.expiry}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1 font-mono">
                  <span>OI: {contract.oi}</span>
                  <span>•</span>
                  <span>Vol: {contract.volume}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-extrabold text-sm text-gray-900 dark:text-white font-mono block">
                  {contract.ltp}
                </span>
                <span className={`text-[11px] font-bold ${contract.isPositive ? 'text-[#00D09C]' : 'text-rose-500'}`}>
                  {contract.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. F&O Quick Tools */}
      <div className="p-4 rounded-3xl bg-gray-50 dark:bg-[#1E222B]/60 border border-gray-200 dark:border-[#2B313E] space-y-3">
        <h4 className="font-bold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          F&O Trading Tools
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] text-center space-y-1">
            <span className="text-base block">📊</span>
            <span className="font-bold text-gray-900 dark:text-white block">Option Chain</span>
            <span className="text-[10px] text-gray-400">Greeks & LTP</span>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] text-center space-y-1">
            <span className="text-base block">🎯</span>
            <span className="font-bold text-gray-900 dark:text-white block">OI Heatmap</span>
            <span className="text-[10px] text-gray-400">Support / Resist</span>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] text-center space-y-1">
            <span className="text-base block">⚡</span>
            <span className="font-bold text-gray-900 dark:text-white block">Trading Ideas</span>
            <span className="text-[10px] text-gray-400">Algorithm scans</span>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] text-center space-y-1">
            <span className="text-base block">📅</span>
            <span className="font-bold text-gray-900 dark:text-white block">Expiry Tracker</span>
            <span className="text-[10px] text-gray-400">Weekly contracts</span>
          </div>
        </div>
      </div>

    </div>
  );
};
