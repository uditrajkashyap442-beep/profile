import re

with open(r'C:\Users\PK Rajbangshi\.gemini\antigravity\brain\84908522-8097-4a34-a063-e4823df9441a\.system_generated\steps\1493\content.md', 'r', encoding='utf-8') as f:
    content = f.read()

container_svg_match = re.search(r'<div class="Landing-container Center.*?>(.*?)</div></section>', content)
if container_svg_match:
    with open('container_svg.txt', 'w', encoding='utf-8') as f:
        f.write(container_svg_match.group(1))

# Let's also get the full top menu structure exactly as it is.
overlay_match = re.search(r'<div class="Overlay" role="banner">(.*?)</div><div class="fixed', content, re.DOTALL)
if overlay_match:
    with open('overlay.txt', 'w', encoding='utf-8') as f:
        f.write(overlay_match.group(1))
