//Dependencies
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./logger");
const checker = require("./checker");
const Joi = require("joi");
const express = require("express");
const app = express();

// set view engine and use Pug module
app.set("view engine", "pug");
app.set("views", "./views");

// Configuration
console.log("Application Name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));
console.log("Mail Server:" + config.get("mail.password"));

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

// Database debugger...
dbDebugger("Connected to the database...");

const courses = [
   { id: 1, name: "course1" },
   { id: 2, name: "course2" },
   { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
   res.render("index", { title: "My Express App", message: "Hello" });
});

app.get("/api/posts/:year/:month", (req, res) => {
   res.send(req.params);
});

app.get("/api/courses", (req, res) => {
   res.send(courses);
});

const validateCourse = (course) => {
   const schema = {
      name: Joi.string().min(3).required(),
   };
   return Joi.validate(course, schema);
};

app.post("/api/courses", (req, res) => {
   const { error } = validateCourse(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const course = {
      id: courses.length + 1,
      name: req.body.name,
   };
   courses.push(course);
   res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
   const course = courses.find((course) => course.id === +req.params.id);
   if (!course) return res.status(404).send("The course with the given ID was not found.");

   const { error } = validateCourse(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   course.name = req.body.name;
   res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
   const course = courses.find((course) => course.id === +req.params.id);
   if (!course) return res.status(404).send("The course with the given ID was not found.");

   const index = courses.indexOf(course);
   courses.splice(index, 1);
   res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
   const course = courses.find((course) => course.id === +req.params.id);
   if (!course) return res.status(404).send("The course with the given ID was not found.");

   res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
