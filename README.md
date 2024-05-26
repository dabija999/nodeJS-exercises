# Node.js Script for Copying Images

This script is designed to copy image files from one directory to another within a Node.js environment. It specifically targets files with certain extensions (`.jpg` and `.img`) and handles duplicates by appending a timestamp to the filename to avoid overwriting existing files. The script also logs errors encountered during the process.

## Prerequisites

- Node.js installed on your system.
- Basic understanding of JavaScript and asynchronous programming concepts.

## Installation

Ensure you have Node.js installed. This script does not require any external packages beyond the standard `fs/promises` and `path` modules that come with Node.js.

## Usage

To run this script, save it as `copyImages.js` in your project directory. Then, execute it using Node.js:

```
node copyImages.js
```

The script will start copying images from the current working directory (`process.cwd()`) to a subdirectory named `destination`.

## How It Works

1. **Initialization**: The script initializes variables for storing filenames of copied and errored files, sets up directories for source and destination, and defines the extensions it will target.

2. **Check Destination Directory**: Before starting the copy process, it checks if the destination directory exists. If not, it creates the directory.

3. **Copy Function**: The core functionality is encapsulated in the `copyImages` function. This function recursively searches through the source directory for files matching the specified extensions. For each found file:
   - If the file is a directory, it calls itself recursively to handle nested directories.
   - If the file matches the extension criteria, it checks if the file has been copied before. If so, it appends a timestamp to the filename to create a unique copy. Otherwise, it copies the file as is.

4. **Error Handling**: The script includes robust error handling to manage issues such as access permissions, file existence, and other potential errors that may occur during the file copying process.

5. **Logging**: Throughout the process, the script logs progress, including successful copies and any errors encountered, providing visibility into its operations.

## Output

Upon completion, the script prints a summary of the operation, including the total number of files copied and any files that encountered errors during the process.

## Customization

- To change the target extensions, modify the `extensions` array at the beginning of the script.
- To adjust the source directory, replace `locationDir` with the desired path.
- To alter the destination directory, update the `destinationDir` variable accordingly.

## Conclusion

This script provides a straightforward way to automate the process of copying specific types of image files from one directory to another, with built-in support for handling duplicates and logging errors.
