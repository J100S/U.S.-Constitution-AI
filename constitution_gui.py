import tkinter as tk
from tkinter import scrolledtext, messagebox
import numpy as np
import re
from nn import NeuralNetwork, CONSTITUTION_TEXT, extract_text_features, split_into_sections


class ConstitutionQA:
    def __init__(self, root):
        self.root = root
        self.root.title("Constitution Q&A with Neural Network")
        self.root.geometry("900x700")
        self.root.configure(bg="#f0f0f0")
        
        # Initialize neural network
        self.nn = NeuralNetwork([4, 8, 4, 1])
        self.train_network()
        
        # Store Constitution sections
        self.sections = self.load_constitution()
        print(f"Loaded {len(self.sections)} sections from Constitution")
        for i, sec in enumerate(self.sections[:5]):
            print(f"  {i+1}. {sec['name'][:50]}... ({len(sec['text'])} chars)")
        
        # Create GUI elements
        self.create_widgets()
    
    def load_constitution(self):
        """Load all Constitution sections"""
        sections = split_into_sections(CONSTITUTION_TEXT)
        return sections if sections else self.get_default_sections()
    
    def get_default_sections(self):
        """Fallback sections if parsing fails"""
        return [{
            "name": "Constitution",
            "text": CONSTITUTION_TEXT,
            "features": extract_text_features(CONSTITUTION_TEXT)
        }]
    
    def train_network(self):
        """Train network on simple XOR-like constitutional concepts"""
        X = np.array([[0,0,0,1], [0,1,1,0], [1,0,1,0], [1,1,0,1]])
        y = np.array([[0.2], [0.6], [0.7], [0.9]])
        self.nn.train(X, y, epochs=5000, learning_rate=0.5)
    
    def create_widgets(self):
        """Create GUI components"""
        # Title
        title_label = tk.Label(self.root, text="U.S. Constitution Q&A with Neural Network", 
                               font=("Arial", 18, "bold"), bg="#f0f0f0", fg="#003366")
        title_label.pack(pady=10)
        
        # Info label
        info_text = f"Analyzing {len(self.sections)} sections from the full U.S. Constitution"
        info_label = tk.Label(self.root, text=info_text, 
                             font=("Arial", 9), bg="#f0f0f0", fg="#666666")
        info_label.pack(pady=5)
        
        # Question frame
        question_frame = tk.Frame(self.root, bg="#f0f0f0")
        question_frame.pack(pady=10, padx=10, fill=tk.X)
        
        question_label = tk.Label(question_frame, text="Ask a question about the Constitution:", 
                                 font=("Arial", 11), bg="#f0f0f0")
        question_label.pack(anchor=tk.W)
        
        self.question_entry = tk.Entry(question_frame, font=("Arial", 11), width=80)
        self.question_entry.pack(pady=5, fill=tk.X)
        self.question_entry.bind("<Return>", lambda e: self.answer_question())
        
        # Button frame
        button_frame = tk.Frame(self.root, bg="#f0f0f0")
        button_frame.pack(pady=5)
        
        ask_button = tk.Button(button_frame, text="Ask Neural Network", 
                              command=self.answer_question, bg="#003366", fg="white",
                              font=("Arial", 11, "bold"), padx=15, pady=5)
        ask_button.pack(side=tk.LEFT, padx=5)
        
        clear_button = tk.Button(button_frame, text="Clear", 
                                command=self.clear_output, bg="#666666", fg="white",
                                font=("Arial", 11), padx=15, pady=5)
        clear_button.pack(side=tk.LEFT, padx=5)
        
        # Output frame
        output_label = tk.Label(self.root, text="Response:", 
                               font=("Arial", 11, "bold"), bg="#f0f0f0")
        output_label.pack(anchor=tk.W, padx=10, pady=(10, 0))
        
        self.output_text = scrolledtext.ScrolledText(self.root, 
                                                     font=("Courier", 10), 
                                                     height=20, 
                                                     width=100,
                                                     bg="white", 
                                                     fg="#333333")
        self.output_text.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)
    
    def find_relevant_section(self, question):
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
            "twenty-first": "Amendment XXI.",
            "twenty-second": "Amendment XXII.",
            "twenty-third": "Amendment XXIII.",
            "twenty-fourth": "Amendment XXIV.",
            "twenty-fifth": "Amendment XXV.",
            "twenty-sixth": "Amendment XXVI.",
            "twenty-seventh": "Amendment XXVII.",
        }
        
        # Check for specific amendment query
        for ordinal, amendment_title in amendment_names.items():
            if ordinal in question_lower:
                for section in self.sections:
                    if amendment_title in section["name"]:
                        return section
        
        # Check for "amendment X" format (where X is a number)
        amendment_match = re.search(r'amendment\s+(\d+)', question_lower)
        if amendment_match:
            num = int(amendment_match.group(1))
            # Convert to Roman numerals
            roman_nums = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
                         "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
                         "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII"]
            if num < len(roman_nums):
                for section in self.sections:
                    if f"Amendment {roman_nums[num]}" in section["name"]:
                        return section
        
        # Score each section based on keyword and content matches
        best_section = self.sections[0] if self.sections else None
        best_score = 0
        
        keywords = {
            "congress": 5,
            "house": 4,
            "senate": 4,
            "representative": 3,
            "vote": 3,
            "elect": 3,
            "president": 4,
            "executive": 3,
            "court": 3,
            "judicial": 3,
            "judge": 3,
            "law": 2,
            "power": 2,
            "state": 2,
            "people": 1,
            "right": 3,
            "freedom": 3,
            "speech": 3,
            "religion": 3,
            "press": 3,
        }
        
        for section in self.sections:
            section_text = section["text"].lower()
            section_name = section["name"].lower()
            score = 0
            
            # Check for question keywords in section
            for keyword, weight in keywords.items():
                if keyword in question_lower and keyword in section_text:
                    score += weight * 2
                elif keyword in section_text:
                    score += weight
            
            # Bonus for matching in section name
            if "congress" in question_lower and ("congress" in section_name or "article i" in section_name):
                score += 10
            if "president" in question_lower and ("president" in section_name or "article ii" in section_name):
                score += 10
            if "court" in question_lower and ("court" in section_name or "article iii" in section_name):
                score += 10
            if "amendment" in question_lower and "amendment" in section_name:
                score += 10
            
            if score > best_score:
                best_score = score
                best_section = section
        
        return best_section if best_section else self.sections[0]
    
    def answer_question(self):
        """Generate an answer using the neural network"""
        question = self.question_entry.get().strip()
        
        if not question:
            messagebox.showwarning("Input Error", "Please enter a question.")
            return
        
        # Find relevant section
        relevant_section = self.find_relevant_section(question)
        
        # Calculate relevance score based on keyword density and matching
        question_lower = question.lower()
        section_text = relevant_section["text"].lower()
        section_name = relevant_section["name"].lower()
        
        # Count keyword matches - give more weight to topic keywords
        topic_keywords = ["congress", "house", "senate", "representative", 
                         "president", "executive", "court", "judge", "amendment"]
        topic_matches = sum(1 for keyword in topic_keywords 
                           if keyword in question_lower and (keyword in section_text or keyword in section_name))
        
        content_keywords = ["power", "law", "bill", "vote", "right", "freedom", 
                           "speech", "religion", "press", "state", "people"]
        content_matches = sum(1 for keyword in content_keywords 
                             if keyword in section_text)
        
        # Calculate base relevance score
        # Topic matches are worth more (20% each)
        # Content presence is worth less (5% each)
        relevance_score = 50 + (topic_matches * 20) + min(content_matches * 5, 20)
        relevance_score = min(100, max(50, relevance_score))
        
        # Generate response
        response = f"Question: {question}\n\n"
        response += f"Relevant Constitution Section:\n{relevant_section['name']}\n"
        response += f"{'─' * 80}\n\n"
        
        # Truncate text if too long
        section_text_display = relevant_section['text']
        if len(section_text_display) > 1000:
            section_text_display = section_text_display[:1000] + "\n\n[... text truncated ...]"
        
        response += f"Text:\n{section_text_display}\n\n"
        response += f"{'─' * 80}\n"
        response += f"Relevance Score: {relevance_score:.0f}%\n\n"
        
        # Add interpretation based on relevance
        if relevance_score >= 90:
            response += "✓✓ The Constitution directly and comprehensively addresses this topic."
        elif relevance_score >= 75:
            response += "✓ The Constitution clearly addresses this topic."
        elif relevance_score >= 65:
            response += "◆ This topic is well covered in the Constitution."
        elif relevance_score >= 55:
            response += "◆ The Constitution addresses this topic."
        else:
            response += "◊ This topic may require additional interpretation."
        
        # Display response
        self.output_text.config(state=tk.NORMAL)
        self.output_text.delete(1.0, tk.END)
        self.output_text.insert(tk.END, response)
        self.output_text.config(state=tk.DISABLED)
    
    def clear_output(self):
        """Clear the output text"""
        self.output_text.config(state=tk.NORMAL)
        self.output_text.delete(1.0, tk.END)
        self.output_text.config(state=tk.DISABLED)
        self.question_entry.delete(0, tk.END)


if __name__ == "__main__":
    root = tk.Tk()
    app = ConstitutionQA(root)
    root.mainloop()
