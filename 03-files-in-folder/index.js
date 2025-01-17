const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  for (let file of files) {
    if (file.isFile()) {
      const filePath = path.join(secretFolderPath, file.name);
      const fileExtension = path.extname(file.name);
      const fileName = path.basename(file.name, fileExtension);
      // const fileName = file.name.split('.')[0];

      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        const fileSize = stats.size;
        console.log(
          `${fileName} - ${fileExtension.slice(1)} - ${fileSize} bytes`,
        );
      });
    }
  }
});
