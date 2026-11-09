import React, { useState } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  HelpCircle,
  Lock
} from 'lucide-react';
import { AiChatMessage, EvalResult } from '../../types/eval';
import { EvalEngine } from '../../services/evalEngine';
import { StructuredMessageView } from './StructuredMessageView';

interface AiMitraAssistantProps {
  onOpenEvalInspector?: () => void;
  onSetLastEvalResult?: (res: EvalResult) => void;
  initialQuery?: string;
}

export const AiMitraAssistant: React.FC<AiMitraAssistantProps> = ({
  onOpenEvalInspector,
  onSetLastEvalResult
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      timestamp: 'Just now',
      content: `👋 **Welcome to Groww Mitra!** 

I am your **SEBI-Compliant Mutual Fund Education Guide**. My mission is to teach you the fundamentals of investing without finance jargon.

* **Ask anything** about personal finance budgeting, NAV charts, SIP mechanics, or the 6 sections on a fund screen.
* 🛡️ **Zero-Bias Investor Protection:** In compliance with SEBI regulations, I **cannot recommend specific funds or stocks**, and I protect you from hype or panic. Every response is verified for strict regulatory compliance and accuracy.`,
      evalResult: {
        status: 'PASSED',
        overallScore: 100,
        recommendationGatePassed: true,
        fomoUrgencyGatePassed: true,
        groundingGatePassed: true,
        financeSafetyGatePassed: true,
        checks: [
          {
            id: 'init-1',
            name: 'SEBI Non-Recommendation Gate',
            category: 'SEBI Compliance',
            passed: true,
            score: 100,
            detail: 'Purely educational greeting; zero individual scheme recommendations.',
            criterion: 'Strict non-recommendation of specific mutual fund products.'
          },
          {
            id: 'init-2',
            name: 'FOMO & Urgency Gate',
            category: 'Tone & FOMO',
            passed: true,
            score: 100,
            detail: 'Calm, transparent educational tone verified.',
            criterion: 'Prohibition of urgency or fear triggers.'
          }
        ],
        officialReference: {
          title: 'AMFI India Investor Knowledge Center',
          authority: 'AMFI',
          url: 'https://www.amfiindia.com',
          description: 'Official investor guidance standards.'
        },
        latencyMs: 12
      }
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedEvalMsgId, setExpandedEvalMsgId] = useState<string | null>(null);

  const samplePrompts = [
    'I earn ₹45k/month. How much should I allocate for mutual funds?',
    'I watched the AI Guide video on 50:30:20 budgeting. How do I start?',
    'Which specific fund should I buy right now?',
    'Explain Expense Ratio and Exit Load in simple terms',
    'Why did my fund NAV drop 2% yesterday?',
    'Can I take a loan to invest in small cap funds?',
    'Market is soaring! Should I urgently invest all my savings?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const newMsg: AiChatMessage = {
      id: userMsgId,
      sender: 'user',
      timestamp: 'Just now',
      content: text
    };

    setMessages(prev => [...prev, newMsg]);
    setInputPrompt('');
    setIsTyping(true);

    // Call EvalEngine
    const response = await EvalEngine.evaluateAndRespond(text);
    onSetLastEvalResult?.(response.evalResult);

    const assistantMsgId = `assistant-${Date.now()}`;
    const assistantMsg: AiChatMessage = {
      id: assistantMsgId,
      sender: 'assistant',
      timestamp: 'Just now',
      content: response.answer,
      evalResult: response.evalResult
    };

    setIsTyping(false);
    setMessages(prev => [...prev, assistantMsg]);
    setExpandedEvalMsgId(assistantMsgId); // auto-expand visible quality check on new response
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto p-3 sm:p-5 pb-20">
      
      {/* Top Engine Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-indigo-500/5 to-transparent border border-emerald-500/30 flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-[#00D09C] flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-gray-900 dark:text-white block">Groww Mitra (AI Guide)</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">Strictly Non-Advisory • Educational</span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          const isEvalOpen = expandedEvalMsgId === msg.id;

          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}>
              
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 px-1">
                <span>{isUser ? 'You' : 'Groww Mitra AI'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div className={`p-4 rounded-2xl max-w-[92%] sm:max-w-xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                isUser
                  ? 'bg-[#00D09C] text-black font-semibold rounded-br-none shadow-md'
                  : 'bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] text-gray-900 dark:text-gray-100 rounded-bl-none'
              }`}>
                {/* Content rendering with rich markdown formatting */}
                <StructuredMessageView content={msg.content} isUser={isUser} />

                {/* ========================================================
                    VISIBLE QUALITY CHECK / SAFE FALLBACK BADGE
                    ======================================================== */}
                {!isUser && msg.evalResult && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
                    {/* Collapsed Badge Bar */}
                    <div
                      onClick={() => setExpandedEvalMsgId(isEvalOpen ? null : msg.id)}
                      className={`cursor-pointer p-2 rounded-xl flex items-center justify-between transition-all ${
                        msg.evalResult.status === 'PASSED'
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                          : 'bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {msg.evalResult.status === 'PASSED' ? (
                          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                        )}
                        <span className="font-bold text-[11px]">
                          {msg.evalResult.status === 'PASSED'
                            ? `🛡️ SEBI Compliance & Safety Verified (100% Unbiased)`
                            : `⚠️ Investor Protection: Specific Advice Declined`}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] opacity-80">
                        <span>Details</span>
                        {isEvalOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    {/* Expanded Quality & Compliance Audit Details */}
                    {isEvalOpen && (
                      <div className="mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-2.5 text-[11px] animate-fade-in">
                        <div className="font-bold text-gray-800 dark:text-gray-200 flex items-center justify-between">
                          <span>Regulatory & Investor Safety Verifications:</span>
                          <span className="font-semibold text-[10px] text-emerald-600 dark:text-emerald-400">SEBI RIA Compliant</span>
                        </div>

                        {/* List of regulatory checks */}
                        <div className="space-y-1.5">
                          {msg.evalResult.checks.map(chk => (
                            <div key={chk.id} className="p-2 rounded bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-0.5">
                              <div className="flex justify-between font-semibold">
                                <span className="text-gray-800 dark:text-gray-200">{chk.name}</span>
                                <span className={chk.passed ? 'text-emerald-500' : 'text-amber-500'}>
                                  {chk.passed ? 'VERIFIED' : 'PROTECTED'}
                                </span>
                              </div>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400">{chk.detail}</p>
                            </div>
                          ))}
                        </div>

                        {/* Safe Guardrail Explanation if triggered */}
                        {msg.evalResult.safeFallbackExplanation && (
                          <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px]">
                            <strong>SEBI Investor Protection Rule:</strong> {msg.evalResult.safeFallbackExplanation}
                          </div>
                        )}

                        {/* Official Reference Link */}
                        <div className="flex items-center justify-between pt-1 border-t border-gray-200 dark:border-gray-800 text-[10px]">
                          <span className="text-gray-400">Official Regulatory Grounding:</span>
                          <a
                            href={msg.evalResult.officialReference.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-500 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <span>{msg.evalResult.officialReference.title}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 text-xs text-gray-400 animate-pulse">
            <Bot className="w-4 h-4 text-emerald-500 animate-spin" />
            <span>Verifying SEBI compliance & preparing your educational answer...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="py-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 px-1">
          Popular Beginner Questions:
        </span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] text-gray-700 dark:text-gray-300 hover:border-[#00D09C] hover:text-[#00D09C] text-[11px] transition-all shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            placeholder="Ask about personal finance, NAV charts, or terminologies..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isTyping}
            className="w-full pl-4 pr-12 py-3 rounded-2xl bg-white dark:bg-[#1E222B] border border-gray-200 dark:border-[#2B313E] focus:outline-none focus:border-[#00D09C] text-xs text-gray-900 dark:text-white shadow-md disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isTyping}
            className="absolute right-2 p-2 rounded-xl bg-[#00D09C] hover:bg-emerald-400 text-black font-bold disabled:opacity-40 transition-all shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};

