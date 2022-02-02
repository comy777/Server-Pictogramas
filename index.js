require("dotenv").config();
const startServer = require("./src/apollo/config");
const database = require("./src/database/config");

database();

startServer();
