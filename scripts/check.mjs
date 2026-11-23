// Contrôle de la documentation : `npm run check` (après `npm run build`, ou `npm test` qui fait les deux).
//   1. chaque page française a son équivalent anglais, et inversement (même chemin sous src/content/docs/en/) ;
//   2. titre et description présents (sauf 404) ;
//   3. les liens internes écrits dans les pages restent dans leur langue (/…/ en français, /en/… en anglais) ;
//   4. dans le site construit (dist/) : tous les liens et images internes existent, ancres comprises ;
//   5. aucun secret évident dans les pages.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DOCS = join(ROOT, 'src/content/docs');
const DIST = join(ROOT, 'dist');
const problems = [];
const fail = (msg) => problems.push(msg);

const walk = (dir, filter) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = join(dir, e.name);
  return e.isDirectory() ? walk(p, filter) : filter(p) ? [p] : [];
});
const isPage = (p) => /\.mdx?$/.test(p);

// 1. parité des langues
const rel = (p) => relative(DOCS, p).split('\\').join('/');
const all = walk(DOCS, isPage).map(rel);
const en = new Set(all.filter((p) => p.startsWith('en/')).map((p) => p.slice(3)));
const fr = new Set(all.filter((p) => !p.startsWith('en/')));
for (const p of fr) if (!en.has(p)) fail(`traduction anglaise manquante : en/${p}`);
for (const p of en) if (!fr.has(p)) fail(`page française manquante pour : en/${p}`);

// 2 et 3. contenu des pages
for (const p of all) {
  const text = readFileSync(join(DOCS, p), 'utf8');
  const front = /^---\n([\s\S]*?)\n---/.exec(text)?.[1] ?? '';
  const isEn = p.startsWith('en/');
  if (!/^title:/m.test(front)) fail(`${p} : pas de titre`);
  if (!/^description:/m.test(front) && !/(^|\/)404\.md$/.test(p)) fail(`${p} : pas de description`);
  for (const m of text.matchAll(/(?:\]\(|href="|link: )(\/[^)"\s]*)/g)) {
    const href = m[1];
    if (/\.(png|webp|jpg|svg|ico)$/.test(href)) continue;
    if (isEn && !href.startsWith('/en/')) fail(`${p} : lien « ${href} » hors de /en/`);
    if (!isEn && href.startsWith('/en/')) fail(`${p} : lien « ${href} » vers l'anglais dans une page française`);
  }
  if (/(password|token|secret)\s*[:=]\s*['"][A-Za-z0-9+/_-]{24,}/i.test(text)) fail(`${p} : secret apparent`);
}

// 4. site construit
if (!existsSync(DIST)) {
  fail('dist/ absent : lancez `npm run build` d\'abord');
} else {
  const pages = walk(DIST, (p) => extname(p) === '.html' && !p.includes(`${DIST}/pagefind`));
  const idsOf = new Map();
  const ids = (file) => {
    if (!idsOf.has(file)) idsOf.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
    return idsOf.get(file);
  };
  const resolve = (path) => {
    const f = join(DIST, decodeURIComponent(path));
    if (existsSync(f) && statSync(f).isFile()) return f;
    const index = join(f, 'index.html');
    return existsSync(index) ? index : null;
  };
  let checked = 0;
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    for (const m of html.matchAll(/\s(?:href|src)="(\/[^"#?]*)(?:\?[^"#]*)?(#[^"]*)?"/g)) {
      const [, path, hash] = m;
      if (path.startsWith('//')) continue;
      checked++;
      const target = resolve(path);
      if (!target) { fail(`${relative(DIST, page)} : lien cassé vers ${path}`); continue; }
      if (hash && hash.length > 1 && target.endsWith('.html') && !ids(target).has(decodeURIComponent(hash.slice(1)))) fail(`${relative(DIST, page)} : ancre ${path}${hash} introuvable`);
    }
  }
  console.log(`${pages.length} pages construites, ${checked} liens et images internes vérifiés.`);
}

if (problems.length) {
  console.error(`\n${problems.length} problème(s) :\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`OK : ${fr.size} pages en français, ${en.size} en anglais, aucun lien cassé.`);
