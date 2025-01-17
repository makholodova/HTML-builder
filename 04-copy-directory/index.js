const fs = require('fs');
const path = require('path');

async function copyDir() {
  const srcDirPath = path.join(__dirname, 'files');
  const destDirPath = path.join(__dirname, 'files-copy');

  await fs.promises.mkdir(destDirPath, { recursive: true });

  const elements = await fs.promises.readdir(srcDirPath, {
    withFileTypes: true,
  });

  const existingItems = await fs.promises.readdir(destDirPath);
  for (const item of existingItems) {
    const itemPath = path.join(destDirPath, item);
    await fs.promises.rm(itemPath, { recursive: true, force: true });
  }

  for (const element of elements) {
    const srcElementPath = path.join(srcDirPath, element.name);
    const destElementPath = path.join(destDirPath, element.name);

    if (element.isDirectory()) {
      await copyDirectory(srcElementPath, destElementPath);
    } else if (element.isFile()) {
      await fs.promises.copyFile(srcElementPath, destElementPath);
    }
  }
}

async function copyDirectory(srcPath, destPath) {
  await fs.promises.mkdir(destPath, { recursive: true });
  const elements = await fs.promises.readdir(srcPath, { withFileTypes: true });

  for (const element of elements) {
    const srcPath = path.join(srcPath, element.name);
    const destPath = path.join(destPath, element.name);

    if (element.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else if (element.isFile()) {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

copyDir();
