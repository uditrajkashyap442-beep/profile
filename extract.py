import re
import json

with open(r'C:\Users\PK Rajbangshi\.gemini\antigravity\brain\84908522-8097-4a34-a063-e4823df9441a\.system_generated\steps\1493\content.md', 'r', encoding='utf-8') as f:
    content = f.read()

bg_svg_match = re.search(r'<svg viewBox="0 0 2025 1583"(.+?)</svg>', content)
if bg_svg_match:
    print('FOUND BG SVG')
    with open('bg_svg.txt', 'w', encoding='utf-8') as f:
        f.write('<svg viewBox="0 0 2025 1583"' + bg_svg_match.group(1) + '</svg>')
