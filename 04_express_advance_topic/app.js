//Dependencies
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const checker = require("./checker");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

// set view engine and use Pug module
app.set("view engine", "pug");
app.set("views", "./views");

// Configuration
// console.log("Application Name:" + config.get("name"));
// console.log("Mail Server:" + config.get("mail.host"));
// console.log("Mail Server:" + config.get("mail.password"));

// Environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // if not set, returns undefined
console.log(`app: ${app.get("env")}`); // default return => development

//Custom Middleware
app.use(logger);
app.use(checker);

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// 3rd party middleware
app.use(helmet());
if (app.get("env") === "development") {
   app.use(morgan("tiny"));
   // console.log("Morgan enabled...");
   startupDebugger("Morgan enabled");
}

app.use("/api/courses", courses);
app.use("/api/home", home);

// Database debugger...
dbDebugger("Connected to the database...");

app.get("/api/posts/:year/:month", (req, res) => {
   res.send(req.params);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
