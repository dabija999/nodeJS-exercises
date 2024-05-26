const fs = require('fs/promises');
const path = require('path');

(async () => {
  const extensions = ['.jpg', '.img'];
  let copiedImageFileNames = [];
  let erroredFiles = []

  const locationDir = path.join(process.cwd());
  const destinationDir = path.join(process.cwd(), 'destination');
  let numberOfCopies = 0;

  try {
    await fs.access(destinationDir);
    console.log(`Directory already exists: ${destinationDir}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        await fs.mkdir(destinationDir, { recursive: true });
      } catch (err) {
        throw new Error('Error running fs.mkdir command', err);
      }
    } else {
      throw new Error('Error creating destination folder, not ENOENT error', err);
    }
  }

  const copyImages = async (dir, extensions) => {
    try {
      const files = await fs.readdir(dir);
  
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) {
          await copyImages(filePath, extensions);
        } else {
          if (extensions.includes(path.extname(file))) {
            try {
              if (copiedImageFileNames.includes(file)) {
                const currentMilliseconds = Date.now();
                const destFilenamePath = path.join(destinationDir, `${path.basename(file, path.extname(file))}-${currentMilliseconds}${path.extname(file)}`);
                try {
                  await fs.copyFile(filePath, destFilenamePath);
                  numberOfCopies++;
                  console.log('Finished copying file', filePath);
                } catch (err) {
                  erroredFiles.push(file)
                  console.error(`Error copying duplicate file: ${file}`, err);
                }
              } else {
                copiedImageFileNames.push(file);
                try {
                  await fs.copyFile(filePath, path.join(destinationDir, file));
                  numberOfCopies++;
                  console.log('Finished copying file', filePath);
                } catch (err) {
                  erroredFiles.push(file);
                  console.error(`Error copying non-duplicate file: ${file}`, err);
                }
              }
            } catch (err) {
              erroredFiles.push(file);
              console.error(`General looping file error: ${file}`, err);
            }
          }
        }
      }
    }
    catch (err) {
      throw new Error('General copy images function error', err);
    }
  };
  
  try {
    await copyImages(locationDir, extensions);
    console.log('Finished copying files', numberOfCopies);
    if (erroredFiles.length > 0) {
      console.log('Files with errors:');
      erroredFiles.forEach(file => console.log(file));
    }
  } catch (err) {
    console.error('Error during copy operation:', err);
  }

})()