const { execSync } = require('child_process');
const { moveSync, copySync, removeSync, ensureDirSync } = require('fs-extra');
const { join } = require('path');

// Define paths relative to the root directory
const rootDir = join(__dirname, '../..'); // Go up two levels to the root of the workspace
const buildOutputDir = join(rootDir, 'dist/personal-portfolio');
const targetDir = join(rootDir, 'dist/standalone-build');

// // Run the Next.js build
// console.log('🚀 Building the Next.js app...');
// execSync('npx nx build personal-portfolio', { stdio: 'inherit' });

// Reorganize the build output
console.log('🔄 Reorganizing the build output...');
ensureDirSync(targetDir);

moveSync(join(buildOutputDir, '.next/standalone/dist/personal-portfolio/.next'), join(targetDir, '.next'), { overwrite: true });
copySync(join(buildOutputDir, 'public'), join(targetDir, '/public'), { overwrite: true });
copySync(join(buildOutputDir, '.next/static'), join(targetDir, '.next/static'), { overwrite: true });
moveSync(join(buildOutputDir, '.next/standalone/apps/personal-portfolio/server.js'), join(targetDir, 'server.js'), { overwrite: true });
moveSync(join(buildOutputDir, 'package.json'), join(targetDir, 'package.json'), { overwrite: true });

console.log('✅ Build output reorganized successfully!');

// Clean and move contents back to the build output directory
console.log('🧹 Cleaning the original build directory...');
removeSync(buildOutputDir); // Delete original build output
ensureDirSync(buildOutputDir); // Recreate an empty build directory

console.log('📦 Moving final build output to the original directory...');
copySync(targetDir, buildOutputDir, { overwrite: true }); // Copy everything back
removeSync(targetDir); // Clean up the standalone-build directory after moving

console.log('🎉 Build cleanup and reorganization complete!');
