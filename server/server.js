const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send("This is home page.");
});

app.post("/", (req, res) => {
	res.send("This is home page with post request.");
});

const PORT = 4000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`);
});