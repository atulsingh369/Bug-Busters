const express = require("express");
const cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const route = require("./route");

app.use("/api/v1", route);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
