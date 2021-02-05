// custom middleware
const log = (req, res, next) => {
   console.log("Logging..."); // set req.body
   next();
};

module.exports = log;
