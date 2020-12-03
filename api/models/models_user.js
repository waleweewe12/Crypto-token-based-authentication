const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegisterSchema = new Schema({
    firstname: String,
    lastname: String,
    username : String,
    email : String,
    passwords : String
})

const User = mongoose.model('User',RegisterSchema)
module.exports = User