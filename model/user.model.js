// creating a model for declaring schema of movie

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: String,
    pass: String,
    location: String,
    age: Number
})

//declaring model
const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}