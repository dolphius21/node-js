const check = (req, res, next) => {
   console.log("Checking...");
   next();
};

module.exports = check;
