# Node.js Script for Copying Specific Files

This script is designed to copy  files from a specified source directory to a destination directory within a Node.js environment. It allows users to specify the types of files to copy via command-line arguments and supports ignoring certain folders during the copy process. The script also handles duplicate files by renaming them with a timestamp to prevent overwriting.

## Prerequisites

- Node.js installed on your system.
- Basic understanding of JavaScript and asynchronous programming concepts.

## Installation

No installation is required. This script uses only the standard `fs/promises` and `path` modules available in Node.js.

## Usage

Save the script as `copy.js` in your project directory. Run it using Node.js from the terminal, specifying the file extensions of the files you wish to copy and any folders to ignore:

```
node copy.js png temp
```

**Use quotation marks when specifying multiple extensions/folders to ignore**

```
node copy.js "jpg png" "temp cache"
```

This command will copy `.jpg` and `.png` files from the current working directory to a subdirectory named `destination`, skipping any files in folders named `temp` or `cache`.

## How It Works

1. **Parsing Command-Line Arguments**: The script parses the command-line arguments to identify the file extensions to copy and any folders to ignore.
2. **Directory Setup**: It checks if the destination directory exists; if not, it creates the directory.
3. **Copying Process**:
   - The script recursively searches through the source directory for files matching the specified extensions.
   - Folders listed in the ignore list are skipped.
   - Duplicates are detected by checking against a list of previously copied filenames; they are renamed with a timestamp to ensure uniqueness.
4. **Error Handling and Logging**: The script logs the progress of file copies and reports any errors encountered, providing feedback on the operation's success or failure.

## Output

Upon completion, the script prints a summary of the operation, including the total number of files copied and any files that encountered errors during the process.

## Customization

- To change the target extensions, modify the command-line arguments when running the script.
- To adjust the source directory, the script currently defaults to the current working directory. Consider modifying the script to accept a source directory argument.
- To alter the destination directory, the script sets the destination to a subdirectory named `destination`. You can change this by modifying the `destinationDir` variable in the script.

## Conclusion

This script offers a straightforward method for copying specific types of files between directories, with features for handling duplicates and ignoring specified folders. It's useful for organizing files collections or backing up specific file types.
