import React from 'react';
import { Sparkles } from 'lucide-react';

export type TabType = 'stocks' | 'mutual_funds' | 'explore' | 'guide' | 'ai' | 'dashboard' | 'pay';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isFirstTimeInvestor: boolean;
  hasActiveOrders?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  isFirstTimeInvestor,
  hasActiveOrders = false
}) => {
  // Normalize mutual_funds and explore
  const isMfActive = activeTab === 'mutual_funds' || activeTab === 'explore' || activeTab === 'guide';
  const isStocksActive = activeTab === 'stocks';
  const isPayActive = activeTab === 'pay';
  const isDashboardActive = activeTab === 'dashboard';

  return (
    <div className="sticky bottom-0 z-30 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-t border-gray-200 dark:border-[#2B313E] px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-4 gap-1 max-w-lg mx-auto">
        
        {/* Tab 1: Stocks (Indigo icon matching sample screenshot) */}
        <button
          onClick={() => setActiveTab('stocks')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            isStocksActive
              ? 'text-[#5367FF] font-bold'
              : 'text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          {/* Indigo rounded icon matching screenshot */}
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform ${
            isStocksActive ? 'bg-[#5367FF] text-white scale-110 shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
          }`}>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">Stocks</span>
          {isStocksActive && <div className="w-1 h-1 rounded-full bg-[#5367FF] mt-0.5" />}
        </button>

        {/* Tab 2: Mutual Funds (Signature Groww quadrant circle icon matching screenshot) */}
        <button
          onClick={() => setActiveTab('mutual_funds')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            isMfActive
              ? 'text-[#00D09C] font-bold'
              : 'text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          <div className="relative">
            <svg viewBox="0 0 24 24" className={`w-6 h-6 fill-none stroke-current transition-transform ${
              isMfActive ? 'scale-110' : ''
            }`} strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
            {isFirstTimeInvestor && (
              <span className="absolute -top-1.5 -right-3.5 text-[8px] font-extrabold px-1.5 py-0.2 rounded-full bg-[#00D09C] text-black shadow-xs">
                MF
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">Mutual Funds</span>
          {isMfActive && <div className="w-1 h-1 rounded-full bg-[#00D09C] mt-0.5" />}
        </button>

        {/* Tab 3: Pay (Double chevron >> icon matching screenshot) */}
        <button
          onClick={() => setActiveTab('pay')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            isPayActive
              ? 'text-[#00D09C] font-bold'
              : 'text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          <svg viewBox="0 0 24 24" className={`w-6 h-6 fill-none stroke-current transition-transform ${
            isPayActive ? 'scale-110' : ''
          }`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
          <span className="text-[10px] mt-1 tracking-tight font-medium">Pay</span>
          {isPayActive && <div className="w-1 h-1 rounded-full bg-[#00D09C] mt-0.5" />}
        </button>

        {/* Tab 4: Loans / Dashboard (Document card icon matching screenshot) */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            isDashboardActive
              ? 'text-[#00D09C] font-bold'
              : 'text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          <div className="relative">
            <svg viewBox="0 0 24 24" className={`w-6 h-6 fill-none stroke-current transition-transform ${
              isDashboardActive ? 'scale-110' : ''
            }`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {hasActiveOrders && (
              <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#00D09C] animate-ping" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">Loans</span>
          {isDashboardActive && <div className="w-1 h-1 rounded-full bg-[#00D09C] mt-0.5" />}
        </button>

      </div>
    </div>
  );
};

