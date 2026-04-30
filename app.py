from flask import Flask, render_template, request, jsonify, send_from_directory
import json
from nn import CONSTITUTION_TEXT, split_into_sections, extract_text_features
import re
import os

app = Flask(__name__, static_folder='.', template_folder='.')

# Load Constitution sections
sections = split_into_sections(CONSTITUTION_TEXT)

def find_relevant_section(question):
    """Find the most relevant Constitution section for a question"""
    question_lower = question.lower()
    
    # Check for specific amendment numbers
    amendment_names = {
        "first": "Amendment I.",
        "second": "Amendment II.",
        "third": "Amendment III.",
        "fourth": "Amendment IV.",
        "fifth": "Amendment V.",
        "sixth": "Amendment VI.",
        "seventh": "Amendment VII.",
        "eighth": "Amendment VIII.",
        "ninth": "Amendment IX.",
        "tenth": "Amendment X.",
        "eleventh": "Amendment XI.",
        "twelfth": "Amendment XII.",
        "thirteenth": "Amendment XIII.",
        "fourteenth": "Amendment XIV.",
        "fifteenth": "Amendment XV.",
        "sixteenth": "Amendment XVI.",
        "seventeenth": "Amendment XVII.",
        "eighteenth": "Amendment XVIII.",
        "nineteenth": "Amendment XIX.",
        "twentieth": "Amendment XX.",
    }
    
    # Check for specific amendment query
    for ordinal, amendment_title in amendment_names.items():
        if ordinal in question_lower:
            for section in sections:
                if amendment_title in section["name"]:
                    return section
    
    # Check for "amendment X" format
    amendment_match = re.search(r'amendment\s+(\d+)', question_lower)
    if amendment_match:
        num = int(amendment_match.group(1))
        roman_nums = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
                     "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
                     "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII"]
        if num < len(roman_nums):
            for section in sections:
                if f"Amendment {roman_nums[num]}" in section["name"]:
                    return section
    
    # Score sections
    best_section = sections[0]
    best_score = 0
    
    keywords = {
        "congress": 5, "house": 4, "senate": 4, "representative": 3,
        "vote": 3, "elect": 3, "president": 4, "executive": 3,
        "court": 3, "judicial": 3, "judge": 3, "law": 2, "power": 2,
        "state": 2, "people": 1, "right": 3, "freedom": 3,
        "speech": 3, "religion": 3, "press": 3,
    }
    
    for section in sections:
        section_text = section["text"].lower()
        section_name = section["name"].lower()
        score = 0
        
        for keyword, weight in keywords.items():
            if keyword in question_lower and keyword in section_text:
                score += weight * 2
            elif keyword in section_text:
                score += weight
        
        if "congress" in question_lower and "article i" in section_name:
            score += 10
        if "president" in question_lower and "article ii" in section_name:
            score += 10
        if "court" in question_lower and "article iii" in section_name:
            score += 10
        
        if score > best_score:
            best_score = score
            best_section = section
    
    return best_section

def calculate_relevance_score(question, section):
    """Calculate relevance score for a question-section pair"""
    question_lower = question.lower()
    section_text = section["text"].lower()
    section_name = section["name"].lower()
    
    topic_keywords = ["congress", "house", "senate", "representative", 
                     "president", "executive", "court", "judge", "amendment"]
    topic_matches = sum(1 for keyword in topic_keywords 
                       if keyword in question_lower and (keyword in section_text or keyword in section_name))
    
    content_keywords = ["power", "law", "bill", "vote", "right", "freedom", 
                       "speech", "religion", "press", "state", "people"]
    content_matches = sum(1 for keyword in content_keywords if keyword in section_text)
    
    relevance_score = 50 + (topic_matches * 20) + min(content_matches * 5, 20)
    return min(100, max(50, relevance_score))

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/ask', methods=['POST'])
def ask_question():
    data = request.json
    question = data.get('question', '').strip()
    
    if not question:
        return jsonify({'error': 'Please enter a question'}), 400
    
    section = find_relevant_section(question)
    relevance_score = calculate_relevance_score(question, section)
    
    # Truncate text
    section_text = section['text']
    if len(section_text) > 800:
        section_text = section_text[:800] + "\n\n[... text truncated ...]"
    
    # Determine interpretation
    if relevance_score >= 90:
        interpretation = "✓✓ The Constitution directly and comprehensively addresses this topic."
    elif relevance_score >= 75:
        interpretation = "✓ The Constitution clearly addresses this topic."
    elif relevance_score >= 65:
        interpretation = "◆ This topic is well covered in the Constitution."
    elif relevance_score >= 55:
        interpretation = "◆ The Constitution addresses this topic."
    else:
        interpretation = "◊ This topic may require additional interpretation."
    
    return jsonify({
        'question': question,
        'section_name': section['name'],
        'section_text': section_text,
        'relevance_score': relevance_score,
        'interpretation': interpretation
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
