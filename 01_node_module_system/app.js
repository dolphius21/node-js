// console.log(); => global object, w/c means you can access it anywhere in any files.

// Other examples of globally available functions in node:
// setTimeout();
// clearTimeout();
// setInterval();
// clearInterval();

// in node, every file is a module and the variables and functions defined in that file are scope in that module/file.
// console.log(module);


// Loading a Module
// const Logger = require('./logger'); require() => returns the object that was exported from the target module.
// console.log(logger);

// you chose to export a single method instead of a object
// logger('Hello Rudolph!') instead of logger.log('Hello Rudolph!'); 

// Path Module => a Node builtin module.
const path = require('path'); // The path module provides utilities for working with the file and directory paths.
const pathObj = path.parse(__filename)
console.log(pathObj);

// OS Module => provides operating system-related utility methods and properties. 
const os = require('os');
const totalMemory = os.totalmem(); // Returns the total amount of system memory in bytes as an integer.
const freeMemory = os.freemem(); // Returns the amount of free system memory in bytes as an integer.

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

// File System Module
const fs = require('fs');
// const files = fs.readdirSync('./'); // fs.readdirSync() => (Synchronous) Returns all the files and folders in the current folder.
const files = fs.readdir('./', (err, files) => { // fs.readdir() => (Asynchronous) Returns all the files and folders in the current folder.
   if (err) {
      console.log('Error', err);
   } else {
      console.log('Result', files);
   } 
});

// Events Module
// const EventEmitter = require('events'); // EventEmitter Class
// const emitter = new EventEmitter(); Instantiate a new emitter object.
const Logger = require('./logger');
const logger = new Logger();

// Register a listener
logger.on('myMessage', (e) => {
   console.log('an event occurred!', e);
});

logger.log('This is a message');

// HTTP Module
const http = require('http');

const server = http.createServer( (req, res) => {
   if (req.url === '/') {
      res.write('Wazzzupp!!');
      res.end()
   }

   if (req.url === '/api/courses') {
      res.write(JSON.stringify([1, 2, 3]));
      res.end()
   }
});

server.listen(3000);

console.log('Listening on port 3000...');
