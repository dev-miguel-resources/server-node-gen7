const express = require("express");
const connectDB = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const { readdirSync } = require("fs");
//const bodyParser = require("body-parser"); deprecated node +12
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

// app-server
const app = express();

// db-connection
connectDB();

// middlewares-server
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes middlewares-fs

// port
const port = process.env.PORT || 8000;

// listen
app.listen(port, () => console.log(`Server is running on port ${port}`));
