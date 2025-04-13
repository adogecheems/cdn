import fs from 'fs';
import path from 'path';

const baseDir = process.cwd();
const sourceDir = path.join(baseDir, 'source');
const outputDir = path.join(baseDir, 'public');

fs.mkdirSync(outputDir, { recursive: true });

function copyFiles(src, dest) {
    fs.readdirSync(src, { withFileTypes: true }).forEach(entry => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        entry.isDirectory() ? (fs.mkdirSync(destPath, { recursive: true }), copyFiles(srcPath, destPath)) : fs.copyFileSync(srcPath, destPath);
    });
}

function generateHtml(dir, relativePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Index of ${relativePath || '/'}</title></head><body><h1>Index of ${relativePath || '/'}</h1><ul>${entries.map(entry => `<li><a href="${path.join(entry.name)}${entry.isDirectory() ? '/index.html' : ''}">${entry.isDirectory() ? '📁' : '📄'} ${entry.name}${entry.isDirectory() ? '/' : ''}</a></li>`).join('')}</ul></body></html>`;
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    entries.filter(entry => entry.isDirectory()).forEach(entry => generateHtml(path.join(dir, entry.name), path.join(relativePath, entry.name)));
}

copyFiles(sourceDir, outputDir);
generateHtml(outputDir);