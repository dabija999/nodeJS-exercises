const fs = require('fs/promises');
const path = require('path');

(async () => {
  const args = process.argv.slice(2, 4);
  let extensions = [];
  let folderIgnoreList = [];
  args.forEach((arg, i) => {
    if (i === 0) {
      extensions = arg.split(' ').map(argument => '.' + argument);
    }
    if (i === 1) {
      folderIgnoreList = arg.split(' ');
    }
  });

  let copiedImageFileNames = [];
  let erroredFiles = [];

  const locationDir = path.join(process.cwd());
  const destinationDir = path.join(process.cwd(), 'destination');
  let numberOfCopies = 0;

  if (args.length === 0) {
    throw new Error('Please provide file types to copy and folders to ignore.');
  }

  try {
    await fs.access(destinationDir);
    console.log(`Directory already exists: ${destinationDir}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        await fs.mkdir(destinationDir, { recursive: true });
      } catch (mkdirErr) {
        throw new Error(`Failed to create destination directory: ${destinationDir}. ${mkdirErr.message}`);
      }
    } else {
      throw new Error(`Error checking/creating destination directory: ${destinationDir}. ${err.message}`);
    }
  }

  const copyImages = async (dir, extensions) => {
    try {
      const files = await fs.readdir(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) {
          if (folderIgnoreList.includes(file) || file === 'destination') {
            console.log(`Ignored folder: ${file}`);
          } else {
            await copyImages(filePath, extensions);
          }
        } else {
          if (extensions.includes(path.extname(file))) {
            try {
              const destFilenamePath = copiedImageFileNames.includes(file)
                ? path.join(destinationDir, `${path.basename(file, path.extname(file))}-${Date.now()}${path.extname(file)}`)
                : path.join(destinationDir, file);

              await fs.copyFile(filePath, destFilenamePath);
              copiedImageFileNames.push(file);
              numberOfCopies++;
              console.log(`Successfully copied file: ${filePath} to ${destFilenamePath}`);
            } catch (copyErr) {
              erroredFiles.push(file);
              console.error(`Failed to copy file: ${filePath} to ${destinationDir}. ${copyErr.message}`);
            }
          }
        }
      }
    } catch (copyImagesErr) {
      throw new Error(`Failed to copy images from directory: ${dir}. ${copyImagesErr.message}`);
    }
  };

  try {
    await copyImages(locationDir, extensions);
    console.log(`Finished copying ${numberOfCopies} files.`);
    if (erroredFiles.length > 0) {
      console.log('Files with errors:');
      erroredFiles.forEach(file => console.log(file));
    }
  } catch (err) {
    console.error(`Error during copy operation: ${err.message}`);
  }
})();
