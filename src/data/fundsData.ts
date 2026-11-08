import { MutualFund, NavPoint } from '../types/mutualFund';

// Helper to generate high-density, realistic NAV history curves matching authentic Groww charts
const generateRealisticSeries = (
  count: number,
  startNav: number,
  endNav: number,
  benchmarkStartNav: number,
  benchmarkEndNav: number,
  dateGenerator: (idx: number, total: number) => string,
  volatility: number = 0.02
): NavPoint[] => {
  const points: NavPoint[] = [];

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    
    // Natural non-linear market trajectory with multiple harmonic frequencies
    const cycle1 = Math.sin(t * Math.PI * 3.5) * volatility * 1.4;
    const cycle2 = Math.cos(t * Math.PI * 7.2) * (volatility * 0.7);
    const cycle3 = Math.sin(t * Math.PI * 14.0) * (volatility * 0.35);
    
    // Realistic market consolidation and dip around 30%-45% of horizon
    const marketDip = (t > 0.30 && t < 0.48) 
      ? -Math.sin(((t - 0.30) / 0.18) * Math.PI) * (volatility * 2.2) 
      : 0;

    // Compounding curve from startNav to endNav
    const trendFraction = Math.pow(t, 1.15); // gentle exponential slope
    const rawNav = startNav + (endNav - startNav) * trendFraction;
    const finalNav = +(rawNav * (1 + cycle1 + cycle2 + cycle3 + marketDip)).toFixed(2);

    // Benchmark tracking index
    const bmkTrendFraction = Math.pow(t, 1.08);
    const bmkCycle = Math.sin(t * Math.PI * 3.2 + 0.3) * (volatility * 1.1) + Math.cos(t * Math.PI * 6.5) * (volatility * 0.5);
    const rawBmk = benchmarkStartNav + (benchmarkEndNav - benchmarkStartNav) * bmkTrendFraction;
    const finalBmk = +(rawBmk * (1 + bmkCycle + marketDip * 0.9)).toFixed(2);

    // Force endpoints to exactly match
    const adjustedNav = (i === 0) ? startNav : (i === count - 1) ? endNav : finalNav;
    const adjustedBmk = (i === 0) ? benchmarkStartNav : (i === count - 1) ? benchmarkEndNav : finalBmk;

    points.push({
      date: dateGenerator(i, count),
      nav: +adjustedNav.toFixed(2),
      benchmarkNav: +adjustedBmk.toFixed(2)
    });
  }

  return points;
};

// Ordinal date formatter helper (e.g. 5th Feb 2021 matching user reference image)
const getOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Helper to generate realistic NAV history curves for all timeframes
const generateNavHistory = (baseNav: number, cagr1Y: number, cagr3Y: number, cagr5Y: number) => {
  // 1 Month: 30 daily trading points (Oct 8 to Nov 7, 2026)
  const points1M = generateRealisticSeries(
    30,
    +(baseNav * 0.975).toFixed(2),
    baseNav,
    +(baseNav * 0.98).toFixed(2),
    baseNav,
    (i) => {
      const d = new Date(2026, 9, 8); // Oct 8
      d.setDate(d.getDate() + Math.floor(i * (30 / 30)));
      return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} 2026`;
    },
    0.012
  );

  // 6 Months: 45 points (May 7 to Nov 7, 2026)
  const points6M = generateRealisticSeries(
    45,
    +(baseNav * 0.915).toFixed(2),
    baseNav,
    +(baseNav * 0.925).toFixed(2),
    baseNav,
    (i) => {
      const d = new Date(2026, 4, 7); // May 7
      d.setDate(d.getDate() + Math.floor(i * (184 / 45)));
      return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} 2026`;
    },
    0.02
  );

  // 1 Year: 52 weekly points (Nov 7, 2025 to Nov 7, 2026)
  const nav1YAgo = +(baseNav / (1 + cagr1Y / 100)).toFixed(2);
  const bmk1YAgo = +(baseNav / (1 + (cagr1Y - 1.5) / 100)).toFixed(2);
  const points1Y = generateRealisticSeries(
    52,
    nav1YAgo,
    baseNav,
    bmk1YAgo,
    baseNav,
    (i) => {
      const d = new Date(2025, 10, 7); // Nov 7, 2025
      d.setDate(d.getDate() + i * 7);
      return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    },
    0.028
  );

  // 3 Years: 60 points (Nov 7, 2023 to Nov 7, 2026)
  const nav3YAgo = +(baseNav / Math.pow(1 + cagr3Y / 100, 3)).toFixed(2);
  const bmk3YAgo = +(baseNav / Math.pow(1 + (cagr3Y - 2.0) / 100, 3)).toFixed(2);
  const points3Y = generateRealisticSeries(
    60,
    nav3YAgo,
    baseNav,
    bmk3YAgo,
    baseNav,
    (i) => {
      const d = new Date(2023, 10, 7);
      d.setDate(d.getDate() + Math.floor(i * (1095 / 60)));
      return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    },
    0.035
  );

  // 5 Years: 60 points (Nov 7, 2021 to Nov 7, 2026) - includes exact date formats like 5th Feb 2021
  const nav5YAgo = +(baseNav / Math.pow(1 + cagr5Y / 100, 5)).toFixed(2);
  const bmk5YAgo = +(baseNav / Math.pow(1 + (cagr5Y - 2.8) / 100, 5)).toFixed(2);
  const points5Y = generateRealisticSeries(
    60,
    nav5YAgo,
    baseNav,
    bmk5YAgo,
    baseNav,
    (i) => {
      const d = new Date(2021, 10, 7);
      d.setDate(d.getDate() + Math.floor(i * (1825 / 60)));
      return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    },
    0.042
  );

  // ALL: 70 points (Jan 2018 to Nov 2026)
  const navAllAgo = +(baseNav / Math.pow(1 + (cagr5Y - 1.0) / 100, 8.8)).toFixed(2);
  const bmkAllAgo = +(baseNav / Math.pow(1 + (cagr5Y - 3.5) / 100, 8.8)).toFixed(2);
  const pointsALL = generateRealisticSeries(
    70,
    navAllAgo,
    baseNav,
    bmkAllAgo,
    baseNav,
    (i) => {
      const d = new Date(2018, 0, 15);
      d.setDate(d.getDate() + Math.floor(i * (3218 / 70)));
      return `${getOrdinal(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    },
    0.048
  );

  return {
    '1M': points1M,
    '6M': points6M,
    '1Y': points1Y,
    '3Y': points3Y,
    '5Y': points5Y,
    'ALL': pointsALL
  };
};

export const MUTUAL_FUNDS: MutualFund[] = [
  {
    id: 'uti-nifty-50-index-fund',
    name: 'UTI Nifty 50 Index Fund Direct - Growth',
    code: '120716',
    fundHouse: {
      name: 'UTI Mutual Fund',
      totalAumCr: 320000,
      foundedYear: 2003,
      totalSchemes: 94,
      cio: 'Vetri Subramaniam',
      philosophy: 'Disciplined passive replication of the Nifty 50 Total Returns Index with minimal tracking error and cost efficiency.',
      logoText: 'UTI',
      logoBg: '#FF6B00',
      logoColor: '#FFFFFF'
    },
    category: 'Index Fund',
    broadCategory: 'Equity',
    planType: 'Direct - Growth',
    currentNav: 172.48,
    navDate: '07 Nov 2026',
    oneDayReturn: 0.38,
    aumCr: 19850,
    riskLevel: 'Very High',
    crisilRating: 5,
    minSipAmount: 500,
    minLumpsumAmount: 1000,
    benchmarkIndex: 'NIFTY 50 Total Return Index',

    // Section 1: Expense Ratio, Exit Load and Taxes
    expenseRatio: 0.18,
    categoryAvgExpenseRatio: 0.35,
    exitLoad: {
      percentage: 0,
      periodDays: 0,
      description: 'Nil exit load. You can withdraw your money anytime without any penalty fee.'
    },
    taxation: {
      stcgRate: '20% on capital gains if redeemed within 12 months',
      ltcgRate: '12.5% on capital gains above ₹1.25 Lakh per financial year if held > 12 months',
      specialNotes: 'As an equity index fund, gains qualify under Equity Capital Gains tax as amended in Union Budget 2024.'
    },

    // Section 2: Returns & Calculator Data
    returns: {
      oneYear: 18.4,
      threeYear: 15.2,
      fiveYear: 16.1,
      sinceInception: 14.8
    },
    categoryReturns: {
      oneYear: 17.8,
      threeYear: 14.6,
      fiveYear: 15.3
    },
    benchmarkReturns: {
      oneYear: 18.5,
      threeYear: 15.3,
      fiveYear: 16.3
    },
    categoryRank: {
      rank: 2,
      totalFunds: 24
    },

    // Section 3: Holdings
    equityPercentage: 99.8,
    debtPercentage: 0,
    cashPercentage: 0.2,
    totalStocksCount: 50,
    topHoldings: [
      { name: 'HDFC Bank Ltd', sector: 'Financial Services', percentage: 11.2 },
      { name: 'Reliance Industries Ltd', sector: 'Oil & Gas', percentage: 9.8 },
      { name: 'ICICI Bank Ltd', sector: 'Financial Services', percentage: 7.9 },
      { name: 'Infosys Ltd', sector: 'Information Technology', percentage: 5.6 },
      { name: 'Tata Consultancy Services Ltd', sector: 'Information Technology', percentage: 4.1 },
      { name: 'Bharti Airtel Ltd', sector: 'Telecommunication', percentage: 3.9 },
      { name: 'ITC Ltd', sector: 'Fast Moving Consumer Goods', percentage: 3.7 },
      { name: 'Larsen & Toubro Ltd', sector: 'Construction', percentage: 3.5 }
    ],
    topSectors: [
      { sector: 'Financial Services', percentage: 32.4 },
      { sector: 'Information Technology', percentage: 13.8 },
      { sector: 'Oil, Gas & Consumables', percentage: 11.2 },
      { sector: 'FMCG', percentage: 8.5 },
      { sector: 'Automobile and Auto Components', percentage: 7.1 }
    ],

    // Section 5: Fund Manager
    managers: [
      {
        name: 'Sharwan Kumar Goyal',
        experienceYears: 18,
        education: 'CFA, MMS (Finance)',
        tenureWithFund: '6 Years',
        totalAumManagedCr: 38500,
        bio: 'Over 18 years in passive portfolio management and ETF structuring. Head of Passive Funds at UTI AMC.',
        otherSchemes: ['UTI Nifty Next 50 ETF', 'UTI S&P BSE Sensex Index Fund']
      }
    ],

    // Section 6: Investment Objective
    investmentObjective: 'The scheme seeks to replicate the NIFTY 50 Index by investing in securities of companies comprising the NIFTY 50 Index in the same proportion as in the Index with minimal tracking error.',
    suitableFor: 'First-time investors seeking predictable market returns matching India’s top 50 bluechip companies with ultra-low expense ratio and zero exit load.',
    navHistory: generateNavHistory(172.48, 18.4, 15.2, 16.1)
  },
  {
    id: 'parag-parikh-flexi-cap-fund',
    name: 'Parag Parikh Flexi Cap Fund Direct - Growth',
    code: '122639',
    fundHouse: {
      name: 'PPFAS Mutual Fund',
      totalAumCr: 88000,
      foundedYear: 2013,
      totalSchemes: 6,
      cio: 'Rajeev Thakkar',
      philosophy: 'Long-term value investing with skin in the game. Concentrated portfolio of high-moat businesses held across market caps with cash cushions during high valuations.',
      logoText: 'PPFAS',
      logoBg: '#7A1C30',
      logoColor: '#FFFFFF'
    },
    category: 'Flexi Cap',
    broadCategory: 'Equity',
    planType: 'Direct - Growth',
    currentNav: 82.14,
    navDate: '07 Nov 2026',
    oneDayReturn: -0.12,
    aumCr: 76500,
    riskLevel: 'Very High',
    crisilRating: 5,
    minSipAmount: 1000,
    minLumpsumAmount: 1000,
    benchmarkIndex: 'NIFTY 500 Total Return Index',

    // Section 1: Expense Ratio, Exit Load and Taxes
    expenseRatio: 0.62,
    categoryAvgExpenseRatio: 0.94,
    exitLoad: {
      percentage: 2.0,
      periodDays: 365,
      description: '2% if redeemed within 365 days; 1% if redeemed between 366 and 730 days; Nil after 2 years.'
    },
    taxation: {
      stcgRate: '20% on capital gains if redeemed within 12 months',
      ltcgRate: '12.5% on capital gains above ₹1.25 Lakh per financial year if held > 12 months',
      specialNotes: 'Maintains minimum 65% domestic equity exposure to preserve equity taxation benefits under SEBI regulations.'
    },

    // Section 2: Returns & Calculator Data
    returns: {
      oneYear: 22.1,
      threeYear: 19.8,
      fiveYear: 21.4,
      sinceInception: 19.6
    },
    categoryReturns: {
      oneYear: 19.2,
      threeYear: 16.5,
      fiveYear: 17.8
    },
    benchmarkReturns: {
      oneYear: 20.4,
      threeYear: 17.2,
      fiveYear: 18.1
    },
    categoryRank: {
      rank: 1,
      totalFunds: 38
    },

    // Section 3: Holdings
    equityPercentage: 78.5,
    debtPercentage: 6.2,
    cashPercentage: 15.3,
    totalStocksCount: 38,
    topHoldings: [
      { name: 'HDFC Bank Ltd', sector: 'Financial Services', percentage: 8.4 },
      { name: 'Bajaj Holdings & Investment Ltd', sector: 'Financial Services', percentage: 7.1 },
      { name: 'Power Grid Corporation of India', sector: 'Utilities', percentage: 6.5 },
      { name: 'ITC Ltd', sector: 'FMCG', percentage: 6.2 },
      { name: 'Coal India Ltd', sector: 'Metals & Mining', percentage: 5.7 },
      { name: 'Alphabet Inc (Google)', sector: 'Global Tech', percentage: 4.8 },
      { name: 'Microsoft Corporation', sector: 'Global Tech', percentage: 4.2 }
    ],
    topSectors: [
      { sector: 'Financial Services', percentage: 24.8 },
      { sector: 'Technology & Internet', percentage: 18.2 },
      { sector: 'Energy & Utilities', percentage: 14.5 },
      { sector: 'FMCG', percentage: 10.1 },
      { sector: 'Automobile', percentage: 6.8 }
    ],

    // Section 5: Fund Manager
    managers: [
      {
        name: 'Rajeev Thakkar',
        experienceYears: 24,
        education: 'Chartered Accountant, CFA, Grad. CWA',
        tenureWithFund: '11 Years (Since Inception)',
        totalAumManagedCr: 76500,
        bio: 'Pioneered value investing at PPFAS AMC. Known for patient capital allocation, cash management in euphoric markets, and global diversification.',
        otherSchemes: ['Parag Parikh Tax Saver Fund', 'Parag Parikh Dynamic Asset Allocation Fund']
      }
    ],

    // Section 6: Investment Objective
    investmentObjective: 'To generate long-term capital growth from an actively managed portfolio predominantly invested in equity and equity related securities of companies across large cap, mid cap, and small cap categories.',
    suitableFor: 'Investors seeking disciplined, multi-cap equity exposure with a minimum 5-year horizon, comfortable with an exit load structure designed to deter short-term speculation.',
    navHistory: generateNavHistory(82.14, 22.1, 19.8, 21.4)
  },
  {
    id: 'hdfc-balanced-advantage-fund',
    name: 'HDFC Balanced Advantage Fund Direct - Growth',
    code: '118989',
    fundHouse: {
      name: 'HDFC Mutual Fund',
      totalAumCr: 680000,
      foundedYear: 1999,
      totalSchemes: 120,
      cio: 'Chirag Setalvad',
      philosophy: 'Dynamic asset allocation between equity and fixed income based on valuation metrics to reduce downside drawdown while participating in market growth.',
      logoText: 'HDFC',
      logoBg: '#004C8F',
      logoColor: '#FFFFFF'
    },
    category: 'Balanced Advantage',
    broadCategory: 'Hybrid',
    planType: 'Direct - Growth',
    currentNav: 492.35,
    navDate: '07 Nov 2026',
    oneDayReturn: 0.15,
    aumCr: 89400,
    riskLevel: 'Very High',
    crisilRating: 4,
    minSipAmount: 500,
    minLumpsumAmount: 1000,
    benchmarkIndex: 'NIFTY 50 Hybrid Composite Debt 50:50 Index',

    // Section 1: Expense Ratio, Exit Load and Taxes
    expenseRatio: 0.74,
    categoryAvgExpenseRatio: 0.92,
    exitLoad: {
      percentage: 1.0,
      periodDays: 365,
      description: 'Up to 15% of units can be redeemed without exit load within 1 year. For excess units, 1% if redeemed within 1 year; Nil thereafter.'
    },
    taxation: {
      stcgRate: '20% on capital gains if redeemed within 12 months',
      ltcgRate: '12.5% on capital gains above ₹1.25 Lakh per financial year if held > 12 months',
      specialNotes: 'Maintains gross equity + arbitrage exposure > 65% to qualify for equity capital gains tax rates.'
    },

    // Section 2: Returns & Calculator Data
    returns: {
      oneYear: 17.6,
      threeYear: 16.4,
      fiveYear: 16.8,
      sinceInception: 16.1
    },
    categoryReturns: {
      oneYear: 15.8,
      threeYear: 14.1,
      fiveYear: 14.5
    },
    benchmarkReturns: {
      oneYear: 14.9,
      threeYear: 13.2,
      fiveYear: 13.8
    },
    categoryRank: {
      rank: 3,
      totalFunds: 31
    },

    // Section 3: Holdings
    equityPercentage: 54.2,
    debtPercentage: 28.6,
    cashPercentage: 17.2,
    totalStocksCount: 65,
    topHoldings: [
      { name: 'ICICI Bank Ltd', sector: 'Financial Services', percentage: 5.8 },
      { name: 'HDFC Bank Ltd', sector: 'Financial Services', percentage: 5.4 },
      { name: 'GOI 7.18% 2033 (Sovereign)', sector: 'Government Securities', percentage: 5.1, creditRating: 'SOV' },
      { name: 'State Bank of India', sector: 'Financial Services', percentage: 4.2 },
      { name: 'Infosys Ltd', sector: 'Information Technology', percentage: 3.9 },
      { name: 'REC Ltd AAA Bond', sector: 'Corporate Debt', percentage: 3.2, creditRating: 'AAA' }
    ],
    topSectors: [
      { sector: 'Financial Services', percentage: 22.1 },
      { sector: 'Government Securities (Debt)', percentage: 18.5 },
      { sector: 'Energy & Power', percentage: 9.4 },
      { sector: 'Corporate Bonds (AAA)', percentage: 8.8 },
      { sector: 'Technology', percentage: 7.2 }
    ],

    // Section 5: Fund Manager
    managers: [
      {
        name: 'Gopal Agrawal',
        experienceYears: 20,
        education: 'B.E., MBM (Finance)',
        tenureWithFund: '4 Years',
        totalAumManagedCr: 89400,
        bio: 'Senior fund manager specializing in asset allocation models and multi-asset macroeconomic cycle analysis.',
        otherSchemes: ['HDFC Multi-Asset Fund', 'HDFC Capital Builder Value Fund']
      }
    ],

    // Section 6: Investment Objective
    investmentObjective: 'To provide long-term capital appreciation along with income from a dynamically managed portfolio of equity and debt instruments based on proprietary market indicators.',
    suitableFor: 'New or moderate-risk investors who want equity growth with cushioned downside volatility through automatic debt rebalancing.',
    navHistory: generateNavHistory(492.35, 17.6, 16.4, 16.8)
  },
  {
    id: 'sbi-liquid-fund',
    name: 'SBI Liquid Fund Direct - Growth',
    code: '119792',
    fundHouse: {
      name: 'SBI Mutual Fund',
      totalAumCr: 950000,
      foundedYear: 1987,
      totalSchemes: 156,
      cio: 'R. Srinivasan',
      philosophy: 'Safety, liquidity, and stability first. Ultra-short money market instruments with pristine sovereign and AAA credit ratings.',
      logoText: 'SBI',
      logoBg: '#002E6E',
      logoColor: '#FFFFFF'
    },
    category: 'Liquid Fund',
    broadCategory: 'Debt',
    planType: 'Direct - Growth',
    currentNav: 3845.20,
    navDate: '07 Nov 2026',
    oneDayReturn: 0.02,
    aumCr: 72100,
    riskLevel: 'Low',
    crisilRating: 5,
    minSipAmount: 500,
    minLumpsumAmount: 500,
    benchmarkIndex: 'CRISIL Liquid Debt Index',

    // Section 1: Expense Ratio, Exit Load and Taxes
    expenseRatio: 0.17,
    categoryAvgExpenseRatio: 0.22,
    exitLoad: {
      percentage: 0.0070,
      periodDays: 7,
      description: 'Graded exit load for first 6 days only (Day 1: 0.0070%, Day 2: 0.0065%, Day 6: 0.0045%). Nil from Day 7 onwards.'
    },
    taxation: {
      stcgRate: 'Taxed at investor’s applicable marginal income tax slab rate',
      ltcgRate: 'Taxed at investor’s applicable marginal income tax slab rate (Debt taxation rule)',
      specialNotes: 'Ideal for parking emergency funds (3-6 months expenses) instead of traditional savings accounts.'
    },

    // Section 2: Returns & Calculator Data
    returns: {
      oneYear: 7.2,
      threeYear: 6.8,
      fiveYear: 5.9,
      sinceInception: 7.1
    },
    categoryReturns: {
      oneYear: 7.0,
      threeYear: 6.5,
      fiveYear: 5.7
    },
    benchmarkReturns: {
      oneYear: 7.1,
      threeYear: 6.7,
      fiveYear: 5.8
    },
    categoryRank: {
      rank: 1,
      totalFunds: 42
    },

    // Section 3: Holdings
    equityPercentage: 0,
    debtPercentage: 88.4,
    cashPercentage: 11.6,
    totalStocksCount: 0,
    topHoldings: [
      { name: '182 Days Treasury Bill 2026 (GOI)', sector: 'Sovereign Debt', percentage: 14.8, creditRating: 'SOV' },
      { name: '91 Days Treasury Bill 2026 (GOI)', sector: 'Sovereign Debt', percentage: 12.5, creditRating: 'SOV' },
      { name: 'HDFC Bank Commercial Paper', sector: 'Financial Services', percentage: 8.2, creditRating: 'A1+' },
      { name: 'NABARD Certificate of Deposit', sector: 'Quasi-Sovereign', percentage: 7.6, creditRating: 'A1+' },
      { name: 'Reliance Industries CP', sector: 'Oil & Telecom', percentage: 6.1, creditRating: 'A1+' }
    ],
    topSectors: [
      { sector: 'Government Treasury Bills (Sovereign)', percentage: 48.2 },
      { sector: 'Certificates of Deposit (A1+)', percentage: 28.4 },
      { sector: 'Commercial Papers (A1+)', percentage: 18.2 },
      { sector: 'Repo & Cash Collateral', percentage: 5.2 }
    ],

    // Section 5: Fund Manager
    managers: [
      {
        name: 'R. Arun',
        experienceYears: 16,
        education: 'B.Com, PGDM (Finance)',
        tenureWithFund: '7 Years',
        totalAumManagedCr: 72100,
        bio: 'Specialist in fixed income liquidity management and money market operations.',
        otherSchemes: ['SBI Overnight Fund', 'SBI Savings Fund']
      }
    ],

    // Section 6: Investment Objective
    investmentObjective: 'To provide reasonable returns commensurate with low risk and high degree of liquidity through a portfolio of money market and debt instruments having maturity of up to 91 days.',
    suitableFor: 'First-time investors building an emergency buffer or seeking higher stability than bank savings accounts with redemption settlement within 24 hours.',
    navHistory: generateNavHistory(3845.20, 7.2, 6.8, 5.9)
  },
  {
    id: 'mirae-asset-large-midcap-fund',
    name: 'Mirae Asset Large & Midcap Fund Direct - Growth',
    code: '112938',
    fundHouse: {
      name: 'Mirae Asset Mutual Fund',
      totalAumCr: 165000,
      foundedYear: 2008,
      totalSchemes: 48,
      cio: 'Neelesh Surana',
      philosophy: 'Growth at reasonable price (GARP) combining high-quality large-cap balance sheets with fast-growing mid-cap industry champions.',
      logoText: 'MIRAE',
      logoBg: '#0B2545',
      logoColor: '#FFAE00'
    },
    category: 'Large Cap',
    broadCategory: 'Equity',
    planType: 'Direct - Growth',
    currentNav: 148.90,
    navDate: '07 Nov 2026',
    oneDayReturn: 0.42,
    aumCr: 41200,
    riskLevel: 'Very High',
    crisilRating: 4,
    minSipAmount: 500,
    minLumpsumAmount: 1000,
    benchmarkIndex: 'NIFTY LargeMidcap 250 Total Return Index',

    // Section 1: Expense Ratio, Exit Load and Taxes
    expenseRatio: 0.61,
    categoryAvgExpenseRatio: 0.88,
    exitLoad: {
      percentage: 1.0,
      periodDays: 365,
      description: '1% if redeemed within 1 year; Nil after 365 days.'
    },
    taxation: {
      stcgRate: '20% on capital gains if redeemed within 12 months',
      ltcgRate: '12.5% on capital gains above ₹1.25 Lakh per financial year if held > 12 months',
      specialNotes: 'Mandatory minimum 35% in large caps and 35% in mid caps per SEBI circular rules.'
    },

    // Section 2: Returns & Calculator Data
    returns: {
      oneYear: 21.8,
      threeYear: 18.2,
      fiveYear: 19.5,
      sinceInception: 18.9
    },
    categoryReturns: {
      oneYear: 19.4,
      threeYear: 16.1,
      fiveYear: 17.2
    },
    benchmarkReturns: {
      oneYear: 20.9,
      threeYear: 17.5,
      fiveYear: 18.4
    },
    categoryRank: {
      rank: 2,
      totalFunds: 29
    },

    // Section 3: Holdings
    equityPercentage: 98.4,
    debtPercentage: 0,
    cashPercentage: 1.6,
    totalStocksCount: 58,
    topHoldings: [
      { name: 'HDFC Bank Ltd', sector: 'Financial Services', percentage: 7.2 },
      { name: 'ICICI Bank Ltd', sector: 'Financial Services', percentage: 6.4 },
      { name: 'Trent Ltd', sector: 'Retail & Consumer', percentage: 4.8 },
      { name: 'L&T Technology Services Ltd', sector: 'IT Services', percentage: 3.9 },
      { name: 'State Bank of India', sector: 'Financial Services', percentage: 3.8 },
      { name: 'Bharat Electronics Ltd', sector: 'Aerospace & Defence', percentage: 3.5 }
    ],
    topSectors: [
      { sector: 'Financial Services', percentage: 28.5 },
      { sector: 'Consumer Discretionary', percentage: 14.2 },
      { sector: 'Information Technology', percentage: 12.8 },
      { sector: 'Capital Goods & Defence', percentage: 10.4 },
      { sector: 'Healthcare & Pharma', percentage: 8.6 }
    ],

    // Section 5: Fund Manager
    managers: [
      {
        name: 'Neelesh Surana',
        experienceYears: 25,
        education: 'B.E., MBA (Finance)',
        tenureWithFund: '14 Years',
        totalAumManagedCr: 65000,
        bio: 'Chief Investment Officer with an acclaimed track record of discovering compounding winners early.',
        otherSchemes: ['Mirae Asset Large Cap Fund', 'Mirae Asset Flexi Cap Fund']
      }
    ],

    // Section 6: Investment Objective
    investmentObjective: 'To generate long-term capital appreciation by investing in a diversified portfolio consisting predominantly of equity and equity-related securities of large and mid-cap companies.',
    suitableFor: 'Investors with an investment horizon of 5+ years looking to participate in both stable bluechips and high-growth mid-sized companies.',
    navHistory: generateNavHistory(148.90, 21.8, 18.2, 19.5)
  },
  {
    id: 'icici-prudential-corporate-bond-fund',
    name: 'ICICI Prudential Corporate Bond Fund Direct - Growth',
    code: '119842',
    fundHouse: {
      name: 'ICICI Prudential Mutual Fund',
      totalAumCr: 740000,
      foundedYear: 1993,
      totalSchemes: 135,
      cio: 'S. Naren',
      philosophy: 'Rigorous credit appraisal process emphasizing AAA rated top tier corporate debt with strong cash flows to generate accrual yield with capital preservation.',
      logoText: 'ICICI',
      logoBg: '#A5181A',
      logoColor: '#FFFFFF'
    },
    category: 'Corporate Bond',
    broadCategory: 'Debt',
    planType: 'Direct - Growth',
    currentNav: 29.85,
    navDate: '07 Nov 2026',
    oneDayReturn: 0.03,
    aumCr: 28400,
    riskLevel: 'Moderate',
    crisilRating: 5,
    minSipAmount: 500,
    minLumpsumAmount: 1000,
    benchmarkIndex: 'CRISIL Corporate Bond Composite Index',

    // Section 1: Expense Ratio, Exit Load and Taxes
    expenseRatio: 0.32,
    categoryAvgExpenseRatio: 0.45,
    exitLoad: {
      percentage: 0,
      periodDays: 0,
      description: 'Nil exit load. Complete liquidity without redemption penalty.'
    },
    taxation: {
      stcgRate: 'Taxed at applicable marginal income tax slab rate',
      ltcgRate: 'Taxed at applicable marginal income tax slab rate',
      specialNotes: 'Debt fund taxation applies without indexation benefit as per the 2023 amendment.'
    },

    // Section 2: Returns & Calculator Data
    returns: {
      oneYear: 8.1,
      threeYear: 7.5,
      fiveYear: 7.2,
      sinceInception: 8.4
    },
    categoryReturns: {
      oneYear: 7.8,
      threeYear: 7.1,
      fiveYear: 6.9
    },
    benchmarkReturns: {
      oneYear: 8.0,
      threeYear: 7.4,
      fiveYear: 7.1
    },
    categoryRank: {
      rank: 1,
      totalFunds: 22
    },

    // Section 3: Holdings
    equityPercentage: 0,
    debtPercentage: 94.6,
    cashPercentage: 5.4,
    totalStocksCount: 0,
    topHoldings: [
      { name: 'NABARD 7.62% 2028 (AAA)', sector: 'Financial Institutions', percentage: 9.2, creditRating: 'AAA' },
      { name: 'HDFC Bank Ltd 7.75% 2029 (AAA)', sector: 'Private Banking', percentage: 8.4, creditRating: 'AAA' },
      { name: 'REC Ltd 7.55% 2027 (AAA)', sector: 'Power Finance', percentage: 7.6, creditRating: 'AAA' },
      { name: 'Power Finance Corp 7.70% (AAA)', sector: 'Power Finance', percentage: 6.9, creditRating: 'AAA' },
      { name: 'Small Industries Dev Bank 7.68% (AAA)', sector: 'Financial Institutions', percentage: 6.2, creditRating: 'AAA' }
    ],
    topSectors: [
      { sector: 'Financial Institutions (AAA)', percentage: 38.5 },
      { sector: 'Power & Infrastructure Finance (AAA)', percentage: 26.2 },
      { sector: 'Banking Debt (AAA)', percentage: 21.4 },
      { sector: 'Government Securities', percentage: 8.5 }
    ],

    // Section 5: Fund Manager
    managers: [
      {
        name: 'Anuj Tagra',
        experienceYears: 17,
        education: 'B.Tech, MBA',
        tenureWithFund: '5 Years',
        totalAumManagedCr: 34000,
        bio: 'Senior fixed income fund manager focusing on yield curve optimization and corporate credit assessment.',
        otherSchemes: ['ICICI Prudential All Seasons Bond Fund', 'ICICI Prudential Banking & PSU Debt Fund']
      }
    ],

    // Section 6: Investment Objective
    investmentObjective: 'To generate income through investing predominantly in AA+ and above rated corporate bonds with an emphasis on low credit risk and stable coupon yields.',
    suitableFor: 'Conservative investors with a 2-3 year horizon seeking predictable returns higher than savings accounts while maintaining high credit safety.',
    navHistory: generateNavHistory(29.85, 8.1, 7.5, 7.2)
  }
];

