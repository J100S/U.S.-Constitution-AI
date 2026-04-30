from nn import CONSTITUTION_TEXT, split_into_sections, extract_text_features

sections = split_into_sections(CONSTITUTION_TEXT)

# Test question: "How does Congress work"
question = "How does Congress work"
question_lower = question.lower()

print(f"Testing question: '{question}'")
print()

# Score each section
results = []
keywords = {
    "congress": 5,
    "house": 4,
    "senate": 4,
    "representative": 3,
    "vote": 3,
    "elect": 3,
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
    
    results.append((section["name"], score, len(section["text"])))

# Sort by score
results.sort(key=lambda x: x[1], reverse=True)

print("Top 5 matching sections:")
for i, (name, score, text_len) in enumerate(results[:5], 1):
    print(f"{i}. {name[:50]:50s} Score: {score:3d}  ({text_len:5d} chars)")
    
print()
print("Best match:")
best = results[0]
print(f"  Name: {best[0]}")
print(f"  Score: {best[1]}")
print(f"  Text preview: {sections[[s['name'] for s in sections].index(best[0])]['text'][:200]}...")
