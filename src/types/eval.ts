export interface QualityCheckItem {
  id: string;
  name: string;
  category: 'SEBI Compliance' | 'Tone & FOMO' | 'Grounding' | 'Personal Finance Safety';
  passed: boolean;
  score: number; // 0 - 100
  detail: string;
  criterion: string;
}

export type FallbackReason = 
  | 'SPECIFIC_FUND_RECOMMENDATION_PROHIBITED'
  | 'STOCK_TIP_PROHIBITED'
  | 'FOMO_OR_URGENCY_DETECTED'
  | 'HIGH_RISK_FINANCIAL_HAZARD'
  | 'INSUFFICIENT_INFORMATION_UNCERTAINTY'
  | 'OUT_OF_SCOPE_TAX_EVASION';

export interface EvalResult {
  status: 'PASSED' | 'FALLBACK_TRIGGERED' | 'UNCERTAINTY_EXPRESSED';
  overallScore: number; // 0 - 100
  recommendationGatePassed: boolean;
  fomoUrgencyGatePassed: boolean;
  groundingGatePassed: boolean;
  financeSafetyGatePassed: boolean;
  checks: QualityCheckItem[];
  fallbackReason?: FallbackReason;
  safeFallbackExplanation?: string;
  officialReference: {
    title: string;
    authority: 'AMFI' | 'SEBI' | 'Income Tax Dept' | 'RBI';
    url: string;
    description: string;
  };
  latencyMs: number;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  evalResult?: EvalResult;
  isEvaluating?: boolean;
}

export interface EvalBenchmarkCase {
  id: string;
  userPrompt: string;
  category: 'Adversarial Recommendation' | 'FOMO Query' | 'Personal Finance Allocation' | 'Jargon & NAV' | 'Safe Educational';
  expectedOutcome: 'PASSED' | 'FALLBACK_TRIGGERED';
  expectedFallbackReason?: FallbackReason;
  description: string;
}

