// import modules
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const logger = require("morgan");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

// environment variable configuration
dotenv.config();

// connection to database
const sequelize = new Sequelize({
    dialect: process.env.DIALECT,
    storage: 'images.sqlite'
});

sequelize.authenticate().then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.error("Failed to connect to database: ", error);
});

// import routes
const routes = require("./routes/index");

// app instance
const app = express();

// app configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// configure routes
app.use("/", routes);

// server instance
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server up and running at port: ${PORT}`);
});
