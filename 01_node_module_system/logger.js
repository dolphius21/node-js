// Creating a Module
const url = 'http://mylogger.io/log';

function log(message) {
   // Send an HTTP request
   console.log(message);
}

// export variables/functions using module.exports
// module.exports.log = log; // calls a log method and setting it to the log function.
module.exports.endPoint = url; // (endPoint) you can change the name of the method depending on what you want to call it when using it on other modules/files.

// instead of exporting an object to another module, you may want to export a single function if your only exporting a single method.
module.exports = log; // instead of module.exports.log = log;

/* node does not execute our code directly, node wraps the code inside each module to a function, also known as a (Module Wrapper Function):
   ex.
   (function (exports, require, module, __filename, __dirname)) {
      const url = 'http://mylogger.io/log';

      function log(message) {
         // Send an HTTP request
         console.log(message);
      }
   }
*/

console.log(__filename);
console.log(__dirname);