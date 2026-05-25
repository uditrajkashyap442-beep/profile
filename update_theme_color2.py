import os
import glob

# Accent colors
OLD_COLOR = "#D4F34A"
NEW_COLOR = "#FF6200"

# Directory to search
src_dir = r"c:\projects\portfolio\src"

# Files to match
patterns = ["**/*.js", "**/*.css"]

replaced_count = 0
for pattern in patterns:
    for filepath in glob.glob(os.path.join(src_dir, pattern), recursive=True):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        if OLD_COLOR in content:
            new_content = content.replace(OLD_COLOR, NEW_COLOR)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            replaced_count += 1
            print(f"Updated {filepath}")

print(f"Total files updated: {replaced_count}")
