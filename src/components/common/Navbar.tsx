import React from 'react';
import { Search, QrCode, BookOpen, Sparkles, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onSearchClick: () => void;
  onOpenGuide: () => void;
  isFirstTimeInvestor: boolean;
  activeTab: string;
  onTabChange?: (tab: 'stocks' | 'fno' | 'mutual_funds') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearchClick,
  onOpenGuide,
  isFirstTimeInvestor,
  activeTab,
  onTabChange
}) => {
  const isStocks = activeTab === 'stocks';
  const isFno = activeTab === 'fno';
  const displayTitle = isFno ? 'F&O' : isStocks ? 'Stocks' : 'Mutual Funds';

  const handleNextTab = () => {
    if (activeTab === 'mutual_funds' || activeTab === 'explore' || activeTab === 'guide') {
      onTabChange?.('stocks');
    } else if (activeTab === 'stocks') {
      onTabChange?.('fno');
    } else {
      onTabChange?.('mutual_funds');
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-white dark:bg-[#121212] border-b border-gray-100 dark:border-[#2B313E] px-4 py-2.5">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Authentic Groww Logo & Segment Title */}
        <div className="flex items-center gap-2.5">
          {/* User's exact Groww Logo */}
          <div className="relative cursor-pointer" onClick={() => onTabChange?.('mutual_funds')}>
            <img 
              src="/groww-logo.png" 
              alt="Groww" 
              className="w-8 h-8 rounded-full shadow-sm hover:scale-105 transition-transform object-contain" 
            />
            {isFirstTimeInvestor && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900" title="First-time investor mode active" />
            )}
          </div>

          {/* Section Title Dropdown / Switcher matching sample design */}
          <div className="relative">
            <button
              onClick={handleNextTab}
              className="flex items-center gap-1.5 font-bold text-lg tracking-tight text-gray-900 dark:text-white hover:text-[#00D09C] transition-colors"
            >
              <span>{displayTitle}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {isFirstTimeInvestor && !isFno && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block -mt-0.5">
                Zero Commission • Direct
              </span>
            )}
            {isFno && (
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block -mt-0.5">
                Derivatives • High Risk
              </span>
            )}
          </div>
        </div>

        {/* Right: Search, QR Scanner, and Profile Avatar with amber ring */}
        <div className="flex items-center gap-2.5">
          {/* Quick Guide jump button for beginners */}
          {activeTab !== 'guide' && isFirstTimeInvestor && (
            <button
              onClick={onOpenGuide}
              className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-[#00D09C] border border-[#00D09C]/30 text-xs font-bold transition-all"
              title="Open First-Time Investor Guide"
            >
              <BookOpen className="w-3 h-3" />
              <span>Guide</span>
            </button>
          )}

          {/* Search Icon */}
          <button
            onClick={onSearchClick}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* QR Code / Scanner Icon matching sample design */}
          <button
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
            title="QR Code Scanner"
          >
            <QrCode className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

