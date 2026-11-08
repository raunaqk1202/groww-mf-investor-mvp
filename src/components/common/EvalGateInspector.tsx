import React, { useState } from 'react';
import { X, ShieldCheck, AlertTriangle, CheckCircle, ExternalLink, Play, RotateCcw, Lock, ChevronRight } from 'lucide-react';
import { EVAL_BENCHMARK_CASES } from '../../data/evalSuite';
import { EvalEngine } from '../../services/evalEngine';
import { EvalResult } from '../../types/eval';

interface EvalGateInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  lastEvalResult?: EvalResult | null;
}

export const EvalGateInspector: React.FC<EvalGateInspectorProps> = ({
  isOpen,
  onClose,
  lastEvalResult
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'benchmark' | 'rules'>('overview');
  const [runningBenchmark, setRunningBenchmark] = useState(false);
  const [benchmarkResults, setBenchmarkResults] = useState<{
    id: string;
    passed: boolean;
    actualOutcome: string;
    score: number;
    latency: number;
  }[]>([]);

  if (!isOpen) return null;

  const runAllBenchmarks = async () => {
    setRunningBenchmark(true);
    const results = [];

    for (const testCase of EVAL_BENCHMARK_CASES) {
      const response = await EvalEngine.evaluateAndRespond(testCase.userPrompt);
      const isExpected = response.evalResult.status === testCase.expectedOutcome;
      results.push({
        id: testCase.id,
        passed: isExpected,
        actualOutcome: response.evalResult.status,
        score: response.evalResult.overallScore,
        latency: response.evalResult.latencyMs
      });
    }

    setBenchmarkResults(results);
    setRunningBenchmark(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#121620] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden text-gray-900 dark:text-gray-100">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">Eval-Gated AI Engine Inspector</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                  Active Shield
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Automated Quality Verification, Non-Recommendation Barrier & Fallback Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 px-5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2.5 px-4 border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Live Evaluation & Architecture
          </button>
          <button
            onClick={() => setActiveTab('benchmark')}
            className={`py-2.5 px-4 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'benchmark'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>Eval Benchmark Suite</span>
            <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px]">
              {EVAL_BENCHMARK_CASES.length} Tests
            </span>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-2.5 px-4 border-b-2 transition-all ${
              activeTab === 'rules'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            SEBI & AMFI Regulatory Rules
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Architecture Explanation */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Lock className="w-4 h-4" />
                  Why is this feature Eval-Gated?
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Financial AI for beginners must never operate unchecked. In compliance with SEBI regulations and our product constraints, every user query is routed through an <strong>automated evaluation pipeline</strong> before any answer is returned. If an answer violates non-recommendation rules, lacks verifiable grounding, contains FOMO urgency, or risks financial hazard, a <strong>visible safe fallback is automatically triggered</strong>.
                </p>
              </div>

              {/* 4 Active Gate Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-gray-100">Gate 1: SEBI RIA Non-Recommendation</span>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                    Strictly declines specific fund picking ("buy X fund") or stock tips. Explains category frameworks instead.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-gray-100">Gate 2: Zero FOMO & Urgency Barrier</span>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                    Detects hype phrases ("hurry", "market rally", "get rich fast") and de-escalates with calm, long-term discipline.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-gray-100">Gate 3: Personal Finance Hazard Gate</span>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                    Blocks queries about using personal loans or draining emergency survival funds for volatile investing.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-gray-100">Gate 4: AMFI Grounding & Citations</span>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                    Every fallback and educational answer cites official AMFI India or SEBI resources for verifiable truth.
                  </p>
                </div>
              </div>

              {/* Latest Live Eval Status */}
              {lastEvalResult ? (
                <div className="mt-4 p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-400">Last Live Query Evaluation Trace</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      lastEvalResult.status === 'PASSED'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {lastEvalResult.status} (Score: {lastEvalResult.overallScore}/100)
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {lastEvalResult.checks.map(check => (
                      <div key={check.id} className="flex items-start justify-between p-2 rounded bg-white/40 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-200">{check.name}</div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">{check.detail}</div>
                        </div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          check.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {check.passed ? 'PASS' : 'TRIGGERED'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {lastEvalResult.safeFallbackExplanation && (
                    <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs">
                      <strong>Safe Fallback:</strong> {lastEvalResult.safeFallbackExplanation}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                    <span>Latency: {lastEvalResult.latencyMs}ms</span>
                    <a
                      href={lastEvalResult.officialReference.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-500 hover:underline flex items-center gap-1"
                    >
                      <span>{lastEvalResult.officialReference.title}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-gray-400">
                  Ask a question in the <strong>AI Mitra</strong> tab to see the live evaluation trace here.
                </div>
              )}
            </div>
          )}

          {activeTab === 'benchmark' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">Automated Benchmark Test Suite</h4>
                  <p className="text-xs text-gray-400">
                    Runs 8 edge-case adversarial prompts to verify fallback trigger accuracy.
                  </p>
                </div>
                <button
                  onClick={runAllBenchmarks}
                  disabled={runningBenchmark}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D09C] text-black font-bold text-xs hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-md"
                >
                  {runningBenchmark ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Evaluating...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run All Tests</span>
                    </>
                  )}
                </button>
              </div>

              {/* Test Cases List */}
              <div className="space-y-2.5">
                {EVAL_BENCHMARK_CASES.map((tc, idx) => {
                  const result = benchmarkResults.find(r => r.id === tc.id);

                  return (
                    <div
                      key={tc.id}
                      className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 space-y-1.5 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                              Test #{idx + 1}
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{tc.category}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 italic mt-1">"{tc.userPrompt}"</p>
                        </div>

                        {result ? (
                          <div className="flex flex-col items-end">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              result.passed
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {result.passed ? 'VERIFIED PASS' : 'FAIL'}
                            </span>
                            <span className="text-[10px] text-gray-400 mt-0.5">{result.latency}ms</span>
                          </div>
                        ) : (
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            tc.expectedOutcome === 'PASSED'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            Expected: {tc.expectedOutcome}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        {tc.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 space-y-2">
                <h4 className="font-bold text-sm text-emerald-500">SEBI Regulatory Directives Enforced</h4>
                <ul className="list-disc pl-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>
                    <strong>SEBI (Investment Advisers) Regulations, 2013 & 2020 Amendments:</strong> Directs that product recommendation must only occur with individualized suitability profiling. Unregistered digital apps cannot recommend specific schemes.
                  </li>
                  <li>
                    <strong>AMFI Code of Conduct:</strong> Mandates transparent disclosure of risks, categorization definitions, and prohibiting guaranteed return promises.
                  </li>
                  <li>
                    <strong>Union Budget 2024 Taxation Framework:</strong> STCG on equity funds (held &lt; 1 yr) is 20%; LTCG (held &gt; 1 yr) is 12.5% on profits over ₹1.25 Lakh per financial year.
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-2">
                <h4 className="font-bold text-sm text-indigo-400">Visible Fallback Guarantees</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  When a safe fallback triggers, the AI is constrained to:
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Express explicit refusal or uncertainty for the prohibited advice.</li>
                  <li>Provide the objective educational framework for the user to evaluate independently.</li>
                  <li>Directly link to the verified official authority (AMFI India / SEBI).</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 flex items-center justify-between text-xs text-gray-400">
          <span>Engine: Antigravity EvalGuard v2.4</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

