from bs4 import BeautifulSoup

with open(r'C:\Users\PK Rajbangshi\.gemini\antigravity\brain\84908522-8097-4a34-a063-e4823df9441a\.system_generated\steps\1593\content.md', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# Get the first section or main header text
main_text = []
for p in soup.find_all(['h1', 'h2', 'h3', 'p']):
    text = p.get_text(strip=True)
    if len(text) > 5:
        main_text.append(text)

with open('bruno.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(main_text[:20]))
