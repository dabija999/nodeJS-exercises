# Node.js Script for Copying Images Based on Extensions

This script is designed to copy image files from one directory to another within a Node.js environment. It dynamically determines the file extensions to copy based on command-line arguments provided by the user. The script also handles duplicates by appending a timestamp to the filename to avoid overwriting existing files. Additionally, it logs errors encountered during the process.

## Prerequisites

- Node.js installed on your system.
- Basic understanding of JavaScript and asynchronous programming concepts.

## Installation

Ensure you have Node.js installed. This script does not require any external packages beyond the standard `fs/promises` and `path` modules that come with Node.js.

## Usage

To run this script, save it as `copyImages.js` in your project directory. Execute it using Node.js with the desired file extensions as command-line arguments:

```
node copyImages.js jpg png
```

This command tells the script to copy files with `.jpg` and `.png` extensions. Note that the script expects each extension to be prefixed with a dot (`.`).

## How It Works

1. **Command-Line Arguments**: The script starts by parsing command-line arguments to determine which file extensions to copy.

2. **Directory Setup**: It checks if the destination directory exists. If not, it creates the directory.

3. **Copying Files**: The core functionality is encapsulated in the `copyImages` function. This function recursively searches through the source directory for files matching the specified extensions. For each found file:
   - If the file is a directory, it calls itself recursively to handle nested directories.
   - If the file matches the extension criteria, it checks if the file has been copied before. If so, it appends a timestamp to the filename to create a unique copy. Otherwise, it copies the file as is.

4. **Error Handling**: The script includes robust error handling to manage issues such as access permissions, file existence, and other potential errors that may occur during the file copying process.

5. **Logging**: Throughout the process, the script logs progress, including successful copies and any errors encountered, providing visibility into its operations.

## Output

Upon completion, the script prints a summary of the operation, including the total number of files copied and any files that encountered errors during the process.

## Customization

- To change the target extensions, provide different arguments when running the script.
- To adjust the source directory, modify the `locationDir` variable in the script.
- To alter the destination directory, update the `destinationDir` variable accordingly.

## Conclusion

This script provides a flexible way to automate the process of copying specific types of image files from one directory to another, with built-in support for handling duplicates and logging errors.