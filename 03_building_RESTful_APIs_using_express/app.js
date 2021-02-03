// Express module
const express = require("express");
const app = express();

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
/* 
   Route path: /api/posts/:year/:month
   Request URL: http://localhost:3000/api/posts/2018/1
   req.params: { year: "2018", month: "1" }
*/
app.get("/api/posts/:year/:month", (req, res) => {
   res.send(req.params);
});

app.get("/api/courses", (req, res) => {
   res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
   const course = courses.find((course) => course.id === +req.params.id);
   if (!course) return res.status(404).send("The course with the given ID was not found.");
   res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
