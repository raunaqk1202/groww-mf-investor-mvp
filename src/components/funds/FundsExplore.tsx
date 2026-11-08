import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Filter, 
  Calculator, 
  Calendar,
  Megaphone,
  CheckCircle, 
  Compass, 
  Layers, 
  Percent,
  Play,
  Bot,
  ExternalLink
} from 'lucide-react';
import { MUTUAL_FUNDS } from '../../data/fundsData';
import { MutualFund } from '../../types/mutualFund';
import { CalculatorModal } from './CalculatorModal';

interface FundsExploreProps {
  onSelectFund: (fund: MutualFund) => void;
  onOpenGuide: (tab?: 'videos' | 'jargon-studio' | 'budget' | 'jargon' | 'nav' | 'sections' | 'types') => void;
  onOpenAiMitra?: () => void;
  onSelectTab?: (tab: any) => void;
  isFirstTimeInvestor: boolean;
  mode?: 'stocks' | 'mutual_funds';
  onSwitchMode?: (mode: 'stocks' | 'mutual_funds') => void;
}

export const FundsExplore: React.FC<FundsExploreProps> = ({
  onSelectFund,
  onOpenGuide,
  onOpenAiMitra,
  onSelectTab,
  isFirstTimeInvestor,
  mode = 'mutual_funds',
  onSwitchMode
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'explore' | 'holdings' | 'watchlist'>('explore');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Groww Quick Filter Collections for Mutual Funds
  const quickFilters = [
    { id: 'sip500', label: 'SIP with ₹500', icon: '₹' },
    { id: 'index', label: 'Index Funds', icon: '📊' },
    { id: 'largecap', label: 'Large Cap', icon: '🏢' },
    { id: 'flexicap', label: 'Flexi Cap', icon: '🔄' },
    { id: 'balanced', label: 'Balanced Advantage', icon: '⚖️' },
    { id: 'liquid', label: 'Emergency Liquid', icon: '💧' }
  ];

  const handleQuickFilter = (filterId: string) => {
    if (activeQuickFilter === filterId) {
      setActiveQuickFilter(null);
      setSelectedCategory('All');
      return;
    }

    setActiveQuickFilter(filterId);
    if (filterId === 'index') setSelectedCategory('Index Fund');
    else if (filterId === 'largecap') setSelectedCategory('Large Cap');
    else if (filterId === 'flexicap') setSelectedCategory('Flexi Cap');
    else if (filterId === 'balanced') setSelectedCategory('Balanced Advantage');
    else if (filterId === 'liquid') setSelectedCategory('Liquid Fund');
    else setSelectedCategory('All');
  };

  const filteredFunds = MUTUAL_FUNDS.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.fundHouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (activeQuickFilter === 'sip500') {
      matchesFilter = f.minSipAmount <= 500;
    } else if (selectedCategory !== 'All') {
      matchesFilter = f.category === selectedCategory;
    }

    return matchesSearch && matchesFilter;
  });

  // Most Bought Stocks Data matching user's uploaded sample screenshot
  const mostBoughtStocks = [
    {
      name: 'IRB Infra Devs',
      price: '₹65.85',
      change: '-6.85 (9.42%)',
      isPositive: false,
      logoBg: '#0A2540',
      logoText: 'IRB',
      logoColor: '#FFFFFF'
    },
    {
      name: 'Tata Steel',
      price: '₹165.00',
      change: '-9.25 (5.31%)',
      isPositive: false,
      logoBg: '#00529B',
      logoText: 'TATA',
      logoColor: '#FFFFFF'
    },
    {
      name: 'Cochin Shipyard',
      price: '₹1,972.05',
      change: '-46.00 (2.28%)',
      isPositive: false,
      logoBg: '#1B365D',
      logoText: 'CSL',
      logoColor: '#FFB81C'
    },
    {
      name: 'IRFC',
      price: '₹177.10',
      change: '-3.20 (1.77%)',
      isPositive: false,
      logoBg: '#8B0000',
      logoText: 'IRFC',
      logoColor: '#FFFFFF'
    }
  ];

  // Most Bought Mutual Funds matching sample 2-column card layout
  const mostBoughtFunds = [
    MUTUAL_FUNDS[0], // UTI Nifty 50
    MUTUAL_FUNDS[1], // PPFAS Flexi Cap
    MUTUAL_FUNDS[2], // HDFC Balanced Advantage
    MUTUAL_FUNDS[3]  // SBI Liquid
  ];

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-4xl mx-auto pb-24 text-gray-900 dark:text-gray-100">
      
      {/* 1. First-Time Investor Welcome & Guide Redirect Banner at the VERY TOP of Mutual Funds */}
      {mode === 'mutual_funds' && (
        <div className="rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#00D09C]/20 via-[#00D09C]/10 to-emerald-500/5 border-2 border-[#00D09C]/40 shadow-sm space-y-3.5 relative overflow-hidden animate-fade-in w-full">
          {/* Ambient background glow */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#00D09C]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2.5 relative z-10 w-full">
            {/* Top Tag Row spanning full width */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D09C] animate-pulse"></span>
                <span className="text-xs font-black text-[#00D09C] uppercase tracking-wider">
                  New to Mutual Funds? Start Here
                </span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-[#00D09C] border border-[#00D09C]/30">
                Beginner Guide
              </span>
            </div>

            {/* Headline spanning full width horizontally */}
            <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white leading-snug w-full">
              New to mutual fund investing? Learn the basics before investing a single rupee.
            </h3>

            {/* Description spanning full width horizontally */}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed w-full">
              Watch AI video masterclasses on personal finance budgeting, reading NAV charts, and understanding all 6 fund sections without jargon.
            </p>

            {/* Full-width Call To Action Button covering the screen horizontally */}
            <button
              onClick={() => onOpenGuide('videos')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#00D09C] hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-[0.99] group mt-1"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Investment Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Learning Roadmap Chips in a 2-column balanced grid */}
          <div className="pt-3 border-t border-[#00D09C]/20 grid grid-cols-2 gap-2.5 text-xs relative z-10 w-full">
            <button
              onClick={() => onOpenGuide('jargon-studio')}
              className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-[#00D09C]/30 hover:border-[#00D09C] text-left transition-all group shadow-xs w-full"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#00D09C] block text-xs mb-0.5">AI Jargon Studio</span>
                <Sparkles className="w-3.5 h-3.5 text-[#00D09C]" />
              </div>
              <span className="text-gray-500 dark:text-gray-300 text-[11px] block">AI Voice & Visuals</span>
            </button>

            <button
              onClick={() => onOpenGuide('budget')}
              className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] hover:border-[#00D09C] text-left transition-all shadow-xs w-full"
            >
              <span className="font-bold text-gray-900 dark:text-white block text-xs mb-0.5">1. Budgeting</span>
              <span className="text-gray-500 dark:text-gray-400 text-[11px] block">50:30:20 Calculator</span>
            </button>

            <button
              onClick={() => onOpenGuide('nav')}
              className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] hover:border-[#00D09C] text-left transition-all shadow-xs w-full"
            >
              <span className="font-bold text-gray-900 dark:text-white block text-xs mb-0.5">2. Reading Charts</span>
              <span className="text-gray-500 dark:text-gray-400 text-[11px] block">1M vs 5Y & Benchmarks</span>
            </button>

            <button
              onClick={() => onOpenGuide('sections')}
              className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] hover:border-[#00D09C] text-left transition-all shadow-xs w-full"
            >
              <span className="font-bold text-gray-900 dark:text-white block text-xs mb-0.5">3. 6 Key Sections</span>
              <span className="text-gray-500 dark:text-gray-400 text-[11px] block">Expense ratio, taxes</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Top Market Index Tickers Strip (NIFTY 50 & BANK NIFTY matching screenshot) */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {/* NIFTY 50 Card */}
        <div className="min-w-[165px] flex-1 p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block tracking-tight">
            NIFTY 50
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-extrabold text-sm text-gray-900 dark:text-white">22,483.70</span>
            <span className="text-[11px] font-semibold text-rose-500">-221.00 (0.97%)</span>
          </div>
        </div>

        {/* BANK NIFTY Card */}
        <div className="min-w-[165px] flex-1 p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block tracking-tight">
            BANK NIFTY
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-extrabold text-sm text-gray-900 dark:text-white">48,744.60</span>
            <span className="text-[11px] font-semibold text-[#00D09C]">+243.25 (0.50%)</span>
          </div>
        </div>

        {/* SENSEX / Midcap Card */}
        <div className="hidden sm:block min-w-[165px] flex-1 p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block tracking-tight">
            NIFTY MIDCAP 150
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-extrabold text-sm text-gray-900 dark:text-white">18,290.40</span>
            <span className="text-[11px] font-semibold text-[#00D09C]">+115.80 (0.64%)</span>
          </div>
        </div>
      </div>

      {/* 2. Sub-Tab Pills Bar matching sample screenshot */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button 
          onClick={() => setActiveSubTab('explore')}
          className={`px-4 py-1.5 rounded-full font-bold transition-all shadow-xs ${
            activeSubTab === 'explore'
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700'
              : 'bg-white dark:bg-[#1E222B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#2B313E]'
          }`}
        >
          Explore
        </button>

        <button 
          onClick={() => onSelectTab?.('dashboard')}
          className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
            activeSubTab === 'holdings'
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 font-bold'
              : 'bg-white dark:bg-[#1E222B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#2B313E] hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Holdings
        </button>

        <button 
          onClick={() => onOpenGuide('videos')}
          className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-[#00D09C] border border-[#00D09C]/30 font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <BookOpen className="w-3 h-3" />
          <span>AI Guide</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D09C] animate-pulse" />
        </button>

        <button 
          onClick={() => onOpenAiMitra?.()}
          className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 border border-indigo-500/30 font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>AI Mitra</span>
        </button>

        <button 
          onClick={() => setActiveSubTab('watchlist')}
          className="px-3.5 py-1.5 rounded-full bg-transparent text-[#00D09C] border border-[#00D09C]/40 font-bold hover:bg-[#00D09C]/10 whitespace-nowrap transition-colors"
        >
          + Watchlist
        </button>
      </div>

      {/* 3. Section: "Most bought on Groww" matching sample screenshot */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white tracking-tight">
            Most bought on Groww
          </h3>
          <span className="text-xs text-gray-400">
            {mode === 'stocks' ? 'Indian Equities' : 'Mutual Funds'}
          </span>
        </div>

        {/* 2-Column Grid of 4 Cards matching screenshot */}
        <div className="grid grid-cols-2 gap-3">
          {mode === 'stocks' ? (
            // Stocks Cards matching sample screenshot exactly
            mostBoughtStocks.map((stock, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 cursor-pointer"
              >
                {/* Stock Logo */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-[11px] shadow-xs"
                  style={{ backgroundColor: stock.logoBg, color: stock.logoColor }}
                >
                  {stock.logoText}
                </div>

                {/* Stock Title & Price */}
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-1">
                    {stock.name}
                  </h4>
                  <div className="mt-1">
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white block">
                      {stock.price}
                    </span>
                    <span className={`text-[11px] font-medium ${stock.isPositive ? 'text-[#00D09C]' : 'text-rose-500'}`}>
                      {stock.change}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Mutual Funds Cards matching sample 2-column layout
            mostBoughtFunds.map((fund) => (
              <div
                key={fund.id}
                onClick={() => onSelectFund(fund)}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] shadow-xs hover:border-[#00D09C]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-3 cursor-pointer"
              >
                {/* AMC Logo */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-xs"
                  style={{
                    backgroundColor: fund.fundHouse.logoBg || '#1E222B',
                    color: fund.fundHouse.logoColor || '#FFFFFF'
                  }}
                >
                  {fund.fundHouse.logoText || fund.fundHouse.name.substring(0, 3)}
                </div>

                {/* Fund Title & Return */}
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-1">
                    {fund.name}
                  </h4>
                  <div className="mt-1">
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white block">
                      ₹{fund.currentNav.toFixed(2)}
                    </span>
                    <span className="text-[11px] font-bold text-[#00D09C]">
                      +{fund.returns.threeYear}% (3Y)
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. Section: "Product & Tools" with 4 pastel icons matching sample screenshot */}
      <div className="space-y-3 pt-2">
        <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white tracking-tight px-0.5">
          Product & Tools
        </h3>

        {/* 4 Tool Cards in a row with pastel green/mint illustrations */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
          
          {/* Tool 1: Speedometer / Return Calculator */}
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="flex flex-col items-center p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E6F9F4] dark:bg-[#00D09C]/15 border border-[#00D09C]/25 flex items-center justify-center text-[#00D09C] group-hover:scale-105 transition-transform shadow-xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 14v-4" />
                <path d="M3.34 19a10 10 0 1 1 17.32 0" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-700 dark:text-gray-300 mt-1.5 leading-tight">
              Calculator
            </span>
          </button>

          {/* Tool 2: Calendar / SIP Planner */}
          <button
            onClick={() => onOpenGuide('budget')}
            className="flex flex-col items-center p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E6F9F4] dark:bg-[#00D09C]/15 border border-[#00D09C]/25 flex items-center justify-center text-[#00D09C] group-hover:scale-105 transition-transform shadow-xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-700 dark:text-gray-300 mt-1.5 leading-tight">
              SIP Planner
            </span>
          </button>

          {/* Tool 3: Megaphone / AI Video Guide */}
          <button
            onClick={() => onOpenGuide('videos')}
            className="flex flex-col items-center p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E6F9F4] dark:bg-[#00D09C]/15 border border-[#00D09C]/25 flex items-center justify-center text-[#00D09C] group-hover:scale-105 transition-transform shadow-xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l19-9-9 19-2-8-8-2z" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-700 dark:text-gray-300 mt-1.5 leading-tight">
              AI Guide
            </span>
          </button>

          {/* Tool 4: Funnel / Compare Funds */}
          <button
            onClick={() => onOpenGuide('jargon-studio')}
            className="flex flex-col items-center p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E6F9F4] dark:bg-[#00D09C]/15 border border-[#00D09C]/25 flex items-center justify-center text-[#00D09C] group-hover:scale-105 transition-transform shadow-xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-700 dark:text-gray-300 mt-1.5 leading-tight">
              AI Jargon
            </span>
          </button>

        </div>
      </div>

      {/* 5. Groww Signature Search Bar */}
      <div className="relative pt-1">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder='Search "Nifty 50", "Parag Parikh", "Liquid"...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-full text-xs sm:text-sm bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] focus:outline-none focus:border-[#00D09C] shadow-xs text-gray-900 dark:text-white placeholder:text-gray-400 transition-colors"
        />
      </div>

      {/* 7. Quick Filter Collections Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {quickFilters.map(filter => {
          const isActive = activeQuickFilter === filter.id;

          return (
            <button
              key={filter.id}
              onClick={() => handleQuickFilter(filter.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap font-medium text-xs transition-all ${
                isActive
                  ? 'bg-[#00D09C] text-black font-bold shadow-sm'
                  : 'bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] text-gray-700 dark:text-gray-300 hover:border-gray-400 shadow-xs'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      {/* 8. Popular Mutual Funds Listing */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
              All Mutual Funds
            </h3>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              Direct Plans • Zero Commission • Unbiased Categorization
            </span>
          </div>

          <span className="text-xs font-semibold text-[#00D09C]">
            {filteredFunds.length} Funds
          </span>
        </div>

        {/* Mutual Funds Grid - Full Horizontal Width Covering the Screen */}
        <div className="grid grid-cols-1 gap-3.5 w-full">
          {filteredFunds.map(fund => (
            <div
              key={fund.id}
              onClick={() => onSelectFund(fund)}
              className="cursor-pointer rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] p-4 hover:border-[#00D09C]/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-3 shadow-xs"
            >
              {/* Fund Header with AMC Logo */}
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-xs"
                  style={{
                    backgroundColor: fund.fundHouse.logoBg || '#1E222B',
                    color: fund.fundHouse.logoColor || '#FFFFFF'
                  }}
                >
                  {fund.fundHouse.logoText || fund.fundHouse.name.substring(0, 3)}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-tight block">
                    {fund.fundHouse.name}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-1 leading-snug">
                    {fund.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                    <span className="px-1.5 py-0.2 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                      {fund.category}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400">{fund.riskLevel} Risk</span>
                  </div>
                </div>
              </div>

              {/* Fund Metrics Row */}
              <div className="pt-2 border-t border-gray-100 dark:border-[#2B313E] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">3Y Annualised</span>
                  <span className="text-base font-extrabold text-[#00D09C]">
                    +{fund.returns.threeYear}%
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-gray-400 block font-medium">Expense Ratio</span>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                    {fund.expenseRatio}%
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block font-medium">Min SIP</span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    ₹{fund.minSipAmount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator Modal */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        defaultReturnRate={14.8}
        fundName="Built-in Return Calculator"
      />
    </div>
  );
};
