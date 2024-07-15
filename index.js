const fs = require('fs');
const path = require('path');

// Retrieve command line arguments
const operation = process.argv[2];
const target = process.argv[3];
const additionalArgs = process.argv.slice(4);

// Function to read contents of a file
function readFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file '${filePath}':`, err.message);
        } else {
            console.log(`Contents of '${filePath}':\n${data}`);
        }
    });
}

// Function to delete a file
function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file '${filePath}':`, err.message);
        } else {
            console.log(`File '${filePath}' deleted`);
        }
    });
}

// Function to create a new file
function createFile(filePath) {
    fs.writeFile(filePath, '', (err) => {
        if (err) {
            console.error(`Error creating file '${filePath}':`, err.message);
        } else {
            console.log(`File '${filePath}' created`);
        }
    });
}

// Function to append content to a file
function appendFile(filePath, content) {
    fs.appendFile(filePath, content + '\n', 'utf8', (err) => {
        if (err) {
            console.error(`Error appending to file '${filePath}':`, err.message);
        } else {
            console.log(`Content appended to the file '${filePath}'`);
        }
    });
}

// Function to rename a file
function renameFile(oldPath, newPath) {
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error(`Error renaming file '${oldPath}' to '${newPath}':`, err.message);
        } else {
            console.log(`File '${oldPath}' renamed to '${newPath}'`);
        }
    });
}

// Function to list files in a directory
function listFiles(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory '${directoryPath}':`, err.message);
        } else {
            console.log(`Files in directory '${directoryPath}':`);
            files.forEach(file => {
                console.log(file);
            });
        }
    });
}

// Main logic to select and execute operation
switch (operation) {
    case 'read':
        if (!target) {
            console.log("Please provide a file to read.");
        } else {
            readFile(target);
        }
        break;
    case 'delete':
        if (!target) {
            console.log("Please provide a file to delete.");
        } else {
            deleteFile(target);
        }
        break;
    case 'create':
        if (!target) {
            console.log("Please provide a file to create.");
        } else {
            createFile(target);
        }
        break;
    case 'append':
        if (!target || !additionalArgs[0]) {
            console.log("Please provide both a file and content to append.");
        } else {
            const content = additionalArgs.join(' ');
            appendFile(target, content);
        }
        break;
    case 'rename':
        if (!target || !additionalArgs[0]) {
            console.log("Please provide both current and new file names to rename.");
        } else {
            const newFileName = additionalArgs[0];
            renameFile(target, newFileName);
        }
        break;
    case 'list':
        const directory = target || '.';
        listFiles(directory);
        break;
    default:
        console.log(`Invalid operation '${operation}'`);
        break;
}
