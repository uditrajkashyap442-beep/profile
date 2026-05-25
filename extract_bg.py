import re

with open(r'C:\Users\PK Rajbangshi\.gemini\antigravity\brain\84908522-8097-4a34-a063-e4823df9441a\.system_generated\steps\1493\content.md', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'<div class="BackgroundLine">(.*?)</div>', content)
if match:
    print(match.group(1))
else:
    print("Not found")
