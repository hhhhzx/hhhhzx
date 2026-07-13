const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'profile.config.json');
const outputPath = path.join(root, 'editor', 'profile-config-data.js');

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const content = `window.PROFILE_CONFIG = ${JSON.stringify(config, null, 2)};\n`;

fs.writeFileSync(outputPath, content, 'utf8');
console.log(`Generated ${path.relative(root, outputPath)} from ${path.relative(root, configPath)}`);
