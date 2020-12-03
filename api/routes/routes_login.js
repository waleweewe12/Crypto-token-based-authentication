const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bodyParser=require('body-parser')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const UserModel = require('../models/models_user')

router.use(bodyParser.json())
router.use(cookieParser())

let keys = {}

router.post('/',(req,res)=>{

    const query = UserModel.where(
        {
            username:req.body.username
        }
    )

    query.findOne()
    //login success 
    .then(async (result)=>{
        
        match = await verifypasswords(req.body.passwords,result.passwords)
        
        if(match)
        {
            let key = "_" + Math.random().toString(36).substr(2, 30)
            keys[result._id.toString()] = key
            let data = {
                key: key,
                userId:result._id.toString(),
                username:result.username
            }
            //create jwt token
            let token = jwt.sign(
                data,
                'C2ypt0@egc0',
                {
                    expiresIn: '1h' // 60 * 60
                }
            )
            res.cookie('token', token, { 
                httpOnly:true,
                maxAge:60*60,
                signed: false,
                secure:false 
            })
            res.send({status:"success",message:"generate token success."})
        }else{
            res.json({status:"fail",message:"passwords is incorrect."})
        }
        
    }).catch(err=>{
        res.json(err)
    })
})


async function verifypasswords(PlaintextPasswords,hash){
    try {
         const match = await bcrypt.compare(PlaintextPasswords,hash)
         return match
    } catch (error) {
        console.log(error)
        throw error
    }
}

router.get('/gethello',(req,res)=>{
    let token = req.cookies['token']
    if(token===undefined)
        res.json({status:'fail',message:'token undefined'})
    try {
        var decoded = jwt.verify(token, 'C2ypt0@egc0')
        if(keys[decoded.userId] === decoded.key){
            let key = "_" + Math.random().toString(36).substr(2, 30)
            keys[decoded.userId.toString()] = key
            let data = {
                key:key,
                userId:decoded.userId.toString(),
                username:decoded.username
            }
            //create jwt token
            let token = jwt.sign(
                data,
                'C2ypt0@egc0',
                {
                    expiresIn: '1h' // 60 * 60
                }
            )
            res.cookie('token', token, { 
                httpOnly:true,
                maxAge:60*60,
                signed: false,
                secure:false  
            }).json({status:"success", username: decoded.username})
        }else{
            let key = "_" + Math.random().toString(36).substr(2, 30)
            keys[decoded.userId] = key
            res.json({status:"fail", message:"verify token error"})
        }
    } catch(err) {
        console.log(err)
        res.json({status:"fail",message:"jwt error"})
    }
})

module.exports = router
