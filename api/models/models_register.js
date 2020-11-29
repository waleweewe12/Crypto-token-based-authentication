const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegisterSchema = new Schema({
    firstname: String,
    lastname: String,
    username : String,
    email : String,
    passwords : String
})

const Register = mongoose.model('Register',RegisterSchema)
module.exports = Register