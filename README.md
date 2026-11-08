# Groww Mutual Funds MVP — First-Time Investor Education & Eval-Gated Platform

A responsive, pixel-perfect clone of the **Groww** mobile app with a web view, specifically tailored for investors who are new to mutual fund investing.

Built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**, featuring an **Eval-Gated AI Assistant** ("Groww Mitra") that enforces strict SEBI non-recommendation rules, prevents FOMO/urgency, and provides visible quality verification with safe regulatory fallbacks.

---

## 🌟 Key Product Features

### 1. Dual Viewport Experience (Mobile Shell & Full Web View)
* **Mobile Frame View**: Simulates the authentic Groww iOS/Android experience with a Dynamic Island notch, realistic status bar (9:41, 5G, Battery), and bottom home indicator.
* **Full Web View**: Responsive desktop browser view for evaluators and larger screens.
* **First-Time Investor Toggle**: Global toggle (`🌱 First-Time Investor: ON/OFF`) in the top bar to preview the beginner onboarding and first-order guided nudges versus an experienced investor view.
* **Dark / Light Mode**: Seamless theme switching matching Groww's design palette.

---

### 2. Comprehensive Mutual Fund Investment Guide
Designed specifically for newcomers who lack personal finance knowledge, don't understand financial jargon, and struggle to read NAV charts:
* **Interactive AI Visual Video Player & Direct YouTube Integration**:
  * Users can switch seamlessly between an interactive AI-generated video player (with synced transcript, chapter scrubbers, and key takeaways) and direct embedded YouTube masterclasses with "Watch on YouTube" links.
* **Personal Finance Budget Planner (50:30:20 Rule)**:
  * Interactive sliders for in-hand salary, essential expenses, EMIs, and emergency savings.
  * Calculates safe monthly mutual fund budget, prioritizing a 3-6 month emergency fund in Liquid Funds before equity SIPs.
* **Jargon Buster (Glossary)**:
  * Decodes **NAV, AUM, Expense Ratio, Exit Load, SIP, CAGR & XIRR, Benchmark Index, Direct vs Regular Plans, Riskometer, and Capital Gains Taxes**.
  * Each term includes plain-English explanations, "Why it matters for you", real-world analogies, and concrete examples.
* **Interactive NAV Chart Anatomy**:
  * Teaches beginners how to interpret 1M vs 5Y charts, compare against the Benchmark Index (Nifty 50 TRI), understand drawdowns as buying opportunities, and distinguish short-term noise from long-term compounding.
* **The 6 Mandatory Fund Sections Guide**:
  1. *Expense Ratio, Exit Load & Taxes* (Union Budget 2024 LTCG/STCG rules & Direct plan savings)
  2. *How to Use the Return Calculator* (SIP vs Lump Sum compounding math)
  3. *Holdings & Diversification* (Top 10 company weightages & AAA/SOV debt ratings)
  4. *Returns & Rankings* (Category Average comparison and quartile consistency)
  5. *Fund Manager Details* (Tenure, experience, and other schemes)
  6. *Fund House & Investment Objective* (AMC size, philosophy, and SEBI Riskometer)
* **Directory of All Mutual Fund Types**:
  * SEBI standardized categorizations across Equity (Index, Large Cap, Mid Cap, Small Cap, Flexi Cap, ELSS), Debt (Liquid, Corporate Bond), and Hybrid (Balanced Advantage).

---

### 3. First-Time SIP Order Journey with Guided Nudges
When a first-time investor starts an SIP, the order flow displays calm, step-by-step educational nudges:
* **Step 1: Monthly Amount & Date**: Explains why starting small (₹500/₹1,000) builds discipline and why selecting an SIP date 2-3 days after salary day prevents insufficient fund errors.
* **Step 2: Bank Mandate & Autopay**: Explains the RBI-regulated NPCI e-Mandate, 48-hour prior debit alerts, and highlights that SIPs can be paused or cancelled anytime with zero penalty.
* **Step 3: Cut-off Times & NAV Allocation**: Explains SEBI's 2:00 PM cut-off rule, same-day NAV pricing, and T+1/T+2 working day unit credit timelines.
* **Step 4: Confirmation & Mindset Reassurance**: Celebrates with confetti and reinforces long-term patience (e.g., reminding users not to panic if NAV dips in week 1).

*Strictly adheres to constraints: Zero specific fund/stock recommendations and zero FOMO/urgency nudges.*

---

### 4. Eval-Gated AI Feature ("Groww Mitra")
The MVP is built around an **eval-gated AI assistant** with visible quality checks and automated safe fallbacks:
* **Automated Guardrail Pipeline**:
  * **Gate 1 (SEBI RIA Recommendation Gate)**: Detects requests to pick specific funds ("Which fund should I buy?", "Is Fund X good?") or stock tips.
    * *Fallback*: Declines specific recommendation, explains the objective 4-step framework for choosing a fund category, and provides official AMFI knowledge center links.
  * **Gate 2 (FOMO & Urgency Barrier)**: Detects hype, fear-of-missing-out, or rush cues ("Market is soaring! Should I invest urgently?").
    * *Fallback*: De-escalates urgency, explains why market timing fails, and reinforces SIP rupee-cost averaging.
  * **Gate 3 (Financial Hazard Gate)**: Detects dangerous leverage ("Can I take a personal loan to invest in small caps?").
    * *Fallback*: Blocks the hazard, warns against borrowing for market-linked investments, and mandates emergency buffers.
  * **Gate 4 (Regulatory Grounding & Citations)**: Verifies answers against SEBI Categorization Guidelines and Union Budget 2024 tax rules (STCG 20%, LTCG 12.5% > ₹1.25L).
* **Visible Quality Badge on Every Answer**:
  * Displays a clickable audit pill (`🛡️ Quality & Safety Eval: PASSED` or `⚠️ Safe Fallback Activated: Specific Advice Refused`).
  * Expands to reveal individual gate checks, latency (ms), rule citations, and verified links to AMFI / SEBI.
* **Eval Gate Inspector Modal**:
  * Allows reviewers to audit the live pipeline and run an **Automated 8-Test Benchmark Suite** testing adversarial prompts with real-time pass/fail scorecards.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Build production bundle
npm run build

# 3. Start local development server
npm run dev
# Server will start on http://localhost:3000
```

