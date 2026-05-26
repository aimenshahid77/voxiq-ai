const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
        callback(dirPath);
      }
    }
  });
}

const targetDir = path.join(__dirname, 'src');

walkDir(targetDir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // General Hex Replacements
  content = content
    .replace(/#FAF6F1/gi, '#FFFFFF')
    .replace(/#1E4D4D/gi, '#2A6666')
    .replace(/#163D3D/gi, '#3A706A')
    .replace(/#FED583/gi, '#FEF0AF')
    .replace(/#E9BD7D/gi, '#E5D38E')
    .replace(/#F0E4D4/gi, '#F8F9FA')
    .replace(/#E8F0EE/gi, '#F1F3F5')
    .replace(/#E5DDD4/gi, '#E9ECEF')
    .replace(/#E8DDD4/gi, '#E9ECEF')
    .replace(/#EEE6DC/gi, '#E9ECEF')
    .replace(/#F0EAE3/gi, '#F1F3F5')
    .replace(/#F5EFE8/gi, '#FFFFFF');

  // Specific Inline Styles and Classes cleanups
  content = content
    .replace(/bg-\[#FFFFFF\]/g, 'bg-white')
    .replace(/bg-slate-900/g, 'bg-white') // dark mode backgrounds to white
    .replace(/bg-gray-50/g, 'bg-white')
    .replace(/text-slate-200/g, 'text-[#1a1a1a]')
    .replace(/text-gray-100/g, 'text-[#1a1a1a]')
    .replace(/border-slate-800/g, 'border-[#E9ECEF]')
    .replace(/bg-slate-800/g, 'bg-[#F8F9FA]');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
});

console.log("Global color swap complete.");
