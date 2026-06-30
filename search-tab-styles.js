const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'node_modules', 'caralstable', 'dist', 'index.css');
if (fs.existsSync(cssPath)) {
  const content = fs.readFileSync(cssPath, 'utf8');
  
  // Find all class names containing "tab"
  const regex = /\.[a-zA-Z0-9_-]*tab[a-zA-Z0-9_-]*\{[^{}]*\}/gi;
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push(match[0]);
  }
  
  console.log('Matches (first 40):', matches.slice(0, 40));
} else {
  console.log('CSS not found');
}
