const fs = require('fs');
const path = require('path');

// LOCATE
const mainProjectPath = path.resolve(__dirname, '..');
const cacheFolderPath = path.join(__dirname, '../data/cache');
const cachedVersionFilePath = path.join(cacheFolderPath, 'version.dat');
const packageJsonPath = path.join(mainProjectPath, 'package.json');
// CURRENT
const packageJson = require(packageJsonPath);
const currentVersion = packageJson.version;
// READ
let previousVersion = '';
if (fs.existsSync(cachedVersionFilePath)) {
  previousVersion = fs.readFileSync(cachedVersionFilePath, 'utf8');
} else {
  // NEW FILE (if not exist)
  fs.writeFileSync(cachedVersionFilePath, currentVersion, 'utf8');
}
// COMPARE
if (previousVersion !== currentVersion) {
  if (fs.existsSync(cacheFolderPath)) {
    fs.readdirSync(cacheFolderPath).forEach(file => {
      const filePath = path.join(cacheFolderPath, file);
      fs.unlinkSync(filePath);
    });
  } else {
    fs.mkdirSync(cacheFolderPath, { recursive: true });
  }
  // NEW
  fs.writeFileSync(cachedVersionFilePath, currentVersion, 'utf8');
}
