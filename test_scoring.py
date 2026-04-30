from nn import CONSTITUTION_TEXT, split_into_sections

sections = split_into_sections(CONSTITUTION_TEXT)

# Test question: "How does Congress work"
question = "How does Congress work"
question_lower = question.lower()

# Find Article I (Congress section)
congress_section = [s for s in sections if "Article. I" in s['name']][0]

# Calculate improved relevance score
keywords = ["congress", "house", "senate", "representative", "vote", "elect",
           "president", "executive", "power", "law", "bill", "court", "judge",
           "amendment", "right", "freedom", "speech", "religion"]

section_text = congress_section["text"].lower()

matches = sum(1 for keyword in keywords 
             if keyword in question_lower and keyword in section_text)

print(f"Question: '{question}'")
print(f"Section: {congress_section['name']}")
print()
print(f"Keyword matches: {matches}")

# Calculate score
relevance_score = min(100, 40 + (matches * 15))
relevance_score = max(50, relevance_score)

print(f"Relevance Score: {relevance_score:.0f}%")
print()

# Show interpretation
if relevance_score >= 85:
    print("✓ The Constitution directly and comprehensively addresses this topic.")
elif relevance_score >= 70:
    print("✓ The Constitution clearly addresses this topic.")
elif relevance_score >= 60:
    print("◆ This topic is covered in the Constitution.")
elif relevance_score >= 50:
    print("◆ The Constitution touches on this topic.")
else:
    print("◊ This topic may require additional interpretation.")
