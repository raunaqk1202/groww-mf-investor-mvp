import React, { useState } from 'react';
import { DeviceFrame } from './components/common/DeviceFrame';
import { Navbar } from './components/common/Navbar';
import { BottomNav, TabType } from './components/common/BottomNav';
import { FundsExplore } from './components/funds/FundsExplore';
import { FundDetail } from './components/funds/FundDetail';
import { InvestmentGuide } from './components/guide/InvestmentGuide';
import { AiMitraAssistant } from './components/ai/AiMitraAssistant';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { GrowwPay } from './components/pay/GrowwPay';
import { FnoExplore } from './components/fno/FnoExplore';
import { SipOrderModal } from './components/order/SipOrderModal';
import { OrderSuccessModal } from './components/order/OrderSuccessModal';
import { MutualFund } from './types/mutualFund';
import { SipOrderData } from './types/order';
import { EvalResult } from './types/eval';
import { MUTUAL_FUNDS } from './data/fundsData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);
  const [isFirstTimeInvestor, setIsFirstTimeInvestor] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [, setLastEvalResult] = useState<EvalResult | null>(null);

  // Orders state
  const [orders, setOrders] = useState<SipOrderData[]>([]);
  const [sipFundTarget, setSipFundTarget] = useState<MutualFund | null>(null);
  const [justCompletedOrder, setJustCompletedOrder] = useState<SipOrderData | null>(null);

  const handleSelectFund = (fund: MutualFund) => {
    setSelectedFund(fund);
  };

  const handleStartSip = (fund: MutualFund) => {
    setSipFundTarget(fund);
  };

  const handleOrderSuccess = (order: SipOrderData) => {
    setOrders(prev => [order, ...prev]);
    setSipFundTarget(null);
    setJustCompletedOrder(order);
  };

  const handleGoToDashboard = () => {
    setJustCompletedOrder(null);
    setSelectedFund(null);
    setActiveTab('dashboard');
  };

  return (
    <DeviceFrame
      isFirstTimeInvestor={isFirstTimeInvestor}
      setIsFirstTimeInvestor={setIsFirstTimeInvestor}
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
    >
      <div className="flex flex-col min-h-full">
        {/* Top Navbar (only when not in full FundDetail) */}
        {!selectedFund && (
          <Navbar
            onSearchClick={() => {
              setActiveTab('mutual_funds');
            }}
            onOpenGuide={() => {
              setSelectedFund(null);
              setActiveTab('guide');
            }}
            isFirstTimeInvestor={isFirstTimeInvestor}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setSelectedFund(null);
              setActiveTab(tab);
            }}
          />
        )}

        {/* Tab Content Body */}
        <div className="flex-1">
          {selectedFund ? (
            <FundDetail
              fund={selectedFund}
              onBack={() => setSelectedFund(null)}
              onStartSip={handleStartSip}
              isFirstTimeInvestor={isFirstTimeInvestor}
            />
          ) : (
            <>
              {/* Mutual Funds Explore View */}
              {(activeTab === 'explore' || activeTab === 'mutual_funds') && (
                <FundsExplore
                  mode="mutual_funds"
                  onSelectFund={handleSelectFund}
                  onOpenGuide={() => setActiveTab('guide')}
                  onOpenAiMitra={() => setActiveTab('ai')}
                  onSelectTab={(tab) => setActiveTab(tab)}
                  isFirstTimeInvestor={isFirstTimeInvestor}
                />
              )}

              {/* Stocks Explore View matching sample screenshot */}
              {activeTab === 'stocks' && (
                <FundsExplore
                  mode="stocks"
                  onSelectFund={handleSelectFund}
                  onOpenGuide={() => setActiveTab('guide')}
                  onOpenAiMitra={() => setActiveTab('ai')}
                  onSelectTab={(tab) => setActiveTab(tab)}
                  isFirstTimeInvestor={isFirstTimeInvestor}
                />
              )}

              {/* F&O Explore View matching original Groww app */}
              {activeTab === 'fno' && (
                <FnoExplore
                  onOpenMutualFunds={() => setActiveTab('mutual_funds')}
                  onOpenAiMitra={() => setActiveTab('ai')}
                  onOpenGuide={() => setActiveTab('guide')}
                  isFirstTimeInvestor={isFirstTimeInvestor}
                />
              )}

              {/* First-Time Investor Guide View */}
              {activeTab === 'guide' && (
                <InvestmentGuide
                  onStartFirstSip={() => {
                    handleSelectFund(MUTUAL_FUNDS[0]);
                  }}
                  onOpenAiMitra={() => setActiveTab('ai')}
                />
              )}

              {/* AI Mitra Assistant View */}
              {activeTab === 'ai' && (
                <AiMitraAssistant
                  onSetLastEvalResult={(res) => setLastEvalResult(res)}
                />
              )}

              {/* User Dashboard / Portfolio View */}
              {activeTab === 'dashboard' && (
                <UserDashboard
                  orders={orders}
                  onOpenGuide={() => setActiveTab('guide')}
                  onExploreFunds={() => setActiveTab('mutual_funds')}
                  isFirstTimeInvestor={isFirstTimeInvestor}
                />
              )}

              {/* Groww Pay & UPI View */}
              {activeTab === 'pay' && (
                <GrowwPay
                  onBackToMutualFunds={() => setActiveTab('mutual_funds')}
                />
              )}
            </>
          )}
        </div>

        {/* Floating "Ask AI Mitra" Copilot Button (visible on explore, stocks, guide, dashboard) */}
        {!selectedFund && activeTab !== 'ai' && (
          <div className="sticky bottom-14 right-3 flex justify-end px-3 py-1 pointer-events-none z-20">
            <button
              onClick={() => {
                setSelectedFund(null);
                setActiveTab('ai');
              }}
              className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#00D09C] to-emerald-500 text-black font-extrabold text-xs shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all border border-emerald-400/40"
              title="Ask AI Mitra: SEBI-Safe Mutual Fund Copilot"
            >
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>Ask AI Mitra</span>
            </button>
          </div>
        )}

        {/* Bottom Tab Bar (hidden when inside fund detail) */}
        {!selectedFund && (
          <BottomNav
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setSelectedFund(null);
              setActiveTab(tab);
            }}
            isFirstTimeInvestor={isFirstTimeInvestor}
            hasActiveOrders={orders.length > 0}
          />
        )}

        {/* SIP Order Modal with First-Time Nudges */}
        {sipFundTarget && (
          <SipOrderModal
            fund={sipFundTarget}
            isOpen={true}
            onClose={() => setSipFundTarget(null)}
            onSuccess={handleOrderSuccess}
            isFirstTimeInvestor={isFirstTimeInvestor}
          />
        )}

        {/* Post-Order Celebration & Confirmation */}
        {justCompletedOrder && (
          <OrderSuccessModal
            order={justCompletedOrder}
            isOpen={true}
            onClose={() => setJustCompletedOrder(null)}
            onGoToDashboard={handleGoToDashboard}
            isFirstTimeInvestor={isFirstTimeInvestor}
          />
        )}
      </div>
    </DeviceFrame>
  );
};

export default App;

