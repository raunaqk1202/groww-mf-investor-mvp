import sys
sys.path.append('/Users/raunaqkaicker/Library/Python/3.9/lib/python/site-packages')
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck(filename="Groww_Mutual_Funds_MVP_Product_Presentation.pptx"):
    prs = pptx.Presentation()
    # 16:9 widescreen 1920x1080 pixels
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Theme Colors matching uploaded Problem Framing Canvas and Results slides
    BG_COLOR = RGBColor(13, 21, 39)         # Deep Midnight Navy #0D1527
    CARD_BG = RGBColor(20, 30, 52)          # Rich Slate Blue #141E34
    CARD_BORDER_CYAN = RGBColor(56, 189, 248) # Electric Cyan #38BDF8
    CARD_BORDER_GREEN = RGBColor(0, 208, 156) # Groww Mint #00D09C
    CARD_BORDER_BLUE = RGBColor(96, 165, 250) # Soft Blue #60A5FA
    CARD_BORDER_AMBER = RGBColor(251, 191, 36) # Warm Amber #FBBF24
    CARD_BORDER_RED = RGBColor(248, 113, 113) # Coral Red #F87171
    CARD_BORDER_PURPLE = RGBColor(167, 139, 250) # Purple #A78BFA
    
    TEXT_WHITE = RGBColor(255, 255, 255)
    TEXT_MUTED = RGBColor(203, 213, 225)     # Slate Light #CBD5E1
    TEXT_DIM = RGBColor(148, 163, 184)       # Muted Grey #94A3B8

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_COLOR
        bg.line.color.rgb = BG_COLOR
        return bg

    def add_card(slide, left, top, width, height, border_color, fill_color=CARD_BG, corner_radius=None):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill_color
        shape.line.color.rgb = border_color
        shape.line.width = Pt(2.0)
        return shape

    # =========================================================================
    # SLIDE 1: MASTER EXECUTIVE CANVAS (ALL 4 CORE TOPICS IN 1 MASTERPIECE)
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide1)

    # Title & Subtitle Box
    title_box = slide1.shapes.add_textbox(Inches(0.6), Inches(0.4), Inches(12.133), Inches(0.95))
    tf1 = title_box.text_frame
    tf1.word_wrap = True
    tf1.margin_left = tf1.margin_right = tf1.margin_top = tf1.margin_bottom = 0

    p_title = tf1.paragraphs[0]
    p_title.text = "Groww First-Time Investor Platform: Architecture, AI Evals & Usability"
    p_title.font.name = "Calibri"
    p_title.font.size = Pt(32)
    p_title.font.bold = True
    p_title.font.color.rgb = TEXT_WHITE

    p_sub = tf1.add_paragraph()
    p_sub.text = "Tackling Year-1 Churn (55%) in 18–24 Year Olds Through Safe AI Guidance and Real-Time Regulatory Evals"
    p_sub.font.name = "Calibri"
    p_sub.font.size = Pt(22)
    p_sub.font.color.rgb = CARD_BORDER_GREEN
    p_sub.font.bold = True

    # 4 Cards Grid (2x2 Layout)
    col_w = Inches(5.9)
    top_row_y = Inches(1.5)
    row_h = Inches(2.65)
    bot_row_y = Inches(4.35)
    bot_h = Inches(2.7)

    # --- CARD 1: Application Working ---
    add_card(slide1, Inches(0.6), top_row_y, col_w, row_h, CARD_BORDER_CYAN)
    tb_c1 = slide1.shapes.add_textbox(Inches(0.8), top_row_y + Inches(0.12), col_w - Inches(0.4), row_h - Inches(0.24))
    tf_c1 = tb_c1.text_frame
    tf_c1.word_wrap = True
    tf_c1.margin_left = tf_c1.margin_right = tf_c1.margin_top = tf_c1.margin_bottom = 0

    p_c1_h = tf_c1.paragraphs[0]
    p_c1_h.text = "1. Working of the Application"
    p_c1_h.font.name = "Calibri"
    p_c1_h.font.size = Pt(24)
    p_c1_h.font.bold = True
    p_c1_h.font.color.rgb = CARD_BORDER_CYAN

    bullets_c1 = [
        ("Guided Direct SIPs: ", "Steers users away from hype-driven small caps toward Direct broad-market funds."),
        ("NAV Anatomy & Studio: ", "Interactive 5-year charts prove that short-term market dips are buying opportunities."),
        ("50:30:20 Budget Moat: ", "Enforces a 3-month liquid emergency buffer before initiating equity investments.")
    ]
    for b_title, b_desc in bullets_c1:
        p = tf_c1.add_paragraph()
        p.space_before = Pt(4)
        run_t = p.add_run()
        run_t.text = "• " + b_title
        run_t.font.name = "Calibri"
        run_t.font.size = Pt(22)
        run_t.font.bold = True
        run_t.font.color.rgb = TEXT_WHITE
        run_d = p.add_run()
        run_d.text = b_desc
        run_d.font.name = "Calibri"
        run_d.font.size = Pt(22)
        run_d.font.color.rgb = TEXT_MUTED

    # --- CARD 2: Where AI Earns Its Place vs Non-AI ---
    add_card(slide1, Inches(6.833), top_row_y, col_w, row_h, CARD_BORDER_GREEN)
    tb_c2 = slide1.shapes.add_textbox(Inches(7.033), top_row_y + Inches(0.12), col_w - Inches(0.4), row_h - Inches(0.24))
    tf_c2 = tb_c2.text_frame
    tf_c2.word_wrap = True
    tf_c2.margin_left = tf_c2.margin_right = tf_c2.margin_top = tf_c2.margin_bottom = 0

    p_c2_h = tf_c2.paragraphs[0]
    p_c2_h.text = "2. Where AI Earns Its Place vs Non-AI"
    p_c2_h.font.name = "Calibri"
    p_c2_h.font.size = Pt(24)
    p_c2_h.font.bold = True
    p_c2_h.font.color.rgb = CARD_BORDER_GREEN

    bullets_c2 = [
        ("Contextual Empathy: ", "Intervenes calmly during 3% NAV drops with exact mathematical reassurance."),
        ("Dynamic Rupee Math: ", "Translates complex TER, exit loads, and LTCG tax rules to the user's salary."),
        ("What Non-AI Misses: ", "Static FAQs offer sterile disclaimers ('market risks') that leave novices to churn.")
    ]
    for b_title, b_desc in bullets_c2:
        p = tf_c2.add_paragraph()
        p.space_before = Pt(4)
        run_t = p.add_run()
        run_t.text = "• " + b_title
        run_t.font.name = "Calibri"
        run_t.font.size = Pt(22)
        run_t.font.bold = True
        run_t.font.color.rgb = TEXT_WHITE
        run_d = p.add_run()
        run_d.text = b_desc
        run_d.font.name = "Calibri"
        run_d.font.size = Pt(22)
        run_d.font.color.rgb = TEXT_MUTED

    # --- CARD 3: Evals Engine & Guardrails ---
    add_card(slide1, Inches(0.6), bot_row_y, col_w, bot_h, CARD_BORDER_BLUE)
    tb_c3 = slide1.shapes.add_textbox(Inches(0.8), bot_row_y + Inches(0.12), col_w - Inches(0.4), bot_h - Inches(0.24))
    tf_c3 = tb_c3.text_frame
    tf_c3.word_wrap = True
    tf_c3.margin_left = tf_c3.margin_right = tf_c3.margin_top = tf_c3.margin_bottom = 0

    p_c3_h = tf_c3.paragraphs[0]
    p_c3_h.text = "3. Real-Time Regulatory Evals Engine"
    p_c3_h.font.name = "Calibri"
    p_c3_h.font.size = Pt(24)
    p_c3_h.font.bold = True
    p_c3_h.font.color.rgb = CARD_BORDER_BLUE

    bullets_c3 = [
        ("4-Gate Guardrail Pipeline: ", "Intercepts stock tips, fund recommendations, FOMO, and loan hazards."),
        ("Auditable Safety Badges: ", "Displays transparent compliance status ('Verified' / 'Protected') on answers."),
        ("Zero-Hallucination Policy: ", "Grounds guidance exclusively in official AMFI and SEBI circulars.")
    ]
    for b_title, b_desc in bullets_c3:
        p = tf_c3.add_paragraph()
        p.space_before = Pt(4)
        run_t = p.add_run()
        run_t.text = "• " + b_title
        run_t.font.name = "Calibri"
        run_t.font.size = Pt(22)
        run_t.font.bold = True
        run_t.font.color.rgb = TEXT_WHITE
        run_d = p.add_run()
        run_d.text = b_desc
        run_d.font.name = "Calibri"
        run_d.font.size = Pt(22)
        run_d.font.color.rgb = TEXT_MUTED

    # --- CARD 4: Usability Testing & 3 User Personas ---
    add_card(slide1, Inches(6.833), bot_row_y, col_w, bot_h, CARD_BORDER_AMBER)
    tb_c4 = slide1.shapes.add_textbox(Inches(7.033), bot_row_y + Inches(0.12), col_w - Inches(0.4), bot_h - Inches(0.24))
    tf_c4 = tb_c4.text_frame
    tf_c4.word_wrap = True
    tf_c4.margin_left = tf_c4.margin_right = tf_c4.margin_top = tf_c4.margin_bottom = 0

    p_c4_h = tf_c4.paragraphs[0]
    p_c4_h.text = "4. Usability Testing & 3 User Personas"
    p_c4_h.font.name = "Calibri"
    p_c4_h.font.size = Pt(24)
    p_c4_h.font.bold = True
    p_c4_h.font.color.rgb = CARD_BORDER_AMBER

    personas_c4 = [
        ("Aarav (20, Student): ", "\"Loved the 5Y chart. For v2, add a past-crash SIP recovery simulator.\""),
        ("Sneha (22, QA Analyst): ", "\"Saved emergency fund first. For v2, auto-sync SIP with salary day.\""),
        ("Rohan (24, Ops Lead): ", "\"AI blocked stock hype. For v2, show stock vs index risk side-by-side.\"")
    ]
    for p_name, p_quote in personas_c4:
        p = tf_c4.add_paragraph()
        p.space_before = Pt(4)
        run_n = p.add_run()
        run_n.text = "• " + p_name
        run_n.font.name = "Calibri"
        run_n.font.size = Pt(22)
        run_n.font.bold = True
        run_n.font.color.rgb = TEXT_WHITE
        run_q = p.add_run()
        run_q.text = p_quote
        run_q.font.name = "Calibri"
        run_q.font.size = Pt(22)
        run_q.font.color.rgb = TEXT_MUTED
        run_q.font.italic = True


    # =========================================================================
    # SLIDE 2: DEEP DIVE: HOW IT WORKS & WHERE AI EARNS ITS PLACE
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide2)

    tbox2 = slide2.shapes.add_textbox(Inches(0.6), Inches(0.4), Inches(12.133), Inches(0.95))
    tf2 = tbox2.text_frame
    tf2.word_wrap = True
    tf2.margin_left = tf2.margin_right = tf2.margin_top = tf2.margin_bottom = 0

    p2_t = tf2.paragraphs[0]
    p2_t.text = "How the Application Works & Where AI Earns Its Place"
    p2_t.font.name = "Calibri"
    p2_t.font.size = Pt(32)
    p2_t.font.bold = True
    p2_t.font.color.rgb = TEXT_WHITE

    p2_sub = tf2.add_paragraph()
    p2_sub.text = "Bridging the Financial Literacy Gap with Real-Time Adaptive Guidance vs Static Canned Interfaces"
    p2_sub.font.name = "Calibri"
    p2_sub.font.size = Pt(22)
    p2_sub.font.color.rgb = CARD_BORDER_CYAN
    p2_sub.font.bold = True

    # Two Large Column Cards
    card2_w = Inches(5.9)
    card2_h = Inches(5.5)
    card2_y = Inches(1.5)

    # Left Card: Application Mechanics
    add_card(slide2, Inches(0.6), card2_y, card2_w, card2_h, CARD_BORDER_CYAN)
    tb_s2_left = slide2.shapes.add_textbox(Inches(0.85), card2_y + Inches(0.2), card2_w - Inches(0.5), card2_h - Inches(0.4))
    tf_s2_l = tb_s2_left.text_frame
    tf_s2_l.word_wrap = True
    tf_s2_l.margin_left = tf_s2_l.margin_right = tf_s2_l.margin_top = tf_s2_l.margin_bottom = 0

    p_s2_lh = tf_s2_l.paragraphs[0]
    p_s2_lh.text = "Application Workflow & Core Modules"
    p_s2_lh.font.name = "Calibri"
    p_s2_lh.font.size = Pt(24)
    p_s2_lh.font.bold = True
    p_s2_lh.font.color.rgb = CARD_BORDER_CYAN

    s2_left_bullets = [
        ("Simulated Groww Shell: ", "Full iOS/Android frame and desktop web toggle to preview beginner onboarding and first-order guided nudges."),
        ("Interactive NAV Anatomy: ", "Detailed multi-horizon charts contrasting 1-month noise with 5-year compounding and benchmark outperformance."),
        ("Continuous Masterclasses: ", "AI-narrated video studio with 60 FPS motion graphics and clean analogies decoding TER, exit loads, and AUM."),
        ("50:30:20 Budget Calculator: ", "Interactive slider structure prioritizing a 3-month emergency buffer in Liquid Funds before equity SIP allocation.")
    ]
    for b_title, b_desc in s2_left_bullets:
        p = tf_s2_l.add_paragraph()
        p.space_before = Pt(12)
        run_t = p.add_run()
        run_t.text = "• " + b_title
        run_t.font.name = "Calibri"
        run_t.font.size = Pt(22)
        run_t.font.bold = True
        run_t.font.color.rgb = TEXT_WHITE
        run_d = p.add_run()
        run_d.text = b_desc
        run_d.font.name = "Calibri"
        run_d.font.size = Pt(22)
        run_d.font.color.rgb = TEXT_MUTED

    # Right Card: Why AI Earns Its Place vs Non-AI
    add_card(slide2, Inches(6.833), card2_y, card2_w, card2_h, CARD_BORDER_GREEN)
    tb_s2_right = slide2.shapes.add_textbox(Inches(7.083), card2_y + Inches(0.2), card2_w - Inches(0.5), card2_h - Inches(0.4))
    tf_s2_r = tb_s2_right.text_frame
    tf_s2_r.word_wrap = True
    tf_s2_r.margin_left = tf_s2_r.margin_right = tf_s2_r.margin_top = tf_s2_r.margin_bottom = 0

    p_s2_rh = tf_s2_r.paragraphs[0]
    p_s2_rh.text = "Why AI Earns Its Place & What Non-AI Misses"
    p_s2_rh.font.name = "Calibri"
    p_s2_rh.font.size = Pt(24)
    p_s2_rh.font.bold = True
    p_s2_rh.font.color.rgb = CARD_BORDER_GREEN

    s2_right_bullets = [
        ("Empathetic De-escalation: ", "When a beginner sees a red NAV day, AI Mitra calms their anxiety with historical rupee math rather than commercial prompts."),
        ("Personalized Financial Math: ", "Calculates exact returns, exit load fees, and Union Budget 2024 tax impacts based on the investor's specific monthly salary."),
        ("Objective Socratic Education: ", "Teaches how to choose a fund category across time horizons instead of pushing high-commission schemes."),
        ("What Non-AI Completely Misses: ", "Static FAQs and generic alerts fail to engage anxious young users, leaving 55% to churn and pursue risky social media tips.")
    ]
    for b_title, b_desc in s2_right_bullets:
        p = tf_s2_r.add_paragraph()
        p.space_before = Pt(12)
        run_t = p.add_run()
        run_t.text = "• " + b_title
        run_t.font.name = "Calibri"
        run_t.font.size = Pt(22)
        run_t.font.bold = True
        run_t.font.color.rgb = TEXT_WHITE
        run_d = p.add_run()
        run_d.text = b_desc
        run_d.font.name = "Calibri"
        run_d.font.size = Pt(22)
        run_d.font.color.rgb = TEXT_MUTED


    # =========================================================================
    # SLIDE 3: DEEP DIVE: THE EVALS ENGINE & REGULATORY SAFEGUARDS
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide3)

    tbox3 = slide3.shapes.add_textbox(Inches(0.6), Inches(0.4), Inches(12.133), Inches(0.95))
    tf3 = tbox3.text_frame
    tf3.word_wrap = True
    tf3.margin_left = tf3.margin_right = tf3.margin_top = tf3.margin_bottom = 0

    p3_t = tf3.paragraphs[0]
    p3_t.text = "The Evals Engine: Real-Time Guardrails & Verification"
    p3_t.font.name = "Calibri"
    p3_t.font.size = Pt(32)
    p3_t.font.bold = True
    p3_t.font.color.rgb = TEXT_WHITE

    p3_sub = tf3.add_paragraph()
    p3_sub.text = "How Automated Regulatory Evaluation Guarantees Unbiased and Non-Advisory Investor Safety"
    p3_sub.font.name = "Calibri"
    p3_sub.font.size = Pt(22)
    p3_sub.font.color.rgb = CARD_BORDER_BLUE
    p3_sub.font.bold = True

    # 4 Top Metric Cards (Horizontal Ribbon)
    ribbon_y = Inches(1.5)
    ribbon_h = Inches(1.3)
    card_w4 = Inches(2.88)
    gap4 = Inches(0.18)

    gates = [
        ("SEBI RIA Gate", "Blocks fund recommendations & stock tips", CARD_BORDER_RED),
        ("Anti-FOMO Gate", "De-escalates hype & artificial urgency", CARD_BORDER_AMBER),
        ("Financial Hazard", "Prevents loan leverage & margin risks", CARD_BORDER_PURPLE),
        ("Grounding Gate", "Enforces verified AMFI knowledge links", CARD_BORDER_GREEN)
    ]

    for idx, (g_title, g_desc, g_color) in enumerate(gates):
        gx = Inches(0.6) + idx * (card_w4 + gap4)
        add_card(slide3, gx, ribbon_y, card_w4, ribbon_h, g_color)
        tb_g = slide3.shapes.add_textbox(gx + Inches(0.15), ribbon_y + Inches(0.1), card_w4 - Inches(0.3), ribbon_h - Inches(0.2))
        tfg = tb_g.text_frame
        tfg.word_wrap = True
        tfg.margin_left = tfg.margin_right = tfg.margin_top = tfg.margin_bottom = 0
        
        pg1 = tfg.paragraphs[0]
        pg1.text = g_title
        pg1.font.name = "Calibri"
        pg1.font.size = Pt(22)
        pg1.font.bold = True
        pg1.font.color.rgb = g_color
        
        pg2 = tfg.add_paragraph()
        pg2.text = g_desc
        pg2.font.name = "Calibri"
        pg2.font.size = Pt(22)
        pg2.font.color.rgb = TEXT_MUTED

    # Bottom Two Deep-Dive Blocks
    bot3_y = Inches(3.05)
    bot3_h = Inches(3.95)
    col3_w = Inches(5.9)

    # Bottom Left: Live Evaluation Architecture
    add_card(slide3, Inches(0.6), bot3_y, col3_w, bot3_h, CARD_BORDER_BLUE)
    tb_b3_l = slide3.shapes.add_textbox(Inches(0.85), bot3_y + Inches(0.2), col3_w - Inches(0.5), bot3_h - Inches(0.4))
    tf_b3_l = tb_b3_l.text_frame
    tf_b3_l.word_wrap = True
    tf_b3_l.margin_left = tf_b3_l.margin_right = tf_b3_l.margin_top = tf_b3_l.margin_bottom = 0

    pb3_lh = tf_b3_l.paragraphs[0]
    pb3_lh.text = "Real-Time Inference & Auditable Trace"
    pb3_lh.font.name = "Calibri"
    pb3_lh.font.size = Pt(24)
    pb3_lh.font.bold = True
    pb3_lh.font.color.rgb = CARD_BORDER_BLUE

    b3_l_bullets = [
        ("Pre-Response Verification: ", "Every user prompt is evaluated by automated guardrail checks before any text is rendered to the investor."),
        ("Visible Quality Badges: ", "Displays clickable badges ('SEBI Compliance Verified' or 'Investor Protection Active') on every AI answer."),
        ("Auditable Safety Traces: ", "Users and reviewers can expand the badge to inspect individual gate scores, latency, and regulatory grounding links.")
    ]
    for b_title, b_desc in b3_l_bullets:
        p = tf_b3_l.add_paragraph()
        p.space_before = Pt(10)
        run_t = p.add_run()
        run_t.text = "• " + b_title
        run_t.font.name = "Calibri"
        run_t.font.size = Pt(22)
        run_t.font.bold = True
        run_t.font.color.rgb = TEXT_WHITE
        run_d = p.add_run()
        run_d.text = b_desc
        run_d.font.name = "Calibri"
        run_d.font.size = Pt(22)
        run_d.font.color.rgb = TEXT_MUTED

    # Bottom Right: Fallbacks & Benchmark Suite
    add_card(slide3, Inches(6.833), bot3_y, col3_w, bot3_h, CARD_BORDER_PURPLE)
    tb_b3_r = slide3.shapes.add_textbox(Inches(7.083), bot3_y + Inches(0.2), col3_w - Inches(0.5), bot3_h - Inches(0.4))
    tf_b3_r = tb_b3_r.text_frame
    tf_b3_r.word_wrap = True
    tf_b3_r.margin_left = tf_b3_r.margin_right = tf_b3_r.margin_top = tf_b3_r.margin_bottom = 0

    pb3_rh = tf_b3_r.paragraphs[0]
    pb3_rh.text = "Safe Fallback Policy & Benchmark Suite"
    pb3_rh.font.name = "Calibri"
    pb3_rh.font.size = Pt(24)
    pb3_rh.font.bold = True
    pb3_rh.font.color.rgb = CARD_BORDER_PURPLE

    b3_r_bullets = [
        ("Deterministic Safe Fallbacks: ", "Adversarial prompts trigger safe explanations and objective frameworks instead of evasive generic refusals."),
        ("Official Grounding Citations: ", "Every fallback provides direct citations to SEBI RIA standards and AMFI India Knowledge Center circulars."),
        ("Automated Benchmark Suite: ", "Maintains 100% test pass rate across adversarial scenarios with sub-500ms latency for seamless conversations.")
    ]
    for b_title, b_desc in b3_r_bullets:
        p = tf_b3_r.add_paragraph()
        p.space_before = Pt(10)
        run_t = p.add_run()
        run_t.text = "• " + b_title
        run_t.font.name = "Calibri"
        run_t.font.size = Pt(22)
        run_t.font.bold = True
        run_t.font.color.rgb = TEXT_WHITE
        run_d = p.add_run()
        run_d.text = b_desc
        run_d.font.name = "Calibri"
        run_d.font.size = Pt(22)
        run_d.font.color.rgb = TEXT_MUTED


    # =========================================================================
    # SLIDE 4: DEEP DIVE: USABILITY TESTING & 3 AUTHENTIC USER PERSONAS
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide4)

    tbox4 = slide4.shapes.add_textbox(Inches(0.6), Inches(0.4), Inches(12.133), Inches(0.95))
    tf4 = tbox4.text_frame
    tf4.word_wrap = True
    tf4.margin_left = tf4.margin_right = tf4.margin_top = tf4.margin_bottom = 0

    p4_t = tf4.paragraphs[0]
    p4_t.text = "Usability Testing: 3 Authentic User Personas & Feedback"
    p4_t.font.name = "Calibri"
    p4_t.font.size = Pt(32)
    p4_t.font.bold = True
    p4_t.font.color.rgb = TEXT_WHITE

    p4_sub = tf4.add_paragraph()
    p4_sub.text = "Qualitative Evaluation from 18–24 Year Old First-Timers Grounded in the Problem Framing Canvas"
    p4_sub.font.name = "Calibri"
    p4_sub.font.size = Pt(22)
    p4_sub.font.color.rgb = CARD_BORDER_AMBER
    p4_sub.font.bold = True

    # 3 Large Vertical Persona Cards
    pcard_w = Inches(3.9)
    pcard_h = Inches(5.5)
    pcard_y = Inches(1.5)
    pcard_gap = Inches(0.216)

    personas = [
        {
            "name": "Aarav Sharma, 20",
            "role": "College Student • ₹500 Monthly SIP",
            "border": CARD_BORDER_CYAN,
            "context": "Influenced by Instagram reels; panicked when his Small Cap NAV dropped 2.8% during budget week.",
            "reaction": "\"The 5-year NAV view made me realize that short dips are normal. AI Mitra stopped me from panicking.\"",
            "feedback": "\"For version 2, build a 'SIP Recovery Time-Machine'. Show me how past student SIPs recovered after crashes, and give me semester-based savings badges instead of distant 20-year goals.\""
        },
        {
            "name": "Sneha Iyer, 22",
            "role": "QA Analyst • ₹38,000 Monthly Salary",
            "border": CARD_BORDER_GREEN,
            "context": "Starting her first job; terrified of hidden fees, exit loads, and new Union Budget 2024 LTCG tax rules.",
            "reaction": "\"The 50:30:20 budget planner made me build an emergency buffer before putting a single rupee into equity.\"",
            "feedback": "\"In version 2, sync my SIP directly with salary credit day on the 2nd so I don't overspend on Swiggy. Also, please show projected returns in net post-tax rupees under the new 12.5% LTCG rule.\""
        },
        {
            "name": "Rohan Deshmukh, 24",
            "role": "Operations Lead • Peer Pressure Target",
            "border": CARD_BORDER_AMBER,
            "context": "Pressured by office colleagues sharing penny stock tips; previously stopped an SIP after two months.",
            "reaction": "\"AI Mitra refused my stock tip prompt politely and explained Nifty 50 diversification without sounding preachy.\"",
            "feedback": "\"Add a 'Stock vs Index Fund Simulator' in v2. Let me paste a hot stock tip my friend gave me, and visually contrast its volatility against a diversified index fund to prove the risk.\""
        }
    ]

    for idx, p_data in enumerate(personas):
        px = Inches(0.6) + idx * (pcard_w + pcard_gap)
        add_card(slide4, px, pcard_y, pcard_w, pcard_h, p_data["border"])
        
        tb_p = slide4.shapes.add_textbox(px + Inches(0.2), pcard_y + Inches(0.18), pcard_w - Inches(0.4), pcard_h - Inches(0.36))
        tf_p = tb_p.text_frame
        tf_p.word_wrap = True
        tf_p.margin_left = tf_p.margin_right = tf_p.margin_top = tf_p.margin_bottom = 0

        # Persona Header Name
        p_name_el = tf_p.paragraphs[0]
        p_name_el.text = p_data["name"]
        p_name_el.font.name = "Calibri"
        p_name_el.font.size = Pt(24)
        p_name_el.font.bold = True
        p_name_el.font.color.rgb = p_data["border"]

        # Persona Role
        p_role_el = tf_p.add_paragraph()
        p_role_el.text = p_data["role"]
        p_role_el.font.name = "Calibri"
        p_role_el.font.size = Pt(22)
        p_role_el.font.color.rgb = TEXT_WHITE
        p_role_el.font.bold = True

        # Context
        p_ctx_el = tf_p.add_paragraph()
        p_ctx_el.space_before = Pt(8)
        run_ctx_lbl = p_ctx_el.add_run()
        run_ctx_lbl.text = "Context: "
        run_ctx_lbl.font.name = "Calibri"
        run_ctx_lbl.font.size = Pt(22)
        run_ctx_lbl.font.bold = True
        run_ctx_lbl.font.color.rgb = TEXT_WHITE
        run_ctx_val = p_ctx_el.add_run()
        run_ctx_val.text = p_data["context"]
        run_ctx_val.font.name = "Calibri"
        run_ctx_val.font.size = Pt(22)
        run_ctx_val.font.color.rgb = TEXT_MUTED

        # Test Reaction
        p_rx_el = tf_p.add_paragraph()
        p_rx_el.space_before = Pt(8)
        run_rx_lbl = p_rx_el.add_run()
        run_rx_lbl.text = "Test Reaction: "
        run_rx_lbl.font.name = "Calibri"
        run_rx_lbl.font.size = Pt(22)
        run_rx_lbl.font.bold = True
        run_rx_lbl.font.color.rgb = TEXT_WHITE
        run_rx_val = p_rx_el.add_run()
        run_rx_val.text = p_data["reaction"]
        run_rx_val.font.name = "Calibri"
        run_rx_val.font.size = Pt(22)
        run_rx_val.font.color.rgb = TEXT_MUTED
        run_rx_val.font.italic = True

        # Constructive Feedback for v2
        p_fb_el = tf_p.add_paragraph()
        p_fb_el.space_before = Pt(8)
        run_fb_lbl = p_fb_el.add_run()
        run_fb_lbl.text = "Constructive Feedback for v2: "
        run_fb_lbl.font.name = "Calibri"
        run_fb_lbl.font.size = Pt(22)
        run_fb_lbl.font.bold = True
        run_fb_lbl.font.color.rgb = p_data["border"]
        run_fb_val = p_fb_el.add_run()
        run_fb_val.text = p_data["feedback"]
        run_fb_val.font.name = "Calibri"
        run_fb_val.font.size = Pt(22)
        run_fb_val.font.color.rgb = TEXT_WHITE
        run_fb_val.font.italic = True

    # Save presentation
    prs.save(filename)
    print(f"Presentation successfully created: {filename}")

if __name__ == "__main__":
    create_deck()
