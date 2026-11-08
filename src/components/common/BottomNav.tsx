import React from 'react';

export type TabType = 'stocks' | 'fno' | 'mutual_funds' | 'explore' | 'guide' | 'ai' | 'dashboard' | 'pay';

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
  const isFnoActive = activeTab === 'fno';

  return (
    <div className="sticky bottom-0 z-30 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-t border-gray-200 dark:border-[#2B313E] px-3 py-1.5 shadow-lg">
      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
        
        {/* Tab 1: Stocks (Signature Groww Stock Icon) */}
        <button
          onClick={() => setActiveTab('stocks')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            isStocksActive
              ? 'text-[#5367FF] font-bold'
              : 'text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
          title="Stocks"
        >
          <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform ${
            isStocksActive ? 'bg-[#5367FF] text-white scale-110 shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
          }`}>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <span className="text-[11px] mt-1 tracking-tight font-medium">Stocks</span>
          {isStocksActive && <div className="w-1 h-1 rounded-full bg-[#5367FF] mt-0.5" />}
        </button>

        {/* Tab 2: F&O (Original Groww Candlestick Trading Icon) */}
        <button
          onClick={() => setActiveTab('fno')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            isFnoActive
              ? 'text-[#5367FF] font-bold'
              : 'text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
          title="Futures & Options"
        >
          <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform ${
            isFnoActive ? 'bg-[#5367FF] text-white scale-110 shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
          }`}>
            {/* Candlestick trading icon */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="3" x2="8" y2="21" />
              <rect x="5.5" y="7" width="5" height="9" rx="1" fill="currentColor" fillOpacity="0.4" />
              <line x1="16" y1="3" x2="16" y2="21" />
              <rect x="13.5" y="10" width="5" height="7" rx="1" fill="currentColor" fillOpacity="0.4" />
            </svg>
          </div>
          <span className="text-[11px] mt-1 tracking-tight font-medium">F&O</span>
          {isFnoActive && <div className="w-1 h-1 rounded-full bg-[#5367FF] mt-0.5" />}
        </button>

        {/* Tab 3: Mutual Funds (Signature Groww Quadrant Circle Icon) */}
        <button
          onClick={() => setActiveTab('mutual_funds')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            isMfActive
              ? 'text-[#00D09C] font-bold'
              : 'text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
          title="Mutual Funds"
        >
          <div className="relative">
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform ${
              isMfActive ? 'bg-[#00D09C] text-black scale-110 shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
            }`}>
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <line x1="12" y1="3" x2="12" y2="21" />
                <line x1="3" y1="12" x2="21" y2="12" />
              </svg>
            </div>
            {isFirstTimeInvestor && (
              <span className="absolute -top-1 -right-2 text-[8px] font-black px-1 py-0.2 rounded-full bg-[#00D09C] text-black border border-white dark:border-gray-900 shadow-xs">
                MF
              </span>
            )}
            {hasActiveOrders && !isMfActive && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00D09C] animate-ping" />
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight font-medium">Mutual Funds</span>
          {isMfActive && <div className="w-1 h-1 rounded-full bg-[#00D09C] mt-0.5" />}
        </button>

      </div>
    </div>
  );
};
