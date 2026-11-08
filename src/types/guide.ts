export type VisualType = 
  | 'pieChart' 
  | 'poolCoins' 
  | 'navPizza' 
  | 'lineChart' 
  | 'sixSections' 
  | 'spectrum' 
  | 'bucketLeak' 
  | 'compounding'
  | 'riskGauge'
  | 'taxBreakdown';

export interface VideoScene {
  id: string;
  timeStartSec: number;
  timeEndSec: number;
  timeLabel: string;
  headline: string;
  caption: string;
  voiceScript: string;
  visualType: VisualType;
  bulletPoints?: string[];
}

export interface GuideVideo {
  id: string;
  title: string;
  duration: string;
  totalDurationSec: number;
  category: 'Personal Finance' | 'Mutual Fund Basics' | 'Terminologies' | 'NAV Charts' | 'Fund Sections' | 'Fund Types';
  summary: string;
  thumbnailUrl: string;
  youtubeId?: string; // Curated verified embeddable YouTube ID
  youtubeUrl?: string; // Direct YouTube link fallback
  isAiGenerated: boolean;
  takeaways: string[];
  scenes: VideoScene[];
  transcript: { time: string; text: string }[];
  interactiveSectionId?: string;
}

export interface TerminologyItem {
  term: string;
  shortName?: string;
  simpleExplanation: string;
  whyItMattersForYou: string;
  realWorldAnalogy: string;
  example: string;
  category: 'Basics' | 'Costs & Taxes' | 'Performance' | 'Safety & Structure';
  aiVideoVisual: VisualType;
  aiVideoScript: string;
}

export interface FundTypeInfo {
  name: string;
  category: 'Equity' | 'Debt' | 'Hybrid' | 'Others';
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  idealTimeHorizon: string;
  sebiDefinition: string;
  whoShouldInvest: string;
  keyBenefits: string[];
  keyRisks: string[];
  exampleBenchmark: string;
}

export interface PersonalBudgetAllocation {
  monthlyIncome: number;
  monthlyExpenses: number;
  existingEmi: number;
  emergencyFundMonths: number;
  recommendedSipBudget: number;
  split: {
    liquidEmergency: number;
    balancedHybrid: number;
    broadMarketEquity: number;
  };
  reasoning: string;
}
