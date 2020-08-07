const express = require('express')
require("./db/mongoose")
const multer = require('multer')
const user =require('./models/user.js')

//const task =require('./models/task')
const userrouter=require('./routers/user')

const bcrypt = require('bcryptjs')

const app=express()
const port = process.env.PORT || 3000



app.use(express.json())
app.use(userrouter)



app.listen(port,()=>{
    console.log('server is up on port'+port)
})











/*const main = async()=>{

    const users = await user.findById('')
    await users.populate('tasks').execPopulate()
    console.log(users.tasks)
}

main()*/

/*app.use((req,res,next)=>{
    if(req.method=="GET"){
        res.send('get requests are disabled')

    }else{
        next()
    }
})





const upload = multer({
    dest: 'images',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.endsWith('.pdf')){
              return cb(new Error('file must be pdf'))
        }
        
        cb(undefined,true)
    }
})


app.post('/uploads',upload.single('upload') ,(req,res)=>{
    res.send()
},(error,req,res,next)=>{

    res.status(404).send({error :error.message})
})


*/