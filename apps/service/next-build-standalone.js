const { moveSync, copySync, removeSync, ensureDirSync } = require('fs-extra');
const { join } = require('path');

// Get the project name from the command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error('❌ Project name is required. Usage:');
  console.log('   node next-build-standalone.js <project-name>');
  process.exit(1);
}

// Define paths based on the project name
const rootDir = join(__dirname, '../'); // Root of the monorepo
const buildOutputDir = join(rootDir, `dist/${projectName}`);
console.log("the buildOutputDir is :", buildOutputDir);
const targetDir = join(rootDir, `dist/standalone-build/${projectName}`);

// Check if the build directory exists
if (!require('fs').existsSync(buildOutputDir)) {
  console.error(`❌ Build directory for project "${projectName}" not found. Run the build first:`);
  console.log(`   npx nx build ${projectName}`);
  process.exit(1);
}

console.log(`🚀 Processing build for project: ${projectName}`);
ensureDirSync(targetDir);

// Move and copy necessary files to the target directory
console.log(`🔄 Reorganizing build output for ${projectName}...`);
moveSync(join(buildOutputDir, '.next/standalone/dist', projectName, '.next'), join(targetDir, '.next'), { overwrite: true });
moveSync(join(buildOutputDir, 'public'), join(targetDir, 'public'), { overwrite: true });
moveSync(join(buildOutputDir, '.next/static'), join(targetDir, '.next/static'), { overwrite: true });
moveSync(join(buildOutputDir, '.next/standalone/apps', projectName, 'server.js'), join(targetDir, 'server.js'), { overwrite: true });
moveSync(join(buildOutputDir, '.next/standalone/apps', projectName, '.env'), join(targetDir, '.env'), { overwrite: true });
moveSync(join(buildOutputDir, 'package.json'), join(targetDir, 'package.json'), { overwrite: true });

console.log(`✅ Build output reorganized successfully for ${projectName}!`);

// Clean and move contents back to the build output directory
console.log(`🧹 Cleaning original build directory for ${projectName}...`);
removeSync(buildOutputDir); // Delete original build output
ensureDirSync(buildOutputDir); // Recreate an empty build directory

console.log(`📦 Moving final build output back to ${buildOutputDir}...`);
copySync(targetDir, buildOutputDir, { overwrite: true }); // Copy everything back
// Remove the entire standalone-build directory after moving
removeSync(join(rootDir, 'dist/standalone-build')); // Deletes the complete standalone-build directory

console.log(`🎉 Build cleanup and reorganization complete for ${projectName}!`);
