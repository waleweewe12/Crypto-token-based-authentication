const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const UserModel = require('../models/models_user')
const bodyParser=require('body-parser')

router.use(bodyParser.json())

router.post('/',async (req,res)=>{

    BcryptPasswords = await getBcryptPasswords(req.body.passwords)

    if(BcryptPasswords === "Can not generate Bcrypt password")
        res.json({message:"Error on generate Bcrypt passwords."})

    const new_user = new UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username : req.body.username,
        email : req.body.email,
        passwords : BcryptPasswords
    })

    new_user.save()
    .then(result=>{
        //console.log(result)
        res.json({
            message:"save user in database success.",
            result
        })
    })
    .catch(err=> {
        //console.log(err)
        res.json({
            message:"Error on save user in database.",
            err
        })
    })
})

router.get('/',(req,res)=>{
    res.json({hello:"test จ้า"})
})

async function getBcryptPasswords(passwords){

    const saltRounds = 10

    try {
        salt = await bcrypt.genSalt(saltRounds)
        hash = await bcrypt.hash(passwords,salt)
        return hash
    } catch (err) {
        console.log(err)
        return "Can not generate Bcrypt password"
    }
}

module.exports = router