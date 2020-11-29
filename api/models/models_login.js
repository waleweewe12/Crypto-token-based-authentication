const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoginSchema = new Schema({
    username : String,
    passwords : String
})

const Login = mongoose.model('Register',LoginSchema)
module.exports = Login