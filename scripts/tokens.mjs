#!/usr/bin/env node
/**
 * Figma Agent Guidelines — sync / check / build
 *
 *   node scripts/tokens.mjs sync              문서의 GENERATED 블록을 tokens/*.tokens.json 기준으로 다시 만든다
 *   node scripts/tokens.mjs check             규칙 위반을 검사한다 (design-system/checklist.md의 자동 항목)
 *   node scripts/tokens.mjs check --src DIR   + 코드 폴더의 원시 색값·Foundation 직접 사용을 검사한다
 *   node scripts/tokens.mjs build             dist/tokens.css를 만든다
 *
 * 의존성 없음. Node 18 이상.
 * 이 스크립트는 규칙을 "읽기만" 한다. 어휘는 design-system/naming.md, 항목은 각 토큰 문서가 원본이다.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOKENS_DIR = path.join(ROOT, 'tokens');
const COMPONENT_DOC_DIR = 'design-system/tokens/components';

// 컬렉션 정의 — design-system/tokens/README.md의 컬렉션 표와 함께 고친다
const COLLECTIONS = {
  'foundation':          { title: 'Foundation',          layer: 'foundation', doc: 'design-system/tokens/foundation.md',          css: 'fnd-' },
  'semantic-color':      { title: 'Semantic Color',      layer: 'semantic',   doc: 'design-system/tokens/semantic-color.md',      css: 'color-', axis: 'theme' },
  'semantic-responsive': { title: 'Semantic Responsive', layer: 'semantic',   doc: 'design-system/tokens/semantic-responsive.md', css: '',       axis: 'breakpoint' },
  'component':           { title: 'Component',           layer: 'component',  doc: null,                                          css: '' },
};

// DESIGN.md 요약에 실을 토큰 — DESIGN.md를 고칠 때 함께 고친다
const DESIGN_SUMMARY = [
  'Surface/Default', 'Surface/Raised', 'Text/Primary', 'Text/Secondary',
  'Fill/Primary/Default', 'Fill/Accent/Default', 'Fill/Danger/Default', 'Border/Default', 'Border/Focus',
];

// ───────────────────────────── 공통 유틸 ─────────────────────────────
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const isAlias = (v) => typeof v === 'string' && /^\{[^{}]+\}$/.test(v);
const aliasTarget = (v) => v.slice(1, -1).split('.').join('/');
const cssName = (name, coll) => `--${COLLECTIONS[coll].css}${kebab(name)}`;
const stripTicks = (s) => (s ?? '').replace(/`/g, '').trim();

function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].replace(/\s+#.*$/, '').trim();
    if (v.startsWith('[') && v.endsWith(']')) v = v.slice(1, -1).split(',').map((x) => x.trim()).filter(Boolean);
    out[kv[1]] = v;
  }
  return out;
}

function parseColor(v) {
  if (typeof v === 'string') {
    const h = v.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    return { r: parseInt(full.slice(0, 2), 16) / 255, g: parseInt(full.slice(2, 4), 16) / 255, b: parseInt(full.slice(4, 6), 16) / 255,
             a: full.length === 8 ? parseInt(full.slice(6, 8), 16) / 255 : 1 };
  }
  if (v && typeof v === 'object') {
    const a = v.alpha ?? 1;
    if ((v.colorSpace === 'srgb' || !v.colorSpace) && Array.isArray(v.components)) {
      const [r, g, b] = v.components;
      return { r, g, b, a };
    }
    if (v.hex) return { ...parseColor(v.hex), a };
  }
  throw new Error(`색 값을 읽을 수 없음: ${JSON.stringify(v)}`);
}
const to255 = (x) => Math.round(Math.min(1, Math.max(0, x)) * 255);
const hexOf = (c) => '#' + [c.r, c.g, c.b].map((x) => to255(x).toString(16).padStart(2, '0')).join('');
const showColor = (c) => (c.a < 1 ? `${hexOf(c)} ${+(c.a * 100).toFixed(1)}%` : hexOf(c));
const cssColor = (c) => (c.a < 1 ? `rgb(${to255(c.r)} ${to255(c.g)} ${to255(c.b)} / ${+(c.a).toFixed(3)})` : hexOf(c));

// 치수는 px 또는 rem만 받는다 (DTCG 2025.10). em·% 등은 기준 값 없이 px로 바꿀 수 없으므로 오류로 처리한다.
function dimInfo(v) {
  if (typeof v === 'number') return { px: v, unit: 'px', unitless: true };
  if (typeof v === 'string') {
    const m = v.trim().match(/^(-?[\d.]+)\s*([a-z%]*)$/i);
    if (!m) return { error: `치수 값을 읽을 수 없음: ${JSON.stringify(v)}` };
    const unit = (m[2] || 'px').toLowerCase();
    return dimInfo({ value: +m[1], unit });
  }
  if (v && typeof v === 'object' && typeof v.value === 'number') {
    if (v.unit === 'px' || v.unit === undefined) return { px: v.value, unit: 'px' };
    if (v.unit === 'rem') return { px: v.value * 16, unit: 'rem' };
    return { error: `지원하지 않는 단위 "${v.unit}" — px 또는 rem만 쓴다 (FIG-95)` };
  }
  return { error: `치수 값을 읽을 수 없음: ${JSON.stringify(v)}` };
}
function parseDim(v) {
  const d = dimInfo(v);
  if (d.error) throw new Error(d.error);
  return d.px;
}

function showValue(type, value) {
  if (type === 'color') return showColor(parseColor(value));
  if (type === 'dimension') return `${parseDim(value)}px`;
  if (type === 'fontFamily') return Array.isArray(value) ? value.join(', ') : String(value);
  return String(typeof value === 'object' ? JSON.stringify(value) : value);
}

function luminance(c) {
  const f = (x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}
const over = (top, bottom) => ({ r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a),
                                 b: top.b * top.a + bottom.b * (1 - top.a), a: 1 });
function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

// ───────────────────────────── 토큰 읽기 ─────────────────────────────
// Figma 내보내기는 숫자를 단위 없는 number로, 글꼴을 string으로 쓸 수 있다. 이름으로 의미를 보정한다.
function normalizeType(name, type, value) {
  if (type === 'number' || (type === undefined && typeof value === 'number')) {
    if (/Weight/.test(name)) return 'fontWeight';
    if (/Opacity|Ratio|Z Index/.test(name)) return 'number';
    return 'dimension';
  }
  if ((type === 'string' || type === undefined) && /Family/.test(name)) return 'fontFamily';
  if (type === undefined && ((value && typeof value === 'object' && 'colorSpace' in value) || /^#[0-9a-f]{3,8}$/i.test(value))) return 'color';
  return type;
}

function loadTokens() {
  const db = new Map();          // 이름 → { coll, modes: { Mode: { value, type, ext, description, deprecated } } }
  const modeOrder = {};          // coll → [Mode]
  const problems = [];
  const files = fs.readdirSync(TOKENS_DIR).filter((f) => f.endsWith('.tokens.json')).sort();
  for (const f of files) {
    const m = f.match(/^([a-z-]+?)(?:\.([a-z0-9-]+))?\.tokens\.json$/);
    if (!m || !COLLECTIONS[m[1]]) { problems.push(`알 수 없는 토큰 파일: tokens/${f} (파일 이름 규칙은 design-system/tokens/README.md)`); continue; }
    const coll = m[1];
    const doc = COLLECTIONS[coll].doc && exists(COLLECTIONS[coll].doc) ? frontmatter(read(COLLECTIONS[coll].doc)) : {};
    const declared = Array.isArray(doc.modes) ? doc.modes : [];
    const key = m[2] ?? 'default';
    const mode = declared.find((x) => x.toLowerCase() === key) ?? (key === 'default' ? 'Default' : key[0].toUpperCase() + key.slice(1));
    modeOrder[coll] ??= [];
    modeOrder[coll].push(mode);
    const json = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, f), 'utf8'));
    (function walk(node, trail, inheritedType) {
      for (const [k, v] of Object.entries(node)) {
        if (k.startsWith('$') || v === null || typeof v !== 'object') continue;
        const type = v.$type ?? inheritedType;
        if ('$value' in v) {
          const name = [...trail, k].join('/');
          if (!db.has(name)) db.set(name, { coll, modes: {} });
          const t = db.get(name);
          if (t.coll !== coll) problems.push(`같은 이름이 두 컬렉션에 있음: ${name} (${t.coll}, ${coll})`);
          t.modes[mode] = { value: v.$value, type: normalizeType(name, type, v.$value), ext: v.$extensions ?? {}, description: v.$description, deprecated: v.$deprecated };
        } else walk(v, [...trail, k], type);
      }
    })(json, [], undefined);
  }
  for (const coll of Object.keys(modeOrder)) {
    const doc = COLLECTIONS[coll].doc && exists(COLLECTIONS[coll].doc) ? frontmatter(read(COLLECTIONS[coll].doc)) : {};
    if (Array.isArray(doc.modes)) modeOrder[coll].sort((a, b) => doc.modes.indexOf(a) - doc.modes.indexOf(b));
  }
  return { db, modeOrder, problems };
}

function makeResolver(db, modeOrder) {
  const defaults = {
    theme: modeOrder['semantic-color']?.[0],
    breakpoint: modeOrder['semantic-responsive']?.[0],
  };
  return function resolve(name, ctx = {}, seen = []) {
    const t = db.get(name);
    if (!t) throw new Error(`없는 토큰 참조: ${[...seen, name].join(' → ')}`);
    if (seen.includes(name)) throw new Error(`순환 참조: ${[...seen, name].join(' → ')}`);
    const axis = COLLECTIONS[t.coll].axis;
    const mode = axis ? (ctx[axis] ?? defaults[axis]) : Object.keys(t.modes)[0];
    const e = t.modes[mode] ?? Object.values(t.modes)[0];
    if (isAlias(e.value)) return resolve(aliasTarget(e.value), ctx, [...seen, name]);
    return { type: e.type, value: e.value, chain: [...seen, name] };
  };
}

// ───────────────────────────── 문서 읽기 ─────────────────────────────
function parseEntries(md) {
  const entries = new Map();
  const dupes = [];
  let cur = null, fence = false, gen = false;
  md.split('\n').forEach((line, i) => {
    if (line.startsWith('```')) { fence = !fence; return; }
    if (fence) return;
    if (line.includes('GENERATED:START')) { gen = true; return; }
    if (line.includes('GENERATED:END')) { gen = false; return; }
    if (gen) return;
    const h = line.match(/^####\s+(.+?)\s*$/);
    if (h) {
      if (entries.has(h[1])) dupes.push(h[1]);
      cur = { name: h[1], fields: {}, line: i + 1 };
      entries.set(h[1], cur);
      return;
    }
    if (/^#{1,3}\s/.test(line)) { cur = null; return; }
    const f = cur && line.match(/^- ([^:]+):\s*(.*)$/);
    if (f) cur.fields[f[1].trim()] = f[2].trim();
  });
  return { entries, dupes };
}

function parseVocab() {
  const md = read('design-system/naming.md');
  const block = md.match(/<!-- VOCAB:START -->([\s\S]*?)<!-- VOCAB:END -->/);
  const vocab = {};
  if (!block) return vocab;
  for (const line of block[1].split('\n')) {
    const m = line.match(/^- ([A-Za-z ]+):\s*(.+)$/);
    if (m) vocab[m[1].trim()] = m[2].split(',').map((x) => x.trim()).filter(Boolean);
  }
  return vocab;
}

function componentDocs() {
  const dir = path.join(ROOT, COMPONENT_DOC_DIR);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md' && !f.startsWith('_'))
    .sort()
    .map((f) => {
      const rel = `${COMPONENT_DOC_DIR}/${f}`;
      const fm = frontmatter(read(rel));
      return { file: f, rel, prefix: (fm.token_prefix ?? '').replace(/\/$/, '') };
    });
}

// ───────────────────────────── 생성 블록 ─────────────────────────────
function renderBlocks(ctx) {
  const { db, modeOrder, resolve } = ctx;
  const names = (coll) => [...db.keys()].filter((n) => db.get(n).coll === coll);
  const blocks = {};
  const fnd = names('foundation');
  const themes = modeOrder['semantic-color'] ?? [];
  const bps = modeOrder['semantic-responsive'] ?? [];
  const valOf = (n) => { const e = Object.values(db.get(n).modes)[0]; return showValue(e.type, e.value); };

  // Foundation: 색 스케일
  const scales = new Map();
  const singles = [];
  for (const n of fnd) {
    const p = n.split('/');
    if (Object.values(db.get(n).modes)[0].type !== 'color') continue;
    if (p.length === 3 && /^\d+$/.test(p[2])) {
      if (!scales.has(p[1])) scales.set(p[1], []);
      scales.get(p[1])[+p[2] - 1] = valOf(n);
    } else singles.push(n);
  }
  const maxStep = Math.max(0, ...[...scales.values()].map((s) => s.length));
  const head = Array.from({ length: maxStep }, (_, i) => i + 1);
  blocks['foundation-colors'] = [
    `| 스케일 | ${head.join(' | ')} |`, `|---|${head.map(() => '---').join('|')}|`,
    ...[...scales].map(([s, v]) => `| ${s} | ${head.map((i) => v[i - 1] ?? '').join(' | ')} |`),
    '', '| 토큰 | 값 |', '|---|---|', ...singles.map((n) => `| \`${n}\` | ${valOf(n)} |`),
  ].join('\n');

  // Foundation: 치수·타이포
  const groups = new Map();
  for (const n of fnd) {
    const e = Object.values(db.get(n).modes)[0];
    if (e.type === 'color') continue;
    const p = n.split('/');
    const g = p.slice(0, -1).join('/');
    const leaf = p[p.length - 1];
    const v = showValue(e.type, e.value);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(v === `${leaf}px` ? leaf : `${leaf} = ${v}`);
  }
  blocks['foundation-dimensions'] = ['| 그룹 | 토큰 (이름이 곧 px 값, 다른 경우만 = 표기) |', '|---|---|',
    ...[...groups].map(([g, items]) => `| \`${g}\` | ${items.join(', ')} |`)].join('\n');

  // Foundation: 역조회
  const users = new Map();
  for (const [n, t] of db) {
    if (COLLECTIONS[t.coll].layer !== 'semantic') continue;
    for (const [mode, e] of Object.entries(t.modes)) {
      if (!isAlias(e.value)) continue;
      const target = aliasTarget(e.value);
      if (!users.has(target)) users.set(target, []);
      users.get(target).push(`\`${n}\` (${mode})`);
    }
  }
  blocks['foundation-reverse'] = ['| 원시값 | Foundation | 이 값을 쓰는 Semantic (모드) |', '|---|---|---|',
    ...fnd.filter((n) => users.has(n)).map((n) => `| ${valOf(n)} | \`${n}\` | ${users.get(n).join(', ')} |`)].join('\n');

  // Semantic Color: 모드별 참조표
  const cell = (n, mode, axis) => {
    const e = db.get(n).modes[mode];
    if (!e) return '⚠️ 없음';
    const r = resolve(n, { [axis]: mode });
    return `${isAlias(e.value) ? '`' + aliasTarget(e.value) + '`' : '원시값'} ${showValue(r.type, r.value)}`;
  };
  blocks['semantic-color-modes'] = [`| 토큰 | ${themes.join(' | ')} |`, `|---|${themes.map(() => '---').join('|')}|`,
    ...names('semantic-color').map((n) => `| \`${n}\` | ${themes.map((m) => cell(n, m, 'theme')).join(' | ')} |`)].join('\n');

  // Semantic Color: 짝 대비
  const rows = [`| 전경 | 기준 | ${themes.map((m) => `${m} 최저`).join(' | ')} | 판정 |`, `|---|---|${themes.map(() => '---').join('|')}|---|`];
  for (const r of ctx.contrastResults) {
    const cells = themes.map((m) => { const x = r.byMode[m]; return x ? `${x.ratio.toFixed(2)} (\`${x.bg}\`)` : '—'; });
    rows.push(`| \`${r.fg}\` | ${r.threshold}:1 | ${cells.join(' | ')} | ${r.pass ? '✅' : '❌'} |`);
  }
  blocks['semantic-color-contrast'] = rows.join('\n') + '\n\n각 전경 토큰의 `짝` 목록 중 대비가 가장 낮은 조합만 표시한다. 반투명 배경은 `Surface/Default` 위에 합성해 계산한다.';

  // Semantic Responsive: 모드별 참조표
  blocks['semantic-responsive-modes'] = [`| 토큰 | ${bps.join(' | ')} |`, `|---|${bps.map(() => '---').join('|')}|`,
    ...names('semantic-responsive').map((n) => `| \`${n}\` | ${bps.map((m) => cell(n, m, 'breakpoint')).join(' | ')} |`)].join('\n');

  // Component: 토큰 맵
  for (const d of componentDocs()) {
    const list = names('component').filter((n) => n.split('/')[0] === d.prefix);
    blocks[`token-map:${d.file}`] = ['| 토큰 | 배리언트 | 파트 | 속성 | 상태 | → Semantic |', '|---|---|---|---|---|---|',
      ...list.map((n) => {
        const [, variant, part, prop, state] = n.split('/');
        const e = Object.values(db.get(n).modes)[0];
        return `| \`${n}\` | ${variant} | ${part} | ${prop} | ${state ?? '—'} | ${isAlias(e.value) ? '`' + aliasTarget(e.value) + '`' : '⚠️ 원시값'} |`;
      })].join('\n');
  }

  // DESIGN.md 요약
  blocks['design-summary'] = [`| 역할 | 토큰 | ${themes.join(' | ')} |`, `|---|---|${themes.map(() => '---').join('|')}|`,
    ...DESIGN_SUMMARY.filter((n) => db.has(n)).map((n) => {
      const role = Object.values(db.get(n).modes)[0].description ?? '';
      return `| ${role} | \`${n}\` | ${themes.map((m) => showColor(parseColor(resolve(n, { theme: m }).value))).join(' | ')} |`;
    }),
    '', `| 글자 크기 | ${bps.join(' | ')} |`, `|---|${bps.map(() => '---').join('|')}|`,
    ...names('semantic-responsive').filter((n) => n.startsWith('Font Size/')).map((n) =>
      `| \`${n}\` | ${bps.map((m) => showValue('dimension', resolve(n, { breakpoint: m }).value)).join(' | ')} |`)].join('\n');

  // 에이전트 브리프: 값 없이 이름·용도·짝만 (화면 작업용 요약)
  const colorEntries = exists(COLLECTIONS['semantic-color'].doc) ? parseEntries(read(COLLECTIONS['semantic-color'].doc)).entries : new Map();
  const compressPairs = (pairs) => {
    const byPrefix = new Map();
    for (const p of pairs) { const i = p.lastIndexOf('/'); const pre = p.slice(0, i), leaf = p.slice(i + 1); if (!byPrefix.has(pre)) byPrefix.set(pre, []); byPrefix.get(pre).push(leaf); }
    return [...byPrefix].map(([pre, leaves]) => {
      const all = [...db.keys()].filter((n) => n.startsWith(pre + '/') && n.split('/').length === pre.split('/').length + 1);
      if (leaves.length === 1) return `${pre}/${leaves[0]}`;
      return leaves.length === all.length ? `${pre}/*` : `${pre}/(${leaves.join('·')})`;
    }).join(', ');
  };
  const briefColor = [];
  let lastTop = '';
  for (const n of names('semantic-color')) {
    const top = n.split('/')[0];
    if (top !== lastTop) { briefColor.push(`\n**${top}**`); lastTop = top; }
    const e = colorEntries.get(n);
    const role = stripTicks(Object.values(db.get(n).modes)[0].description ?? e?.fields['역할'] ?? '');
    const pairs = e?.fields['짝'] ? [...e.fields['짝'].matchAll(/`([^`]+)`/g)].map((m) => m[1]) : [];
    briefColor.push(`- \`${n}\` ${role}${pairs.length ? ` — 짝: ${compressPairs(pairs)}` : ''}`);
  }
  blocks['brief-color'] = briefColor.join('\n').trim();
  const rg = new Map();
  for (const n of names('semantic-responsive')) { const [top, leaf] = n.split('/'); if (!rg.has(top)) rg.set(top, []); rg.get(top).push(leaf); }
  blocks['brief-responsive'] = [...rg].map(([top, leaves]) => `- **${top}**: ${leaves.join(' · ')}`).join('\n');
  blocks['brief-components'] = componentDocs().filter((d) => d.prefix).map((d) => {
    const list = names('component').filter((n) => n.split('/')[0] === d.prefix);
    const variants = [...new Set(list.map((n) => n.split('/')[1]))].filter((v) => v !== 'Base');
    return `- **${d.prefix}** ([문서](tokens/components/${d.file})) — 배리언트 자리: ${variants.join(' · ')}. 토큰 ${list.length}개는 인스턴스에 이미 바인딩되어 있다`;
  }).join('\n') || '- (아직 없음)';

  // tokens/README.md 컬렉션 요약
  blocks['collections-summary'] = ['| 컬렉션 | 레이어 | 모드 | 토큰 수 | 파일 |', '|---|---|---|---|---|',
    ...Object.entries(COLLECTIONS).filter(([c]) => modeOrder[c]).map(([c, def]) =>
      `| ${def.title} | ${def.layer} | ${modeOrder[c].join(', ')} | ${names(c).length} | \`tokens/${c}${modeOrder[c].length > 1 || modeOrder[c][0] !== 'Default' ? '.{mode}' : ''}.tokens.json\` |`)].join('\n');

  return blocks;
}

const BLOCK_RE = /(<!-- GENERATED:START id=([\w:.-]+)[^>]*-->)[\s\S]*?<!-- GENERATED:END -->/g;
function docTargets() {
  const valuesDir = path.join(ROOT, 'design-system/tokens/values');
  const values = fs.existsSync(valuesDir) ? fs.readdirSync(valuesDir).filter((f) => f.endsWith('.md')).sort().map((f) => `design-system/tokens/values/${f}`) : [];
  const list = ['DESIGN.md', 'design-system/agent-brief.md', 'design-system/tokens/README.md', ...Object.values(COLLECTIONS).map((c) => c.doc).filter(Boolean),
    ...values, ...componentDocs().map((d) => d.rel)];
  return list.filter(exists);
}
function applyBlocks(rel, md, blocks, missing) {
  const isComp = rel.startsWith(COMPONENT_DOC_DIR + '/');
  return md.replace(BLOCK_RE, (all, start, id) => {
    const key = isComp && id === 'token-map' ? `token-map:${path.basename(rel)}` : id;
    if (!(key in blocks)) { missing.push(`${rel}: 알 수 없는 블록 id=${id}`); return all; }
    return `${start}\n${blocks[key]}\n<!-- GENERATED:END -->`;
  });
}

// ───────────────────────────── 검사 ─────────────────────────────
function runChecks(ctx, opts = {}) {
  const { db, modeOrder, resolve } = ctx;
  const out = [];
  const err = (id, msg) => out.push({ level: 'error', id, msg });
  const warn = (id, msg) => out.push({ level: 'warn', id, msg });
  ctx.problems.forEach((p) => err('CHK-04', p));
  const vocab = parseVocab();
  if (!Object.keys(vocab).length) err('CHK-06', 'design-system/naming.md에서 <!-- VOCAB:START --> 블록을 찾지 못함');
  const docs = componentDocs();
  const compNames = docs.map((d) => d.prefix).filter(Boolean);

  // 참조 구조 (CHK-01~05)
  for (const [n, t] of db) {
    const layer = COLLECTIONS[t.coll].layer;
    for (const [mode, e] of Object.entries(t.modes)) {
      const where = `${n} (${mode})`;
      if (layer === 'foundation') {
        if (isAlias(e.value)) err('CHK-01', `Foundation이 다른 토큰을 참조함: ${where} → ${aliasTarget(e.value)} [FND-04]`);
        continue;
      }
      if (!isAlias(e.value)) { err(layer === 'semantic' ? 'CHK-02' : 'CHK-03', `원시값을 가짐: ${where} — 아래 레이어를 참조해야 함 [PRN-03]`); continue; }
      const target = aliasTarget(e.value);
      const tt = db.get(target);
      if (!tt) { err('CHK-04', `없는 토큰 참조: ${where} → ${target}`); continue; }
      const tl = COLLECTIONS[tt.coll].layer;
      if (layer === 'semantic' && tl !== 'foundation') err('CHK-02', `Semantic이 ${tl}을 참조함: ${where} → ${target} [SEM-02·RSP-02]`);
      if (layer === 'component' && tl !== 'semantic') err('CHK-03', `Component가 ${tl}을 참조함: ${where} → ${target} [CMP-01]`);
      if (tt && Object.values(tt.modes).some((x) => x.deprecated)) warn('CHK-13', `폐기 예정 토큰을 참조함: ${where} → ${target} (CHANGELOG.md의 대체 토큰 사용)`);
    }
    if (COLLECTIONS[t.coll].axis) {
      for (const m of modeOrder[t.coll]) if (!t.modes[m]) err('CHK-05', `${m} 모드에 값이 없음: ${n} [SEM-04]`);
    }
  }

  // 단위 (CHK-17)
  for (const [n, t] of db) {
    for (const [mode, e] of Object.entries(t.modes)) {
      if (e.type !== 'dimension' || isAlias(e.value)) continue;
      const d = dimInfo(e.value);
      if (d.error) { err('CHK-17', `${n} (${mode}): ${d.error}`); continue; }
      if (/Line Height/.test(n) && d.px < 4) warn('CHK-17', `${n} (${mode}) = ${d.px}px — 줄 높이 배수(예: 1.5)를 px로 넣은 것 같음. 줄 높이는 px로 쓴다 [FIG-91]`);
    }
  }

  // 이름 (CHK-06·07)
  const words = (n) => n.split('/').flatMap((s) => s.split(' '));
  const forbidden = new Set(vocab['Forbidden In Semantic'] ?? []);
  for (const [n, t] of db) {
    const seg = n.split('/');
    for (const w of words(n)) if (!/^[A-Z0-9]/.test(w)) err('CHK-06', `단어가 대문자·숫자로 시작하지 않음: ${n} [NAM-02]`);
    if (t.coll === 'semantic-color' || t.coll === 'semantic-responsive') {
      const bad = words(n).filter((w) => forbidden.has(w) || /\d/.test(w));
      if (bad.length) err('CHK-06', `Semantic 이름에 외형 표현이 있음: ${n} (${bad.join(', ')}) [SEM-03]`);
    }
    if (t.coll === 'semantic-color') {
      if (!(vocab['Color Target'] ?? []).includes(seg[0])) err('CHK-06', `허용되지 않은 대상: ${n} — Color Target 어휘 확인 [NAM-04]`);
      if (seg.length === 3 && !(vocab.State ?? []).includes(seg[2])) err('CHK-06', `세 번째 자리는 상태여야 함: ${n} [NAM-04]`);
      if (seg.length > 3 || seg.length < 2) err('CHK-06', `Semantic Color는 2~3단: ${n} [NAM-04]`);
    }
    if (t.coll === 'semantic-responsive') {
      if (!(vocab['Responsive Property'] ?? []).includes(seg[0])) err('CHK-06', `허용되지 않은 속성: ${n} — Responsive Property 어휘 확인 [NAM-05]`);
      if (seg.length !== 2) err('CHK-06', `Semantic Responsive는 2단: ${n} [NAM-05]`);
    }
    if (t.coll === 'component') {
      if (seg.length < 4 || seg.length > 5) err('CHK-06', `Component는 4~5단: ${n} [NAM-06]`);
      if (!compNames.includes(seg[0])) err('CHK-08', `문서 없는 컴포넌트: ${n} — ${COMPONENT_DOC_DIR}/에 token_prefix: ${seg[0]}/ 문서 필요`);
      if (seg[2] && !(vocab['Component Part'] ?? []).includes(seg[2])) err('CHK-06', `허용되지 않은 파트: ${n} — Component Part 어휘 확인 [NAM-06]`);
      if (seg[3] && !(vocab['Component Property'] ?? []).includes(seg[3])) err('CHK-06', `허용되지 않은 속성: ${n} — Component Property 어휘 확인 [NAM-06]`);
      if (seg[4] && !(vocab.State ?? []).includes(seg[4])) err('CHK-06', `허용되지 않은 상태: ${n} — State 어휘 확인 [NAM-06]`);
    }
  }
  const tops = {};
  for (const [n, t] of db) { const top = n.split('/')[0]; (tops[top] ??= new Set()).add(t.coll); }
  for (const [top, colls] of Object.entries(tops)) if (colls.size > 1) err('CHK-07', `최상위 그룹 "${top}"이 여러 컬렉션에 있음: ${[...colls].join(', ')} [NAM-03]`);

  // 문서 ↔ JSON (CHK-08·10·11)
  for (const coll of ['semantic-color', 'semantic-responsive']) {
    const rel = COLLECTIONS[coll].doc;
    if (!exists(rel)) { err('CHK-08', `문서 없음: ${rel}`); continue; }
    const { entries, dupes } = parseEntries(read(rel));
    dupes.forEach((d) => err('CHK-08', `${rel}: 항목이 두 번 있음: ${d}`));
    const inJson = [...db.keys()].filter((n) => db.get(n).coll === coll);
    for (const n of inJson) if (!entries.has(n)) err('CHK-08', `${rel}: 항목 없음 — ${n} (배리어블은 있는데 문서가 없음)`);
    for (const [n, e] of entries) {
      if (!db.has(n)) { err('CHK-08', `${rel}:${e.line} 유령 항목 — ${n} (문서는 있는데 배리어블이 없음)`); continue; }
      const need = ['역할', '쓸 때', '쓰지 말 때', '스코프', '코드', '상태'];
      const fg = coll === 'semantic-color' && /^(Text|Icon|Border)\//.test(n);
      if (fg) need.push('짝', '대비 기준');
      for (const f of need) if (!e.fields[f]) err('CHK-08', `${rel}:${e.line} ${n} — 필드 없음: ${f}`);
      const code = stripTicks(e.fields['코드']);
      if (code && code !== cssName(n, coll)) err('CHK-10', `${rel}:${e.line} ${n} — 코드 이름이 규칙과 다름: ${code} (규칙: ${cssName(n, coll)}) [MAP-01]`);
      const first = Object.values(db.get(n).modes)[0];
      const scopes = first.ext?.['com.figma.scopes'];
      if (Array.isArray(scopes) && e.fields['스코프']) {
        const docS = e.fields['스코프'].split(',').map((x) => x.trim()).sort().join(',');
        if (docS !== [...scopes].sort().join(',')) err('CHK-11', `${rel}:${e.line} ${n} — 스코프가 Figma와 다름: 문서 ${docS} / Figma ${[...scopes].sort().join(',')} [PRN-09]`);
      }
      if (first.description && e.fields['역할'] && stripTicks(first.description) !== stripTicks(e.fields['역할']))
        warn('CHK-11', `${rel}:${e.line} ${n} — Figma 설명과 역할 문장이 다름 [PRN-09]`);
      if (/deprecated/i.test(e.fields['상태'] ?? '') && !read('design-system/CHANGELOG.md').includes(n))
        warn('CHK-13', `${n} — deprecated인데 CHANGELOG.md에 대체 경로가 없음`);
    }
  }
  if (exists(`${COMPONENT_DOC_DIR}/README.md`)) {
    const readme = read(`${COMPONENT_DOC_DIR}/README.md`);
    for (const d of docs) {
      if (!d.prefix) err('CHK-08', `${d.rel}: 프런트매터에 token_prefix 없음`);
      if (!readme.includes(d.file)) err('CHK-08', `${COMPONENT_DOC_DIR}/README.md 목록에 ${d.file}이 없음`);
      if (d.prefix && ![...db.keys()].some((n) => n.startsWith(d.prefix + '/'))) warn('CHK-08', `${d.rel}: ${d.prefix}/ 토큰이 아직 없음 (초안 단계면 무시)`);
    }
  }

  // 짝 대비 (CHK-09)
  ctx.contrastResults = [];
  const themes = modeOrder['semantic-color'] ?? [];
  if (exists(COLLECTIONS['semantic-color'].doc)) {
    const { entries } = parseEntries(read(COLLECTIONS['semantic-color'].doc));
    for (const [n, e] of entries) {
      if (!db.has(n) || !e.fields['짝']) continue;
      const th = (e.fields['대비 기준'] ?? '').match(/([\d.]+)\s*:\s*1/);
      const pairs = [...e.fields['짝'].matchAll(/`([^`]+)`/g)].map((m) => m[1]);
      for (const p of pairs) if (!db.has(p)) err('CHK-09', `${n}의 짝에 없는 토큰: ${p}`);
      if (!th) continue;
      const threshold = +th[1];
      const res = { fg: n, threshold, byMode: {}, pass: true };
      for (const m of themes) {
        try {
          const base = db.has('Surface/Default') ? parseColor(resolve('Surface/Default', { theme: m }).value) : { r: 1, g: 1, b: 1, a: 1 };
          let worst = null;
          for (const p of pairs.filter((x) => db.has(x))) {
            let bg = parseColor(resolve(p, { theme: m }).value);
            if (bg.a < 1) bg = over(bg, base);
            let fg = parseColor(resolve(n, { theme: m }).value);
            if (fg.a < 1) fg = over(fg, bg);
            const ratio = contrast(fg, bg);
            if (!worst || ratio < worst.ratio) worst = { ratio, bg: p };
            if (ratio + 1e-9 < threshold) { res.pass = false; err('CHK-09', `${m}: ${n} on ${p} = ${ratio.toFixed(2)}:1 < ${threshold}:1 [SEM-05]`); }
          }
          if (worst) res.byMode[m] = worst;
        } catch (x) { err('CHK-04', x.message); }
      }
      ctx.contrastResults.push(res);
    }
  }

  // Foundation 설정 (CHK-12)
  for (const [n, t] of db) {
    if (t.coll !== 'foundation') continue;
    const ext = Object.values(t.modes)[0].ext ?? {};
    if (Array.isArray(ext['com.figma.scopes']) && ext['com.figma.scopes'].length) warn('CHK-12', `Foundation 스코프가 켜져 있음: ${n} [FND-02]`);
    if (ext['com.figma.hiddenFromPublishing'] === false) warn('CHK-12', `Foundation이 발행됨: ${n} [FND-02]`);
  }

  // 생성 블록 최신 여부 (CHK-14)
  const unitBroken = out.some((r) => r.id === 'CHK-17' && r.level === 'error');
  if (unitBroken && !opts.skipSyncCheck) err('CHK-14', '단위 오류(CHK-17) 때문에 GENERATED 블록 비교를 건너뜀');
  if (!opts.skipSyncCheck && !unitBroken) {
    const blocks = renderBlocks(ctx);
    const missing = [];
    for (const rel of docTargets()) {
      const md = read(rel);
      if (applyBlocks(rel, md, blocks, missing) !== md) err('CHK-14', `${rel}: GENERATED 블록이 최신이 아님 → npm run tokens:sync`);
    }
    missing.forEach((m) => err('CHK-14', m));
  }

  // 코드 검사 (CHK-15·16)
  if (opts.src) {
    const exts = new Set(['.css', '.scss', '.less', '.ts', '.tsx', '.js', '.jsx', '.vue', '.svelte']);
    const skip = new Set(['node_modules', 'dist', 'build', '.git', '.next']);
    const files = [];
    (function walk(dir) {
      for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
        if (skip.has(f.name)) continue;
        const p = path.join(dir, f.name);
        if (f.isDirectory()) walk(p);
        else if (exts.has(path.extname(f.name))) files.push(p);
      }
    })(path.resolve(opts.src));
    for (const f of files) {
      fs.readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
        const loc = `${path.relative(process.cwd(), f)}:${i + 1}`;
        if (/#[0-9a-fA-F]{3,8}\b/.test(line) && !/^\s*(\/\/|\/\*|\*)/.test(line) && /[:=(,]\s*['"`]?#[0-9a-fA-F]{3,8}/.test(line))
          err('CHK-15', `원시 색값: ${loc} — ${line.trim().slice(0, 80)} [PRN-06]`);
        if (/\brgba?\(\s*\d/.test(line)) err('CHK-15', `원시 색값: ${loc} — ${line.trim().slice(0, 80)} [PRN-06]`);
        if (/var\(--fnd-/.test(line)) err('CHK-16', `Foundation 직접 사용: ${loc} — ${line.trim().slice(0, 80)} [FND-01]`);
      });
    }
  }
  return out;
}

// ───────────────────────────── CSS 빌드 ─────────────────────────────
function buildCss(ctx) {
  const { db, modeOrder } = ctx;
  const val = (e) => {
    if (isAlias(e.value)) {
      const target = aliasTarget(e.value);
      return `var(${cssName(target, db.get(target).coll)})`;
    }
    if (e.type === 'color') return cssColor(parseColor(e.value));
    if (e.type === 'dimension') return `${parseDim(e.value)}px`;
    if (e.type === 'fontFamily') {
      const list = Array.isArray(e.value) ? e.value : [e.value];
      return [...list.map((x) => `"${x}"`), 'system-ui', 'sans-serif'].join(', ');
    }
    return String(e.value);
  };
  // compareTo: 이 모드보다 먼저 적용되는 모드. 값이 같으면 다시 선언하지 않는다
  const decl = (coll, mode, compareTo) => {
    const lines = [];
    for (const [n, t] of db) {
      if (t.coll !== coll) continue;
      const e = t.modes[mode];
      if (!e) continue;
      if (compareTo) {
        const prev = t.modes[compareTo];
        if (prev && JSON.stringify(prev.value) === JSON.stringify(e.value)) continue;
      }
      lines.push(`  ${cssName(n, coll)}: ${val(e)};`);
    }
    return lines;
  };
  const one = (coll) => Object.keys(db.get([...db.keys()].find((n) => db.get(n).coll === coll))?.modes ?? { Default: 1 })[0];
  const out = ['/* GENERATED — npm run tokens:build 로 생성. 직접 수정하지 않는다. 규칙: design-system/code-mapping.md */', ''];
  out.push(':root {', '  /* Foundation — 컴포넌트 코드에서 직접 쓰지 않는다 (FND-01) */', ...decl('foundation', one('foundation')));
  const th = modeOrder['semantic-color'] ?? [];
  const bp = modeOrder['semantic-responsive'] ?? [];
  if (th[0]) out.push('', `  /* Semantic Color — ${th[0]} (기본) */`, ...decl('semantic-color', th[0]));
  if (bp[0]) out.push('', `  /* Semantic Responsive — ${bp[0]} (기본) */`, ...decl('semantic-responsive', bp[0]));
  if (modeOrder.component) out.push('', '  /* Component */', ...decl('component', one('component')));
  out.push('}');
  // 테마: 각 모드는 기본 모드 위에 따로 덮어쓴다
  for (const m of th.slice(1)) out.push('', `[data-theme="${m.toLowerCase()}"] {`, ...decl('semantic-color', m, th[0]), '}');
  // 폭: min-width가 누적되므로 바로 앞 모드와 비교한다
  for (const [i, m] of bp.entries()) {
    if (i === 0) continue;
    const b = db.get(`Breakpoint/${m}`);
    if (!b) { console.warn(`⚠️  Breakpoint/${m} 토큰이 없어 ${m} 모드를 건너뜀`); continue; }
    const px = parseDim(Object.values(b.modes)[0].value);
    out.push('', `@media (min-width: ${px}px) {`, '  :root {', ...decl('semantic-responsive', m, bp[i - 1]).map((l) => '  ' + l), '  }', '}');
  }
  return out.join('\n') + '\n';
}

// ───────────────────────────── 실행 ─────────────────────────────
function context() {
  const { db, modeOrder, problems } = loadTokens();
  return { db, modeOrder, problems, resolve: makeResolver(db, modeOrder), contrastResults: [] };
}

const [cmd, ...rest] = process.argv.slice(2);
const srcIdx = rest.indexOf('--src');
const src = srcIdx >= 0 ? rest[srcIdx + 1] : null;

function guardUnits(ctx) {
  const bad = runChecks(ctx, { skipSyncCheck: true }).filter((r) => r.id === 'CHK-17' && r.level === 'error');
  if (bad.length) { bad.forEach((r) => console.error(`❌ [${r.id}] ${r.msg}`)); console.error('\n단위 오류를 먼저 고치세요 (npm run tokens:check).'); process.exit(1); }
}

if (cmd === 'sync') {
  const ctx = context();
  guardUnits(ctx);
  runChecks(ctx, { skipSyncCheck: true }); // 대비 결과 계산
  const blocks = renderBlocks(ctx);
  const missing = [];
  let changed = 0;
  for (const rel of docTargets()) {
    const md = read(rel);
    const next = applyBlocks(rel, md, blocks, missing);
    if (next !== md) { fs.writeFileSync(path.join(ROOT, rel), next); changed++; console.log(`갱신: ${rel}`); }
  }
  missing.forEach((m) => console.warn(`⚠️  ${m}`));
  console.log(changed ? `\n${changed}개 문서를 갱신했습니다.` : '모든 GENERATED 블록이 최신입니다.');
} else if (cmd === 'check') {
  const ctx = context();
  const results = runChecks(ctx, { src });
  const errors = results.filter((r) => r.level === 'error');
  const warns = results.filter((r) => r.level === 'warn');
  for (const r of [...errors, ...warns]) console.log(`${r.level === 'error' ? '❌' : '⚠️ '} [${r.id}] ${r.msg}`);
  const ids = ['CHK-01', 'CHK-02', 'CHK-03', 'CHK-04', 'CHK-05', 'CHK-06', 'CHK-07', 'CHK-08', 'CHK-09', 'CHK-10', 'CHK-11', 'CHK-12', 'CHK-13', 'CHK-14', 'CHK-17', ...(src ? ['CHK-15', 'CHK-16'] : [])];
  console.log('\n항목별 결과');
  for (const id of ids) {
    const e = errors.filter((r) => r.id === id).length, w = warns.filter((r) => r.id === id).length;
    console.log(`  ${id}  ${e ? `Fail (${e})` : w ? `Pass, 경고 ${w}` : 'Pass'}`);
  }
  console.log(`\n토큰 ${ctx.db.size}개 · 오류 ${errors.length} · 경고 ${warns.length}`);
  process.exit(errors.length ? 1 : 0);
} else if (cmd === 'build') {
  const ctx = context();
  guardUnits(ctx);
  fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'dist/tokens.css'), buildCss(ctx));
  console.log('생성: dist/tokens.css');
} else {
  console.log('사용법: node scripts/tokens.mjs <sync|check|build> [--src 코드폴더]');
  process.exit(cmd ? 1 : 0);
}
