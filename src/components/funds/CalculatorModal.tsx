import React, { useState } from 'react';
import { Calculator, X, Sparkles, TrendingUp } from 'lucide-react';

interface CalculatorModalProps {
  fundName: string;
  defaultReturnRate?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({
  fundName,
  defaultReturnRate = 14,
  isOpen,
  onClose
}) => {
  const [calcType, setCalcType] = useState<'sip' | 'lumpsum'>('sip');
  const [monthlyAmount, setMonthlyAmount] = useState<number>(2000);
  const [lumpSumAmount, setLumpSumAmount] = useState<number>(25000);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(defaultReturnRate);

  if (!isOpen) return null;

  // Compounding Calculations
  let totalInvested = 0;
  let totalValue = 0;
  let estimatedReturns = 0;

  if (calcType === 'sip') {
    const monthlyRate = expectedReturnRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    totalInvested = monthlyAmount * totalMonths;
    // Future value of SIP formula: P * [((1 + r)^n - 1) / r] * (1 + r)
    totalValue = Math.round(monthlyAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    estimatedReturns = totalValue - totalInvested;
  } else {
    totalInvested = lumpSumAmount;
    // Lump sum formula: P * (1 + r)^t
    totalValue = Math.round(lumpSumAmount * Math.pow(1 + expectedReturnRate / 100, tenureYears));
    estimatedReturns = totalValue - totalInvested;
  }

  const investedPercent = Math.round((totalInvested / totalValue) * 100) || 50;
  const returnPercent = 100 - investedPercent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#121620] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-5 space-y-4 text-gray-900 dark:text-gray-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-[#00D09C] flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Built-in Return Calculator</h3>
              <p className="text-[11px] text-gray-400 truncate max-w-[240px]">{fundName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SIP vs Lump Sum Switcher */}
        <div className="flex p-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold">
          <button
            onClick={() => setCalcType('sip')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              calcType === 'sip' ? 'bg-white dark:bg-gray-700 shadow text-emerald-500' : 'text-gray-400'
            }`}
          >
            Monthly SIP
          </button>
          <button
            onClick={() => setCalcType('lumpsum')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              calcType === 'lumpsum' ? 'bg-white dark:bg-gray-700 shadow text-emerald-500' : 'text-gray-400'
            }`}
          >
            One-Time Investment
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-3 text-xs">
          {calcType === 'sip' ? (
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Monthly Investment</span>
                <span className="font-bold">₹{monthlyAmount.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={500}
                max={25000}
                step={500}
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>₹500</span>
                <span>₹10,000</span>
                <span>₹25,000</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">One-Time Amount</span>
                <span className="font-bold">₹{lumpSumAmount.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={200000}
                step={5000}
                value={lumpSumAmount}
                onChange={(e) => setLumpSumAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>₹5,000</span>
                <span>₹1,00,000</span>
                <span>₹2,00,000</span>
              </div>
            </div>
          )}

          {/* Time Horizon Slider */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Investment Horizon</span>
              <span className="font-bold">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>1 Year</span>
              <span>10 Years</span>
              <span>25 Years</span>
            </div>
          </div>

          {/* Expected Return Rate Slider */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Expected Annual Return (CAGR)</span>
              <span className="font-bold">{expectedReturnRate}% p.a.</span>
            </div>
            <input
              type="range"
              min={6}
              max={20}
              step={0.5}
              value={expectedReturnRate}
              onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>6% (Debt)</span>
              <span>12% (Index)</span>
              <span>20% (Aggressive)</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Split */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-gray-500 dark:text-gray-400">Total Estimated Value:</span>
            <span className="text-lg font-extrabold text-[#00D09C]">
              ₹{totalValue.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Progress bar split */}
          <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex">
            <div
              className="h-full bg-gray-400 dark:bg-gray-500 transition-all duration-300"
              style={{ width: `${investedPercent}%` }}
              title={`Invested: ${investedPercent}%`}
            />
            <div
              className="h-full bg-[#00D09C] transition-all duration-300"
              style={{ width: `${returnPercent}%` }}
              title={`Returns: ${returnPercent}%`}
            />
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-400 dark:bg-gray-500"></div>
              <div>
                <span className="text-[10px] text-gray-400 block">Total Invested</span>
                <span className="font-bold text-gray-900 dark:text-white">₹{totalInvested.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00D09C]"></div>
              <div>
                <span className="text-[10px] text-gray-400 block">Wealth Gain (Profit)</span>
                <span className="font-bold text-[#00D09C]">₹{estimatedReturns.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#00D09C] text-black font-bold text-xs hover:bg-emerald-400 transition-colors shadow-md"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

