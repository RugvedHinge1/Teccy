import streamlit as st
import random
import os
import json
import re
import datetime
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq

# ---------------------------
# Load environment variables
# ---------------------------
load_dotenv()
os.environ["LANGCHAIN_TRACING_V2"] = "false"

# ---------------------------
# Streamlit page setup
# ---------------------------
st.set_page_config(
    page_title="Practice Mode - TECCY",
    layout="centered",
    page_icon="🎮"
)

# ---------------------------
# Theme CSS
# ---------------------------

# --------------------------- Custom CSS for Stardew Valley theme ---------------------------
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Jersey+10&display=swap');
* { font-family: 'Jersey 10', sans-serif !important; }

.stApp {
    background-color: #69a74e !important;
    background-image:
        radial-gradient(#7bc65d 15%, transparent 16%),
        radial-gradient(#5d9e43 15%, transparent 16%) !important;
    background-size: 60px 60px !important;
    background-position: 0 0, 30px 30px !important;
    color: #4a2f1b !important;
}
.main .block-container {
    background-color: #ffcca8;
    border: 4px solid #5e3a23;
    border-radius: 12px;
    box-shadow: inset 0 0 0 4px #e09f6d, 8px 8px 0 rgba(0,0,0,0.4);
    padding: 2rem !important;
    max-width: 90% !important;
    margin-top: 2rem;
}
h1, h2, h3, .stMarkdown h1, .stMarkdown h2, .stMarkdown h3 {
    color: #4a2f1b !important;
    border-color: #5e3a23 !important;
}
h1 {
    font-size: 2.8rem !important;
    color: #a43322 !important;
    text-shadow: 2px 2px 0 #ffcca8 !important;
    border-bottom: 2px solid #5e3a23 !important;
    text-align: center;
}
p, span, label, .stMarkdown, .stText {
    font-size: 1.2rem !important;
    color: #4a2f1b !important;
}
section[data-testid="stSidebar"] {
    background-color: #ffd400 !important;
    border-right: 4px solid #5e3a23 !important;
}
section[data-testid="stSidebar"] h1,
section[data-testid="stSidebar"] h2,
section[data-testid="stSidebar"] h3 {
    color: #5e3a23 !important;
    text-shadow: 1px 1px 0 #e09f6d !important;
}
section[data-testid="stSidebar"] .stMarkdown a {
    display: block;
    background-color: #fff192;
    border: 2px solid #5e3a23 !important;
    color: #4a2f1b !important;
    padding: 10px;
    text-align: center;
    border-radius: 6px;
    box-shadow: 2px 2px 0 rgba(0,0,0,0.4);
    margin: 5px 0;
}
.stButton > button {
    background-color: #d95d45 !important;
    color: #fff !important;
    border: 2px solid #5e3a23 !important;
    border-radius: 4px !important;
    padding: 10px 16px !important;
    box-shadow: 0 4px 0 #9e2b1e !important;
    font-size: 1.2rem !important;
    transition: all 100ms !important;
}
.stButton > button:hover {
    background-color: #ff7e60 !important;
    transform: translateY(2px) !important;
    box-shadow: 0 2px 0 #9e2b1e !important;
}
.stButton > button:active {
    transform: translateY(4px) !important;
    box-shadow: none !important;
}
.stTextInput > div > div > input, .stSelectbox > div > div {
    background-color: #ffffff !important;
    border: 2px solid #5e3a23 !important;
    color: #4a2f1b !important;
    border-radius: 4px !important;
    box-shadow: 2px 2px 0 rgba(0,0,0,0.4) !important;
}
.stSuccess { background-color: #e8f5e9 !important; border: 2px solid #5e3a23 !important; color: #4a2f1b !important; }
.stError   { background-color: #ffebee !important; border: 2px solid #e63e3e !important; color: #4a2f1b !important; }
.stInfo    { background-color: #fff192 !important; border: 2px solid #5e3a23 !important; color: #4a2f1b !important; }
.stWarning { background-color: #fff3e0 !important; border: 2px solid #ff8a00 !important; color: #4a2f1b !important; }
.stMarkdown a { color: #d95d45 !important; text-decoration: underline !important; }
hr { border-color: #5e3a23 !important; opacity: 0.5; }
#MainMenu { visibility: hidden; }
footer { visibility: hidden; }
header { visibility: hidden; }

/* Level-up / reward box */
.levelup-box {
    background: linear-gradient(135deg, #fff192, #ffd400);
    border: 4px solid #5e3a23;
    border-radius: 12px;
    padding: 28px;
    text-align: center;
    box-shadow: 6px 6px 0 rgba(0,0,0,0.35);
    margin: 20px 0;
}
.levelup-box h2 { font-size: 2.2rem !important; color: #a43322 !important; margin-bottom: 8px; }
.levelup-box p  { font-size: 1.3rem !important; }

/* Progress bar track */
.acc-bar-bg {
    background: #e09f6d;
    border: 2px solid #5e3a23;
    border-radius: 6px;
    height: 18px;
    margin-bottom: 6px;
    overflow: hidden;
}
.acc-bar-fill {
    height: 100%;
    background: #d95d45;
    border-radius: 4px;
    transition: width 0.4s;
}
</style>
""", unsafe_allow_html=True)

# ---------------------------
# Back button (top-left corner)
# ---------------------------
st.markdown("""
<style>
.back-btn {
    position: fixed;
    top: 14px;
    left: 14px;
    z-index: 9999;
    background-color: #d95d45;
    color: #fff !important;
    font-family: 'Jersey 10', sans-serif !important;
    font-size: 1.2rem;
    padding: 8px 18px;
    border: 2px solid #5e3a23;
    border-radius: 4px;
    box-shadow: 0 4px 0 #9e2b1e;
    text-decoration: none !important;
    cursor: pointer;
    transition: all 100ms;
}
.back-btn:hover {
    background-color: #ff7e60;
    transform: translateY(2px);
    box-shadow: 0 2px 0 #9e2b1e;
}
.back-btn:active {
    transform: translateY(4px);
    box-shadow: none;
}
</style>
<a class="back-btn" href="http://localhost:8080/math.py/math.py/index.html" target="_self">🏠 Back</a>
""", unsafe_allow_html=True)

st.title("// PRACTICE MODE")

# ---------------------------
# URL parameters
# ---------------------------
topic = st.query_params.get("topic", "Algebra")
level = st.query_params.get("level", "Beginner")

if isinstance(topic, list):
    topic = topic[0]

if isinstance(level, list):
    level = level[0]

# ---------------------------
# Session state
# ---------------------------
if "current_level" not in st.session_state:
    st.session_state["current_level"] = level.upper()

if "q_count" not in st.session_state:
    st.session_state["q_count"] = 0

if "correct_count" not in st.session_state:
    st.session_state["correct_count"] = 0

if "show_levelup" not in st.session_state:
    st.session_state["show_levelup"] = False
if "levelup_to" not in st.session_state:
    st.session_state["levelup_to"] = ""
if "target_reached" not in st.session_state:
    st.session_state["target_reached"] = False
if "target_level" not in st.session_state:
    st.session_state["target_level"] = ""
if "question_history" not in st.session_state:
    st.session_state["question_history"] = []
if "question_counter" not in st.session_state:
    st.session_state["question_counter"] = 0

# Derive target level from URL
target_level_param = st.query_params.get("target", "")
if isinstance(target_level_param, list):
    target_level_param = target_level_param[0]
if target_level_param and not st.session_state["target_level"]:
    st.session_state["target_level"] = target_level_param.upper()

LEVEL_ORDER = ["AMATEUR", "INTERMEDIATE", "ADVANCED", "PRO"]

def next_level(lvl: str):
    lvl_up = lvl.upper()
    if lvl_up in LEVEL_ORDER:
        idx = LEVEL_ORDER.index(lvl_up)
        if idx < len(LEVEL_ORDER) - 1:
            return LEVEL_ORDER[idx + 1]
    return None

current_lvl = st.session_state["current_level"]

# ---------------------------
# Sidebar
# ---------------------------
st.sidebar.markdown("### [ NAVIGATION ]")
st.sidebar.markdown("[🏠 Back to Homepage](http://localhost:8080/math.py/math.py/index.html)")
st.sidebar.markdown("---")

# ---------------------------
# Model Setup (Groq API)
# ---------------------------
st.sidebar.markdown("### [ MODEL ]")
st.sidebar.success("⚡ Groq Llama 3.1 (FREE & FAST)")

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0.7,
    max_tokens=4096
)

# ---------------------------
# Progress display
# ---------------------------
q_in_block  = st.session_state["q_count"]
ok_in_block = st.session_state["correct_count"]
acc_pct     = int((ok_in_block / q_in_block * 100)) if q_in_block > 0 else 0
remaining   = 10 - q_in_block

st.markdown(f"**TOPIC:** {topic.upper()} | **LEVEL:** {current_lvl}")
st.markdown(
    f"📊 **Block progress:** {ok_in_block}/{q_in_block} correct "
    f"({acc_pct}% accuracy) | 🔢 {remaining} question(s) left in this block"
)
st.markdown(
    f'<div class="acc-bar-bg"><div class="acc-bar-fill" style="width:{acc_pct}%;"></div></div>',
    unsafe_allow_html=True
)
st.caption("Need 75%+ over 10 questions to level up 🌱")

# --------------------------- 🎉 LEVEL-UP POPUP ---------------------------
if st.session_state["show_levelup"]:
    new_lvl  = st.session_state["levelup_to"]
    seed_map = {
        "INTERMEDIATE": ("🌿", "Growth Fertilizer"),
        "ADVANCED":     ("🪴", "Advanced Fertilizer"),
        "PRO":          ("🌳", "Master Fertilizer"),
    }
    icon, seed_name = seed_map.get(new_lvl, ("🌱", "Fertilizer"))

    st.markdown(f"""
    <div class="levelup-box">
        <h2>🎉 LEVEL UP! {new_lvl}</h2>
        <p>You answered with 75%+ accuracy over 10 questions — amazing work!</p>
        <br>
        <p>🎁 <strong>Reward unlocked:</strong></p>
        <div style="width:90px;height:90px;border:3px dashed #5e3a23;border-radius:8px;
                    margin:0 auto 12px;display:flex;align-items:center;justify-content:center;
                    background:#fff8eb;font-size:3rem;">
            {icon}
        </div>
        <p style="font-size:1.4rem;"><strong>{seed_name}</strong></p>
        <p style="opacity:0.8;">Use it in your Greenhouse to boost crops!</p>
    </div>
    """, unsafe_allow_html=True)

    if st.button("✅ AWESOME! KEEP GOING"):
        st.session_state["show_levelup"] = False
        st.rerun()
    st.stop()

# --------------------------- 🏆 TARGET LEVEL REACHED ---------------------------
if st.session_state["target_reached"]:
    tgt = st.session_state["target_level"] or current_lvl
    st.markdown(f"""
    <div class="levelup-box">
        <h2>🏆 TARGET REACHED: {tgt}</h2>
        <p>You've reached your goal level! What would you like to do next?</p>
    </div>
    """, unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    with col1:
        if st.button("📝 KEEP PRACTISING"):
            st.session_state["target_reached"] = False
            st.rerun()
    with col2:
        final_url = f"http://localhost:8080/pages/final-test.html?topic={topic}"
        st.markdown(
            f'<a href="{final_url}" target="_blank">'
            f'<button style="background:#d95d45;color:#fff;border:2px solid #5e3a23;'
            f'border-radius:4px;padding:10px 16px;font-size:1.2rem;cursor:pointer;'
            f'box-shadow:0 4px 0 #9e2b1e;font-family:Jersey 10,sans-serif;width:100%;">'
            f'🎯 TAKE FINAL TEST</button></a>',
            unsafe_allow_html=True
        )
    st.stop()

# ---------------------------
# JSON Parser
# ---------------------------
def parse_json_output(model_output: str):
    if not model_output:
        return None
    text = model_output.strip()
    fence_match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if fence_match:
        text = fence_match.group(1)
    try:
        return json.loads(text)
    except:
        pass
    brace_match = re.search(r"\{.*\}", text, re.DOTALL)
    if brace_match:
        try:
            return json.loads(brace_match.group(0))
        except:
            pass
    return None

# ---------------------------
# Helper: unique question params
# ---------------------------
def generate_unique_question_params(topic, level, question_counter, history):
    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')

    topic_variations = {
        "Algebra": ["linear equations", "quadratic equations", "systems of equations", "polynomial functions", "rational expressions", "inequalities", "absolute value", "exponential functions"],
        "Geometry": ["triangles", "circles", "polygons", "coordinate geometry", "transformations", "area and perimeter", "volume", "trigonometry"],
        "Calculus": ["limits", "derivatives", "integrals", "differential equations", "series", "multivariable calculus", "optimization", "rates of change"],
        "Probability": ["combinatorics", "probability distributions", "expected value", "conditional probability", "bayesian statistics", "random variables", "sampling"],
        "Trigonometry": ["right triangles", "unit circle", "trigonometric identities", "inverse functions", "law of sines/cosines", "polar coordinates"]
    }

    problem_types = ["word problem", "pure calculation", "real-world application", "comparison problem", "multi-step problem"]

    # Use level-specific difficulty guidance (NOT random modifiers that override level)
    level_difficulty_map = {
        "AMATEUR":       "very simple, single-step, uses only basic arithmetic or simple definitions, no complex formulas",
        "BEGINNER":      "simple, 1-2 steps, uses basic formulas directly, no manipulation required",
        "INTERMEDIATE":  "moderate, 2-4 steps, requires applying a formula with some algebraic manipulation",
        "ADVANCED":      "challenging, 4-6 steps, requires combining multiple concepts or multi-step reasoning",
        "PRO":           "hard, 5+ steps, requires deep understanding, multiple concept combinations, and non-obvious reasoning",
    }
    difficulty_guidance = level_difficulty_map.get(level.upper(), "appropriate for the stated level")

    subtopic = random.choice(topic_variations.get(topic, [topic]))
    problem_type = random.choice(problem_types)
    approach = random.choice(['algebraic', 'geometric', 'numerical', 'analytical', 'logical'])

    constraints = []
    if random.random() > 0.5:
        constraints.append(f"must involve {random.choice(['positive numbers', 'fractions', 'integers', 'real numbers'])}")
    if random.random() > 0.7:
        constraints.append(f"focus on {random.choice(['understanding', 'application', 'accuracy'])}")

    unique_id = f"{random.randint(10000000, 99999999)}-{random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')}{random.randint(10,99)}"

    prompt_parts = [
        f"Generate a unique {level} level {topic} question",
        f"specifically about {subtopic}",
        f"as a {problem_type}",
        f"DIFFICULTY: {difficulty_guidance}",
        f"using a {approach} approach",
    ]

    if constraints:
        prompt_parts.append(f"Additional constraints: {', '.join(constraints)}")

    prompt_parts.extend([
        f"This is question #{question_counter + 1} in this session",
        f"Timestamp: {timestamp}",
        f"Unique session ID: {unique_id}",
        f"Ensure this question is completely different from any previous questions"
    ])

    if history:
        prompt_parts.append(f"Previous question themes to avoid: {', '.join(history[-3:])}")

    return ". ".join(prompt_parts) + "."

# ---------------------------
# Generate Question
# ---------------------------
if st.button("[ GENERATE QUESTION ]"):
    unique_prompt = generate_unique_question_params(
        topic, current_lvl, st.session_state.get("question_counter", 0), st.session_state.get("question_history", [])
    )

    question_prompt = ChatPromptTemplate.from_messages([
        ("system",
         """You are an expert math teacher. Generate ONE math problem strictly matching the given level:

LEVEL RULES (MUST follow exactly):
- AMATEUR: Very simple. 1 step. Basic arithmetic or definition recall only. No formulas. Example difficulty: "What is 15/40 as a fraction?"
- BEGINNER: Simple. 1-2 steps. Direct formula application. No algebraic manipulation. Example: "Find the area of a circle with radius 3."
- INTERMEDIATE: Moderate. 2-4 steps. Apply formula + some manipulation. Example: "Solve 2x² + 5x + 3 = 0"
- ADVANCED: Challenging. 4-6 steps. Multiple concepts. Non-obvious approach. Example: "Find the derivative of sin(x²)·ln(x)"
- PRO: Hard. 5+ steps. Deep understanding. Multi-concept combinations. Proof or advanced application required.

Topic: {topic} | Level: {level}

Respond STRICTLY in this JSON format with NO extra text:
{{
  "question": "full problem statement",
  "answer": "exact correct answer (number or expression)",
  "solution_steps": [
    "Step 1: [explanation]",
    "Step 2: [explanation]",
    "Step 3: [explanation]",
    "... as many steps as needed"
  ],
  "key_concept": "one sentence explanation of the main concept used"
}}
Make the solution_steps very detailed and educational — each step should explain WHY not just WHAT."""
        ),
        ("user", unique_prompt)
    ])

    chain = question_prompt | llm | StrOutputParser()

    with st.spinner("GENERATING..."):
        try:
            qa_json = chain.invoke({"topic": topic, "level": current_lvl})
        except Exception as e:
            st.error(f"❌ ERROR: {e}")
            st.stop()

    qa_data = parse_json_output(qa_json)
    if qa_data:
        st.session_state["current_question"]  = qa_data.get("question", "")
        st.session_state["correct_answer"]    = qa_data.get("answer", "")
        st.session_state["solution_steps"]    = qa_data.get("solution_steps", [])
        st.session_state["key_concept"]       = qa_data.get("key_concept", "")
        st.session_state["answer_checked"]    = False
        st.session_state["question_counter"]  = st.session_state.get("question_counter", 0) + 1

        question_text = qa_data.get("question", "").lower()
        theme_keywords = []
        for word in question_text.split():
            if len(word) > 4 and word not in ['that', 'with', 'this', 'what', 'find', 'solve', 'calculate', 'given', 'show']:
                theme_keywords.append(word)
        if theme_keywords:
            theme = " ".join(theme_keywords[:3])
            hist = st.session_state.get("question_history", [])
            hist.append(theme)
            st.session_state["question_history"] = hist[-10:]
    else:
        st.error("⚠️ Unexpected response format — try again.")
        st.text(qa_json)

# ---------------------------
# Display Question & Answer
# ---------------------------
if "current_question" in st.session_state:
    st.markdown("---")
    st.subheader("// QUESTION")
    st.write(st.session_state["current_question"])

    user_answer = st.text_input("YOUR ANSWER:", key="user_answer_input")

    if st.button("[ CHECK ANSWER ]") and not st.session_state.get("answer_checked"):
        if not user_answer.strip():
            st.warning("⚠️ Enter an answer first!")
        else:
            correct = str(st.session_state["correct_answer"]).strip().lower()
            given   = user_answer.strip().lower()
            is_correct = given == correct

            st.session_state["q_count"] += 1
            if is_correct:
                st.session_state["correct_count"] += 1
            st.session_state["answer_checked"] = True

            if is_correct:
                st.success("✅ CORRECT! Well done!")
            else:
                st.error(f"❌ WRONG.  Correct answer: **{st.session_state['correct_answer']}**")

            steps   = st.session_state.get("solution_steps", [])
            concept = st.session_state.get("key_concept", "")

            if steps:
                st.subheader("// STEP-BY-STEP SOLUTION")
                for i, step in enumerate(steps, 1):
                    st.markdown(f"**{i}.** {step}")
                if concept:
                    st.info(f"💡 **Key Concept:** {concept}")
            else:
                st.subheader("// SOLUTION")
                solve_prompt = ChatPromptTemplate.from_messages([
                    ("system",
                     """You are a math teacher. A student got this question wrong.
Give a very detailed, step-by-step solution that teaches WHY each step is done.
Format: numbered list, plain text only, no JSON."""
                    ),
                    ("user",
                     f"Question: {st.session_state['current_question']}\n"
                     f"Correct answer: {st.session_state['correct_answer']}\n"
                     "Explain in full detail."
                    )
                ])
                with st.spinner("Generating detailed solution..."):
                    solution_text = (solve_prompt | llm | StrOutputParser()).invoke({})
                st.write(solution_text)

            # ── Check block completion (every 10 questions) ──
            block_done = st.session_state["q_count"] >= 10
            if block_done:
                block_acc = st.session_state["correct_count"] / 10
                st.markdown("---")
                st.subheader("// BLOCK COMPLETE (10 QUESTIONS)")

                if block_acc >= 0.75:
                    nxt = next_level(current_lvl)
                    if nxt:
                        st.session_state["current_level"]  = nxt
                        st.session_state["levelup_to"]     = nxt
                        st.session_state["show_levelup"]   = True

                        tgt = st.session_state.get("target_level", "")
                        if tgt and nxt == tgt:
                            st.session_state["target_reached"] = True
                            st.session_state["show_levelup"]   = False
                    else:
                        st.success("🏆 You're already at the highest level — PRO!")
                else:
                    st.warning(
                        f"📉 {int(block_acc*100)}% accuracy — need 75% to level up. "
                        f"Keep practising at **{current_lvl}**!"
                    )

                st.session_state["q_count"]       = 0
                st.session_state["correct_count"] = 0

                if not st.session_state["show_levelup"] and not st.session_state["target_reached"]:
                    st.info("▶️ Click **GENERATE QUESTION** for your next block!")
