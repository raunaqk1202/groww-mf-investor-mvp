import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Building,
  CreditCard,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MutualFund } from '../../types/mutualFund';
import { SipOrderData } from '../../types/order';
import { FIRST_TIME_NUDGES } from '../../data/guideData';

interface SipOrderModalProps {
  fund: MutualFund;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (order: SipOrderData) => void;
  isFirstTimeInvestor: boolean;
}

export const SipOrderModal: React.FC<SipOrderModalProps> = ({
  fund,
  isOpen,
  onClose,
  onSuccess,
  isFirstTimeInvestor
}) => {
  const [step, setStep] = useState<number>(1);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(fund.minSipAmount || 1000);
  const [sipDay, setSipDay] = useState<number>(5);
  const [selectedBank, setSelectedBank] = useState({
    bankName: 'HDFC Bank Ltd',
    accountNumberMasked: '•••• 4892',
    mandateStatus: 'APPROVED' as const
  });

  if (!isOpen) return null;

  const currentNudge = FIRST_TIME_NUDGES.find(n => n.step === step);

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete Order
      const newOrder: SipOrderData = {
        fund,
        monthlyAmount,
        sipDay,
        bankAccount: selectedBank,
        step: 4,
        status: 'SUCCESS',
        orderId: `GROWW-SIP-${Math.floor(100000 + Math.random() * 900000)}`,
        firstDebitDate: `${sipDay} Dec 2026`,
        expectedAllotmentDate: `${sipDay + 2} Dec 2026`
      };

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      onSuccess(newOrder);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#121620] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden text-gray-900 dark:text-gray-100">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">Start Monthly SIP</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
              Step {step} of 4
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 flex">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 transition-all duration-300 ${
                s <= step ? 'bg-[#00D09C]' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Fund Details Capsule */}
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-gray-900 dark:text-white block line-clamp-1">{fund.name}</span>
              <span className="text-[10px] text-gray-400">{fund.category} • Direct Plan</span>
            </div>
            <span className="text-emerald-500 font-semibold">NAV: ₹{fund.currentNav}</span>
          </div>

          {/* ========================================================
              FIRST-TIME INVESTOR CALM GUIDED NUDGE (ONLY FOR FIRST TIME)
              ======================================================== */}
          {isFirstTimeInvestor && currentNudge && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 space-y-2 text-xs animate-fade-in">
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  First-Time Investor Guide • {currentNudge.stepTitle}
                </span>
                <span className="text-xs">🌱</span>
              </div>

              <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">
                {currentNudge.headline}
              </h4>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs">
                {currentNudge.calmExplanation}
              </p>

              <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-800 dark:text-emerald-300">
                {currentNudge.safetyCheck}
              </div>
            </div>
          )}

          {/* STEP 1: Amount & Date */}
          {step === 1 && (
            <div className="space-y-4 text-xs">
              {/* Monthly Amount Input */}
              <div className="space-y-2">
                <label className="font-bold text-gray-700 dark:text-gray-300 block">
                  Select Monthly SIP Installment:
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min={fund.minSipAmount}
                    step={100}
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl font-bold text-base bg-white dark:bg-[#151b26] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Preset Chips */}
                <div className="flex gap-2">
                  {[500, 1000, 2500, 5000].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setMonthlyAmount(amt)}
                      className={`px-3 py-1 rounded-lg border font-semibold transition-all ${
                        monthlyAmount === amt
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-400'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIP Date Picker */}
              <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                <label className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                  Monthly SIP Date:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 5, 10, 15, 20].map(day => (
                    <button
                      key={day}
                      onClick={() => setSipDay(day)}
                      className={`py-2 rounded-xl border text-center font-bold transition-all ${
                        sipDay === day
                          ? 'bg-[#00D09C] text-black border-emerald-500 shadow-sm'
                          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-400'
                      }`}
                    >
                      {day}th
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 italic">
                  💡 Tip: The 5th or 10th is ideal for salaried individuals to allow salary crediting.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Bank Mandate & Autopay */}
          {step === 2 && (
            <div className="space-y-4 text-xs">
              <label className="font-bold text-gray-700 dark:text-gray-300 block">
                Select Bank for NPCI e-Mandate Autopay:
              </label>

              <div className="p-3.5 rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white block">{selectedBank.bankName}</span>
                    <span className="text-[11px] text-gray-400 font-mono">{selectedBank.accountNumberMasked}</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500">
                  Mandate Active
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-2 text-[11px] text-gray-600 dark:text-gray-300">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Debit alert sent via SMS & Email 48 hours prior to debit.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>You can pause or stop this SIP with 1 click from your Dashboard anytime.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Zero penalty or lock-in fee if your account balance is low.</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SEBI Timing & NAV Allocation */}
          {step === 3 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-3">
                <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>SEBI Official Allotment Rules</span>
                </div>

                <div className="space-y-2 text-[11px] text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-gray-800">
                    <span>Order Cut-off Time:</span>
                    <strong className="text-gray-900 dark:text-white">2:00 PM (Working Days)</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-gray-800">
                    <span>Applicable NAV:</span>
                    <strong className="text-emerald-500">Same-Day Closing NAV (if before 2 PM)</strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Portfolio Unit Credit:</span>
                    <strong className="text-gray-900 dark:text-white">T+1 to T+2 Working Days</strong>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-800 dark:text-indigo-300 text-xs">
                <strong>Transparent Pricing:</strong> Unlike volatile stock buying where prices move by the second, mutual funds are priced fairly once a day after market closes at 9 PM.
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation & Order Summary */}
          {step === 4 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center font-bold">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                  Ready to Activate SIP
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Review your monthly investment details below.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-400">Monthly Amount:</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹{monthlyAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-400">Monthly SIP Date:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{sipDay}th of every month</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-400">Bank Account:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{selectedBank.bankName} ({selectedBank.accountNumberMasked})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Commission / Brokerage:</span>
                  <span className="font-bold text-emerald-500">₹0 (Zero - Direct Plan)</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Bar */}
        <div className="px-5 py-3.5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-gray-200"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleNextStep}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#00D09C] hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md active:scale-95"
          >
            <span>{step === 4 ? 'Confirm & Start SIP' : 'Continue'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

