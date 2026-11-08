import sys
sys.path.append('/Users/raunaqkaicker/Library/Python/3.9/lib/python/site-packages')
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def build_presentation(filename="Groww_Mutual_Funds_MVP_Product_Presentation.pptx"):
    prs = pptx.Presentation()
    # 16:9 widescreen 1920x1080 pixels
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    slide = prs.slides.add_slide(blank_layout)

    # Theme Colors matching the user's palette
    BG_COLOR = RGBColor(13, 21, 39)           # Deep Midnight Navy #0D1527
    CARD_BG = RGBColor(20, 30, 52)            # Slate Blue Container #141E34
    
    # 5 cycling accent colors for columns matching the reference slide:
    # Col 1: Cyan / Blue, Col 2: Mint / Green, Col 3: Amber / Yellow, Col 4: Coral / Red, Col 5: Purple / Soft Blue
    COL_COLORS = [
        RGBColor(56, 189, 248),   # Col 1: Cyan #38BDF8
        RGBColor(0, 208, 156),    # Col 2: Mint #00D09C
        RGBColor(251, 191, 36),   # Col 3: Amber #FBBF24
        RGBColor(248, 113, 113),  # Col 4: Coral #F87171
        RGBColor(129, 140, 248)   # Col 5: Indigo/Purple #818CF8
    ]

    TEXT_WHITE = RGBColor(255, 255, 255)
    TEXT_MUTED = RGBColor(203, 213, 225)       # Slate Light #CBD5E1

    # Slide Background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = BG_COLOR
    bg.line.color.rgb = BG_COLOR

    # =========================================================================
    # 1. TOP HEADER (Matching reference slide: Left-aligned bold header)
    # =========================================================================
    tb_header = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(12.333), Inches(0.55))
    tf_h = tb_header.text_frame
    tf_h.word_wrap = True
    tf_h.margin_left = tf_h.margin_right = tf_h.margin_top = tf_h.margin_bottom = 0

    p_title = tf_h.paragraphs[0]
    p_title.text = "A 10-Layered Architecture That Powers First-Time Investor Retention"
    p_title.font.name = "Calibri"
    p_title.font.size = Pt(28)
    p_title.font.bold = True
    p_title.font.color.rgb = TEXT_WHITE

    # =========================================================================
    # 2. 10 ARCHITECTURE CARDS (2 Rows of 5 Columns)
    # =========================================================================
    col_w = Inches(2.28)
    gap_x = Inches(0.233)
    start_x = Inches(0.5)

    row1_y = Inches(1.0)
    card_h = Inches(1.9)
    row2_y = Inches(3.05)

    layers_data = [
        # Row 1
        {
            "layer": "Layer 1, Signal Ingestion:",
            "desc": "Detects first-time 18–24 intent, monthly salary, and timeline to guide users away from hype.",
            "col_idx": 0
        },
        {
            "layer": "Layer 2, Budget Moat:",
            "desc": "Calculates 50:30:20 salary splits and mandates a 3-month liquid buffer before equity SIPs.",
            "col_idx": 1
        },
        {
            "layer": "Layer 3, Masterclass Studio:",
            "desc": "Renders 60 FPS motion graphics with neural voice narration and zero finance jargon.",
            "col_idx": 2
        },
        {
            "layer": "Layer 4, NAV Anatomy:",
            "desc": "Contrasts 1-month noise with 5-year compounding to prove market dips are buying discounts.",
            "col_idx": 3
        },
        {
            "layer": "Layer 5, Benchmark Comparators:",
            "desc": "Visualizes scheme performance against NIFTY 50 TRI, showing real alpha over market noise.",
            "col_idx": 4
        },
        # Row 2
        {
            "layer": "Layer 6, Panic Interceptor:",
            "desc": "Where AI earns its place: detects NAV drop panic and reassures users with rupee math.",
            "col_idx": 0
        },
        {
            "layer": "Layer 7, Financial Translator:",
            "desc": "Where AI earns its place: converts complex TER, exit loads, and LTCG tax rules to exact salary rupees.",
            "col_idx": 1
        },
        {
            "layer": "Layer 8, SEBI RIA Guardrail:",
            "desc": "Evals engine: intercepts specific fund advice and stock tips, enforcing objective frameworks.",
            "col_idx": 2
        },
        {
            "layer": "Layer 9, Hazard & FOMO Gate:",
            "desc": "Evals engine: blocks dangerous borrowing, emergency fund depletion, and market peak urgency.",
            "col_idx": 3
        },
        {
            "layer": "Layer 10, Regulatory Grounding:",
            "desc": "Evals engine: grounds claims in official AMFI standards and displays auditable safety badges.",
            "col_idx": 4
        }
    ]

    for idx, l_data in enumerate(layers_data):
        row_y = row1_y if idx < 5 else row2_y
        col_i = l_data["col_idx"]
        card_x = start_x + col_i * (col_w + gap_x)
        accent_color = COL_COLORS[col_i]

        # Card shape
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, card_x, row_y, col_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = accent_color
        card.line.width = Pt(1.5)

        # Card Text Frame
        tb = slide.shapes.add_textbox(card_x + Inches(0.12), row_y + Inches(0.1), col_w - Inches(0.24), card_h - Inches(0.2))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        # Layer Title (bold minimal: only title is bold, body is regular)
        p_l = tf.paragraphs[0]
        p_l.text = l_data["layer"]
        p_l.font.name = "Calibri"
        p_l.font.size = Pt(22)
        p_l.font.bold = True
        p_l.font.color.rgb = accent_color

        # Layer Description (regular text, not bold, saves space!)
        p_d = tf.add_paragraph()
        p_d.space_before = Pt(3)
        p_d.text = l_data["desc"]
        p_d.font.name = "Calibri"
        p_d.font.size = Pt(22)
        p_d.font.bold = False
        p_d.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # 3. BOTTOM SECTION: UAT FINDINGS & NEXT ITERATION (Matching reference slide)
    # =========================================================================
    uat_header_y = Inches(5.1)
    tb_uath = slide.shapes.add_textbox(Inches(0.5), uat_header_y, Inches(3.0), Inches(0.35))
    tf_uath = tb_uath.text_frame
    tf_uath.word_wrap = True
    tf_uath.margin_left = tf_uath.margin_right = tf_uath.margin_top = tf_uath.margin_bottom = 0

    p_uath = tf_uath.paragraphs[0]
    p_uath.text = "UAT"
    p_uath.font.name = "Calibri"
    p_uath.font.size = Pt(24)
    p_uath.font.bold = True
    p_uath.font.color.rgb = COL_COLORS[0] # Cyan

    # UAT Box & Next Iteration Box Coordinates
    uat_card_y = Inches(5.45)
    uat_card_h = Inches(1.75)
    uat_box_w = Inches(5.75)
    next_box_w = Inches(5.75)
    next_x = Inches(7.083)

    # --- Left Card: UAT finding (3 user feedbacks) ---
    card_uat = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), uat_card_y, uat_box_w, uat_card_h)
    card_uat.fill.solid()
    card_uat.fill.fore_color.rgb = CARD_BG
    card_uat.line.color.rgb = COL_COLORS[0]
    card_uat.line.width = Pt(1.5)

    tb_uat_content = slide.shapes.add_textbox(Inches(0.65), uat_card_y + Inches(0.1), uat_box_w - Inches(0.3), uat_card_h - Inches(0.2))
    tf_uat = tb_uat_content.text_frame
    tf_uat.word_wrap = True
    tf_uat.margin_left = tf_uat.margin_right = tf_uat.margin_top = tf_uat.margin_bottom = 0

    p_uf_title = tf_uat.paragraphs[0]
    p_uf_title.text = "UAT finding (3 user feedbacks):"
    p_uf_title.font.name = "Calibri"
    p_uf_title.font.size = Pt(22)
    p_uf_title.font.bold = True
    p_uf_title.font.color.rgb = COL_COLORS[0]

    feedbacks = [
        "• Want historical crash simulator to see how past SIPs recovered from dips.",
        "• Auto-sync SIP debit with salary day on the 2nd before discretionary spending.",
        "• Need side-by-side risk comparison of single-stock tips versus index funds."
    ]
    for fb in feedbacks:
        p_fb = tf_uat.add_paragraph()
        p_fb.space_before = Pt(2)
        p_fb.text = fb
        p_fb.font.name = "Calibri"
        p_fb.font.size = Pt(22)
        p_fb.font.bold = False
        p_fb.font.color.rgb = TEXT_MUTED

    # --- Middle Arrow Shape ---
    arrow_x = Inches(6.38)
    arrow_y = Inches(6.1)
    arrow = slide.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, arrow_x, arrow_y, Inches(0.55), Inches(0.4))
    arrow.fill.solid()
    arrow.fill.fore_color.rgb = COL_COLORS[0]
    arrow.line.color.rgb = COL_COLORS[0]

    # --- Right Card: Next iteration ---
    card_next = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, next_x, uat_card_y, next_box_w, uat_card_h)
    card_next.fill.solid()
    card_next.fill.fore_color.rgb = CARD_BG
    card_next.line.color.rgb = COL_COLORS[1] # Mint Green
    card_next.line.width = Pt(1.5)

    tb_next_content = slide.shapes.add_textbox(next_x + Inches(0.15), uat_card_y + Inches(0.1), next_box_w - Inches(0.3), uat_card_h - Inches(0.2))
    tf_next = tb_next_content.text_frame
    tf_next.word_wrap = True
    tf_next.margin_left = tf_next.margin_right = tf_next.margin_top = tf_next.margin_bottom = 0

    p_ni_title = tf_next.paragraphs[0]
    p_ni_title.text = "Next iteration:"
    p_ni_title.font.name = "Calibri"
    p_ni_title.font.size = Pt(22)
    p_ni_title.font.bold = True
    p_ni_title.font.color.rgb = COL_COLORS[1]

    p_ni_body = tf_next.add_paragraph()
    p_ni_body.space_before = Pt(2)
    p_ni_body.text = "The system introduces a past-crash recovery visualizer to reassure investors during dips, enables salary-day auto-scheduling, and builds an interactive simulator contrasting stock tips against diversified index funds."
    p_ni_body.font.name = "Calibri"
    p_ni_body.font.size = Pt(22)
    p_ni_body.font.bold = False
    p_ni_body.font.color.rgb = TEXT_MUTED

    prs.save(filename)
    print(f"Presentation saved successfully: {filename}")

if __name__ == "__main__":
    build_presentation()
