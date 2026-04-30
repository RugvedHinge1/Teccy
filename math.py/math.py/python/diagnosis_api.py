"""
Diagnosis API - AI-Powered Question Generator
Generates math questions of varying difficulty for adaptive diagnosis tests.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import re
import random
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_ollama import OllamaLLM

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Initialize LLM
def get_llm():
    return OllamaLLM(model="phi3:3.8b", temperature=0.7, num_ctx=2048)

def clean_json_string(s):
    """Clean control characters and common issues from JSON string"""
    # Remove control characters except newlines
    s = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', s)
    # Replace literal backslash-n with actual newline in strings
    s = s.replace('\\n', ' ')
    # Fix common issues
    s = s.replace('\n', ' ').replace('\r', ' ')
    s = s.replace('\t', ' ')
    # Remove trailing commas before closing brackets
    s = re.sub(r',\s*]', ']', s)
    s = re.sub(r',\s*}', '}', s)
    return s

def parse_json_output(model_output):
    """Safely parse JSON from model output"""
    try:
        cleaned = clean_json_string(model_output)
        match = re.search(r"\{.*\}", cleaned, re.DOTALL)
        if match:
            json_str = match.group(0)
            return json.loads(json_str)
    except Exception as e:
        print(f"JSON parse error: {e}")
        print(f"Attempted to parse: {model_output[:200]}...")
    return None

def parse_questions_array(model_output):
    """Parse an array of questions from model output"""
    try:
        cleaned = clean_json_string(model_output)
        match = re.search(r"\[.*\]", cleaned, re.DOTALL)
        if match:
            json_str = match.group(0)
            return json.loads(json_str)
    except Exception as e:
        print(f"Array parse error: {e}")
        print(f"Attempted to parse: {model_output[:200]}...")
    return None


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Diagnosis API is running"})

@app.route('/api/generate-diagnosis', methods=['POST'])
def generate_diagnosis_questions():
    """
    Generate a set of diagnosis questions for a topic.
    """
    try:
        data = request.get_json()
        topic = data.get('topic', 'algebra').capitalize()
        count_per_level = data.get('count_per_level', 5)
        
        llm = get_llm()
        output_parser = StrOutputParser()
        
        questions = []
        difficulties = ['Easy', 'Medium', 'Hard']
        
        difficulty_descriptions = {
            'Easy': 'Basic concepts, simple calculations, direct application of formulas.',
            'Medium': 'Multi-step problems, combining concepts, moderate complexity.',
            'Hard': 'Complex problems, proofs, advanced applications, critical thinking.'
        }
        
        for difficulty in difficulties:
            # Create prompt without JSON template in system message to avoid escaping issues
            system_msg = f"""You are a math teacher creating {difficulty.upper()} level questions for {topic}.
{difficulty_descriptions[difficulty]}

Generate exactly {count_per_level} multiple-choice questions.
Each question must have exactly 4 options.
Format your response as a valid JSON array.
Each object should have: question, options (array of 4 strings), correct (index 0-3), subtopic, solution."""

            user_msg = f"Generate {count_per_level} unique {difficulty} level {topic} questions. Return ONLY a JSON array, nothing else. Random: {random.randint(1, 100000)}"
            
            prompt = ChatPromptTemplate.from_messages([
                ("system", system_msg),
                ("user", user_msg)
            ])
            
            chain = prompt | llm | output_parser
            
            try:
                result = chain.invoke({})
                print(f"Raw {difficulty} result: {result[:200]}...")
                parsed = parse_questions_array(result)
                
                if parsed and isinstance(parsed, list):
                    for q in parsed:
                        q['difficulty'] = difficulty
                    questions.extend(parsed[:count_per_level])
                    print(f"Successfully parsed {len(parsed)} {difficulty} questions")
                else:
                    print(f"Failed to parse {difficulty} questions, trying individual generation")
                    # Fallback: generate individual questions
                    for i in range(count_per_level):
                        single_system = f"Generate ONE {difficulty} level {topic} question with 4 options. Return ONLY valid JSON with keys: question, options, correct, subtopic, solution."
                        single_user = f"Create question {i+1}. Seed: {random.randint(1, 100000)}"
                        
                        single_prompt = ChatPromptTemplate.from_messages([
                            ("system", single_system),
                            ("user", single_user)
                        ])
                        single_chain = single_prompt | llm | output_parser
                        single_result = single_chain.invoke({})
                        single_parsed = parse_json_output(single_result)
                        if single_parsed:
                            single_parsed['difficulty'] = difficulty
                            questions.append(single_parsed)
                            print(f"Generated individual {difficulty} question {i+1}")
                            
            except Exception as e:
                print(f"Error generating {difficulty} questions: {e}")
                # Add placeholder questions on error
                for i in range(count_per_level):
                    questions.append({
                        "question": f"[Error: {str(e)[:50]}] {difficulty} {topic} Q{i+1}",
                        "options": ["Option A", "Option B", "Option C", "Option D"],
                        "correct": 0,
                        "subtopic": topic,
                        "solution": "AI generation failed. Check if Ollama is running.",
                        "difficulty": difficulty
                    })
        
        # Separate by difficulty
        easy = [q for q in questions if q.get('difficulty') == 'Easy']
        medium = [q for q in questions if q.get('difficulty') == 'Medium']
        hard = [q for q in questions if q.get('difficulty') == 'Hard']
        
        random.shuffle(easy)
        random.shuffle(medium)
        random.shuffle(hard)
        
        return jsonify({
            "success": True,
            "topic": topic,
            "questions": {
                "easy": easy,
                "medium": medium,
                "hard": hard
            },
            "total": len(questions),
            "classification_rules": {
                "beginner": "Less than 60% on Easy questions",
                "intermediate": "60%+ on Easy, less than 60% on Medium",
                "advanced": "60%+ on Easy and Medium, less than 60% on Hard",
                "pro": "60%+ on all difficulty levels"
            }
        })
        
    except Exception as e:
        print(f"API Error: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/generate-single', methods=['POST'])
def generate_single_question():
    """Generate a single question of specified difficulty"""
    try:
        data = request.get_json()
        topic = data.get('topic', 'algebra').capitalize()
        difficulty = data.get('difficulty', 'Medium')
        
        llm = get_llm()
        output_parser = StrOutputParser()
        
        system_msg = f"Generate ONE {difficulty} level {topic} question with exactly 4 options. Return ONLY valid JSON with keys: question, options, correct, subtopic, solution."
        user_msg = f"Create a unique {difficulty} question now. Random: {random.randint(1, 100000)}"
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", system_msg),
            ("user", user_msg)
        ])
        
        chain = prompt | llm | output_parser
        result = chain.invoke({})
        parsed = parse_json_output(result)
        
        if parsed:
            parsed['difficulty'] = difficulty
            return jsonify({
                "success": True,
                "question": parsed
            })
        else:
            return jsonify({
                "success": False,
                "error": "Failed to parse question",
                "raw": result
            }), 500
            
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/classify', methods=['POST'])
def classify_level():
    """Classify user level based on performance across difficulties."""
    try:
        data = request.get_json()
        
        easy_pct = (data.get('easy_score', 0) / max(data.get('easy_total', 1), 1)) * 100
        medium_pct = (data.get('medium_score', 0) / max(data.get('medium_total', 1), 1)) * 100
        hard_pct = (data.get('hard_score', 0) / max(data.get('hard_total', 1), 1)) * 100
        
        # Classification logic
        if easy_pct < 60:
            level = "Beginner"
            recommendation = "Focus on fundamental concepts and basic problem-solving."
        elif medium_pct < 60:
            level = "Intermediate"
            recommendation = "You've mastered basics! Work on multi-step problems."
        elif hard_pct < 60:
            level = "Advanced"
            recommendation = "Great progress! Challenge yourself with complex problems."
        else:
            level = "Pro"
            recommendation = "Excellent! You're ready for advanced applications."
        
        overall_score = (easy_pct + medium_pct + hard_pct) / 3
        
        return jsonify({
            "success": True,
            "level": level,
            "recommendation": recommendation,
            "scores": {
                "easy": round(easy_pct, 1),
                "medium": round(medium_pct, 1),
                "hard": round(hard_pct, 1),
                "overall": round(overall_score, 1)
            }
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    print("🚀 Starting Diagnosis API Server...")
    print("📍 API available at: http://localhost:5000")
    print("📖 Endpoints:")
    print("   GET  /api/health - Health check")
    print("   POST /api/generate-diagnosis - Generate diagnosis questions")
    print("   POST /api/generate-single - Generate single question")
    print("   POST /api/classify - Classify user level")
    app.run(host='0.0.0.0', port=5000, debug=False)
