import sys, markdown

src, out = sys.argv[1], sys.argv[2]
import re
md = open(src, encoding="utf-8").read()
md = re.sub(r"(?m)^   (?=[-*] |\S)", "    ", md)
body = markdown.markdown(md, extensions=["tables", "sane_lists"])
title = "Plano: 1 lead por dia, 100% orgânico"

html = f"""<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root {{ --bg:#ffffff; --fg:#1f2328; --muted:#5b636e; --line:#e3e6ea; --accent:#e07a2e; --soft:#f6f7f9; }}
@media (prefers-color-scheme: dark) {{
  :root {{ --bg:#0f1115; --fg:#e8eaed; --muted:#9aa3ad; --line:#2a2f37; --accent:#f0a05a; --soft:#171a20; }}
}}
* {{ box-sizing:border-box; }}
body {{ margin:0; background:var(--bg); color:var(--fg); font:16px/1.65 Inter,system-ui,sans-serif; }}
main {{ max-width:860px; margin:0 auto; padding:40px 22px 80px; }}
h1 {{ font-size:1.9rem; line-height:1.25; margin:0 0 12px; }}
h2 {{ font-size:1.3rem; margin:40px 0 12px; padding-top:8px; border-top:1px solid var(--line); }}
h1 + p {{ color:var(--muted); }}
strong {{ font-weight:600; }}
hr {{ display:none; }}
ul, ol {{ padding-left:1.4em; }}
li {{ margin:4px 0; }}
li > ul {{ margin-top:4px; }}
code {{ background:var(--soft); border:1px solid var(--line); border-radius:4px; padding:1px 5px; font-size:.88em; }}
em {{ color:var(--muted); }}
table {{ width:100%; border-collapse:collapse; margin:14px 0; font-size:.94rem; }}
th, td {{ text-align:left; vertical-align:top; padding:9px 11px; border-bottom:1px solid var(--line); }}
th {{ background:var(--soft); font-weight:600; }}
blockquote {{ margin:16px 0; padding:10px 16px; border-left:3px solid var(--accent); background:var(--soft); }}
@media (max-width:600px) {{ table {{ display:block; overflow-x:auto; }} }}
</style></head>
<body><main>
{body}
</main></body></html>
"""
open(out, "w", encoding="utf-8").write(html)
print("ok", out)
