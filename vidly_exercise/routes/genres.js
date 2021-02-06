const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
   { id: 1, name: "fantasy" },
   { id: 2, name: "sci-fi" },
   { id: 3, name: "horror" },
   { id: 4, name: "comedy" },
];

router.get("/", (req, res) => {
   res.send(genres);
});

router.post("/", (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) return res.status(404).send(error.details[0].message);

   const genre = {
      id: genres.length + 1,
      name: req.body.name,
   };
   genres.push(genre);
   res.send(genre);
});

router.put("/:id", (req, res) => {
   const genre = genres.find((genre) => genre.id === +req.params.id);
   if (!genre) return res.status(404).send("Requested genre is not found.");

   const { error } = validateGenre(req.body);
   if (error) return res.status(404).send(error.details[0].message);

   genre.name = req.body.name;
   res.send(genre);
});

router.delete("/:id", (req, res) => {
   const genre = genres.find((genre) => genre.id === +req.params.id);
   if (!genre) return res.status(404).send("Requested genre is not found.");

   const index = genres.indexOf(genre);
   genres.splice(index, 1);
   res.send(genre);
});

router.get("/:id", (req, res) => {
   const genre = genres.find((genre) => genre.id === +req.params.id);
   if (!genre) return res.status(404).send("Requested genre is not found.");
   res.send(genre);
});

function validateGenre(genre) {
   const schema = {
      name: Joi.string().required(),
   };

   return Joi.validate(genre, schema);
}

module.exports = router;
