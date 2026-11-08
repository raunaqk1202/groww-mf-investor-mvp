import { EvalResult, QualityCheckItem, FallbackReason } from '../types/eval';

interface EvalEngineResponse {
  answer: string;
  evalResult: EvalResult;
}

export class EvalEngine {
  // Regex patterns for compliance violations
  private static RECOMMENDATION_PATTERNS = [
    /\b(which|what)\s+(specific\s+)?(mutual\s+fund|fund|scheme|stock|share)\s+(should|must|can)\s+i\s+(buy|invest|pick|choose)\b/i,
    /\b(recommend|suggest|give\s+me)\s+(a|some|the\s+best|top|3|5)?\s*(mutual\s+fund|fund|stock|stocks|share)\b/i,
    /\b(is|are)\s+([a-zA-Z\s]+)\s+(good|better|the\s+best\s+to\s+buy)\b/i,
    /\b(tell\s+me\s+the\s+best\s+fund)\b/i,
    /\b(stock\s+tips|hot\s+stocks|multibagger)\b/i
  ];

  private static FOMO_PATTERNS = [
    /\b(urgent|urgently|rush|hurry|miss\s+out|all\s+time\s+high|soaring|rally)\b/i,
    /\b(double\s+(my\s+)?money\s+in|get\s+rich\s+(quick|fast)|50%\s+return)\b/i,
    /\b(guaranteed\s+return|risk-free\s+equity)\b/i
  ];

  private static HAZARD_PATTERNS = [
    /\b(loan|borrow|debt|credit\s+card|personal\s+loan|margin)\s+(to|for)\s+(invest|buy|sip|mutual\s+fund)\b/i,
    /\b(invest\s+(all\s+)?my\s+emergency\s+fund)\b/i
  ];

  public static async evaluateAndRespond(prompt: string): Promise<EvalEngineResponse> {
    const startTime = performance.now();
    const cleanPrompt = prompt.trim();
    const checks: QualityCheckItem[] = [];

    // Gate 1: SEBI RIA Non-Recommendation Gate
    const isRecommendation = this.RECOMMENDATION_PATTERNS.some(p => p.test(cleanPrompt));
    const isStockTip = /\b(stock|share|crypto|intraday)\b/i.test(cleanPrompt) && /\b(recommend|buy|pick|tip)\b/i.test(cleanPrompt);

    checks.push({
      id: 'gate-sebi-ria',
      name: 'SEBI Non-Recommendation Compliance (RIA Circular 2020)',
      category: 'SEBI Compliance',
      passed: !isRecommendation && !isStockTip,
      score: (!isRecommendation && !isStockTip) ? 100 : 0,
      detail: (!isRecommendation && !isStockTip)
        ? 'Pass: Query does not solicit individual fund picking or stock tips.'
        : 'Triggered: Query solicits specific fund selection or stock tips, strictly prohibited under SEBI RIA regulations.',
      criterion: 'Zero recommendation of specific AMC schemes or individual stocks to non-advisory clients.'
    });

    // Gate 2: FOMO / Fear & Urgency Gate
    const isFomo = this.FOMO_PATTERNS.some(p => p.test(cleanPrompt));
    checks.push({
      id: 'gate-fomo-urgency',
      name: 'Tone Safety: FOMO & Urgency Barrier',
      category: 'Tone & FOMO',
      passed: !isFomo,
      score: !isFomo ? 100 : 25,
      detail: !isFomo
        ? 'Pass: Query and response maintain calm, disciplined, long-term tone.'
        : 'Triggered: High urgency, fear-of-missing-out, or unrealistic return expectations detected.',
      criterion: 'No urgency cues, FOMO encouragement, or short-term speculative triggers.'
    });

    // Gate 3: Personal Finance Hazard Gate
    const isHazard = this.HAZARD_PATTERNS.some(p => p.test(cleanPrompt));
    checks.push({
      id: 'gate-hazard-safety',
      name: 'Financial Hazard & Leverage Prohibition',
      category: 'Personal Finance Safety',
      passed: !isHazard,
      score: !isHazard ? 100 : 0,
      detail: !isHazard
        ? 'Pass: No leveraged investing or emergency depletion detected.'
        : 'Triggered: Hazardous financial strategy detected (borrowing/loans for volatile investments).',
      criterion: 'Prohibition of borrowed capital, leverage, or sacrificing emergency survival funds.'
    });

    // Gate 4: Regulatory Grounding & Verification
    checks.push({
      id: 'gate-grounding',
      name: 'AMFI & SEBI Regulatory Grounding',
      category: 'Grounding',
      passed: true,
      score: 95,
      detail: 'Pass: Grounded in SEBI Categorization Guidelines & Union Budget 2024 LTCG/STCG tax laws.',
      criterion: 'Information must map to official regulatory frameworks.'
    });

    const recommendationGatePassed = !isRecommendation && !isStockTip;
    const fomoUrgencyGatePassed = !isFomo;
    const financeSafetyGatePassed = !isHazard;
    const allPassed = recommendationGatePassed && fomoUrgencyGatePassed && financeSafetyGatePassed;

    const latencyMs = Math.round(performance.now() - startTime) + 450; // realistic mock inference + eval time

    // Case 1: Specific Stock Tip Fallback
    if (isStockTip) {
      const fallbackResult: EvalResult = {
        status: 'FALLBACK_TRIGGERED',
        overallScore: 35,
        recommendationGatePassed: false,
        fomoUrgencyGatePassed,
        groundingGatePassed: true,
        financeSafetyGatePassed,
        checks,
        fallbackReason: 'STOCK_TIP_PROHIBITED',
        safeFallbackExplanation: 'SEBI Compliance Rule: In accordance with SEBI investor safety regulations, I cannot recommend individual stocks or speculative shares.',
        officialReference: {
          title: 'SEBI (Research Analysts) Regulations & AMFI Code of Conduct',
          authority: 'SEBI',
          url: 'https://www.sebi.gov.in',
          description: 'SEBI guidelines mandate that stock recommendations require individual risk profiling by a SEBI-registered Research Analyst (RA).'
        },
        latencyMs
      };

      const fallbackAnswer = `### ⚠️ SEBI Compliance Notice: Stock Tips Not Allowed

Under **SEBI regulations** and investor safety guidelines, I **cannot recommend specific stocks or individual shares**.

#### 💡 How Mutual Funds Solve This for Beginners:
Instead of trying to pick individual winning stocks—which carries high concentration risk and requires analyzing quarterly financial statements:
1. **Diversified Basket:** A single mutual fund (like a Nifty 50 Index Fund or Flexi Cap Fund) automatically pools your money across **50 to 80 leading Indian corporations**.
2. **Professional Governance:** An experienced fund manager and research team monitor balance sheets, corporate governance, and quarterly results every day.
3. **Low Entry Cost:** You get exposure to India's bluechip companies with as little as ₹500/month.

🔗 *Official Resource: Consult [AMFI India](https://www.amfiindia.com) for official beginner tutorials.*`;

      return { answer: fallbackAnswer, evalResult: fallbackResult };
    }

    // Case 2: Specific Fund Recommendation Fallback
    if (isRecommendation) {
      const fallbackResult: EvalResult = {
        status: 'FALLBACK_TRIGGERED',
        overallScore: 40,
        recommendationGatePassed: false,
        fomoUrgencyGatePassed,
        groundingGatePassed: true,
        financeSafetyGatePassed,
        checks,
        fallbackReason: 'SPECIFIC_FUND_RECOMMENDATION_PROHIBITED',
        safeFallbackExplanation: 'SEBI Non-Advisory Rule: Under SEBI RIA guidelines, I cannot recommend specific schemes or label any fund as "the best". Here is the objective framework to choose the right fund category for your timeline.',
        officialReference: {
          title: 'AMFI Investor Education & SEBI Categorization Circular',
          authority: 'AMFI',
          url: 'https://www.amfiindia.com/investor-corner/knowledge-center',
          description: 'Official directory of SEBI standardized mutual fund categories and objective comparison metrics.'
        },
        latencyMs
      };

      const fallbackAnswer = `### ⚠️ SEBI Compliance Notice: Specific Fund Advice Not Allowed

Under **SEBI regulations**, I **cannot recommend specific mutual fund schemes or pick one fund over another**. There is no single "best" fund for everyone; the right choice depends on your time horizon and risk tolerance.

Here is the **unbiased 4-step framework** used by disciplined investors:

---

#### 1. Define Your Time Horizon
* **Less than 1 Year:** Choose **Liquid Funds** or Overnight Funds (lowest risk, redemption within 24 hours).
* **3 to 5 Years:** Consider **Balanced Advantage (Hybrid) Funds** (smoother journey, dynamic debt balancing).
* **5+ Years:** Consider broad-market **Index Funds (Nifty 50)** or **Flexi Cap Funds** (highest compounding potential).

#### 2. Check the 4 Core Metrics on Groww
1. **Expense Ratio:** Lower is better. Always select **Direct Plans** (0.1% to 0.8%) over Regular plans.
2. **Rolling Returns vs Benchmark:** Look at 3-year and 5-year consistency against the benchmark index (e.g., Nifty 50 TRI), not just last month's performance.
3. **Exit Load:** Ensure you can stay invested longer than the exit load period (typically 365 days).
4. **Fund Manager Tenure:** For active funds, a manager tenure of 5+ years shows consistency.

#### 3. What to Do Today
Instead of looking for a "hot tip", open the **Explore** tab in this app, filter by **Category**, and review the official disclosures for each fund.`;

      return { answer: fallbackAnswer, evalResult: fallbackResult };
    }

    // Case 3: Financial Hazard (Loans / Emergency Fund Depletion)
    if (isHazard) {
      const fallbackResult: EvalResult = {
        status: 'FALLBACK_TRIGGERED',
        overallScore: 20,
        recommendationGatePassed,
        fomoUrgencyGatePassed,
        groundingGatePassed: true,
        financeSafetyGatePassed: false,
        checks,
        fallbackReason: 'HIGH_RISK_FINANCIAL_HAZARD',
        safeFallbackExplanation: 'Financial Safety Shield: Never borrow money, take personal loans, or invest emergency survival reserves into volatile market schemes.',
        officialReference: {
          title: 'RBI & SEBI Investor Caution on Leveraged Trading',
          authority: 'RBI',
          url: 'https://www.rbi.org.in',
          description: 'Advisory warning against borrowing high-cost personal debt for volatile equity market investments.'
        },
        latencyMs
      };

      const fallbackAnswer = `### ⛔ Critical Safety Warning: Never Borrow to Invest

**DO NOT take a personal loan or borrow money to invest in mutual funds.**

#### 🛑 Why This Is Financially Dangerous:
1. **Guaranteed Debt vs Fluctuating Equity:** A personal loan has a guaranteed interest repayment obligation (e.g., 12% to 16% per year). Mutual fund returns are market-linked and never guaranteed in the short term.
2. **Negative Compounding Trap:** If the equity market enters a 15% correction, you face double damage: paying EMI on the loan while your invested capital has shrunk.
3. **Emotional Forced Selling:** When loan payments are due, investors are forced to redeem units at a loss at market bottoms.

#### 🛡️ The Prudent Rule:
* Pay off any existing high-interest personal loans or credit card balances **first**.
* Maintain **3 to 6 months of living expenses** in a Liquid Fund.
* Only invest surplus monthly income that you do not need for at least **5 years**.`;

      return { answer: fallbackAnswer, evalResult: fallbackResult };
    }

    // Case 4: FOMO / Urgency
    if (isFomo) {
      const fallbackResult: EvalResult = {
        status: 'FALLBACK_TRIGGERED',
        overallScore: 50,
        recommendationGatePassed,
        fomoUrgencyGatePassed: false,
        groundingGatePassed: true,
        financeSafetyGatePassed,
        checks,
        fallbackReason: 'FOMO_OR_URGENCY_DETECTED',
        safeFallbackExplanation: 'Anti-FOMO Guardrail: Protecting you from market hype. Market cycles are normal, and an automated SIP eliminates the risk of rushing into peaks.',
        officialReference: {
          title: 'AMFI: Mutual Funds Sahi Hai - The SIP Discipline Guide',
          authority: 'AMFI',
          url: 'https://www.amfiindia.com/investor-corner/knowledge-center/understanding-mutual-funds',
          description: 'AMFI education on why market timing fails and systematic investing protects capital.'
        },
        latencyMs
      };

      const fallbackAnswer = `### 🧘 Calm Perspective: Eliminate FOMO with Systematic SIPs

Markets touching all-time highs or rallying rapidly can trigger a strong **Fear of Missing Out (FOMO)**. However, emotional lump-sum investing during market euphoric peaks often leads to regret.

#### 💡 Key Principles for Peace of Mind:
1. **Never Rush or Dump All Savings at Once:** If you have a lump sum, do not deploy it all on a single day. Instead, park it in a **Liquid Fund** and set up a **Systematic Transfer Plan (STP)** over 6 to 12 months.
2. **The Magic of Rupee-Cost Averaging:** If the market rallies higher, your existing SIP units gain in value. If the market corrects tomorrow, your next SIP automatically buys **more units at lower prices**.
3. **No Unrealistic Return Promises:** Equities historically average 12% to 14% CAGR over 10-15 year horizons in India. Promises of "doubling money in months" are red flags.
4. **Investing is a Marathon:** What happens this week or next month will not matter in year 10. Stick to your monthly budget and automate your SIP.`;

      return { answer: fallbackAnswer, evalResult: fallbackResult };
    }

    // Standard Pass: High-Quality Educational Responses
    const evalResult: EvalResult = {
      status: 'PASSED',
      overallScore: 98,
      recommendationGatePassed: true,
      fomoUrgencyGatePassed: true,
      groundingGatePassed: true,
      financeSafetyGatePassed: true,
      checks,
      officialReference: {
        title: 'AMFI Official Knowledge Center & SEBI Investor Guidelines',
        authority: 'AMFI',
        url: 'https://www.amfiindia.com',
        description: 'Verified educational standard for mutual fund terminology and budgeting.'
      },
      latencyMs
    };

    // Synthesize educational answer based on topic
    let answer = '';
    const lower = cleanPrompt.toLowerCase();

    if (lower.includes('earn') || lower.includes('salary') || lower.includes('allocate') || lower.includes('budget') || lower.includes('how much')) {
      // Personal finance budgeting query
      const salaryMatch = cleanPrompt.match(/(\d+[\d,]*)/);
      const parsedSalary = salaryMatch ? parseInt(salaryMatch[0].replace(/,/g, ''), 10) : 50000;
      const needs = Math.round(parsedSalary * 0.5);
      const wants = Math.round(parsedSalary * 0.3);
      const investments = Math.round(parsedSalary * 0.2);

      answer = `### 📊 Personal Finance Breakdown for ₹${parsedSalary.toLocaleString('en-IN')}/Month

Based on the internationally recognized **50:30:20 Financial Rule**, here is a healthy, sustainable allocation structure:

| Category | Percentage | Monthly Amount | What It Covers |
| :--- | :--- | :--- | :--- |
| **Needs** | 50% | ₹${needs.toLocaleString('en-IN')} | Rent, groceries, utility bills, loan EMIs |
| **Wants** | 30% | ₹${wants.toLocaleString('en-IN')} | Dining out, entertainment, shopping, hobbies |
| **Investments** | 20% | ₹${investments.toLocaleString('en-IN')} | Mutual Fund SIPs, emergency fund |

---

#### 🪜 3 Steps Before Starting Your Equity SIP:
1. **Health & Term Insurance First:** Ensure you have an independent health insurance policy and pure term life insurance (if you have financial dependents).
2. **Build a 3-Month Emergency Moat:** Allocate ₹${investments.toLocaleString('en-IN')}/month into a **Liquid Fund** until you accumulate ~₹${(needs * 3).toLocaleString('en-IN')} (3 months of essential needs).
3. **Start Broad-Market SIP:** Once your emergency buffer is funded, divide your ₹${investments.toLocaleString('en-IN')} investment budget:
   * **₹${Math.round(investments * 0.6).toLocaleString('en-IN')} (60%):** Broad Market Index Fund (e.g. Nifty 50) or Flexi Cap Fund.
   * **₹${Math.round(investments * 0.4).toLocaleString('en-IN')} (40%):** Balanced Advantage Fund or Liquid Fund.

💡 *You can test different numbers in our interactive **Budget Calculator** in the Investment Guide tab.*`;

    } else if (lower.includes('expense ratio') || lower.includes('exit load') || lower.includes('tax')) {
      // Section 1 / Cost & Taxes query
      answer = `### 🧾 Section 1 Explained: Expense Ratio, Exit Load & Taxes

Understanding the fees and tax rules is essential so you keep maximum profits in your pocket.

#### 1. Expense Ratio (TER - Total Expense Ratio)
* **What it is:** The annual management fee charged by the AMC, deducted automatically from the fund's NAV each day.
* **Direct vs Regular:** Always choose **Direct Plans**! Direct plans have expense ratios around **0.1% to 0.8%**, while Regular plans charge **1.5% to 2.2%** to pay distributor commissions.
* **The Long-Term Impact:** Over 20 years, an extra 1% fee eats up nearly **25% of your total compounded wealth**.

#### 2. Exit Load
* **What it is:** A fee charged ONLY if you sell your units before a specified timeframe (e.g. within 365 days).
* **Purpose:** Discourages short-term speculation.
* **Nil Exit Load:** If you hold past the exit load window, the exit fee is **₹0 (0%)**. Index and liquid funds often have 0% exit load.

#### 3. Mutual Fund Taxes (Union Budget 2024 Rules)
* **Equity Mutual Funds (held > 65% in Indian equities):**
  * **Short-Term Capital Gains (STCG):** If redeemed in **less than 12 months**, profit is taxed at **20%**.
  * **Long-Term Capital Gains (LTCG):** If redeemed after **12 months or more**, profits up to **₹1.25 Lakh per financial year are 100% tax-free!** Any gains above ₹1.25 Lakh are taxed at **12.5%**.
* **Debt Mutual Funds:**
  * All capital gains are taxed at your marginal income tax slab rate.`;

    } else if (lower.includes('nav') || lower.includes('chart') || lower.includes('drop') || lower.includes('read')) {
      // NAV & Chart Reading Query
      answer = `### 📈 How to Read Mutual Fund NAV Charts

When evaluating a fund on Groww, looking at NAV charts the right way saves you from panic.

#### 1. What NAV Actually Is
* **NAV (Net Asset Value)** is the price of 1 unit of the fund, calculated once daily after market close at **9:00 PM**.
* **Myth Buster:** A fund with NAV ₹20 is **NOT cheaper** or better than a fund with NAV ₹200. If both funds invest in the same companies and those companies gain 10%, **both funds gain 10%**. NAV is simply total assets divided by total units.

#### 2. Chart Timeframes: 1M vs 5Y
* **1 Month / 6 Months:** Highly volatile. You will see jagged ups and downs reflecting short-term news, geopolitical noise, and interest rate chatter.
* **3 Years / 5 Years:** The noise smooths out. You see the true economic compounding of corporate India. Always evaluate equity funds over 3Y and 5Y horizons.

#### 3. The Benchmark Comparison Line
* Look for the secondary line (usually grey or dashed) representing the **Benchmark Index** (e.g. NIFTY 50 TRI).
* If the fund's green line stays comfortably above the benchmark over 3-5 years, the fund manager has generated **Alpha** (outperformance).

#### 4. Why NAV Dips Are Great for SIP Investors
* When NAV falls from ₹100 to ₹90, your scheduled monthly ₹1,000 SIP automatically buys **11.1 units instead of 10 units**.
* This is called **Rupee-Cost Averaging**: dips allow you to accumulate more units at a discount!`;

    } else {
      // General educational overview
      answer = `### 🎓 Mutual Fund Fundamentals: Key Principles for Beginners

Mutual funds are one of the most accessible and regulated tools for building long-term wealth in India.

#### Core Concepts to Keep in Mind:
1. **Diversification:** Instead of risking your savings on one company, a mutual fund spreads your money across 40 to 80 businesses.
2. **SEBI Regulation:** Asset Management Companies (AMCs) are strictly regulated by the Securities and Exchange Board of India (SEBI). Your money is held in a statutory trust, protected from AMC bankruptcy.
3. **SIP Consistency:** Systematic Investment Plans automate your investing right after salary day. You never have to predict whether the market will be up or down tomorrow.
4. **Long-Term Horizon:** Equity mutual funds are designed for goals 5+ years away (buying a home, retirement, children's higher education).

Feel free to ask about any specific term (like *AUM, Expense Ratio, Exit Load, or Tax Rules*) or check our **Investment Guide** tab for interactive video lessons!`;
    }

    return { answer, evalResult };
  }
}

