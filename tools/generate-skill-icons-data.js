const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'assets', 'skill-icons.md');
const outputPath = path.join(root, 'editor', 'skill-icons-data.js');

const markdown = fs.readFileSync(sourcePath, 'utf8');
const ids = [...new Set([...markdown.matchAll(/`([a-z0-9]+)`/g)].map((match) => match[1]))].sort();
const content = `window.SKILL_ICON_IDS = ${JSON.stringify(ids, null, 2)};\n`;

fs.writeFileSync(outputPath, content, 'utf8');
console.log(`Generated ${path.relative(root, outputPath)} with ${ids.length} icon IDs`);
