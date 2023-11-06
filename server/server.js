const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	knex
		.select()
		.from("movies")
		.then((data) => res.status(200).json(data)) // can use .then()
		.catch(
			(
				err // can also use .catch()
			) =>
				res.status(404).json({
					message: "The movie list is not available",
				})
		);
});

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
