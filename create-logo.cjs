const fs = require('fs');
const path = require('path');

// Minimal valid 1x1 transparent PNG
const pngData = Buffer.from(
  '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489' +
  '0000000a49444154789c626000000002000198e195280000000049454e44ae426082',
  'hex'
);

const outputPath = path.join(__dirname, 'public', 'images', 'logo.png');
fs.writeFileSync(outputPath, pngData);
console.log('Created valid PNG at:', outputPath, '(' + pngData.length + ' bytes)');
process.exit(0);
