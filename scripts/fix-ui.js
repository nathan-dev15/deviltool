const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  
  let original = fs.readFileSync(filePath, 'utf8');
  let content = original;

  // Add dark variants for text colors
  content = content.replace(/\btext-slate-900(?!\s+dark:text-)/g, 'text-slate-900 dark:text-slate-100');
  content = content.replace(/\btext-slate-800(?!\s+dark:text-)/g, 'text-slate-800 dark:text-slate-200');
  content = content.replace(/\btext-slate-700(?!\s+dark:text-)/g, 'text-slate-700 dark:text-slate-300');
  content = content.replace(/\btext-slate-600(?!\s+dark:text-)/g, 'text-slate-600 dark:text-slate-400');
  content = content.replace(/\btext-gray-900(?!\s+dark:text-)/g, 'text-gray-900 dark:text-slate-100');
  content = content.replace(/\btext-gray-800(?!\s+dark:text-)/g, 'text-gray-800 dark:text-slate-200');
  
  // Add dark variants for backgrounds
  content = content.replace(/\bbg-white(?!\s+dark:bg-)/g, 'bg-white dark:bg-slate-900');
  content = content.replace(/\bbg-slate-50(?!\s+dark:bg-)/g, 'bg-slate-50 dark:bg-slate-900');
  content = content.replace(/\bbg-slate-100(?!\s+dark:bg-)/g, 'bg-slate-100 dark:bg-slate-800');
  
  // Add dark variants for borders
  content = content.replace(/\bborder-slate-100(?!\s+dark:border-)/g, 'border-slate-100 dark:border-slate-800');
  content = content.replace(/\bborder-slate-200(?!\s+dark:border-)/g, 'border-slate-200 dark:border-slate-800');

  // Replace overly jarring animation with smooth face in
  content = content.replace(/\banimate-fade-in-up\b/g, 'animate-fade-in');

  // Fix home blobs
  if (filePath.endsWith('Home.tsx')) {
    content = content.replace(/\banimate-gradient-move\b/g, '');
    content = content.replace(/\banimate-gradient-move2\b/g, '');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: ' + filePath);
  }
}

console.log('Starting UI Fix UI mass replace...');
walkDir(path.join(__dirname, '../src/pages'), processFile);
walkDir(path.join(__dirname, '../src/components'), processFile);
console.log('UI Fix complete!');
