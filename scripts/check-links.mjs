// Vérifie, après le build, que chaque lien interne et chaque ancre (#section) du site pointe vers
// quelque chose qui existe dans dist/. Échoue (code 1) au premier lien mort : rien de cassé n'est mis en ligne.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) pages.push(p);
  }
})(DIST);

const urlOf = (file) => '/' + relative(DIST, file).split(sep).join('/').replace(/index\.html$/, '');
const html = new Map(pages.map((p) => [urlOf(p), readFileSync(p, 'utf8')]));
const idsOf = (src) => new Set([...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

const problems = [];
let checked = 0;
for (const [from, src] of html) {
  for (const [, raw] of src.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (!raw.startsWith('/') && !raw.startsWith('#')) continue;   // liens externes : non vérifiés
    if (raw.startsWith('//')) continue;
    const [pathPart, hash] = raw.split('#');
    const path = (pathPart || from).split('?')[0];
    checked++;
    let target = path.endsWith('/') ? html.get(path) : undefined;
    if (!target) {
      const file = join(DIST, decodeURIComponent(path));
      if (!(existsSync(file) && statSync(file).isFile()) && !html.has(path)) {
        problems.push(`${from} → ${raw} (introuvable)`);
        continue;
      }
    }
    if (hash && target && !idsOf(target).has(decodeURIComponent(hash))) problems.push(`${from} → ${raw} (ancre absente)`);
  }
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} lien(s) interne(s) cassé(s) :\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log(`✓ ${checked} liens internes vérifiés sur ${html.size} pages : aucun lien mort.`);
