const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bodyParser=require('body-parser')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const UserModel = require('../models/models_user')
const cors = require('cors')

router.use(cors({credentials: true, origin: "http://localhost:3001"}))
router.use(bodyParser.json())
router.use(cookieParser())

let keys = {}
let loginKeys = {}

router.post('/',(req,res)=>{
    console.log(req.body);

if(req.body.username === undefined || req.body.passwords === undefined) {
    res.json({status: "error", message: "no input"})
    return false
}

    console.log(req.body.username, req.body.passwords);

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

            let loginKey = "_" + Math.random().toString(36).substr(2, 30)
            loginKeys[result._id.toString()] = loginKey
            
            let data = {
                key: key,
                loginKey: loginKey,
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
                maxAge:360000,
                signed: false,
                secure:false 
            })
            res.send({status:"success",message:"generate token success.", username: result.username})
        } else {
            res.json({status:"fail",message:"passwords is incorrect."})
        }
        
    }).catch(err=>{
        res.json({status:"fail",message:"user not exists."})
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

router.get('/gettext',(req,res)=>{
    let token = req.cookies['token']
    if(token===undefined)
        res.json({status:'fail',message:'token undefined'})
    try {
        var decoded = jwt.verify(token, 'C2ypt0@egc0')
        if(loginKeys[decoded.userId] === decoded.loginKey) {
            if(keys[decoded.userId] === decoded.key ){
                let key = "_" + Math.random().toString(36).substr(2, 30)
                keys[decoded.userId.toString()] = key
                let data = {
                    key:key,
                    loginKey: decoded.loginKey,
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
                
                let rand = Math.floor(Math.random() * 5)
                let text = ""
                if(rand < 1)
                    text = "วันนี้โชคดีนะ"
                else if(rand < 2)
                    text = "วันนี้โชคร้ายนะ"
                else if(rand < 3)
                    text = "วันนี้ฝันร้ายแน่ๆ"
                else if(rand < 4)
                    text = "วันนี้ฝันดีแน่ๆ"
                else if(rand < 5)
                    text = "วันนี้จะมีดวงทางความรัก"
    
                res.cookie('token', token, { 
                    httpOnly:true,
                    maxAge:360000,
                    signed: false,
                    secure:false  
                }).json({status:"success", message: text})
            }else{
                let key = "_" + Math.random().toString(36).substr(2, 30)
                keys[decoded.userId] = key
                res.json({status:"fail", message:"verify token error"})
            }
        } else {
            res.json({status:"fail", message:"verify token error (old)"})
        }
        
    } catch(err) {
        console.log(err)
        res.json({status:"fail",message:"jwt error"})
    }
})

module.exports = router
