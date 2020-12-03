const express = require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const RegisterRouter = require('./api/routes/routes_register')
const LoginRouter = require('./api/routes/routes_login')
const app = express()

app.use('/register',RegisterRouter)
app.use('/login',LoginRouter)


mongoose.connect(
    'mongodb+srv://weerapath:'+process.env.MONGOOSE_PASSWORD+'@cluster0.cnyzq.mongodb.net/'+process.env.CRYPTO+'?retryWrites=true&w=majority',
    { 
        useNewUrlParser: true, 
        useCreateIndex: true ,
        useUnifiedTopology: true
    }
).then(()=>console.log("Mongoose Connected"))
.catch(err=>console.log(err))

app.post('/',(req,res)=>{
    res.json({
        data:"test from app.js"
    })
})

app.listen(5000,()=>{
    console.log('Application start at port 5000')
})