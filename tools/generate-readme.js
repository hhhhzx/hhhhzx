const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'profile.config.json');
const readmePath = path.join(root, 'README.md');
const showcaseGeneratorPath = path.join(root, 'tools', 'generate-profile-animation.js');
const editorConfigGeneratorPath = path.join(root, 'tools', 'generate-editor-config-data.js');

function readConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function text(value = '') {
  return String(value).replace(/\|/g, '\\|').trim();
}

function link(label, url) {
  const safeLabel = text(label);
  return url ? `[${safeLabel}](${url})` : safeLabel;
}

function lines(items = []) {
  return items.filter((item) => item !== undefined && item !== null).join('\n');
}

function section(title, body) {
  if (!body || !String(body).trim()) return '';
  return `## ${title}\n\n${body.trim()}`;
}

function renderHeader(config) {
  const { profile } = config;
  const badges = (profile.badges || [])
    .map((badge) => `  <img src="${badge.src}" alt="${badge.alt || badge.label || ''}" />`)
    .join('\n');

  return lines([
    '<div align="center">',
    '',
    `# ${profile.title}`,
    '',
    `### ${profile.subtitle}`,
    '',
    '<p>',
    badges,
    '</p>',
    '',
    profile.typingSvg ? `<img src="${profile.typingSvg}" alt="typing intro" />` : '',
    '',
    '</div>',
    '',
    '---'
  ]);
}

function renderAbout(config) {
  return section('🧭 关于我', (config.about || []).map((item) => `- ${item}`).join('\n'));
}

function renderContacts(config) {
  const contacts = (config.contacts || [])
    .map((item) => lines([
      `<a href="${item.href}">`,
      `  <img src="${item.badge}" alt="${item.alt || item.label || ''}" />`,
      '</a>'
    ]))
    .join('\n');

  return section('📫 联系我', lines([
    '<div align="center">',
    '',
    contacts,
    '',
    '</div>'
  ]));
}

function renderSkills(config) {
  const groups = (config.skills || [])
    .map((group) => lines([
      `### ${group.title}`,
      '',
      '<p>',
      `  <img src="https://skillicons.dev/icons?i=${group.icons}" alt="${group.alt || group.title}" />`,
      '</p>'
    ]))
    .join('\n\n');

  return section('🛠️ 技术栈', lines([
    '<div align="center">',
    '',
    groups,
    '',
    '</div>'
  ]));
}

function renderDynamicShowcase(config) {
  const showcase = config.dynamicShowcase;
  if (!showcase?.enabled) return '';

  return section('✨ 动态展示', lines([
    '<div align="center">',
    '',
    `<img src="${showcase.src}" alt="${showcase.alt || 'dynamic showcase'}" width="${showcase.width || '92%'}" />`,
    '',
    '</div>'
  ]));
}

function renderGithubData(config) {
  const graph = config.githubData?.activityGraph;
  if (!graph?.enabled) return '';

  return section('📊 GitHub 数据', lines([
    '<div align="center">',
    '',
    `<img src="${graph.src}" alt="${graph.alt || 'GitHub activity graph'}" />`,
    '',
    '</div>'
  ]));
}

function renderSnake(config) {
  const snake = config.contributionSnake;
  if (!snake?.enabled) return '';

  return section('🐍 贡献图', lines([
    '<div align="center">',
    '',
    '<picture>',
    `  <source media="(prefers-color-scheme: dark)" srcset="${snake.dark}" />`,
    `  <source media="(prefers-color-scheme: light)" srcset="${snake.light}" />`,
    `  <img alt="${snake.alt || 'github contribution grid snake animation'}" src="${snake.light}" />`,
    '</picture>',
    '',
    '</div>'
  ]));
}

function renderDirections(config) {
  const rows = (config.directions || [])
    .map((item) => `| ${text(item.name)} | ${text(item.keywords)} | ${text(item.focus)} |`)
    .join('\n');

  return section('🚀 项目方向', lines([
    '| 方向 | 技术关键词 | 我在关注什么 |',
    '| --- | --- | --- |',
    rows
  ]));
}

function renderProjects(config) {
  const rows = (config.projects || [])
    .map((item) => `| ${link(item.name, item.url)} | ${text(item.description)} | ${text(item.tech)} |`)
    .join('\n');

  return section('🚩 代表项目', lines([
    '| 项目 | 简介 | 技术栈 / 关键词 |',
    '| --- | --- | --- |',
    rows
  ]));
}

function renderGoals(config) {
  return section('🌟 最近想做得更好的事', (config.goals || []).map((item) => `- ${item}`).join('\n'));
}

function renderFooter(config) {
  const footer = config.footer || {};
  return lines([
    '---',
    '',
    '<div align="center">',
    '',
    `### ${footer.title || 'Thanks for visiting!'}`,
    '',
    (footer.lines || []).join('  \n'),
    '',
    '</div>'
  ]);
}

function renderReadme(config) {
  return `${lines([
    '<!--',
    '  This README is generated from profile.config.json.',
    '  Edit the config or use editor/index.html, then run: node tools/generate-readme.js',
    '-->',
    '',
    renderHeader(config),
    '',
    renderAbout(config),
    '',
    renderContacts(config),
    '',
    renderSkills(config),
    '',
    renderDynamicShowcase(config),
    '',
    renderGithubData(config),
    '',
    renderSnake(config),
    '',
    renderDirections(config),
    '',
    renderProjects(config),
    '',
    renderGoals(config),
    '',
    renderFooter(config)
  ])}\n`;
}

const config = readConfig();
execFileSync(process.execPath, [editorConfigGeneratorPath], { cwd: root, stdio: 'inherit' });
if (config.dynamicShowcase?.enabled && config.dynamicShowcase?.src === './assets/profile-animation.svg') {
  execFileSync(process.execPath, [showcaseGeneratorPath], { cwd: root, stdio: 'inherit' });
}
fs.writeFileSync(readmePath, renderReadme(config), 'utf8');
console.log(`Generated ${path.relative(root, readmePath)} from ${path.relative(root, configPath)}`);
