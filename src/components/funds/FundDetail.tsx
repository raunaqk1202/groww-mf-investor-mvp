import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Info, 
  HelpCircle, 
  Calculator, 
  Percent, 
  PieChart, 
  Award, 
  UserCheck, 
  Building2, 
  ShieldCheck, 
  TrendingUp,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MutualFund } from '../../types/mutualFund';
import { NavChart } from './NavChart';
import { CalculatorModal } from './CalculatorModal';

interface FundDetailProps {
  fund: MutualFund;
  onBack: () => void;
  onStartSip: (fund: MutualFund) => void;
  isFirstTimeInvestor: boolean;
}

export const FundDetail: React.FC<FundDetailProps> = ({
  fund,
  onBack,
  onStartSip,
  isFirstTimeInvestor
}) => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [activeTabSection, setActiveTabSection] = useState<'all' | '1' | '2' | '3' | '4' | '5' | '6'>('all');
  const [showTaxEstimator, setShowTaxEstimator] = useState(false);
  const [estimatedProfit, setEstimatedProfit] = useState(150000);

  // Union Budget 2024 LTCG & STCG Tax Math
  const taxFreeLimit = 125000;
  const taxableProfit = Math.max(0, estimatedProfit - taxFreeLimit);
  const equityLtcgTax = Math.round(taxableProfit * 0.125);
  const equityStcgTax = Math.round(estimatedProfit * 0.20);

  return (
    <div className="relative min-h-full bg-[#F9FAFB] dark:bg-[#121212] text-gray-900 dark:text-gray-100 pb-20">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-[#2B313E] flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          title="Back to Explore"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#00D09C]/10 text-[#00D09C] border border-[#00D09C]/25">
            Direct - Growth
          </span>
          <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 sm:p-5 space-y-5 max-w-2xl mx-auto">
        
        {/* Fund Identity Header with Groww AMC Badge */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div 
              className="w-11 h-11 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-sm"
              style={{
                backgroundColor: fund.fundHouse.logoBg || '#1E222B',
                color: fund.fundHouse.logoColor || '#FFFFFF'
              }}
            >
              {fund.fundHouse.logoText || fund.fundHouse.name.substring(0, 3)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  {fund.fundHouse.name}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {fund.category}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-gray-900 dark:text-white leading-snug">
                {fund.name}
              </h1>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-[#00D09C]/10 text-[#00D09C] font-semibold border border-[#00D09C]/20">
              ★ {fund.crisilRating} / 5 CRISIL
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] text-gray-600 dark:text-gray-300 font-medium">
              Risk: {fund.riskLevel}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] text-gray-600 dark:text-gray-300 font-medium">
              AUM: ₹{(fund.aumCr / 1000).toFixed(1)}k Cr
            </span>
          </div>
        </div>

        {/* Current NAV & 1D Change */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] flex items-baseline justify-between shadow-sm">
          <div>
            <span className="text-[11px] text-gray-400 block mb-0.5">Current NAV ({fund.navDate})</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                ₹{fund.currentNav}
              </span>
              <span className={`text-xs font-bold ${fund.oneDayReturn >= 0 ? 'text-[#00D09C]' : 'text-rose-500'}`}>
                {fund.oneDayReturn >= 0 ? '+' : ''}{fund.oneDayReturn}% 1D
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00D09C]/10 text-[#00D09C] border border-[#00D09C]/30 text-xs font-bold hover:bg-[#00D09C]/20 transition-all"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Return Calculator</span>
          </button>
        </div>

        {/* Interactive NAV Chart */}
        <div className="space-y-2">
          <NavChart navHistory={fund.navHistory} benchmarkName={fund.benchmarkIndex} />
        </div>

        {/* First-Timer Guide Alert Callout */}
        {isFirstTimeInvestor && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 flex items-start gap-3 text-xs">
            <span className="text-lg">💡</span>
            <div>
              <strong className="text-emerald-700 dark:text-emerald-400">First-Time Investor Helper:</strong>
              <p className="text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
                Every mutual fund has 6 key sections mandated by SEBI. We have annotated each section below with beginner tips so you know exactly what to look for.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================
            THE 6 MANDATORY SECTIONS WITH BEGINNER ANNOTATIONS
            ======================================================== */}

        {/* SECTION 1: Expense Ratio, Exit Load and Taxes */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#151b26] border border-gray-200 dark:border-gray-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Expense Ratio, Exit Load & Taxes
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-emerald-500">Low Cost Direct Plan</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
              <span className="text-gray-400 block text-[11px]">Expense Ratio</span>
              <span className="text-base font-extrabold text-emerald-500">{fund.expenseRatio}%</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Category Avg: {fund.categoryAvgExpenseRatio}%</span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
              <span className="text-gray-400 block text-[11px]">Exit Load</span>
              <span className="text-base font-extrabold text-gray-900 dark:text-white">
                {fund.exitLoad.percentage > 0 ? `${fund.exitLoad.percentage}%` : 'Nil (0%)'}
              </span>
              <span className="block text-[10px] text-gray-400 mt-0.5">
                {fund.exitLoad.percentage > 0 ? `If sold < ${fund.exitLoad.periodDays} days` : 'Zero exit fee'}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {fund.exitLoad.description}
          </p>

          {/* Tax Information Banner */}
          <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                Union Budget 2024 Tax Rules (Section 112A)
              </span>
              <button
                onClick={() => setShowTaxEstimator(!showTaxEstimator)}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold underline"
              >
                {showTaxEstimator ? 'Hide Calculator' : 'Try Tax Estimator'}
              </button>
            </div>

            <ul className="space-y-1 text-[11px] text-gray-600 dark:text-gray-300">
              <li>• <strong>STCG:</strong> {fund.taxation.stcgRate}</li>
              <li>• <strong>LTCG:</strong> {fund.taxation.ltcgRate}</li>
            </ul>

            {/* Interactive Tax Estimator */}
            {showTaxEstimator && (
              <div className="pt-2 border-t border-emerald-500/20 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span>Hypothetical Profit:</span>
                  <input
                    type="range"
                    min={50000}
                    max={300000}
                    step={10000}
                    value={estimatedProfit}
                    onChange={(e) => setEstimatedProfit(Number(e.target.value))}
                    className="w-32 accent-[#00D09C]"
                  />
                  <span className="font-bold">₹{estimatedProfit.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-2 rounded bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span>Tax-free exemption (per FY):</span>
                    <span className="text-emerald-500 font-bold">₹1,25,000 (0% Tax)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxable gain above ₹1.25L:</span>
                    <span>₹{taxableProfit.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-1">
                    <span>Total LTCG Tax Payable:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">₹{equityLtcgTax.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: How to use Built-in Return Calculator */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#151b26] border border-gray-200 dark:border-gray-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                How to Use the Built-in Return Calculator
              </h3>
            </div>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            The calculator projects compounding growth based on realistic historical rates. Testing monthly amounts (₹500, ₹1000, ₹5000) over 3, 5, or 10 years demonstrates how starting early beats trying to save large amounts late.
          </p>

          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="w-full py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Launch Return Calculator with {fund.returns.threeYear}% 3Y CAGR</span>
          </button>
        </div>

        {/* SECTION 3: Holdings */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#151b26] border border-gray-200 dark:border-gray-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-500 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Holdings & Diversification
              </h3>
            </div>
            <span className="text-xs text-gray-400 font-mono">
              {fund.totalStocksCount > 0 ? `${fund.totalStocksCount} Stocks` : 'Debt Papers'}
            </span>
          </div>

          {/* Asset Allocation Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Equity: {fund.equityPercentage}%</span>
              <span>Debt: {fund.debtPercentage}%</span>
              <span>Cash: {fund.cashPercentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex">
              <div className="h-full bg-emerald-500" style={{ width: `${fund.equityPercentage}%` }}></div>
              <div className="h-full bg-blue-500" style={{ width: `${fund.debtPercentage}%` }}></div>
              <div className="h-full bg-gray-400" style={{ width: `${fund.cashPercentage}%` }}></div>
            </div>
          </div>

          {/* Top Holdings Table */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Top Securities Held:</span>
            <div className="space-y-1.5">
              {fund.topHoldings.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 text-xs"
                >
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white block">{h.name}</span>
                    <span className="text-[10px] text-gray-400">{h.sector}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900 dark:text-white">{h.percentage}%</span>
                    {h.creditRating && (
                      <span className="block text-[10px] font-mono text-emerald-500 font-bold">{h.creditRating}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Sectors */}
          <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Top Sectors:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {fund.topSectors.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[11px]"
                >
                  {s.sector}: <strong>{s.percentage}%</strong>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: Returns and Rankings */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#151b26] border border-gray-200 dark:border-gray-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-yellow-500/15 text-yellow-500 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Returns & Category Rankings
              </h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
              Rank #{fund.categoryRank.rank} of {fund.categoryRank.totalFunds}
            </span>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 text-[11px]">
                  <th className="py-2">Period</th>
                  <th className="py-2">Fund Return</th>
                  <th className="py-2">Category Avg</th>
                  <th className="py-2">Benchmark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr>
                  <td className="py-2.5 font-medium text-gray-500">1 Year</td>
                  <td className="py-2.5 font-bold text-emerald-500">+{fund.returns.oneYear}%</td>
                  <td className="py-2.5 text-gray-400">+{fund.categoryReturns.oneYear}%</td>
                  <td className="py-2.5 text-gray-400">+{fund.benchmarkReturns.oneYear}%</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-gray-500">3 Years (Annualized)</td>
                  <td className="py-2.5 font-bold text-emerald-500">+{fund.returns.threeYear}%</td>
                  <td className="py-2.5 text-gray-400">+{fund.categoryReturns.threeYear}%</td>
                  <td className="py-2.5 text-gray-400">+{fund.benchmarkReturns.threeYear}%</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-gray-500">5 Years (Annualized)</td>
                  <td className="py-2.5 font-bold text-emerald-500">+{fund.returns.fiveYear}%</td>
                  <td className="py-2.5 text-gray-400">+{fund.categoryReturns.fiveYear}%</td>
                  <td className="py-2.5 text-gray-400">+{fund.benchmarkReturns.fiveYear}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 5: Fund Manager Details */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#151b26] border border-gray-200 dark:border-gray-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold text-xs">
                5
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Fund Manager Details
              </h3>
            </div>
          </div>

          {fund.managers.map((mgr, idx) => (
            <div key={idx} className="space-y-2 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">{mgr.name}</h4>
                  <span className="text-[11px] text-gray-400">{mgr.education} • {mgr.experienceYears} Years Experience</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500">
                  Tenure: {mgr.tenureWithFund}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[11px]">
                {mgr.bio}
              </p>

              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 pt-1">
                <span>Other schemes managed:</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{mgr.otherSchemes.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 6: Fund House and Investment Objective */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#151b26] border border-gray-200 dark:border-gray-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-500 flex items-center justify-center font-bold text-xs">
                6
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Fund House & Investment Objective
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-gray-900 dark:text-white block mb-1">Investment Objective:</span>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {fund.investmentObjective}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 space-y-1">
              <span className="font-bold text-gray-700 dark:text-gray-300 block">Who is this fund suitable for?</span>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[11px]">
                {fund.suitableFor}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-400">
              <span>Fund House Total AUM: ₹{(fund.fundHouse.totalAumCr / 1000).toFixed(0)}k Cr</span>
              <span>Founded: {fund.fundHouse.foundedYear}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Bottom Sticky Action Bar */}
      <div className="sticky bottom-0 z-30 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-t border-gray-200 dark:border-[#2B313E] px-4 py-3 shadow-2xl">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <div className="hidden sm:block">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Min. SIP Amount</span>
            <span className="font-extrabold text-gray-900 dark:text-white text-base">₹{fund.minSipAmount}</span>
          </div>

          <div className="flex items-center gap-3 flex-1 sm:flex-initial justify-end">
            <button
              onClick={() => onStartSip(fund)}
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-[#2B313E] text-gray-800 dark:text-gray-200 font-bold text-xs hover:bg-gray-100 dark:hover:bg-[#1E222B] transition-colors"
            >
              ONE-TIME (₹{fund.minLumpsumAmount})
            </button>

            <button
              onClick={() => onStartSip(fund)}
              className="flex-1 sm:flex-initial px-8 py-3 rounded-xl bg-[#00D09C] hover:bg-emerald-400 text-black font-black text-xs tracking-wider transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              START SIP
            </button>
          </div>
        </div>
      </div>

      {/* Calculator Modal */}
      <CalculatorModal
        fundName={fund.name}
        defaultReturnRate={fund.returns.threeYear}
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
};

