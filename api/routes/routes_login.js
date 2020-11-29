const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bodyParser=require('body-parser')
const RegisterModel = require('../models/models_register')

router.use(bodyParser.json())

router.post('/',(req,res)=>{

    console.log(req.body.username)

    const query = RegisterModel.where(
        {
            username:req.body.username,
            passwords:req.body.passwords
        }
    )

    query.findOne()
    //login success 
    .then(result=>{
        //create jwt token
        token = jwt.sign(
            {result},
            'secret',
            {
                expiresIn: '1h' // 60 * 60
            }
        )

        if(token)
            res.json({token})
    }).catch(err=>{
        res.json(err)
    })
})

module.exports = router
