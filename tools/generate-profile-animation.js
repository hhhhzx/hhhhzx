const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'profile.config.json');
const outputPath = path.join(root, 'assets', 'profile-animation.svg');

function escapeXml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function estimateTagWidth(label) {
  const chars = [...String(label)].length;
  return Math.max(86, Math.min(168, chars * 11 + 34));
}

function renderTags(tags = []) {
  let x = 0;
  return tags.slice(0, 5).map((tag) => {
    const width = estimateTagWidth(tag);
    const textX = x + 18;
    const current = `
      <rect x="${x}" y="0" width="${width}" height="30" rx="15" fill="#1E293B" stroke="#334155"/>
      <text class="tag" x="${textX}" y="19">${escapeXml(tag)}</text>`;
    x += width + 14;
    return current;
  }).join('\n');
}

function renderCodeLines(lines = []) {
  const safeLines = [...lines, '', '', ''].slice(0, 3);
  return `
    <g class="line-a">
      <text class="muted-code" x="24" y="58">${escapeXml(safeLines[0])}</text>
    </g>
    <g class="line-b">
      <text class="code" x="24" y="88">${escapeXml(safeLines[1])}</text>
    </g>
    <text class="muted-code" x="24" y="118">${escapeXml(safeLines[2])}</text>`;
}

function renderSvg(config) {
  const card = config.showcaseCard || {};
  const colors = card.colors || {};
  const title = card.title || "Hi, I'm hhhhzx";
  const subtitle = card.subtitle || 'Full-stack learner · Frontend explorer · Product-minded builder';
  const tags = card.tags || ['Vue', 'React', 'Spring Boot', 'TypeScript'];
  const codeLines = card.codeLines || ['const dream = idea();', 'build(dream).ship();', 'while(true) learn();'];

  const backgroundStart = colors.backgroundStart || '#0F172A';
  const backgroundMiddle = colors.backgroundMiddle || '#111827';
  const backgroundEnd = colors.backgroundEnd || '#312E81';
  const accent = colors.accent || '#38BDF8';
  const accent2 = colors.accent2 || '#A78BFA';
  const accent3 = colors.accent3 || '#F472B6';

  return `<svg width="900" height="260" viewBox="0 0 900 260" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)}</title>
  <desc id="desc">A configurable animated developer card generated from profile.config.json.</desc>

  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="900" y2="260" gradientUnits="userSpaceOnUse">
      <stop stop-color="${backgroundStart}"/>
      <stop offset="0.52" stop-color="${backgroundMiddle}"/>
      <stop offset="1" stop-color="${backgroundEnd}"/>
    </linearGradient>

    <linearGradient id="glow" x1="180" y1="0" x2="760" y2="240" gradientUnits="userSpaceOnUse">
      <stop stop-color="${accent}"/>
      <stop offset="0.5" stop-color="${accent2}"/>
      <stop offset="1" stop-color="${accent3}"/>
    </linearGradient>

    <filter id="blur">
      <feGaussianBlur stdDeviation="18"/>
    </filter>

    <style>
      .title { font: 700 34px 'Segoe UI', Inter, Arial, sans-serif; fill: #F8FAFC; }
      .subtitle { font: 500 17px 'Segoe UI', Inter, Arial, sans-serif; fill: #CBD5E1; }
      .code { font: 600 15px 'Fira Code', Consolas, monospace; fill: #A7F3D0; }
      .muted-code { font: 600 15px 'Fira Code', Consolas, monospace; fill: #93C5FD; }
      .tag { font: 600 13px 'Segoe UI', Inter, Arial, sans-serif; fill: #E0E7FF; }
      .particle { animation: float 4.8s ease-in-out infinite; }
      .particle.slow { animation-duration: 6.2s; }
      .particle.fast { animation-duration: 3.6s; }
      .cursor { animation: blink 1s steps(2, start) infinite; }
      .line-a { animation: slideA 7s ease-in-out infinite; }
      .line-b { animation: slideB 8s ease-in-out infinite; }
      .pulse { animation: pulse 3.4s ease-in-out infinite; transform-origin: center; }
      @keyframes float { 0%, 100% { transform: translateY(0); opacity: .55; } 50% { transform: translateY(-13px); opacity: 1; } }
      @keyframes blink { 0%, 45% { opacity: 1; } 46%, 100% { opacity: 0; } }
      @keyframes slideA { 0%, 100% { transform: translateX(0); opacity: .92; } 50% { transform: translateX(18px); opacity: 1; } }
      @keyframes slideB { 0%, 100% { transform: translateX(18px); opacity: .82; } 50% { transform: translateX(0); opacity: 1; } }
      @keyframes pulse { 0%, 100% { transform: scale(1); opacity: .45; } 50% { transform: scale(1.06); opacity: .75; } }
    </style>
  </defs>

  <rect width="900" height="260" rx="28" fill="url(#bg)"/>
  <circle class="pulse" cx="710" cy="50" r="92" fill="${accent2}" opacity="0.42" filter="url(#blur)"/>
  <circle class="pulse" cx="165" cy="205" r="86" fill="${accent}" opacity="0.32" filter="url(#blur)"/>
  <path d="M38 207C120 149 185 153 257 184C332 217 380 197 435 148C513 78 597 78 673 124C742 166 808 160 862 118" stroke="url(#glow)" stroke-width="2" opacity="0.45"/>

  <g class="particle">
    <circle cx="112" cy="66" r="4" fill="${accent}"/>
    <circle cx="824" cy="190" r="3" fill="${accent3}"/>
  </g>
  <g class="particle slow">
    <circle cx="770" cy="78" r="4" fill="${accent2}"/>
    <circle cx="243" cy="225" r="3" fill="#22D3EE"/>
  </g>
  <g class="particle fast">
    <circle cx="608" cy="214" r="3" fill="#FBBF24"/>
    <circle cx="330" cy="50" r="3" fill="#34D399"/>
  </g>

  <g transform="translate(56 48)">
    <text class="title" x="0" y="0" dominant-baseline="hanging">${escapeXml(title)}</text>
    <text class="subtitle" x="0" y="52">${escapeXml(subtitle)}</text>

    <g transform="translate(0 88)">
${renderTags(tags)}
    </g>
  </g>

  <g transform="translate(560 68)">
    <rect x="0" y="0" width="284" height="134" rx="18" fill="#020617" opacity="0.72" stroke="#334155"/>
    <circle cx="24" cy="24" r="5" fill="#F87171"/>
    <circle cx="42" cy="24" r="5" fill="#FBBF24"/>
    <circle cx="60" cy="24" r="5" fill="#34D399"/>
${renderCodeLines(codeLines)}
    <rect class="cursor" x="196" y="105" width="9" height="18" rx="2" fill="${accent}"/>
  </g>
</svg>
`;
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
fs.writeFileSync(outputPath, renderSvg(config), 'utf8');
console.log(`Generated ${path.relative(root, outputPath)} from ${path.relative(root, configPath)}`);
