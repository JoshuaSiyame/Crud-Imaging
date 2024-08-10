// import modules
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const logger = require("morgan");
const dotenv = require("dotenv");

// environment variable configuration
dotenv.config();

// import routes
const routes = require("./routes/index");
const users = require("./routes/user");

// app instance
const app = express();

// app configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// configure routes
app.use("/", routes);
app.use("/", users);

// server instance
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server up and running at port: ${PORT}`);
});
