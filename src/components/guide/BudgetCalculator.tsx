import React, { useState } from 'react';
import { IndianRupee, ShieldAlert, Sparkles, CheckCircle2, Info } from 'lucide-react';

export const BudgetCalculator: React.FC = () => {
  const [salary, setSalary] = useState<number>(45000);
  const [expenses, setExpenses] = useState<number>(25000);
  const [existingEmi, setExistingEmi] = useState<number>(5000);
  const [emergencyMonths, setEmergencyMonths] = useState<number>(2);

  // Calculations
  const totalObligations = expenses + existingEmi;
  const surplus = Math.max(0, salary - totalObligations);
  
  // Safe 20% rule allocation
  const suggestedSavingsTarget = Math.round(salary * 0.2);
  const actualInvestableSurplus = Math.min(surplus, suggestedSavingsTarget);
  
  // Emergency target is 6 months of expenses
  const targetEmergencyFund = totalObligations * 6;
  const currentEmergencyFund = totalObligations * emergencyMonths;
  const emergencyShortfall = Math.max(0, targetEmergencyFund - currentEmergencyFund);

  // Breakdown recommendation
  const needsMoreEmergency = emergencyMonths < 3;
  const liquidEmergencyAllocation = needsMoreEmergency ? Math.round(actualInvestableSurplus * 0.5) : Math.round(actualInvestableSurplus * 0.2);
  const equitySipAllocation = Math.round(actualInvestableSurplus * (needsMoreEmergency ? 0.3 : 0.5));
  const hybridSipAllocation = actualInvestableSurplus - liquidEmergencyAllocation - equitySipAllocation;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-gray-900 dark:text-white">
            Interactive Personal Finance Budgeter
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            50:30:20 Rule
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Calculate how much you can comfortably invest in mutual funds without straining daily living or taking dangerous debt.
        </p>
      </div>

      {/* Sliders Input Grid - Full Horizontal Width Covering the Screen */}
      <div className="grid grid-cols-1 gap-3.5 w-full">
        {/* Monthly In-Hand Salary */}
        <div className="space-y-1.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Monthly In-Hand Salary</span>
            <span className="font-bold text-gray-900 dark:text-white">₹{salary.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min={15000}
            max={200000}
            step={2500}
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
          />
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>₹15k</span>
            <span>₹1L</span>
            <span>₹2L</span>
          </div>
        </div>

        {/* Monthly Essential Needs */}
        <div className="space-y-1.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Essential Needs (Rent, Food, Bills)</span>
            <span className="font-bold text-gray-900 dark:text-white">₹{expenses.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min={8000}
            max={100000}
            step={1000}
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
          />
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>₹8k</span>
            <span>₹50k</span>
            <span>₹1L</span>
          </div>
        </div>

        {/* Existing EMIs */}
        <div className="space-y-1.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Existing EMIs / Debt</span>
            <span className="font-bold text-gray-900 dark:text-white">₹{existingEmi.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min={0}
            max={50000}
            step={1000}
            value={existingEmi}
            onChange={(e) => setExistingEmi(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
          />
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>₹0</span>
            <span>₹25k</span>
            <span>₹50k</span>
          </div>
        </div>

        {/* Emergency Fund Months */}
        <div className="space-y-1.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Current Emergency Buffer</span>
            <span className="font-bold text-gray-900 dark:text-white">{emergencyMonths} Months</span>
          </div>
          <input
            type="range"
            min={0}
            max={12}
            step={1}
            value={emergencyMonths}
            onChange={(e) => setEmergencyMonths(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
          />
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>0 mo</span>
            <span>3 mo (Safe)</span>
            <span>6 mo (Ideal)</span>
          </div>
        </div>
      </div>

      {/* Emergency Fund Warning if < 3 Months */}
      {needsMoreEmergency && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Emergency Moat Priority:</strong> You currently have {emergencyMonths} month(s) of emergency buffer. Before heavy equity investing, we recommend building at least 3 to 6 months of expenses (~₹{targetEmergencyFund.toLocaleString('en-IN')}) in a safe <strong>Liquid Mutual Fund</strong>.
          </div>
        </div>
      )}

      {/* Budget Output Summary Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            Recommended Monthly Mutual Fund Budget
          </span>
          <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
            ₹{actualInvestableSurplus.toLocaleString('en-IN')} / mo
          </span>
        </div>

        {/* Suggested Split */}
        <div className="space-y-2 pt-2 border-t border-emerald-500/20">
          <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">
            Prudent Asset Allocation Split:
          </span>

          <div className="grid grid-cols-1 gap-2.5 text-xs w-full">
            <div className="p-2.5 rounded-lg bg-white/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400 block text-[10px]">
                {needsMoreEmergency ? '50% Liquid / Emergency' : '20% Safe Liquid'}
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                ₹{liquidEmergencyAllocation.toLocaleString('en-IN')}
              </span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Liquid Funds (Instant access)</span>
            </div>

            <div className="p-2.5 rounded-lg bg-white/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400 block text-[10px]">
                {needsMoreEmergency ? '30% Broad Market' : '50% Core Equity'}
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                ₹{equitySipAllocation.toLocaleString('en-IN')}
              </span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Nifty 50 Index / Flexi Cap</span>
            </div>

            <div className="p-2.5 rounded-lg bg-white/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400 block text-[10px]">
                {needsMoreEmergency ? '20% Hybrid' : '30% Dynamic Hybrid'}
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                ₹{hybridSipAllocation.toLocaleString('en-IN')}
              </span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Balanced Advantage</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
          💡 This allocation protects your day-to-day lifestyle, prepares you for sudden emergencies, and lets compounding grow your long-term wealth steadily.
        </p>
      </div>
    </div>
  );
};

