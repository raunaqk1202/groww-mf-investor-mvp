export type FundCategory = 
  | 'Large Cap'
  | 'Mid Cap'
  | 'Small Cap'
  | 'Flexi Cap'
  | 'Index Fund'
  | 'ELSS (Tax Saver)'
  | 'Balanced Advantage'
  | 'Liquid Fund'
  | 'Corporate Bond';

export type RiskLevel = 'Low' | 'Moderately Low' | 'Moderate' | 'Moderately High' | 'High' | 'Very High';

export interface Holding {
  name: string;
  sector: string;
  percentage: number;
  icon?: string;
  creditRating?: string; // For debt instruments, e.g. AAA, SOV
}

export interface SectorAllocation {
  sector: string;
  percentage: number;
}

export interface FundManager {
  name: string;
  experienceYears: number;
  education: string;
  tenureWithFund: string;
  totalAumManagedCr: number;
  bio: string;
  otherSchemes: string[];
}

export interface FundHouse {
  name: string;
  totalAumCr: number;
  foundedYear: number;
  totalSchemes: number;
  cio: string;
  philosophy: string;
  logoText: string;
  logoBg: string;
  logoColor: string;
}

export interface NavPoint {
  date: string;
  nav: number;
  benchmarkNav: number;
}

export interface MutualFund {
  id: string;
  name: string;
  code: string;
  fundHouse: FundHouse;
  category: FundCategory;
  broadCategory: 'Equity' | 'Debt' | 'Hybrid';
  planType: 'Direct - Growth' | 'Regular - Growth';
  currentNav: number;
  navDate: string;
  oneDayReturn: number;
  aumCr: number;
  riskLevel: RiskLevel;
  crisilRating: number;
  minSipAmount: number;
  minLumpsumAmount: number;
  benchmarkIndex: string;
  
  // Section 1: Expense Ratio, Exit Load and Taxes
  expenseRatio: number; // in percentage e.g. 0.72%
  categoryAvgExpenseRatio: number;
  exitLoad: {
    percentage: number;
    periodDays: number;
    description: string;
  };
  taxation: {
    stcgRate: string; // e.g., "20% if redeemed within 1 year"
    ltcgRate: string; // e.g., "12.5% on gains exceeding ₹1.25 Lakh per FY"
    specialNotes: string;
  };

  // Section 2: Returns & Calculator Data
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
    sinceInception: number;
  };
  categoryReturns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  benchmarkReturns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  categoryRank: {
    rank: number;
    totalFunds: number;
  };

  // Section 3: Holdings
  topHoldings: Holding[];
  topSectors: SectorAllocation[];
  equityPercentage: number;
  debtPercentage: number;
  cashPercentage: number;
  totalStocksCount: number;

  // Section 5: Fund Manager
  managers: FundManager[];

  // Section 6: Investment Objective
  investmentObjective: string;
  suitableFor: string;
  navHistory: {
    '1M': NavPoint[];
    '6M': NavPoint[];
    '1Y': NavPoint[];
    '3Y': NavPoint[];
    '5Y': NavPoint[];
    'ALL': NavPoint[];
  };
}

