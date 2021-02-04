// Dependencies
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

// Course objects
const courses = [
   { id: 1, name: "course1" },
   { id: 2, name: "course2" },
   { id: 3, name: "course3" },
];

// app.get(path, callback) => Routes HTTP GET requests to the specified path with the specified callback functions.
app.get("/", (req, res) => {
   // responds with "hello world" when a GET request is made to the homepage
   res.send("Hello World!!!");
});

// Route parameters => named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.
app.get("/api/posts/:year/:month", (req, res) => {
   res.send(req.params);
});
/* 
   Route path: /api/posts/:year/:month
   Request URL: http://localhost:3000/api/posts/2018/1
   req.params: { year: "2018", month: "1" }
*/

// GET Method
app.get("/api/courses", (req, res) => {
   res.send(courses);
});

// validate course func
const validateCourse = (course) => {
   // schema
   const schema = {
      name: Joi.string().min(3).required(),
   };
   // Validate
   return Joi.validate(course, schema);
};

// POST method
app.post("/api/courses", (req, res) => {
   // validate
   const { error } = validateCourse(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // course object
   const course = {
      id: courses.length + 1,
      name: req.body.name,
   };
   courses.push(course);
   res.send(course);
});

// PUT method
app.put("/api/courses/:id", (req, res) => {
   // Look up the course
   const course = courses.find((course) => course.id === +req.params.id);
   // if id not found
   if (!course) return res.status(404).send("The course with the given ID was not found.");

   // validate
   const { error } = validateCourse(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // Update course
   course.name = req.body.name;
   // Return updated course
   res.send(course);
});

// DELETE method
app.delete("/api/courses/:id", (req, res) => {
   // Look up the course
   const course = courses.find((course) => course.id === +req.params.id);
   // if id not found
   if (!course) return res.status(404).send("The course with the given ID was not found.");

   // Delete course
   const index = courses.indexOf(course);
   courses.splice(index, 1);
   // return
   res.send(course);
});

// GET method
app.get("/api/courses/:id", (req, res) => {
   const course = courses.find((course) => course.id === +req.params.id);
   // if id not found
   if (!course) return res.status(404).send("The course with the given ID was not found.");
   // if found
   res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
