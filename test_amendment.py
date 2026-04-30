from nn import CONSTITUTION_TEXT, split_into_sections
import re

sections = split_into_sections(CONSTITUTION_TEXT)

# Look for amendment sections
print("Amendment sections found:")
for i, s in enumerate(sections):
    if "Amendment" in s["name"]:
        print(f"{i}: {s['name']}")

print("\n" + "="*80)
print("Testing 'What's the First Amendment?'")
print("="*80)

question = "What's the First Amendment?"
question_lower = question.lower()

print(f"Question: {question}")
print(f"Question lower: {question_lower}")

# Check if "first" is detected
if "first" in question_lower:
    print("✓ Detected 'first'")
    print("  Looking for 'Amendment I.' in section names...")
    for section in sections:
        if "Amendment I." in section["name"]:
            print(f"  ✓ FOUND: {section['name']}")
            break
    else:
        print("  ✗ NOT FOUND in section names")

# Try regex
print("\n" + "-"*80)
print("Testing regex for 'Amendment X' format:")
amendment_match = re.search(r'amendment\s+(\d+)', question_lower)
if amendment_match:
    print(f"  Matched number: {amendment_match.group(1)}")
else:
    print("  No match")
