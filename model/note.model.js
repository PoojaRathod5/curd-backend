// creating a model for declaring schema of movie

const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: String,
    body: String,
    sub: String,
    userID: String
}, {
    versionKey: false
})

//declaring model
const NoteModel = mongoose.model("note", noteSchema)

module.exports = {
    NoteModel
}