// console.log(); => global object, w/c means you can access it anywhere in any files.

// Other examples of globally available functions in node:
// setTimeout();
// clearTimeout();
// setInterval();
// clearInterval();

// in node, every file is a module and the variables and functions defined in that file are scope in that module/file.
// console.log(module);


// Loading a Module
const logger = require('./logger'); // require() => returns the object that was exported from the target module.
// console.log(logger);

// you chose to export a single method instead of a object
logger('Hello Rudolph!') // instead of logger.log('Hello Rudolph!'); 

// Path Module => a Node builtin module.
const path = require('path'); // The path module provides utilities for working with the file and directory paths.
const pathObj = path.parse(__filename)
console.log(pathObj);