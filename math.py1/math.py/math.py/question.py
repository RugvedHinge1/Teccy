import streamlit as st
import requests
import random
import os
import json
import re
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.llms import Ollama

# ---------------------------
# Load environment variables
# ---------------------------
load_dotenv()
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")

# ---------------------------
# Streamlit page setup
# ---------------------------
st.set_page_config(page_title="Practice Mode - TECCY", layout="centered", page_icon="🎮")

# Custom CSS for Stardew Valley aesthetic
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Jersey+10&display=swap');

/* GLOBAL RESET & FONT */
* {
    font-family: 'Jersey 10', sans-serif !important;
}

/* MAIN APP BACKGROUND (Green World) */
.stApp {
    background-color: #69a74e !important;
    background-image:
        radial-gradient(#7bc65d 15%, transparent 16%),
        radial-gradient(#5d9e43 15%, transparent 16%) !important;
    background-size: 60px 60px !important;
    background-position: 0 0, 30px 30px !important;
    color: #4a2f1b !important;
}

/* MAIN CONTAINER (Mimic .game-menu-container) */
.main .block-container {
    background-color: #ffcca8; /* var(--menu-bg) */
    border: 4px solid #5e3a23; /* var(--menu-border-dark) */
    border-radius: 12px;
    box-shadow:
        inset 0 0 0 4px #e09f6d, /* var(--menu-border-light) */
        8px 8px 0 rgba(0, 0, 0, 0.4);
    padding: 2rem !important;
    max-width: 90% !important;
    margin-top: 2rem;
}

/* HEADERS */
h1, h2, h3, .stMarkdown h1, .stMarkdown h2, .stMarkdown h3 {
    color: #4a2f1b !important; /* var(--text-color) */
    text-shadow: none !important;
    border-color: #5e3a23 !important;
}

h1 {
    font-size: 2.8rem !important;
    color: #a43322 !important; /* Title red */
    text-shadow: 2px 2px 0 #ffcca8 !important;
    border-bottom: 2px solid #5e3a23 !important;
    text-align: center;
}

/* TEXT */
p, span, label, .stMarkdown, .stText {
    font-size: 1.2rem !important;
    color: #4a2f1b !important;
}

/* SIDEBAR */
section[data-testid="stSidebar"] {
    background-color: #ffd400 !important; /* var(--bg-panel) sidebar yellow */
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

section[data-testid="stSidebar"] .stMarkdown a:hover {
    background-color: #fff !important;
    transform: translateY(-2px);
}

/* BUTTONS */
.stButton > button {
    background-color: #d95d45 !important; /* var(--button-default) */
    color: #fff !important;
    border: 2px solid #5e3a23 !important;
    border-radius: 4px !important;
    padding: 10px 16px !important;
    box-shadow: 0 4px 0 #9e2b1e !important;
    font-size: 1.2rem !important;
    transition: all 100ms !important;
}

.stButton > button:hover {
    background-color: #ff7e60 !important; /* var(--button-hover) */
    transform: translateY(2px) !important;
    box-shadow: 0 2px 0 #9e2b1e !important;
    color: #fff !important;
}

.stButton > button:active {
    transform: translateY(4px) !important;
    box-shadow: none !important;
}

/* INPUTS & SELECTBOX */
.stTextInput > div > div > input, .stSelectbox > div > div {
    background-color: #ffffff !important;
    border: 2px solid #5e3a23 !important;
    color: #4a2f1b !important;
    border-radius: 4px !important;
    box-shadow: 2px 2px 0 rgba(0,0,0,0.4) !important;
}

.stTextInput > div > div > input:focus {
    border-color: #d95d45 !important;
}

/* ALERTS */
.stSuccess {
    background-color: #e8f5e9 !important;
    border: 2px solid #5e3a23 !important;
    color: #4a2f1b !important;
}

.stError {
    background-color: #ffebee !important;
    border: 2px solid #e63e3e !important;
    color: #4a2f1b !important;
}

.stInfo {
    background-color: #fff192 !important;
    border: 2px solid #5e3a23 !important;
    color: #4a2f1b !important;
}

.stWarning {
    background-color: #fff3e0 !important;
    border: 2px solid #ff8a00 !important;
    color: #4a2f1b !important;
}

/* Links in Main Text */
.stMarkdown a {
    color: #d95d45 !important;
    text-decoration: underline !important;
}

/* Utility */
hr {
    border-color: #5e3a23 !important;
    opacity: 0.5;
}
#MainMenu {visibility: hidden;}
footer {visibility: hidden;}
header {visibility: hidden;}
</style>
""", unsafe_allow_html=True)

st.title("// PRACTICE MODE")

# ---------------------------
# Get topic from URL query parameters
# ---------------------------
topic = st.query_params.get("topic", "Algebra")
level = st.query_params.get("level", "Beginner")

# Handle if topic/level are lists
if isinstance(topic, list):
    topic = topic[0] if topic else "Algebra"
if isinstance(level, list):
    level = level[0] if level else "Beginner"

st.markdown(f"**TOPIC:** {topic.upper()} | **LEVEL:** {level.upper()}")

# ---------------------------
# Navigation
# ---------------------------
st.sidebar.markdown("### [ NAVIGATION ]")
st.sidebar.markdown("[🏠 Back to Homepage](http://localhost:8000)")
st.sidebar.markdown("---")

# ---------------------------
# Initialize model
# ---------------------------
st.sidebar.markdown("### [ MODEL SELECT ]")
model_choice = st.sidebar.selectbox("Select Model", ["llama3.2:1b", "phi3:3.8b"], index=0)
st.sidebar.markdown(f"**Active:** `{model_choice}`")
if model_choice == "llama3.2:1b":
    st.sidebar.success("⚡ FAST MODE")
else:
    st.sidebar.info("🧠 REASON MODE")

llm = Ollama(model=model_choice, temperature=0.3, num_ctx=1024)

# ---------------------------
# Function to parse JSON safely
# ---------------------------
def parse_json_output(model_output):
    try:
        match = re.search(r"\{.*\}", model_output, re.DOTALL)
        if match:
            return json.loads(match.group(0))
    except:
        return None
    return None

# ---------------------------
# Generate Question
# ---------------------------
if st.button("[ GENERATE QUESTION ]"):
    question_prompt = ChatPromptTemplate.from_messages([
        ("system",
         """You are a math teacher. Generate ONE {level} level math problem from the topic: {topic}.
Respond STRICTLY in JSON format:
{{
  "question": "problem",
  "answer": "correct answer",
  "solution_steps": ["step1", "step2", "..."]
}}
No markdown or extra text."""
        ),

        ("user", f"Generate a unique question now. Random seed: {random.randint(1, 100000)}")
    ])
    
    output_parser = StrOutputParser()
    chain = question_prompt | llm | output_parser

    with st.spinner("GENERATING..."):
        try:
            qa_json = chain.invoke({"topic": topic, "level": level})
        except requests.exceptions.ConnectionError:
            st.error("❌ CONNECTION ERROR: Could not connect to Ollama.")
            st.warning("Please ensure Ollama is installed and running.")
            st.markdown("""
            **Troubleshooting:**
            1. Install Ollama from [ollama.com](https://ollama.com)
            2. Run `ollama serve` in terminal
            3. Run `ollama pull llama3.2:1b`
            """)
            st.stop()
        except Exception as e:
            st.error(f"❌ ERROR: {e}")
            st.stop()

    qa_data = parse_json_output(qa_json)
    if qa_data:
        st.session_state["current_question"] = qa_data["question"]
        st.session_state["correct_answer"] = qa_data["answer"]
        st.session_state["solution_steps"] = qa_data.get("solution_steps", [])
    else:
        st.error("⚠️ Unexpected response format.")
        st.text(qa_json)

# ---------------------------
# Display Question & Answer
# ---------------------------
if "current_question" in st.session_state:
    st.markdown("---")
    st.subheader("// QUESTION")
    st.write(st.session_state["current_question"])

    user_answer = st.text_input("YOUR ANSWER:")

    if st.button("[ CHECK ANSWER ]"):
        if not user_answer.strip():
            st.warning("⚠️ Enter an answer!")
        else:
            correct = st.session_state["correct_answer"]
            if user_answer.strip().lower() == str(correct).lower():
                st.success("✅ CORRECT!")
            else:
                st.error(f"❌ WRONG. Answer: {correct}")
                steps = st.session_state.get("solution_steps", [])
                if steps:
                    st.subheader("// SOLUTION")
                    for i, step in enumerate(steps, 1):
                        st.write(f"{i}. {step}")
