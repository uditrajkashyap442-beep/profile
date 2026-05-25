import re

with open(r'C:\Users\PK Rajbangshi\.gemini\antigravity\brain\84908522-8097-4a34-a063-e4823df9441a\.system_generated\steps\1593\content.md', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract content between h1, h2, h3, p tags
matches = re.findall(r'<h[1-3][^>]*>(.*?)</h[1-3]>|<p[^>]*>(.*?)</p>', html, re.IGNORECASE | re.DOTALL)
extracted = []
for m in matches:
    text = (m[0] or m[1]).strip()
    # strip nested tags
    text = re.sub(r'<[^>]+>', '', text)
    if text and len(text) > 2:
        extracted.append(text)

with open('bruno.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(extracted))
