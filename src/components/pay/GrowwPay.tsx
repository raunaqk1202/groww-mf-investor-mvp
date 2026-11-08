import React, { useState } from 'react';
import { 
  QrCode, 
  Send, 
  Building2, 
  Zap, 
  Smartphone, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface GrowwPayProps {
  onBackToMutualFunds: () => void;
}

export const GrowwPay: React.FC<GrowwPayProps> = ({ onBackToMutualFunds }) => {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [transferSuccess, setTransferSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setAmount('');
      setUpiId('');
    }, 3000);
  };

  return (
    <div className="p-4 sm:p-5 space-y-4 max-w-lg mx-auto pb-24 text-gray-900 dark:text-gray-100 animate-fade-in">
      
      {/* Groww Pay Header Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#00D09C]/15 via-emerald-500/10 to-transparent border border-[#00D09C]/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">⚡</span>
            <span className="text-xs font-bold text-[#00D09C] uppercase tracking-wider">
              Groww UPI & Pay
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#00D09C] font-semibold border border-emerald-500/30">
            Zero Charges
          </span>
        </div>
        <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
          Instant Bank-to-Bank Payments
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          Powered by NPCI UPI 2.0 with instant auto-mandates for Mutual Fund SIPs.
        </p>
      </div>

      {/* Quick Pay Action Tiles */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] shadow-xs flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#00D09C] flex items-center justify-center mb-1.5">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="font-bold text-[11px] text-gray-800 dark:text-gray-200">Scan QR</span>
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] shadow-xs flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-1.5">
            <Send className="w-5 h-5" />
          </div>
          <span className="font-bold text-[11px] text-gray-800 dark:text-gray-200">Pay UPI</span>
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] shadow-xs flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-1.5">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-[11px] text-gray-800 dark:text-gray-200">To Bank</span>
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-100 dark:border-[#2B313E] shadow-xs flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-1.5">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-bold text-[11px] text-gray-800 dark:text-gray-200">Self Pay</span>
        </div>
      </div>

      {/* Instant Transfer Demo Form */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] shadow-xs space-y-3">
        <h4 className="font-bold text-sm text-gray-900 dark:text-white">
          Simulate a UPI Payment or SIP Top-up
        </h4>

        {transferSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 animate-scale-in">
            <CheckCircle2 className="w-8 h-8 text-[#00D09C] mx-auto animate-bounce" />
            <h5 className="font-extrabold text-sm text-[#00D09C]">₹{amount} Paid Successfully!</h5>
            <p className="text-xs text-gray-500">Transaction ID: UPI-{Math.floor(1000000 + Math.random() * 9000000)}</p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-gray-400 block mb-1">UPI ID or Mobile Number</label>
              <input
                type="text"
                placeholder="e.g. 9876543210@okaxis or groww@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2B313E] text-gray-900 dark:text-white focus:outline-none focus:border-[#00D09C]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-gray-400 block mb-1">Amount (₹)</label>
              <input
                type="number"
                placeholder="Enter amount (e.g. 500, 1000)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2B313E] text-gray-900 dark:text-white focus:outline-none focus:border-[#00D09C]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#00D09C] hover:bg-emerald-400 text-black font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all active:scale-95"
            >
              Pay Securely with UPI
            </button>
          </form>
        )}
      </div>

      {/* Return to Mutual Funds Shortcut */}
      <div className="pt-2 text-center">
        <button
          onClick={onBackToMutualFunds}
          className="text-xs text-[#00D09C] hover:underline font-bold inline-flex items-center gap-1"
        >
          <span>Return to Mutual Funds Explore</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

