const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser=require('body-parser')
const UserModel = require('../models/models_user')

router.use(bodyParser.json())
router.use(cookieParser())

router.post('/',(req,res)=>{

    const query = UserModel.where(
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

        res.json({token})
    }).catch(err=>{
        res.json(err)
    })
})

async function verifytoken(token){

}

module.exports = router
