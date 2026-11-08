import React from 'react';
import { CheckCircle2, Calendar, Clock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { SipOrderData } from '../../types/order';

interface OrderSuccessModalProps {
  order: SipOrderData | null;
  isOpen?: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
  isFirstTimeInvestor: boolean;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen = true,
  onClose,
  onGoToDashboard,
  isFirstTimeInvestor
}) => {
  if (!order || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#121620] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 text-center space-y-5 text-gray-900 dark:text-gray-100">
        
        {/* Animated Celebration Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-full bg-emerald-500/20 text-[#00D09C] flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 animate-scale-in" />
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-ping"></div>
        </div>

        {/* Headline */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIP Activated Successfully!</span>
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
            ₹{order.monthlyAmount.toLocaleString('en-IN')}/Month Scheduled
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {order.fund.name}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-xs text-left space-y-2.5">
          <div className="flex justify-between">
            <span className="text-gray-400">Order ID:</span>
            <span className="font-mono font-bold text-gray-800 dark:text-gray-200">{order.orderId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Monthly SIP Date:</span>
            <span className="font-bold text-gray-800 dark:text-gray-200">{order.sipDay}th of every month</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">First Debit Date:</span>
            <span className="font-bold text-emerald-500">{order.firstDebitDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Expected Unit Allotment:</span>
            <span className="font-bold text-gray-800 dark:text-gray-200">{order.expectedAllotmentDate} (T+2 Days)</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="text-left space-y-2 pt-1">
          <span className="text-[11px] font-bold text-gray-400 block uppercase">Settlement Timeline:</span>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-500 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>1. Order submitted to AMC (Instant)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></span>
              <span>2. NAV unit pricing allocated (Today 9:00 PM)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></span>
              <span>3. Units reflected in portfolio (T+2 business days)</span>
            </div>
          </div>
        </div>

        {/* Reassurance Note */}
        {isFirstTimeInvestor && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 text-left space-y-1">
            <strong>🌱 Calm Investing Mindset:</strong>
            <p className="leading-relaxed text-[11px]">
              You have taken your first step in wealth creation. The market fluctuates naturally; do not stress over daily NAV changes. Your automated monthly SIP will steadily compound.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={onGoToDashboard}
            className="w-full py-3 rounded-xl bg-[#00D09C] hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>View in My Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs font-semibold"
          >
            Explore More Schemes
          </button>
        </div>

      </div>
    </div>
  );
};
