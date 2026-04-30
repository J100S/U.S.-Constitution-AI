from nn import CONSTITUTION_TEXT, split_into_sections

print(f"Constitution length: {len(CONSTITUTION_TEXT)} chars")
print()

sections = split_into_sections(CONSTITUTION_TEXT)
print(f"Total sections found: {len(sections)}")
print()

print("First 15 sections:")
for i, s in enumerate(sections[:15]):
    text_len = len(s['text'])
    name = s['name'][:50] + "..." if len(s['name']) > 50 else s['name']
    print(f"{i+1:2d}. {name:50s} ({text_len:6d} chars)")
