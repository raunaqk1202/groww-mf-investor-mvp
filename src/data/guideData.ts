import { GuideVideo, TerminologyItem, FundTypeInfo, VideoScene } from '../types/guide';

export const GUIDE_VIDEOS: GuideVideo[] = [
  {
    id: 'pf-budget-allocation',
    title: 'Personal Finance 101: How Much to Allocate for Mutual Funds',
    duration: '2:05',
    totalDurationSec: 125,
    category: 'Personal Finance',
    summary: 'A complete, comprehensive masterclass on the 50-30-20 rule, building an emergency moat in Liquid Funds, clearing high-interest debt, and automating your monthly mutual fund SIP on salary day.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60',
    isAiGenerated: true,
    takeaways: [
      'The Golden 50:30:20 Rule: 50% for Needs, 30% for Wants, and a minimum of 20% automated into wealth-building SIPs.',
      'Emergency Moat First: Always park 3 to 6 months of living expenses in safe Liquid Funds before starting Equity SIPs.',
      'Clear High-Interest Debt: Never invest in mutual funds while carrying credit card debt charging 40% interest.',
      'Automate on Payday: Schedule auto-debit 2 to 3 days after salary day to save first and spend what remains.',
      'Consistency Beats Intelligence: A steady ₹1,000 monthly SIP started early creates exponential compounding wealth.'
    ],
    scenes: [
      {
        id: 'pf-1',
        timeStartSec: 0,
        timeEndSec: 25,
        timeLabel: '0:00 - 0:25',
        headline: '1. The Golden 50:30:20 Rule Explained',
        caption: 'Divide your monthly in-hand salary: 50% for Needs, 30% for Wants, and 20% automated into wealth-building SIPs.',
        voiceScript: 'Welcome to Personal Finance 101. The foundation of all investing begins with the 50:30:20 budgeting rule. Divide your monthly in-hand salary into three clear buckets: 50 percent for essential living needs like rent, groceries, and bills; 30 percent for lifestyle wants like dining out and entertainment; and a minimum of 20 percent automated into wealth-building mutual fund investments.',
        visualType: 'pieChart',
        bulletPoints: [
          '50% Essential Needs: Housing, groceries, utility bills, EMI',
          '30% Lifestyle Wants: Dining out, leisure, hobbies, shopping',
          '20% Wealth Creation: Automated monthly mutual fund SIPs',
          'Practical example: On a ₹50,000 in-hand salary, exactly ₹10,000 goes into SIPs'
        ]
      },
      {
        id: 'pf-2',
        timeStartSec: 25,
        timeEndSec: 50,
        timeLabel: '0:25 - 0:50',
        headline: '2. Building Your Emergency Fund Moat First',
        caption: 'Before investing in stocks, park 3 to 6 months of expenses in a safe Liquid Fund with instant 24-hr redemption.',
        voiceScript: 'Before investing a single rupee into volatile equity markets, you must build an emergency moat. Park three to six months of basic living expenses into a safe Liquid Fund with instant 24-hour redemption. This ensures that an unexpected medical emergency or job change will never force you to sell your equity mutual funds at a loss during a market crash.',
        visualType: 'poolCoins',
        bulletPoints: [
          'Keep 3 to 6 months of mandatory living expenses safe',
          'Use Liquid Funds: High safety, near-zero credit risk & 24-hr redemption',
          'Never invest emergency cash or borrowed money into volatile stocks',
          'Acts as a financial shock absorber protecting your long-term wealth'
        ]
      },
      {
        id: 'pf-3',
        timeStartSec: 50,
        timeEndSec: 75,
        timeLabel: '0:50 - 1:15',
        headline: '3. Eliminating High-Interest Debt',
        caption: 'Clear high-interest credit card debt and personal loans before investing. No fund beats a 40% interest penalty.',
        voiceScript: 'Always prioritize clearing high-interest debt before aggressive equity investing. If you carry credit card balances charging 36 to 42 percent annual interest or high-interest personal loans, clear them immediately. No mutual fund can consistently beat a 40 percent interest penalty. Once bad debts are cleared, your money works 100 percent for your future.',
        visualType: 'taxBreakdown',
        bulletPoints: [
          'Clear credit card balances (36-42% interest) before investing',
          'No mutual fund return can outpace high-interest loan penalties',
          'Low-interest home or education loans are fine to continue alongside SIPs',
          'Unburdens your monthly cash flow for compounding'
        ]
      },
      {
        id: 'pf-4',
        timeStartSec: 75,
        timeEndSec: 100,
        timeLabel: '1:15 - 1:40',
        headline: '4. Automating Your SIP on Salary Day',
        caption: 'Schedule your monthly auto-debit 2 days after salary day so you save first and spend whatever remains.',
        voiceScript: 'Willpower fails, but automation never does. Set up your monthly SIP auto-debit two to three days after your monthly salary date. When you save first and spend whatever remains, investing becomes an effortless, automatic habit. You will never feel tempted to spend your investment capital on impulsive weekend purchases.',
        visualType: 'compounding',
        bulletPoints: [
          'Schedule auto-debit on the 3rd or 5th of each month right after payday',
          'Follow the Pay Yourself First rule: Save first, spend what remains',
          'Official RBI and NPCI e-Mandate: Safe, secure, and 100% automated',
          'Easily pause, increase, or modify your SIP amount anytime with zero penalty'
        ]
      },
      {
        id: 'pf-5',
        timeStartSec: 100,
        timeEndSec: 125,
        timeLabel: '1:40 - 2:05',
        headline: '5. Starting Small & The Compounding Snowball',
        caption: 'Patience and consistency beat cleverness. A steady ₹1,000 SIP snowballs exponentially over 5, 10, and 20 years.',
        voiceScript: 'You do not need lakhs of rupees to begin. Starting early with just 500 or 1,000 rupees a month builds the habit and gives compounding maximum time to work. In mutual funds, patience and consistency beat market intelligence every single time. Open our interactive Budget Planner right here on Groww to calculate your exact personalized monthly allocation.',
        visualType: 'spectrum',
        bulletPoints: [
          'Start small: ₹500 or ₹1,000 monthly builds the foundational habit',
          'Time in the market is vastly more important than timing the market',
          'A small ₹1,000 SIP started today compounds more than ₹10,000 delayed by 5 years',
          'Use the interactive Budget Calculator tool in this guide to calculate your numbers'
        ]
      }
    ],
    transcript: [
      { time: '0:00', text: 'Divide your monthly in-hand salary: 50% Needs, 30% Wants, and 20% automated into wealth-building SIPs.' },
      { time: '0:25', text: 'Before investing in equity, park 3 to 6 months of expenses in a safe Liquid Fund with 24-hr redemption.' },
      { time: '0:50', text: 'Clear high-interest credit card debt first; no mutual fund can outpace a 40% interest penalty.' },
      { time: '1:15', text: 'Automating your monthly SIP on salary day ensures you save first and spend what remains effortlessly.' },
      { time: '1:40', text: 'Consistency beats market timing. A small ₹1,000 SIP started early snowballs into massive wealth.' }
    ]
  },
  {
    id: 'mf-and-sip-basics',
    title: 'Mutual Funds & SIP Basics: How Your Money Actually Compounds',
    duration: '2:05',
    totalDurationSec: 125,
    category: 'Mutual Fund Basics',
    summary: 'A complete, comprehensive masterclass on how mutual funds pool money, what SIP actually means, how Rupee-Cost Averaging turns market dips into profits, and the 3 phases of exponential compounding.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
    isAiGenerated: true,
    takeaways: [
      'What is a Mutual Fund: Thousands of retail investors pooling capital to buy 50+ professionally managed companies.',
      'SIP is an Automated Method: Systematic Investment Plan is an investing habit, not a separate asset class.',
      'Rupee-Cost Averaging: When markets fall, your fixed monthly SIP buys MORE units at discount prices.',
      'Three Phases of Compounding: Foundation (Years 1-3), Acceleration (Years 4-7), and Exponential Growth (Years 8-15+).',
      'The Golden Investor Rule: Never stop your SIP during market corrections; pullbacks are when wealth is built.'
    ],
    scenes: [
      {
        id: 'mf-1',
        timeStartSec: 0,
        timeEndSec: 25,
        timeLabel: '0:00 - 0:25',
        headline: '1. What is a Mutual Fund Scheme?',
        caption: 'Think of a mutual fund as a large basket. Thousands of retail investors pool money together to buy 50+ top companies.',
        voiceScript: 'Think of a mutual fund as a large diversified investment basket. Thousands of individual retail investors pool their money together. That capital is managed by SEBI-registered professional fund managers who invest it into a well-researched basket of 50 or more top companies, giving you instant bluechip diversification even with a modest 500 rupee investment.',
        visualType: 'poolCoins',
        bulletPoints: [
          'Pooled capital from thousands of everyday retail investors',
          'Managed by professional SEBI-registered Asset Management Companies (AMCs)',
          'Instant diversification across 40 to 80 high-quality companies',
          'Eliminates single-company bankruptcy risk'
        ]
      },
      {
        id: 'mf-2',
        timeStartSec: 25,
        timeEndSec: 50,
        timeLabel: '0:25 - 0:50',
        headline: '2. Demystifying SIP: A Method, Not a Product',
        caption: 'SIP is simply a disciplined method of investing a fixed amount every month, removing emotion and market timing.',
        voiceScript: 'A common beginner confusion is thinking SIP is a financial product. SIP stands for Systematic Investment Plan, and it is simply a method of investing, not the scheme itself. Just like an EMI pays off a loan in installments, an SIP deposits a fixed amount into your chosen mutual fund scheme on a set day every month, removing emotion completely.',
        visualType: 'lineChart',
        bulletPoints: [
          'SIP is an automated investing method, NOT a separate asset class',
          'Invest fixed amounts (e.g. ₹1,000, ₹5,000) every month on a set date',
          'Eliminates the stress, panic, and guesswork of timing market peaks',
          'Replaces emotional impulsive trading with calm, disciplined wealth creation'
        ]
      },
      {
        id: 'mf-3',
        timeStartSec: 50,
        timeEndSec: 75,
        timeLabel: '0:50 - 1:15',
        headline: '3. Rupee-Cost Averaging Decoded',
        caption: 'When markets dip, your fixed SIP buys MORE units at discount prices. When markets rise, your accumulated units grow.',
        voiceScript: 'Rupee-Cost Averaging is the secret superpower of SIP investing. Because you invest a fixed rupee amount every month, when the stock market dips, your money automatically buys more fund units at discounted prices. When the market recovers and reaches new highs, those extra accumulated units supercharge your total portfolio gains.',
        visualType: 'compounding',
        bulletPoints: [
          'Fixed monthly deposit buys MORE units when market prices drop',
          'Buys fewer units when market valuations are high',
          'Automatically lowers your average purchase price per unit over time',
          'You actively benefit from market corrections without needing to predict them'
        ]
      },
      {
        id: 'mf-4',
        timeStartSec: 75,
        timeEndSec: 100,
        timeLabel: '1:15 - 1:40',
        headline: '4. The Three Phases of Exponential Compounding',
        caption: 'Compounding works like a rolling snowball. Growth feels slow initially, but accelerates exponentially over 10 to 15 years.',
        voiceScript: 'Compounding is often called the eighth wonder of the world, but it requires patience. In the first three years, your growth feels modest because you are laying the foundation. Between years five and seven, the curve begins to bend upwards. By year ten and beyond, your returns begin earning their own returns, and annual gains far exceed your fresh salary deposits.',
        visualType: 'navPizza',
        bulletPoints: [
          'Phase 1 (Years 1-3): Foundation building — growth appears slow and steady',
          'Phase 2 (Years 4-7): Compounding momentum accelerates visibly',
          'Phase 3 (Years 8-15+): Exponential takeoff — returns generate returns',
          'Patience is the only price of admission for long-term equity wealth'
        ]
      },
      {
        id: 'mf-5',
        timeStartSec: 100,
        timeEndSec: 125,
        timeLabel: '1:40 - 2:05',
        headline: '5. The Golden Mindset: Staying Invested',
        caption: 'Never stop your SIP during market corrections. Market pullbacks are flash sales where future wealth is actually built.',
        voiceScript: 'The single biggest mistake new investors make is stopping their SIPs or panicking when the market corrects. Remember: temporary market drops are not permanent losses unless you sell. In fact, bear markets are when your SIP accumulates the most units at bargain valuations. Stay calm, keep your SIP running, and give compounding five or more years to deliver life-changing results.',
        visualType: 'riskGauge',
        bulletPoints: [
          'Never stop or cancel your SIP during short-term market pullbacks',
          'A paper loss is not a permanent loss unless you panic sell',
          'Market pullbacks are flash sales for disciplined monthly accumulators',
          'Treat equity mutual funds as a 5 to 10-year marathon, not a sprint'
        ]
      }
    ],
    transcript: [
      { time: '0:00', text: 'A mutual fund pools money from thousands of investors to buy a professionally diversified basket of 50+ companies.' },
      { time: '0:25', text: 'SIP is a disciplined monthly method of investing that removes market timing stress completely.' },
      { time: '0:50', text: 'Rupee-Cost Averaging buys more units during market dips, lowering your average purchase price.' },
      { time: '1:15', text: 'Compounding accelerates exponentially after 5 to 7 years as returns earn their own returns.' },
      { time: '1:40', text: 'Never stop your SIP during market pullbacks; market dips are where long-term wealth is built.' }
    ]
  },
  {
    id: 'terminologies-demystified',
    title: 'Mutual Fund Jargon Demystified: NAV, AUM, Expense Ratio, Exit Load & Alpha',
    duration: '2:05',
    totalDurationSec: 125,
    category: 'Terminologies',
    summary: 'A complete, comprehensive masterclass breaking down NAV myths, Expense Ratio savings in Direct plans, Exit Loads, Union Budget 2024 taxation, AUM liquidity, and Benchmark Alpha.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=60',
    isAiGenerated: true,
    takeaways: [
      'The NAV Myth Shattered: NAV is simply the book value of 1 unit. A ₹20 NAV fund is NOT cheaper than a ₹200 NAV fund.',
      'Expense Ratio (TER): Direct plans save you 15 to 25 Lakhs over 20 years by eliminating middleman broker commissions.',
      'Exit Load & Budget 2024 Taxes: 0% exit load after 1 year; LTCG up to ₹1.25 Lakh per financial year is 100% tax-free.',
      'AUM & Liquidity: High AUM provides seamless redemption liquidity; for Small Caps, moderate AUM ensures agility.',
      'Benchmark Index & Alpha: Alpha is the excess return delivered by the manager above the market index.'
    ],
    scenes: [
      {
        id: 'term-1',
        timeStartSec: 0,
        timeEndSec: 25,
        timeLabel: '0:00 - 0:25',
        headline: '1. The NAV Myth Shattered',
        caption: 'NAV is Net Asset Value: the price of 1 unit. A higher NAV does NOT mean the fund is expensive!',
        voiceScript: 'Let us shatter the most common mutual fund myth: NAV, or Net Asset Value. Many beginners believe a fund with a 20 rupee NAV is cheaper or better value than a fund with a 200 rupee NAV. That is completely false. NAV is simply the book value of one unit. If both funds invest in the same companies and the market gains 10 percent, both funds will give you the exact same profit.',
        visualType: 'navPizza',
        bulletPoints: [
          'NAV = (Total Fund Assets - Liabilities) / Total Outstanding Units',
          'Calculated once daily at 9:00 PM after Indian stock markets close',
          'A ₹20 NAV fund is NOT cheaper than a ₹200 NAV fund',
          'Percentage return is what matters, not the unit price'
        ]
      },
      {
        id: 'term-2',
        timeStartSec: 25,
        timeEndSec: 50,
        timeLabel: '0:25 - 0:50',
        headline: '2. Expense Ratio: Direct vs Regular Plans',
        caption: 'Total Expense Ratio is deducted daily from NAV. Direct plans eliminate middleman commissions and save compounding lakhs.',
        voiceScript: 'The Total Expense Ratio, or TER, is the annual management fee charged by the fund house and deducted automatically from the NAV daily. Always choose Direct plans over Regular plans on Groww. Regular plans pay ongoing commissions to middlemen, adding up to one to 1.5 percent higher fees every year. Over 20 years, choosing Direct plans can save you 15 to 25 Lakh rupees in extra wealth.',
        visualType: 'bucketLeak',
        bulletPoints: [
          'TER is deducted automatically from the daily NAV',
          'Direct Plans: Zero middleman commission (0.1% to 0.8% TER)',
          'Regular Plans: Include ongoing broker commissions (up to 2% TER)',
          'Compounding savings on Direct plans can yield 20-25% higher wealth over 20 years'
        ]
      },
      {
        id: 'term-3',
        timeStartSec: 50,
        timeEndSec: 75,
        timeLabel: '0:50 - 1:15',
        headline: '3. Exit Load & Union Budget 2024 Tax Laws',
        caption: 'Exit load is an early withdrawal fee, nil after 1 year. Budget 2024 LTCG exempts ₹1.25 Lakh profit per financial year.',
        voiceScript: 'Exit load is a small penalty charged only if you withdraw your money before a minimum holding period, typically within one year, to discourage short-term speculation. And under Union Budget 2024, equity mutual funds are taxed favorably: profits up to 1.25 Lakh rupees every financial year are 100 percent tax-free under Long Term Capital Gains, with gains above that taxed at only 12.5 percent.',
        visualType: 'taxBreakdown',
        bulletPoints: [
          'Exit Load: Typically 1% if redeemed within 365 days; Nil (0%) afterwards',
          'STCG (Short Term < 12 months): 20% tax on realized gains',
          'LTCG (Long Term > 12 months): 12.5% tax on gains above ₹1.25 Lakh per financial year',
          'Long-term holding minimizes both exit loads and tax liability'
        ]
      },
      {
        id: 'term-4',
        timeStartSec: 75,
        timeEndSec: 100,
        timeLabel: '1:15 - 1:40',
        headline: '4. AUM & Scheme Liquidity',
        caption: 'AUM is total investor money managed. High AUM provides stability, but moderate AUM helps small cap agility.',
        voiceScript: 'AUM stands for Assets Under Management, which is the total rupee value of investor money managed by the fund. A healthy, growing AUM indicates strong investor trust and excellent redemption liquidity. However, for Small Cap funds, an excessively large AUM can make it harder for the manager to buy and sell smaller companies quickly. For Large Cap and Index funds, bigger AUM is always better.',
        visualType: 'poolCoins',
        bulletPoints: [
          'AUM = Total capital entrusted by all investors in the fund scheme',
          'High AUM provides seamless liquidity for redemptions',
          'Large Cap & Index Funds: Large AUM (₹10,000 Cr+) is ideal and lowers expense ratios',
          'Small Cap Funds: Moderate AUM allows agile portfolio maneuvering'
        ]
      },
      {
        id: 'term-5',
        timeStartSec: 100,
        timeEndSec: 125,
        timeLabel: '1:40 - 2:05',
        headline: '5. Benchmark Index & Alpha Generation',
        caption: 'Benchmark is the standard test score. Any return generated above the benchmark is pure manager value called Alpha.',
        voiceScript: 'Every mutual fund is graded against an official Benchmark Index, such as the Nifty 50 TRI or BSE 500 TRI. When an active fund manager generates returns higher than the benchmark index, that extra outperformance is called Alpha. If an active fund consistently fails to beat its benchmark over three to five years, you are better off switching to a low-cost Index Fund.',
        visualType: 'spectrum',
        bulletPoints: [
          'Benchmark Index: The standard market yardstick (e.g. Nifty 50 Total Return Index)',
          'Alpha: The value-added excess return delivered by the fund manager',
          'Beta: A measure of the fund price volatility relative to the broader market',
          'Use our interactive Jargon Buster tab to explore all 10 decoded financial terms'
        ]
      }
    ],
    transcript: [
      { time: '0:00', text: 'NAV is the book price of one unit; a ₹20 NAV fund is not cheaper than a ₹200 NAV fund.' },
      { time: '0:25', text: 'Direct plans eliminate middleman commissions, saving 15 to 25 Lakhs over a 20-year horizon.' },
      { time: '0:50', text: 'Exit load drops to zero after 1 year; Union Budget 2024 LTCG exempts ₹1.25 Lakh profit per year.' },
      { time: '1:15', text: 'AUM measures fund scale and liquidity; large AUM provides high redemption stability.' },
      { time: '1:40', text: 'Alpha is the excess return delivered above the benchmark index by an active manager.' }
    ]
  },
  {
    id: 'nav-chart-reading',
    title: 'How to Read NAV Charts Like a Pro: 1M vs 5Y, Benchmarks & Market Dips',
    duration: '2:05',
    totalDurationSec: 125,
    category: 'NAV Charts',
    summary: 'A complete, comprehensive masterclass on interpreting short-term noise vs long-term compounding, reading benchmark comparison lines, treating drawdowns as discount sales, and analyzing rolling returns.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=60',
    isAiGenerated: true,
    takeaways: [
      'Zoom Out: 1M and 6M charts show daily news noise and emotional sentiment; 3Y and 5Y charts show real corporate compounding.',
      'Benchmark Comparison: Look for the dashed line (e.g. Nifty 50 TRI); consistent outperformance proves manager Alpha.',
      'Dips are Discount Sales: 10% to 15% market pullbacks allow your automated SIP to accumulate extra units at bargain prices.',
      'Rolling Returns over Trailing Returns: Rolling returns test hundreds of historical windows, eliminating start-date bias.',
      'Interactive Tools: Use the crosshair hairline, tracking dot, and date status to inspect historical resilience.'
    ],
    scenes: [
      {
        id: 'nav-1',
        timeStartSec: 0,
        timeEndSec: 25,
        timeLabel: '0:00 - 0:25',
        headline: '1. The Trap of Short-Term Charts (1M vs 6M)',
        caption: 'Short-term charts reflect daily emotional news and sentiment. Always zoom out to 3Y and 5Y views to see compounding.',
        voiceScript: 'When you open a mutual fund screen, the default one-month or six-month chart often looks terrifying with jagged spikes and sharp drops. Short-term charts reflect daily emotional news, geopolitical headlines, and interest rate chatter. Never evaluate an equity fund on short-term horizons. Always toggle to the three-year, five-year, or All-time view to observe true economic value creation.',
        visualType: 'lineChart',
        bulletPoints: [
          '1M & 6M views show daily news noise, sentiment, and temporary market panic',
          'Short-term fluctuations are completely normal and unavoidable in equities',
          'Always toggle to 3Y, 5Y, and ALL timeframes to view corporate earnings growth',
          'Equity funds are designed for multi-year horizons, not weekly trading'
        ]
      },
      {
        id: 'nav-2',
        timeStartSec: 25,
        timeEndSec: 50,
        timeLabel: '0:25 - 0:50',
        headline: '2. The Benchmark Comparison Line',
        caption: 'Compare the solid fund NAV line with the dashed benchmark line. Staying above proves genuine manager Alpha.',
        voiceScript: 'On a professional Groww NAV chart, you will see a solid green curve representing your fund and a dashed line representing the category benchmark index, such as Nifty 50 TRI. If the fund line stays consistently above the benchmark line across market cycles, it proves the fund manager has generated genuine Alpha and earned their management fee.',
        visualType: 'riskGauge',
        bulletPoints: [
          'Solid green curve: The mutual fund scheme historical NAV performance',
          'Dashed secondary line: The official SEBI Benchmark Index (e.g. NIFTY 50 TRI)',
          'The gap between fund line and benchmark line is manager outperformance (Alpha)',
          'Consistent outperformance across 3 and 5 years indicates manager skill'
        ]
      },
      {
        id: 'nav-3',
        timeStartSec: 50,
        timeEndSec: 75,
        timeLabel: '0:50 - 1:15',
        headline: '3. Why Market Dips are Flash Sales for SIP Investors',
        caption: 'A 10% market correction is not a disaster; it is a flash sale where your monthly SIP buys more units at discount.',
        voiceScript: 'Every healthy stock market experiences 10 to 15 percent corrections every 12 to 18 months. When you see the NAV curve take a downward dip, do not panic. For an SIP investor, that dip is a festive discount sale. Your fixed monthly investment purchases more units at discounted valuations, acting as a spring-board when the market eventually rallies to fresh record highs.',
        visualType: 'compounding',
        bulletPoints: [
          'Market corrections of 10% to 20% happen regularly in healthy growing economies',
          'Rupee-cost averaging automatically acquires surplus units at discounted prices',
          'The investors who earn the highest 10-year wealth are those who continue SIPs through dips',
          'Never pause or cancel your SIP when the NAV chart looks red'
        ]
      },
      {
        id: 'nav-4',
        timeStartSec: 75,
        timeEndSec: 100,
        timeLabel: '1:15 - 1:40',
        headline: '4. Point-to-Point vs Rolling Returns',
        caption: 'Rolling returns measure hundreds of historical holding periods, eliminating start-date bias and revealing true consistency.',
        voiceScript: 'Do not get fooled by point-to-point trailing returns, such as last one-year return. A fund might show a 40 percent return simply because it was measured from an unusually depressed market bottom. Always look at three-year and five-year Rolling Returns. Rolling returns measure hundreds of overlapping holding periods, eliminating start-date bias and revealing true fund consistency.',
        visualType: 'sixSections',
        bulletPoints: [
          'Point-to-point returns suffer from start-date and end-date timing bias',
          'A high 1-year return often reflects a lucky market cycle, not manager skill',
          'Rolling returns test consistency across hundreds of historical time windows',
          'Look for funds that deliver 80%+ rolling return outperformance against category peers'
        ]
      },
      {
        id: 'nav-5',
        timeStartSec: 100,
        timeEndSec: 125,
        timeLabel: '1:40 - 2:05',
        headline: '5. Using Interactive Crosshairs & Timeframes',
        caption: 'Slide across the timeline to view historical dates, tracking dots, and drawdowns like an institutional investor.',
        voiceScript: 'Try our interactive NAV chart right here in the guide. Hover or slide your finger across the timeline to see the interactive crosshair hairline, tracking dot, and historical date valuations. You can inspect how the fund navigated past market crises and rebounded stronger. Practice reading charts calmly like a seasoned institutional investor.',
        visualType: 'spectrum',
        bulletPoints: [
          'Slide across the chart to view precise NAV valuations and historical dates',
          'Compare 1M, 6M, 1Y, 3Y, 5Y, and ALL time horizons interactively',
          'Inspect historical drawdowns to prepare your emotional tolerance in advance',
          'Check the interactive NAV explainer in this guide to test your skills'
        ]
      }
    ],
    transcript: [
      { time: '0:00', text: 'Short-term 1M and 6M charts show emotional noise; always zoom out to 3Y and 5Y views.' },
      { time: '0:25', text: 'Compare the solid fund line with the dashed benchmark line to judge manager Alpha.' },
      { time: '0:50', text: 'Market pullbacks are discount sales where your automated SIP buys units at cheaper prices.' },
      { time: '1:15', text: 'Rolling returns evaluate hundreds of overlapping cycles, eliminating start-date timing bias.' },
      { time: '1:40', text: 'Use interactive crosshairs and multi-year timeframes to inspect historical resilience.' }
    ]
  },
  {
    id: 'six-fund-sections-explained',
    title: 'The 6 Sections on Every Mutual Fund Screen Explained',
    duration: '2:30',
    totalDurationSec: 150,
    category: 'Fund Sections',
    summary: 'A complete, comprehensive masterclass detailing every single one of the 6 sections: Expense Ratio & Taxes, Return Calculator, Portfolio Holdings, Returns & Rankings, Fund Manager Pedigree, and SEBI Riskometer.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    isAiGenerated: true,
    takeaways: [
      'Section 1 (TER & Taxes): Verify Direct plan expense ratio (<1% for active, <0.3% for index) and Union Budget 2024 LTCG rules.',
      'Section 2 (Return Calculator): Simulate SIP compounding across 1, 3, 5, and 10 years with realistic 12-14% CAGR assumptions.',
      'Section 3 (Holdings & Sectors): Ensure no single stock exceeds 10% of AUM and top sectors are prudently diversified.',
      'Section 4 (Returns & Rankings): Look for Top-Quartile consistency against Category Average over 3Y and 5Y periods.',
      'Section 5 (Fund Manager): Seek managers with 5+ years tenure who have successfully navigated full bull and bear cycles.',
      'Section 6 (Objective & Riskometer): Verify that the official SEBI Riskometer rating strictly matches your investment timeline.'
    ],
    scenes: [
      {
        id: 'sec-1',
        timeStartSec: 0,
        timeEndSec: 25,
        timeLabel: '0:00 - 0:25',
        headline: '1. Section 1: Expense Ratio, Exit Load & Budget 2024 Taxes',
        caption: 'Look for low expense ratios in Direct plans, check exit load lock-in windows, and verify LTCG tax exemptions.',
        voiceScript: 'Section one covers the cost and taxation of the scheme. Look for low Total Expense Ratios in Direct plans — ideally under one percent for active funds and under 0.3 percent for index funds. Check the exit load holding window, usually one year. And review Union Budget 2024 rules: Long Term Capital Gains up to 1.25 Lakh rupees annually are completely tax-free.',
        visualType: 'taxBreakdown',
        bulletPoints: [
          'Expense Ratio: < 1.0% for active equity funds, < 0.3% for index funds',
          'Exit Load: Look for nil exit load after 365 days of holding',
          'Union Budget 2024 LTCG: 12.5% only on profits exceeding ₹1.25 Lakh per financial year',
          'STCG: 20% on redemptions made within 12 months'
        ]
      },
      {
        id: 'sec-2',
        timeStartSec: 25,
        timeEndSec: 50,
        timeLabel: '0:25 - 0:50',
        headline: '2. Section 2: Interactive Return Calculator & Compounding',
        caption: 'Simulate monthly SIP amounts over 1 to 5 years to visualize your invested capital versus compounded profit.',
        voiceScript: 'Section two is the interactive Return Calculator. Toggle between Monthly SIP and One-Time Lump Sum, and adjust the sliders from one to five years. The visual display separates your invested capital in grey from your compounded investment profit in bright green. Always model realistic 12 to 14 percent long-term CAGR assumptions for equity funds.',
        visualType: 'compounding',
        bulletPoints: [
          'Toggle between Monthly SIP and One-Time Investment modes',
          'Visual breakdown of total money invested versus compounded wealth gain',
          'Test 1-year, 3-year, and 5-year investment horizons',
          'Use realistic 12-14% CAGR expectations rather than extreme bull-market returns'
        ]
      },
      {
        id: 'sec-3',
        timeStartSec: 50,
        timeEndSec: 75,
        timeLabel: '0:50 - 1:15',
        headline: '3. Section 3: Portfolio Holdings & Sector Concentration',
        caption: 'Check top 10 companies, verify no single stock exceeds 10%, and ensure healthy diversification across sectors.',
        voiceScript: 'Section three reveals the underlying assets of the fund. Inspect the top ten company holdings to ensure the portfolio is not overly concentrated in any single stock. A prudent rule of thumb is that no individual stock should exceed ten percent of total fund AUM. Also verify healthy diversification across major economic sectors like Banking, IT, Pharma, and Manufacturing.',
        visualType: 'pieChart',
        bulletPoints: [
          'Top 10 Holdings: Verify bluechip corporate governance and quality balance sheets',
          'Stock Concentration Rule: No single company should exceed 10% of portfolio AUM',
          'Sector Diversification: Well-balanced across Banking, Technology, Healthcare, and Auto',
          'Complete transparency: SEBI mandates AMCs publish exact holdings every month'
        ]
      },
      {
        id: 'sec-4',
        timeStartSec: 75,
        timeEndSec: 100,
        timeLabel: '1:15 - 1:40',
        headline: '4. Section 4: Returns & Category Quartile Rankings',
        caption: 'Grade fund returns against Category Average and benchmark index over 1, 3, and 5 years. Look for Top Quartile rank.',
        voiceScript: 'Section four grades the fund historical performance against category peers and benchmark indices across one, three, and five-year periods. Pay close attention to Category Rank: a fund ranked in the top quartile, such as rank five out of 45 funds over five years, demonstrates steady, reliable management rather than short-lived speculative luck.',
        visualType: 'sixSections',
        bulletPoints: [
          'Compare Fund Returns against Category Average and Benchmark Index',
          'Category Rank: Look for funds consistently in Top Quartile (Rank 1 to 10)',
          '3-Year and 5-Year CAGR performance is vastly more reliable than 1-Year returns',
          'Avoid funds that swing wildly between top rank and bottom rank each year'
        ]
      },
      {
        id: 'sec-5',
        timeStartSec: 100,
        timeEndSec: 125,
        timeLabel: '1:40 - 2:05',
        headline: '5. Section 5: Fund Manager Pedigree & Experience',
        caption: 'Inspect manager credentials and career tenure. 5+ years of tenure indicates strategic discipline across cycles.',
        voiceScript: 'Section five details the background, education, and career tenure of the fund manager. For actively managed funds, manager tenure is critical. Look for managers who have steered the fund for at least five years, as this proves they have successfully protected capital through both bull market euphoria and bear market crashes with strategic discipline.',
        visualType: 'poolCoins',
        bulletPoints: [
          'Manager Tenure: Look for 5+ years of continuous management of the same scheme',
          'Navigating Full Cycles: Experience across both market crashes and economic booms',
          'Track record across other schemes managed by the same professional',
          'AMC Risk Committee: Institutional risk oversight behind the manager'
        ]
      },
      {
        id: 'sec-6',
        timeStartSec: 125,
        timeEndSec: 150,
        timeLabel: '2:05 - 2:30',
        headline: '6. Section 6: Scheme Investment Objective & SEBI Riskometer',
        caption: 'Verify that the scheme risk gauge and investment mandate match your personal timeline and risk tolerance.',
        voiceScript: 'Finally, section six displays the official fund house profile, total AMC scale, and the mandatory SEBI Riskometer. Always match the Riskometer gauge to your personal time horizon. An equity fund marked Very High Risk requires at least a five to seven-year horizon, while a conservative Liquid or Debt fund is ideal for shorter-term goals under one year.',
        visualType: 'riskGauge',
        bulletPoints: [
          'Official SEBI Riskometer: Low, Moderately Low, Moderate, Moderately High, High, Very High',
          'Time Alignment: Match Very High risk schemes to 5+ year time horizons',
          'Fund House Scale: Established AMCs provide institutional risk controls and stability',
          'Read the scheme investment objective to ensure it fits your personal goals'
        ]
      }
    ],
    transcript: [
      { time: '0:00', text: 'Section 1 covers Expense Ratio, Exit Load, and Union Budget 2024 LTCG and STCG tax rules.' },
      { time: '0:25', text: 'Section 2 lets you simulate compounding with monthly SIP sliders across 1 to 5 years.' },
      { time: '0:50', text: 'Section 3 reveals exact stock holdings and industry sector concentration.' },
      { time: '1:15', text: 'Section 4 grades returns and quartile ranking against category peers over 1, 3, and 5 years.' },
      { time: '1:40', text: 'Section 5 details manager credentials, career tenure, and performance across cycles.' },
      { time: '2:05', text: 'Section 6 displays AMC scale and the mandatory SEBI Riskometer rating.' }
    ]
  },
  {
    id: 'all-mf-types-guide',
    title: 'All Types of Mutual Funds Explained: Equity, Debt, Hybrid & ELSS',
    duration: '2:30',
    totalDurationSec: 150,
    category: 'Fund Types',
    summary: 'A complete, comprehensive masterclass detailing every single mutual fund category: Large Cap, Mid Cap, Small Cap, Flexi Cap, Balanced Advantage / Hybrid, Liquid Funds, and ELSS Tax Savers with optimal timeline mapping.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60',
    isAiGenerated: true,
    takeaways: [
      'Large Cap: Top 100 Indian corporate titans; highest stability among equities, ideal for 5+ year horizons.',
      'Mid & Small Cap: High growth emerging companies; sharp volatility and bigger drawdowns, strictly requiring 7+ years.',
      'Flexi Cap: Freedom for the fund manager to dynamically maneuver capital across all market caps as conditions evolve.',
      'Balanced Advantage (Hybrid): Automatically rebalances between equity and debt to cushion stock market crashes.',
      'Liquid Funds: Safe parking with up to 91-day maturity, near-zero credit risk, and 24-hour instant redemption for emergency funds.',
      'ELSS Tax Savers: 80C tax deduction up to ₹1.5L with a 3-year mandatory lock-in — shortest among all 80C tax instruments.'
    ],
    scenes: [
      {
        id: 'types-1',
        timeStartSec: 0,
        timeEndSec: 25,
        timeLabel: '0:00 - 0:25',
        headline: '1. Large Cap Equity Funds (Bluechip Foundation)',
        caption: 'Large Caps invest in India top 100 corporate titans for stability, steady dividends, and 5+ year goals.',
        voiceScript: 'Large Cap funds invest strictly in India’s top 100 corporate titans by market capitalization, such as Reliance, TCS, and HDFC Bank. These companies boast dominant market shares, robust balance sheets, and steady cash flows. Large cap funds offer the highest stability and lowest volatility among equity funds, making them the ideal foundation for five-plus year goals.',
        visualType: 'spectrum',
        bulletPoints: [
          'Strictly top 100 Indian companies by market capitalization',
          'Bluechip market leaders with strong corporate balance sheets',
          'Highest stability and lowest downside drawdowns among equity funds',
          'Minimum recommended investment horizon: 5+ years'
        ]
      },
      {
        id: 'types-2',
        timeStartSec: 25,
        timeEndSec: 50,
        timeLabel: '0:25 - 0:50',
        headline: '2. Mid Cap & Small Cap Funds (High Growth Engine)',
        caption: 'Mid and Small Caps offer aggressive compounding growth, but experience sharp 20-30% swings. Require 7+ years.',
        voiceScript: 'Mid Cap funds invest in companies ranked 101 to 250, while Small Cap funds invest in businesses ranked 251 and beyond. These companies have the potential to become tomorrow’s large caps, offering high growth potential. However, they experience sharp 20 to 30 percent market drawdowns during corrections. Only invest in mid and small caps if you have a seven-plus year horizon.',
        visualType: 'lineChart',
        bulletPoints: [
          'Mid Cap: Ranked 101-250; Small Cap: Ranked 251+ by market capitalization',
          'High growth potential as emerging businesses expand market share',
          'High volatility: Expect sharper drawdowns during broader market pullbacks',
          'Minimum recommended investment horizon: strictly 7+ years'
        ]
      },
      {
        id: 'types-3',
        timeStartSec: 50,
        timeEndSec: 75,
        timeLabel: '0:50 - 1:15',
        headline: '3. Flexi Cap & Multi Cap Funds (All-Weather Agility)',
        caption: 'Dynamic freedom to maneuver capital across large, mid, and small cap companies as market valuations change.',
        voiceScript: 'Flexi Cap funds grant fund managers total dynamic freedom to allocate capital across large, mid, and small cap companies depending on where the best market opportunities lie. When small caps get overheated, the manager can shift into safe large caps, and vice versa. This agility makes Flexi Cap funds one of the finest all-weather core equity holdings for any portfolio.',
        visualType: 'sixSections',
        bulletPoints: [
          'Complete dynamic freedom across large, mid, and small cap companies',
          'Fund manager maneuvers capital dynamically based on market valuations',
          'Excellent core equity holding for beginners and seasoned investors alike',
          'Retains favorable equity capital gains tax status'
        ]
      },
      {
        id: 'types-4',
        timeStartSec: 75,
        timeEndSec: 100,
        timeLabel: '1:15 - 1:40',
        headline: '4. Balanced Advantage & Hybrid Funds (Volatility Cushions)',
        caption: 'Automatically balances between equity and debt using valuation algorithms, cushioning drawdowns during crashes.',
        voiceScript: 'Balanced Advantage funds, also known as Dynamic Asset Allocation funds, automatically rebalance money between stocks and fixed-income debt using algorithmic valuation models. When stock markets get expensive, the fund automatically shifts money into safe debt. When markets crash and become cheap, it buys more equity. This cushions market crashes, making it perfect for cautious beginners.',
        visualType: 'pieChart',
        bulletPoints: [
          'Algorithmic asset allocation dynamically moving between equity and debt',
          'Significantly lower drawdowns during stock market crashes',
          'Ideal for conservative investors or first-timers anxious about volatility',
          'Maintains equity tax advantages while reducing portfolio swings'
        ]
      },
      {
        id: 'types-5',
        timeStartSec: 100,
        timeEndSec: 125,
        timeLabel: '1:40 - 2:05',
        headline: '5. Debt & Liquid Funds (Safe Capital Preservation)',
        caption: 'Safe debt with up to 91-day maturity, perfect for emergency buffers with instant 24-hour bank redemption.',
        voiceScript: 'Debt funds invest in fixed-income securities like government bonds, corporate debentures, and treasury bills. Liquid funds, in particular, invest only in high-grade debt with up to 91-day maturity, carrying virtually zero credit risk. Liquid funds are the perfect parking spot for your three to six-month emergency fund, offering fast 24-hour redemption and superior discipline to idle savings accounts.',
        visualType: 'poolCoins',
        bulletPoints: [
          'Invests in government treasury bills, commercial papers, and high-grade debt',
          'Liquid Funds: Maturity up to 91 days with virtually zero credit risk',
          'Redemption money credited to your bank account within 24 working hours',
          'Ideal vehicle for emergency fund storage and short-term financial goals'
        ]
      },
      {
        id: 'types-6',
        timeStartSec: 125,
        timeEndSec: 150,
        timeLabel: '2:05 - 2:30',
        headline: '6. ELSS Tax Savers & Financial Horizon Mapping',
        caption: 'ELSS saves income tax under 80C with 3-year lock-in. Always align fund category with your personal timeline.',
        voiceScript: 'ELSS stands for Equity Linked Savings Scheme. It offers a tax deduction up to 1.5 Lakh rupees under Section 80C of the Old Tax Regime, with a mandatory lock-in of just three years — the shortest among all 80C instruments. Always remember the golden rule: match your fund choice to your timeline. Short term goals belong in debt and liquid funds, while long term wealth belongs in equity SIPs.',
        visualType: 'riskGauge',
        bulletPoints: [
          'ELSS: Tax deduction up to ₹1.5 Lakh under Section 80C (Old Regime)',
          'Shortest lock-in of 3 years compared to 5 years for Tax FD or 15 years for PPF',
          'Under 1 Year: Liquid & Overnight Funds',
          '1 to 3 Years: Low Duration & Short Duration Debt Funds',
          '3 to 5 Years: Balanced Advantage & Conservative Hybrid Funds',
          '5+ Years: Large Cap, Flexi Cap, and Index Funds'
        ]
      }
    ],
    transcript: [
      { time: '0:00', text: 'Large Cap funds invest in India top 100 corporate titans for stability across 5+ years.' },
      { time: '0:25', text: 'Mid & Small Cap funds provide aggressive growth engines requiring a strictly 7+ year horizon.' },
      { time: '0:50', text: 'Flexi Cap funds dynamically maneuver capital across market caps for all-weather agility.' },
      { time: '1:15', text: 'Balanced Advantage funds automatically cushion stock market crashes by rebalancing debt.' },
      { time: '1:40', text: 'Liquid funds provide safe emergency fund parking with 24-hour redemption and zero credit risk.' },
      { time: '2:05', text: 'ELSS saves tax under Section 80C with 3-year lock-in. Always match fund type to your timeline.' }
    ]
  }
];

export const TERMINOLOGIES: TerminologyItem[] = [
  {
    term: 'NAV (Net Asset Value)',
    shortName: 'NAV',
    simpleExplanation: 'The current market price of one single unit of a mutual fund scheme. It is calculated by taking total fund assets minus liabilities, divided by total outstanding units.',
    whyItMattersForYou: 'Many beginners mistakenly think a fund with ₹20 NAV is "cheaper" than a fund with ₹200 NAV. In reality, NAV does not indicate cheapness or expensiveness! If both funds invest in the same companies, both give the exact same percentage return.',
    realWorldAnalogy: 'Think of a pizza sliced into 10 smaller slices versus the same pizza cut into 2 large slices. Both provide the exact same amount of pizza!',
    example: 'If Fund A has NAV of ₹50 and Fund B has NAV of ₹500, investing ₹5,000 gets you 100 units of Fund A or 10 units of Fund B. If both grow 10%, your ₹5,000 becomes ₹5,500 in BOTH funds!',
    category: 'Basics',
    aiVideoVisual: 'navPizza',
    aiVideoScript: 'NAV is the price of one fund unit. A twenty rupee NAV fund is not cheaper than a two hundred rupee fund. If both gain ten percent, you make the exact same profit!'
  },
  {
    term: 'TER (Total Expense Ratio)',
    shortName: 'TER',
    simpleExplanation: 'The annual percentage fee that mutual fund companies deduct from your fund’s assets each day to manage your portfolio, conduct research, and cover operational costs.',
    whyItMattersForYou: 'Every 0.5% extra in expense ratio compounds against you. Over a 20-year horizon, saving 1% by choosing Direct plans over Regular plans can give you an extra ₹10-15 Lakhs on a normal SIP!',
    realWorldAnalogy: 'Think of a bucket with a tiny leak. Over a single minute, you won’t notice a drop. Over 20 years, a leaky bucket loses an ocean of water.',
    example: 'A Direct equity fund might charge 0.35% TER. The Regular version of the exact same fund charges 1.45% (the extra 1.1% pays the broker/distributor commission). Over 20 years, that 1.1% difference can cost you over 20% of your total compounded wealth!',
    category: 'Costs & Taxes',
    aiVideoVisual: 'bucketLeak',
    aiVideoScript: 'Expense ratio is the annual fee deducted daily from NAV. Always pick Direct plans to save up to twenty five percent more wealth over twenty years!'
  },
  {
    term: 'AUM (Assets Under Management)',
    shortName: 'AUM',
    simpleExplanation: 'The total market value of all investor capital currently being managed by a specific mutual fund scheme or AMC.',
    whyItMattersForYou: 'A healthy AUM indicates broad investor trust and high liquidity. However, in Small Cap funds, an excessively large AUM (e.g. ₹40,000+ Cr) can make it difficult for the fund manager to buy and sell small companies without impacting market prices.',
    realWorldAnalogy: 'Think of the displacement of a ship. A large ocean liner is extremely stable in rough waters, but cannot maneuver quickly through narrow canals like a speedboat.',
    example: 'SBI Bluechip Fund manages over ₹45,000 Crore (high stability, low redemption pressure), while a specialized micro-cap fund might cap its AUM at ₹5,000 Crore to maintain agility.',
    category: 'Basics',
    aiVideoVisual: 'poolCoins',
    aiVideoScript: 'AUM is total investor money managed. Large AUM indicates trust and liquidity, while small funds can move faster into high-growth opportunities.'
  },
  {
    term: 'Exit Load',
    shortName: 'Exit Load',
    simpleExplanation: 'A small percentage penalty charged by the mutual fund house if an investor redeems (sells) their units before a specified minimum holding period (typically 365 days for equity funds).',
    whyItMattersForYou: 'Exit loads are designed to discourage short-term trading and protect long-term investors. If you plan to need your money within 6-12 months, choose Liquid or Ultra Short Duration funds with 0% exit load!',
    realWorldAnalogy: 'Think of an early lease termination fee on an apartment rental. If you stay for the agreed 12 months, there is zero fee.',
    example: 'Most equity funds charge a 1% exit load if redeemed within 365 days. If you redeem after 366 days, the exit load is exactly ₹0 (Nil).',
    category: 'Costs & Taxes',
    aiVideoVisual: 'bucketLeak',
    aiVideoScript: 'Exit load is an early withdrawal penalty, usually one percent if sold within a year. Stay invested past 365 days and it drops to zero!'
  },
  {
    term: 'SIP (Systematic Investment Plan)',
    shortName: 'SIP',
    simpleExplanation: 'An automated method of investing a fixed sum of money into a mutual fund scheme at predetermined intervals (monthly or weekly).',
    whyItMattersForYou: 'SIP uses Rupee-Cost Averaging. When the market falls, your fixed ₹1,000 buys MORE units at discount prices; when the market rises, you buy fewer units. You never have to predict market tops or bottoms.',
    realWorldAnalogy: 'Think of buying gold: instead of trying to predict when gold prices will be lowest, you buy 1 gram every month on payday, averaging your purchase price over the cycle.',
    example: 'Month 1 (NAV ₹100): ₹5,000 buys 50 units. Month 2 (Market crash, NAV ₹50): ₹5,000 buys 100 units! Average cost per unit is ₹66.67, well below the original ₹100!',
    category: 'Basics',
    aiVideoVisual: 'lineChart',
    aiVideoScript: 'SIP automates wealth creation. When markets fall, your fixed monthly SIP buys more units at discount prices, removing market timing anxiety.'
  },
  {
    term: 'CAGR / XIRR',
    shortName: 'CAGR & XIRR',
    simpleExplanation: 'CAGR (Compound Annual Growth Rate) measures annualized return for a single one-time investment. XIRR (Extended Internal Rate of Return) measures annualized return for multiple periodic cashflows like monthly SIPs.',
    whyItMattersForYou: 'Never judge an SIP using simple average returns! If you invest across 36 monthly SIPs, XIRR gives the mathematically honest rate of return accounting for the exact date of every installment.',
    realWorldAnalogy: 'Think of speed: if you drive at 40 km/h in traffic and 120 km/h on the highway, simple average gives 80 km/h, but your true average journey speed depends on how long you spent at each speed.',
    example: 'An investor whose SIP portfolio grew from ₹3.6 Lakhs total invested to ₹5.2 Lakhs over 3 years has an XIRR of ~15.4% annually.',
    category: 'Performance',
    aiVideoVisual: 'compounding',
    aiVideoScript: 'CAGR is for one-time investments; XIRR is the true annualized return for monthly SIPs, factoring in the exact date of every deposit.'
  },
  {
    term: 'Benchmark Index',
    shortName: 'Benchmark',
    simpleExplanation: 'A standard market index (like NIFTY 50, S&P BSE Sensex, or NIFTY 500 TRI) against which a mutual fund scheme’s performance and returns are evaluated.',
    whyItMattersForYou: 'If an actively managed Large Cap fund charges a 1% fee but consistently delivers LOWER returns than the Nifty 50 Index over 3 and 5 years, you are better off investing in a low-cost Nifty 50 Index Fund charging 0.1%!',
    realWorldAnalogy: 'Think of a class test average. If a student scores 80% when the class average is 85%, they underperformed despite a decent score.',
    example: 'If Fund X generated 14% over 5 years while its benchmark Nifty 50 TRI generated 12%, the fund manager delivered 2% in Alpha (true manager outperformance).',
    category: 'Performance',
    aiVideoVisual: 'lineChart',
    aiVideoScript: 'The benchmark index is the standard test score. If a fund beats its benchmark, the manager generates true value called Alpha.'
  },
  {
    term: 'Direct vs Regular Plans',
    shortName: 'Direct vs Regular',
    simpleExplanation: 'Every mutual fund in India exists in two formats: Direct Plan (bought directly from the AMC or through Groww with 0% distributor commission) and Regular Plan (includes ongoing commission paid to brokers/agents).',
    whyItMattersForYou: 'Direct plans have a lower expense ratio and higher daily NAV. That 0.5% to 1.5% commission difference in Regular plans compound into hundreds of thousands of rupees lost over long horizons.',
    realWorldAnalogy: 'Buying farm-fresh produce directly from the grower versus buying from a neighborhood grocery store that marks up the price to cover distributor cuts.',
    example: 'Groww offers 100% Direct Mutual Funds with zero distributor commission and zero transaction fees.',
    category: 'Costs & Taxes',
    aiVideoVisual: 'bucketLeak',
    aiVideoScript: 'Groww offers Direct plans with zero middleman commissions. Choosing Direct can save you over eight lakh rupees across a twenty year investment!'
  },
  {
    term: 'SEBI Riskometer',
    shortName: 'Riskometer',
    simpleExplanation: 'A standardized 6-level pictorial risk gauge mandated by SEBI that every mutual fund scheme must display on its factsheet: Low, Low to Moderate, Moderate, Moderately High, High, and Very High.',
    whyItMattersForYou: 'Always match the riskometer to your investment horizon! Pure equity funds (Mid Cap, Small Cap, Sectoral) are rated "Very High Risk" because they fluctuate sharply in the short term, but are suitable for 5+ year horizons.',
    realWorldAnalogy: 'Think of a car speedometer or rollercoaster rating: a gentle merry-go-round (Low) versus a high-speed loop-de-loop coaster (Very High).',
    example: 'A Liquid Fund has Low Risk (ideal for 1-6 months), a Balanced Advantage Fund has High Risk, and a Small Cap Fund has Very High Risk.',
    category: 'Safety & Structure',
    aiVideoVisual: 'riskGauge',
    aiVideoScript: 'The SEBI riskometer standardizes risk across six levels. Equity funds are high risk short-term, but deliver the best wealth over five-plus years.'
  },
  {
    term: 'Mutual Fund Taxes (LTCG & STCG)',
    shortName: 'LTCG & STCG',
    simpleExplanation: 'Tax on mutual fund profits. Under Union Budget 2024: For Equity funds held > 12 months (LTCG), profits up to ₹1.25 Lakh per financial year are 100% TAX FREE; gains above ₹1.25L are taxed at 12.5%. Gains held < 12 months (STCG) are taxed at 20%.',
    whyItMattersForYou: 'Mutual fund returns are only taxed when you SELL (redeem). While you stay invested, compounding occurs with zero annual tax deductions! The ₹1.25 Lakh annual LTCG exemption is a huge gift for retail investors.',
    realWorldAnalogy: 'Think of a fruit tree: you only pay tax on the fruit when you harvest and sell it at market, not while it grows on the branch.',
    example: 'If your equity fund makes ₹1,00,000 profit after 2 years and you redeem, your tax is ₹0 (100% tax-free under Section 112A).',
    category: 'Costs & Taxes',
    aiVideoVisual: 'taxBreakdown',
    aiVideoScript: 'Under Union Budget 2024, long term equity profits up to 1.25 Lakh rupees each year are completely tax free. Hold for one year to maximize savings!'
  }
];

// Helper to convert any Jargon/Terminology item into a full continuous Masterclass Video format
export const convertTerminologyToGuideVideo = (term: TerminologyItem): GuideVideo => {
  const short = term.shortName || term.term;
  const idSlug = short.toLowerCase().replace(/[^a-z0-9]/g, '-');

  return {
    id: `jargon-${idSlug}`,
    title: `${term.term} Masterclass`,
    duration: '2:05',
    totalDurationSec: 125,
    category: 'Terminologies',
    summary: term.simpleExplanation,
    thumbnailUrl: '/thumbnails/jargon.jpg',
    isAiGenerated: true,
    takeaways: [
      `💡 Real-World Metaphor: ${term.realWorldAnalogy}`,
      `📊 Concrete Math Example: ${term.example}`,
      `🎯 Why It Directly Matters: ${term.whyItMattersForYou}`,
      `📌 Practical Investor Rule: Always inspect this metric on the Groww fund screen before investing.`
    ],
    scenes: [
      {
        id: 'scene-1',
        timeStartSec: 0,
        timeEndSec: 25,
        timeLabel: '0:00 - 0:25',
        headline: `1. Demystifying ${short}: The Core Concept`,
        caption: `"${term.simpleExplanation.substring(0, 95)}..."`,
        voiceScript: `Welcome to this masterclass on ${term.term}. Let us decode what this actually means in simple, everyday language. ${term.simpleExplanation}`,
        visualType: term.aiVideoVisual,
        bulletPoints: [
          `Definition: ${term.simpleExplanation}`,
          'Regulated SEBI terminology demystified for everyday investors',
          'Understanding the core principle before committing hard-earned money'
        ]
      },
      {
        id: 'scene-2',
        timeStartSec: 25,
        timeEndSec: 50,
        timeLabel: '0:25 - 0:50',
        headline: '2. The Everyday Relatable Metaphor',
        caption: `"${term.realWorldAnalogy}"`,
        voiceScript: `To make this concept unforgettable, here is an intuitive everyday analogy: ${term.realWorldAnalogy}. Just like in this real-world scenario, in mutual funds the exact same logic applies.`,
        visualType: term.aiVideoVisual,
        bulletPoints: [
          `Intuitive Metaphor: ${term.realWorldAnalogy}`,
          'Connects complex finance jargon to familiar daily experiences',
          'Helps you visualize how fund mechanics work under the hood'
        ]
      },
      {
        id: 'scene-3',
        timeStartSec: 50,
        timeEndSec: 75,
        timeLabel: '0:50 - 1:15',
        headline: '3. Step-by-Step Practical Example',
        caption: `"${term.example.substring(0, 95)}..."`,
        voiceScript: `Now let us walk through a complete, step-by-step practical example. ${term.example}. Notice how understanding the actual rupee math removes all fear and hesitation when evaluating mutual funds.`,
        visualType: term.aiVideoVisual === 'lineChart' ? 'compounding' : term.aiVideoVisual,
        bulletPoints: [
          `Concrete Numbers: ${term.example}`,
          'Step-by-step calculation showing exact rupee profit and costs',
          'Proves how mathematical logic always beats marketing hype'
        ]
      },
      {
        id: 'scene-4',
        timeStartSec: 75,
        timeEndSec: 100,
        timeLabel: '1:15 - 1:40',
        headline: '4. Impact on Your Wealth & Returns',
        caption: `"${term.whyItMattersForYou.substring(0, 95)}..."`,
        voiceScript: `Why does this directly impact your personal wealth and portfolio? ${term.whyItMattersForYou}. Keeping this in mind protects your compounded returns and prevents common beginner traps.`,
        visualType: term.aiVideoVisual,
        bulletPoints: [
          `Portfolio Impact: ${term.whyItMattersForYou}`,
          'Directly influences your net compounded profit and financial safety',
          'Helps you avoid hidden costs, broker cuts, and emotional panic'
        ]
      },
      {
        id: 'scene-5',
        timeStartSec: 100,
        timeEndSec: 125,
        timeLabel: '1:40 - 2:05',
        headline: '5. Golden Groww Action Rule & Summary',
        caption: `"Always check this metric on the fund details screen before investing. Stay disciplined and let compounding work for you."`,
        voiceScript: `To conclude this masterclass, here is your golden actionable rule on Groww: Always verify this metric on the scheme details screen before investing. Stay disciplined with an automated SIP, invest for the long term, and let compounding do the heavy lifting for your financial future.`,
        visualType: 'spectrum',
        bulletPoints: [
          'Groww Action Rule: Always check this metric on the scheme details page',
          'Invest with a 5+ year marathon mindset, never short-term trading',
          'Automate your monthly SIP and let compounding work for you',
          'Masterclass Completed: You are now equipped to make informed investment choices'
        ]
      }
    ],
    transcript: [
      { time: '0:00', text: `Let us decode ${term.term}. ${term.simpleExplanation}` },
      { time: '0:25', text: `Real-world metaphor: ${term.realWorldAnalogy}` },
      { time: '0:50', text: `Concrete example: ${term.example}` },
      { time: '1:15', text: `Why it matters: ${term.whyItMattersForYou}` },
      { time: '1:40', text: `Golden action rule: Always inspect this metric on Groww before investing.` }
    ]
  };
};

export const FUND_TYPES_CATALOG: FundTypeInfo[] = [
  {
    name: 'Index Funds',
    category: 'Equity',
    riskLevel: 'Very High',
    idealTimeHorizon: '5+ Years',
    sebiDefinition: 'Passively replicates a market index like NIFTY 50 or S&P BSE Sensex by holding the exact same companies in the identical proportion.',
    whoShouldInvest: 'Absolute beginners who want the safest equity entry point without fund manager bias, with ultra-low expense ratios and zero exit loads.',
    keyBenefits: [
      'Eliminates fund manager error or bias',
      'Ultra-low expense ratio (0.1% to 0.3%)',
      'Zero exit load on leading index schemes',
      'Tracks India’s 50 biggest corporations'
    ],
    keyRisks: [
      'Fluctuates 1:1 with broader stock market index',
      'No cash cushion during market drawdowns'
    ],
    exampleBenchmark: 'NIFTY 50 Total Return Index'
  },
  {
    name: 'Large Cap Funds',
    category: 'Equity',
    riskLevel: 'Very High',
    idealTimeHorizon: '5+ Years',
    sebiDefinition: 'Actively managed fund investing at least 80% of total assets in the top 100 companies by market capitalization in India.',
    whoShouldInvest: 'Investors seeking stable corporate titans with established balance sheets and consistent dividend records.',
    keyBenefits: [
      'Industry market leaders with resilient earnings',
      'Lower volatility compared to mid and small caps',
      'High liquidity and transparent institutional governance'
    ],
    keyRisks: [
      'Moderate growth compared to high-flying mid-caps',
      'Active large cap managers often struggle to beat passive index'
    ],
    exampleBenchmark: 'NIFTY 100 Total Return Index'
  },
  {
    name: 'Flexi Cap Funds',
    category: 'Equity',
    riskLevel: 'Very High',
    idealTimeHorizon: '5 to 7+ Years',
    sebiDefinition: 'Open-ended dynamic equity fund investing a minimum of 65% across large cap, mid cap, and small cap companies without rigid market cap constraints.',
    whoShouldInvest: 'First-time investors seeking one comprehensive "all-weather" equity fund where the experienced manager adjusts market cap weights dynamically.',
    keyBenefits: [
      'Ultimate flexibility for fund manager across market cycles',
      'Captures mid/small cap growth while retaining large cap safety',
      'Eligible for favorable equity taxation'
    ],
    keyRisks: [
      'Heavily dependent on fund manager skill and strategy',
      'Higher volatility during broad market corrections'
    ],
    exampleBenchmark: 'NIFTY 500 Total Return Index'
  },
  {
    name: 'Balanced Advantage Funds (Dynamic Hybrid)',
    category: 'Hybrid',
    riskLevel: 'Very High',
    idealTimeHorizon: '3 to 5+ Years',
    sebiDefinition: 'Dynamically manages asset allocation between equity and fixed income (debt) based on pre-defined algorithmic valuation models.',
    whoShouldInvest: 'Risk-averse or conservative beginners who get anxious seeing sharp stock market swings. The fund automatically buys more debt when equity is expensive.',
    keyBenefits: [
      'Significantly lower drawdowns during market crashes',
      'Automatic rebalancing without tax triggering for investor',
      'Maintains equity tax status via gross equity & arbitrage positions'
    ],
    keyRisks: [
      'Caps maximum upside during runaway bull markets',
      'Slightly higher expense ratios due to active rebalancing'
    ],
    exampleBenchmark: 'NIFTY 50 Hybrid Composite Debt 50:50 Index'
  },
  {
    name: 'Liquid Funds (Emergency Moat)',
    category: 'Debt',
    riskLevel: 'Low',
    idealTimeHorizon: '1 Day to 6 Months',
    sebiDefinition: 'Invests exclusively in high-grade debt and money market securities with maturity up to 91 days only (Treasury bills, repo, commercial paper).',
    whoShouldInvest: 'Anyone parking their 3 to 6-month emergency fund or short-term vacation/tax budget instead of earning minimal interest in low-yield savings accounts.',
    keyBenefits: [
      'Virtually zero interest rate and credit risk',
      'Redemption amount credited within 24 working hours',
      'Nil exit load after 7 days'
    ],
    keyRisks: [
      'Returns are modest (6.5% - 7.2%) and cannot beat equity long-term',
      'Taxed at investor’s individual income slab rate'
    ],
    exampleBenchmark: 'CRISIL Liquid Debt Index'
  },
  {
    name: 'ELSS (Equity Linked Savings Scheme)',
    category: 'Equity',
    riskLevel: 'Very High',
    idealTimeHorizon: '3+ Years (Mandatory Lock-in)',
    sebiDefinition: 'Equity fund offering tax deduction up to ₹1,50,000 under Section 80C of the Income Tax Act with the shortest mandatory lock-in of 3 years.',
    whoShouldInvest: 'Salaried investors opting for the Old Tax Regime looking to save income tax while participating in long-term wealth creation.',
    keyBenefits: [
      'Shortest lock-in (3 years) among all 80C instruments (vs 5 yrs for Tax FD, 15 yrs for PPF)',
      'Potential for inflation-beating equity returns',
      'Disciplined forced holding period instills patience'
    ],
    keyRisks: [
      'Cannot withdraw under any circumstances before 3 full years',
      'Only beneficial if you file taxes under the Old Tax Regime'
    ],
    exampleBenchmark: 'NIFTY 500 Total Return Index'
  }
];

export const FIRST_TIME_NUDGES = [
  {
    step: 1,
    stepTitle: 'Step 1 of 4: Monthly Amount & Date',
    headline: 'Starting Small Builds Big Habits',
    calmExplanation: 'You do not need lakhs to start. ₹500 or ₹1,000 every month is the perfect stress-free starting point. Choosing a date 2-3 days after your salary day ensures your account has sufficient funds.',
    whyItMatters: 'Consistency matters infinitely more than the starting amount. Starting now gives compounding maximum time to work its magic.',
    safetyCheck: '✅ You can increase, decrease, or pause your SIP anytime directly from your dashboard with zero penalty.',
    iconName: 'Calendar'
  },
  {
    step: 2,
    stepTitle: 'Step 2 of 4: Bank Mandate & Autopay',
    headline: 'Safe & Regulated RBI e-Mandate',
    calmExplanation: 'Autopay uses NPCI’s official e-Mandate framework. You will always receive an SMS/email alert 48 hours prior to debit. If you ever have insufficient balance, the bank does not penalize your mutual fund units.',
    whyItMatters: 'Automation removes human hesitation—you save first, without forgetting or having to manually log in each month.',
    safetyCheck: '✅ RBI and SEBI compliant. Bank debit can be cancelled instantly with 1 tap.',
    iconName: 'ShieldCheck'
  },
  {
    step: 3,
    stepTitle: 'Step 3 of 4: SEBI Timing & NAV Allocation',
    headline: 'How SEBI NAV Allotment Works',
    calmExplanation: 'Mutual fund pricing is calculated once daily at 9:00 PM. If your order is approved before 2:00 PM on a working day, you receive today’s closing NAV. If placed after 2:00 PM, you receive the next business day’s NAV.',
    whyItMatters: 'Unlike stocks which fluctuate second-by-second, mutual fund units are allotted uniformly across India at the official end-of-day NAV.',
    safetyCheck: '✅ Units will reflect in your Groww portfolio in T+1 or T+2 working days after AMC confirmation.',
    iconName: 'Clock'
  },
  {
    step: 4,
    stepTitle: 'Step 4 of 4: Order Confirmation & Mindset',
    headline: 'Congratulations on Taking Your First Step!',
    calmExplanation: 'Your first SIP order has been registered! Remember: Equity mutual funds are a 5+ year marathon. Do not panic if NAV dips next week—temporary dips allow your next month’s SIP to buy more units cheaper.',
    whyItMatters: 'Wealth creation is about emotional discipline. Ignore daily news noise and let compounding do the heavy lifting.',
    safetyCheck: '✅ Welcome to safe, disciplined investing. You are now officially a mutual fund investor.',
    iconName: 'Sparkles'
  }
];
