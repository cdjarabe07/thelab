"""Génère public/og.png (image d'aperçu pour LinkedIn, X, messageries) à partir de la carte de Dakar.

Usage : python scripts/make-og.py   (nécessite Microsoft Edge ou Chrome)
"""
import os, pathlib, subprocess, tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
svg = (ROOT / 'src' / 'assets' / 'dakar-risque.svg').read_text(encoding='utf-8')
font = lambda w: (ROOT / 'node_modules' / '@fontsource' / 'rubik' / 'files' / f'rubik-latin-{w}-normal.woff2').as_uri()

html = f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:R;font-weight:300;src:url("{font(300)}")}}
@font-face{{font-family:R;font-weight:400;src:url("{font(400)}")}}
body{{margin:0;width:1200px;height:630px;background:#270c22;color:#f2f2ef;font-family:R;overflow:hidden;position:relative}}
.f{{position:absolute;inset:0 40px;border-left:1px solid #f2f2ef26;border-right:1px solid #f2f2ef26}}
.t{{position:absolute;left:72px;top:70px;font-weight:300;font-size:124px;line-height:1}}
.s{{position:absolute;left:76px;top:216px;font-size:30px;font-weight:300;opacity:.85;max-width:500px;line-height:1.3}}
.a{{position:absolute;left:76px;bottom:60px;font-size:18px;letter-spacing:.06em;text-transform:uppercase;opacity:.75}}
.m{{position:absolute;right:20px;top:50px;width:620px}}
.m svg{{width:100%;height:auto;display:block}}
</style></head><body><div class="f"></div><div class="m">{svg}</div>
<div class="t">TheLab</div><div class="s">Construire, expérimenter, documenter — data &amp; IA.</div>
<div class="a">Caleb Djarabé · Dakar</div></body></html>'''

tmp = pathlib.Path(tempfile.gettempdir()) / 'thelab-og.html'
tmp.write_text(html, encoding='utf-8')
browsers = [r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe', r'C:\Program Files\Google\Chrome\Application\chrome.exe']
exe = next(b for b in browsers if os.path.exists(b))
out = ROOT / 'public' / 'og.png'
subprocess.run([exe, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
                '--virtual-time-budget=3000', '--window-size=1200,630', f'--screenshot={out}', tmp.as_uri()],
               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False)
print('écrit :', out)
