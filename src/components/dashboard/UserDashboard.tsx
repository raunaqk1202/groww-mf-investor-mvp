import React from 'react';
import { 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  TrendingUp, 
  AlertCircle,
  PauseCircle,
  PlayCircle
} from 'lucide-react';
import { SipOrderData } from '../../types/order';

interface UserDashboardProps {
  orders: SipOrderData[];
  onOpenGuide: () => void;
  onExploreFunds: () => void;
  isFirstTimeInvestor: boolean;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  orders,
  onOpenGuide,
  onExploreFunds,
  isFirstTimeInvestor
}) => {
  const totalMonthlyCommitment = orders.reduce((sum, o) => sum + o.monthlyAmount, 0);

  return (
    <div className="p-4 sm:p-5 space-y-5 max-w-4xl mx-auto pb-24">
      
      {/* Portfolio Overview Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#1A1D24] via-[#1E222B] to-[#121212] text-white border border-[#2B313E] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">My Mutual Funds Portfolio</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#00D09C]/15 text-[#00D09C] border border-[#00D09C]/30">
            Direct & Zero Commission
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {orders.length > 0 ? `₹${(totalMonthlyCommitment * 1.05).toFixed(0)}` : '₹0.00'}
            </span>
            <span className="text-xs text-gray-400 block mt-1">
              {orders.length > 0 ? 'Total Portfolio Current Value' : 'Start your first SIP to begin compounding'}
            </span>
          </div>

          {orders.length > 0 && (
            <div className="text-right">
              <span className="text-xs font-bold text-[#00D09C] flex items-center justify-end gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+0.5% (T+1 Allotted)</span>
              </span>
              <span className="text-[10px] text-gray-400">Total Returns</span>
            </div>
          )}
        </div>

        {/* Monthly SIP Commitment Pill */}
        <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-300">
          <span>Active Monthly SIPs: <strong>{orders.length}</strong></span>
          <span>Monthly Commitment: <strong>₹{totalMonthlyCommitment.toLocaleString('en-IN')}/mo</strong></span>
        </div>
      </div>

      {/* Active SIPs Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Active SIP Mandates</h3>
          <span className="text-xs text-gray-400">{orders.length} Active</span>
        </div>

        {orders.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center font-bold">
              🌱
            </div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">No Active SIPs Yet</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed w-full">
              You haven't activated any mutual fund SIPs yet. Complete our video lessons or browse our unbiased fund catalog.
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={onOpenGuide}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Watch Guide
              </button>
              <button
                onClick={onExploreFunds}
                className="px-4 py-2 rounded-xl bg-[#00D09C] text-black text-xs font-bold hover:bg-emerald-400 transition-colors shadow-sm"
              >
                Explore Mutual Funds
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((ord, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] space-y-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-500 uppercase">
                      {ord.fund.category} • Direct Plan
                    </span>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">
                      {ord.fund.name}
                    </h4>
                  </div>
                  <span className="text-xs font-extrabold text-gray-900 dark:text-white whitespace-nowrap">
                    ₹{ord.monthlyAmount.toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="text-[10px] block">Debit Date:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{ord.sipDay}th of each month</span>
                  </div>
                  <div>
                    <span className="text-[10px] block">Next Scheduled Debit:</span>
                    <span className="font-semibold text-emerald-500">{ord.firstDebitDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400">
                  <span className="font-mono">Order: {ord.orderId}</span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    NPCI e-Mandate Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* First-Timer Investor Education Moat Card */}
      {isFirstTimeInvestor && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 space-y-2 text-xs">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="font-bold flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Your Investor Journey
            </span>
            <span className="text-[10px] font-mono bg-emerald-500/15 px-2 py-0.5 rounded-full">
              Beginner Milestone #1
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[11px]">
            Investing is 90% discipline and 10% patience. Markets will have ups and downs; your scheduled SIP guarantees that you buy more units at lower prices automatically.
          </p>
        </div>
      )}

    </div>
  );
};

