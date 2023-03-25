const mongoose = require("mongoose");
require("dotenv").config();

//using link from mongodb alas for connection
const connection = mongoose.connect(process.env.MongoURL);

module.exports = {
    connection
}