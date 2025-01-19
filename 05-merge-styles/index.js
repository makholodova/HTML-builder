const fs = require('fs');
const path = require('path');

const stylesDirPath = path.join(__dirname, 'styles');
const projectDistPath = path.join(__dirname, 'project-dist');
const bundleFilePath = path.join(projectDistPath, 'bundle.css');

function mergeStyles() {
  const output = fs.createWriteStream(bundleFilePath);
  fs.readdir(stylesDirPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      const fileExt = path.extname(file.name);
      const filePath = path.join(stylesDirPath, file.name);
      if (file.isFile() && fileExt === '.css') {
        const stream = fs.createReadStream(filePath, 'utf-8');
        stream.on('data', (chunk) => {
          output.write(chunk + '\n');
        });
      }
    }
  });
}

mergeStyles();
