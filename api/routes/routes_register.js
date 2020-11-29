const express = require('express')
const router = express.Router()
const RegisterModel = require('../models/models_register')
const bodyParser=require('body-parser')

router.use(bodyParser.json())

router.post('/',(req,res)=>{

    const new_user = new RegisterModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username : req.body.username,
        email : req.body.email,
        passwords : req.body.passwords
    })

    new_user.save()
    .then(result=>{
        console.log(result)
        res.send("Success!")
    })
    .catch(err=> {
        console.log(err)
        res.send("Error!")
    })
})

router.get('/',(req,res)=>{
    res.json({hello:"test จ้า"})
})

module.exports = router