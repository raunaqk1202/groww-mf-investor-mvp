import sys
sys.path.append('/Users/raunaqkaicker/Library/Python/3.9/lib/python/site-packages')
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def build_single_slide_deck(filename="Groww_Mutual_Funds_MVP_Product_Presentation.pptx"):
    prs = pptx.Presentation()
    # 16:9 widescreen 1920x1080 pixels
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Create ONLY 1 slide
    slide = prs.slides.add_slide(blank_layout)

    # Color Palette matching attached Problem Framing Canvas
    BG_COLOR = RGBColor(13, 21, 39)           # Deep Midnight Navy #0D1527
    CARD_BG = RGBColor(20, 30, 52)            # Slate Blue Container #141E34
    BORDER_CYAN = RGBColor(56, 189, 248)      # Electric Cyan #38BDF8
    BORDER_MINT = RGBColor(0, 208, 156)       # Groww Mint #00D09C
    BORDER_BLUE = RGBColor(96, 165, 250)      # Soft Cornflower Blue #60A5FA
    BORDER_AMBER = RGBColor(251, 191, 36)     # Warm Amber Gold #FBBF24
    
    TEXT_WHITE = RGBColor(255, 255, 255)
    TEXT_MUTED = RGBColor(203, 213, 225)       # Slate Light #CBD5E1

    # Slide Background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = BG_COLOR
    bg.line.color.rgb = BG_COLOR

    def add_card(left, top, width, height, border_color):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = CARD_BG
        shape.line.color.rgb = border_color
        shape.line.width = Pt(2.0)
        return shape

    # =========================================================================
    # 1. TOP HEADER (Title & Subtitle)
    # =========================================================================
    tb_header = slide.shapes.add_textbox(Inches(0.5), Inches(0.32), Inches(12.333), Inches(0.9))
    tf_h = tb_header.text_frame
    tf_h.word_wrap = True
    tf_h.margin_left = tf_h.margin_right = tf_h.margin_top = tf_h.margin_bottom = 0

    p_title = tf_h.paragraphs[0]
    p_title.text = "Groww Mutual Funds MVP: Product Architecture, AI Evals & Usability"
    p_title.font.name = "Calibri"
    p_title.font.size = Pt(30)
    p_title.font.bold = True
    p_title.font.color.rgb = TEXT_WHITE

    p_sub = tf_h.add_paragraph()
    p_sub.space_before = Pt(2)
    p_sub.text = "Solving Year-1 Churn (55%) in 18–24 Year Olds Through Safe AI Guidance and Real-Time Regulatory Evals"
    p_sub.font.name = "Calibri"
    p_sub.font.size = Pt(22)
    p_sub.font.bold = True
    p_sub.font.color.rgb = BORDER_MINT

    # Coordinates for Grid
    card_w = Inches(3.95)
    gap_x = Inches(0.24)
    c1_x = Inches(0.5)
    c2_x = c1_x + card_w + gap_x
    c3_x = c2_x + card_w + gap_x

    top_y = Inches(1.35)
    top_h = Inches(2.55)

    # =========================================================================
    # 2. TOP ROW (3 Architecture Cards)
    # =========================================================================

    # --- TOP CARD 1: Working of the Application ---
    add_card(c1_x, top_y, card_w, top_h, BORDER_CYAN)
    tb_t1 = slide.shapes.add_textbox(c1_x + Inches(0.18), top_y + Inches(0.12), card_w - Inches(0.36), top_h - Inches(0.24))
    tf_t1 = tb_t1.text_frame
    tf_t1.word_wrap = True
    tf_t1.margin_left = tf_t1.margin_right = tf_t1.margin_top = tf_t1.margin_bottom = 0

    p_t1_h = tf_t1.paragraphs[0]
    p_t1_h.text = "1. How the App Works"
    p_t1_h.font.name = "Calibri"
    p_t1_h.font.size = Pt(24)
    p_t1_h.font.bold = True
    p_t1_h.font.color.rgb = BORDER_CYAN

    bullets_t1 = [
        ("Guided Direct SIPs: ", "Filters by time horizon, not hype; steers novices to Direct index funds."),
        ("NAV Anatomy: ", "Interactive 5Y charts prove dips are buying discounts, not lost money."),
        ("50:30:20 Moat: ", "Prioritizes 3-month Liquid buffer before equity investing.")
    ]
    for b_title, b_desc in bullets_t1:
        p = tf_t1.add_paragraph()
        p.space_before = Pt(3)
        r1 = p.add_run()
        r1.text = "• " + b_title
        r1.font.name = "Calibri"
        r1.font.size = Pt(22)
        r1.font.bold = True
        r1.font.color.rgb = TEXT_WHITE
        r2 = p.add_run()
        r2.text = b_desc
        r2.font.name = "Calibri"
        r2.font.size = Pt(22)
        r2.font.color.rgb = TEXT_MUTED

    # --- TOP CARD 2: Where AI Earns Its Place vs Non-AI ---
    add_card(c2_x, top_y, card_w, top_h, BORDER_MINT)
    tb_t2 = slide.shapes.add_textbox(c2_x + Inches(0.18), top_y + Inches(0.12), card_w - Inches(0.36), top_h - Inches(0.24))
    tf_t2 = tb_t2.text_frame
    tf_t2.word_wrap = True
    tf_t2.margin_left = tf_t2.margin_right = tf_t2.margin_top = tf_t2.margin_bottom = 0

    p_t2_h = tf_t2.paragraphs[0]
    p_t2_h.text = "2. Why AI Earns Its Place"
    p_t2_h.font.name = "Calibri"
    p_t2_h.font.size = Pt(24)
    p_t2_h.font.bold = True
    p_t2_h.font.color.rgb = BORDER_MINT

    bullets_t2 = [
        ("Empathetic De-escalation: ", "Intervenes during NAV drops with calm, personalized math."),
        ("Dynamic Rupee Math: ", "Translates complex TER and tax rules to exact salary rupees."),
        ("What Non-AI Misses: ", "Static FAQs give cold warnings that leave novices to churn.")
    ]
    for b_title, b_desc in bullets_t2:
        p = tf_t2.add_paragraph()
        p.space_before = Pt(3)
        r1 = p.add_run()
        r1.text = "• " + b_title
        r1.font.name = "Calibri"
        r1.font.size = Pt(22)
        r1.font.bold = True
        r1.font.color.rgb = TEXT_WHITE
        r2 = p.add_run()
        r2.text = b_desc
        r2.font.name = "Calibri"
        r2.font.size = Pt(22)
        r2.font.color.rgb = TEXT_MUTED

    # --- TOP CARD 3: Evals Engine & Regulatory Safeguards ---
    add_card(c3_x, top_y, card_w, top_h, BORDER_BLUE)
    tb_t3 = slide.shapes.add_textbox(c3_x + Inches(0.18), top_y + Inches(0.12), card_w - Inches(0.36), top_h - Inches(0.24))
    tf_t3 = tb_t3.text_frame
    tf_t3.word_wrap = True
    tf_t3.margin_left = tf_t3.margin_right = tf_t3.margin_top = tf_t3.margin_bottom = 0

    p_t3_h = tf_t3.paragraphs[0]
    p_t3_h.text = "3. Regulatory Evals Engine"
    p_t3_h.font.name = "Calibri"
    p_t3_h.font.size = Pt(24)
    p_t3_h.font.bold = True
    p_t3_h.font.color.rgb = BORDER_BLUE

    bullets_t3 = [
        ("4-Gate Safety Pipeline: ", "Blocks stock tips, fund picks, FOMO urgency, and loan leverage."),
        ("Auditable Badges: ", "Displays transparent compliance status on every response."),
        ("Zero Hallucinations: ", "Grounded strictly in official SEBI circulars and AMFI standards.")
    ]
    for b_title, b_desc in bullets_t3:
        p = tf_t3.add_paragraph()
        p.space_before = Pt(3)
        r1 = p.add_run()
        r1.text = "• " + b_title
        r1.font.name = "Calibri"
        r1.font.size = Pt(22)
        r1.font.bold = True
        r1.font.color.rgb = TEXT_WHITE
        r2 = p.add_run()
        r2.text = b_desc
        r2.font.name = "Calibri"
        r2.font.size = Pt(22)
        r2.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # 3. SECTION HEADER FOR USABILITY TESTING
    # =========================================================================
    sec_y = Inches(4.03)
    tb_sec = slide.shapes.add_textbox(Inches(0.5), sec_y, Inches(12.333), Inches(0.38))
    tf_sec = tb_sec.text_frame
    tf_sec.word_wrap = True
    tf_sec.margin_left = tf_sec.margin_right = tf_sec.margin_top = tf_sec.margin_bottom = 0

    p_sec = tf_sec.paragraphs[0]
    p_sec.text = "4. Usability Testing: 3 User Personas & Constructive Feedback for Next Version (v2)"
    p_sec.font.name = "Calibri"
    p_sec.font.size = Pt(24)
    p_sec.font.bold = True
    p_sec.font.color.rgb = BORDER_AMBER

    # =========================================================================
    # 4. BOTTOM ROW (3 Authentic User Persona Cards)
    # =========================================================================
    bot_y = Inches(4.48)
    bot_h = Inches(2.7)

    personas = [
        {
            "name": "Aarav (20) • Student & Intern",
            "border": BORDER_CYAN,
            "context": "Context: Panicked over 2.8% Small Cap NAV drop.",
            "feedback": "v2 Feedback: Add a past-crash recovery simulator to see how ₹500 SIPs bounced back, plus semester savings badges."
        },
        {
            "name": "Sneha (22) • First-Job QA Analyst",
            "border": BORDER_MINT,
            "context": "Context: Terrified of exit loads & 12.5% LTCG tax.",
            "feedback": "v2 Feedback: Auto-sync SIP debit on salary day (the 2nd) before spending on Swiggy, and show post-tax rupee returns."
        },
        {
            "name": "Rohan (24) • Operations Lead",
            "border": BORDER_AMBER,
            "context": "Context: Colleagues pushed high-risk penny stocks.",
            "feedback": "v2 Feedback: Add a side-by-side simulator contrasting single-stock risk vs a Nifty 50 index fund to beat peer pressure."
        }
    ]

    for idx, p_info in enumerate(personas):
        px = c1_x if idx == 0 else (c2_x if idx == 1 else c3_x)
        add_card(px, bot_y, card_w, bot_h, p_info["border"])

        tb_p = slide.shapes.add_textbox(px + Inches(0.18), bot_y + Inches(0.12), card_w - Inches(0.36), bot_h - Inches(0.24))
        tf_p = tb_p.text_frame
        tf_p.word_wrap = True
        tf_p.margin_left = tf_p.margin_right = tf_p.margin_top = tf_p.margin_bottom = 0

        # Persona Header Name
        p_name = tf_p.paragraphs[0]
        p_name.text = p_info["name"]
        p_name.font.name = "Calibri"
        p_name.font.size = Pt(24)
        p_name.font.bold = True
        p_name.font.color.rgb = p_info["border"]

        # Context
        p_ctx = tf_p.add_paragraph()
        p_ctx.space_before = Pt(4)
        p_ctx.text = p_info["context"]
        p_ctx.font.name = "Calibri"
        p_ctx.font.size = Pt(22)
        p_ctx.font.color.rgb = TEXT_MUTED

        # Constructive Feedback for v2
        p_fb = tf_p.add_paragraph()
        p_fb.space_before = Pt(6)
        r_fb_tag = p_fb.add_run()
        r_fb_tag.text = p_info["feedback"][:13]
        r_fb_tag.font.name = "Calibri"
        r_fb_tag.font.size = Pt(22)
        r_fb_tag.font.bold = True
        r_fb_tag.font.color.rgb = p_info["border"]

        r_fb_text = p_fb.add_run()
        r_fb_text.text = p_info["feedback"][13:]
        r_fb_text.font.name = "Calibri"
        r_fb_text.font.size = Pt(22)
        r_fb_text.font.color.rgb = TEXT_WHITE
        r_fb_text.font.italic = True

    prs.save(filename)
    print(f"Single-slide presentation successfully created: {filename}")

if __name__ == "__main__":
    build_single_slide_deck()
