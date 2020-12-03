const axios = require('axios')
const express = require('express')

const app = express()

app.get('/',async (req,res)=>{
    const data ={
        username:"waleweewe",
        passwords:"11345"
    }

    await axios.post('http://localhost:5000/login',data)
    res.end()
})

app.get('/test',async(req,res)=>{
    result = await axios.post('http://localhost:5000', {
      withCredentials: true
    })
    res.json({result})
})

app.listen(4000,()=>{
    console.log("application start at port 4000")
})