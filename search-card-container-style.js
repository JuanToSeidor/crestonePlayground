const fs = require('fs');
const path = require('path');

const outputPath = 'C:\\Users\\Seidor\\.gemini\\antigravity-ide\\brain\\b0976129-211e-4d6b-a185-eb2595a77594\\.system_generated\\steps\\500\\output.txt';
if (fs.existsSync(outputPath)) {
  const content = fs.readFileSync(outputPath, 'utf8');
  console.log(content.substring(59000, 59350));
} else {
  console.log('output.txt not found');
}
