const express = require('express')
const router= new express.Router()
const user=require('./models/user.js')
const multer = require('multer')
const sharp = require('sharp')
const {sendwelcomeemail,sendcancelatinemail}=require('../emails/account')

const auth =require('../middleware/auth')


router.post('/users',async(req,res)=>{
    const users =new user(req.body)
    
    try{
        await users.save()
        sendwelcomeemail(user.email , user.name)
        const token=await users.generateAuthToken()
        res.send(users,token)
    }catch(e){
        res.status(400).send(e)
    }
})


router.post('/users/login',async(req,res)=>{
    
    try{
        const users =await user.validuser(req.body.email,req.body.password)
        const token = await users.generateAuthToken()
        res.send({users,token})
        
        await users.save()
        res.send({users,token})
    }catch(e){
        res.status(400).send(e)
    }
})
router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((tokens)=>{

            return token.token != req.token
        })
await req.user.save()
res.send()

    }catch(e){
      res.status(500).send()
    }
  
})
router.post('/users/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
await req.user.save()
res.send()

    }catch(e){
      res.status(500).send()
    }
  
})

router.get('/users/me',auth,async(req,res)=>{
    
    res.send(req.user)
})

router.patch('/users/me',auth,async(req,res)=>{

    const updates=Object.keys(req.body)
    const allowedupdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>
        allowedupdates.includes(update))

if(!isValidOperation){
    return res.status(400).send({error: 'Invalid Update'})

}

try{

    updates.forEach((update)=>
        req.user[update]=req.body[update])
        req.user.save()
        
       res.send(req.user)

}catch(e){
res.status(400).send()
}

    
})

router.delete('/users/me',auth,async(req,res)=>{
try{

   // const users = await user.findByIdAndDelete(req.user._id)

    req.user.remove()
    sendcancelatinemail(re.user.email,req.user.name)
    res.send(req.user)

}catch(e){
res.status(500).send()

}




})


const upload = multer({
    
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.endsWith('.JPG')){
              return cb(new Error('file must be pdf'))
        }
        
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    
    const buffer = await sharp(req.file.buffer).resize({ width:250 ,height: 250}).png().toBuffer() 
    req.user.avatar= buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{

    res.status(404).send({error :error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
},(error,req,res,next)=>{

    res.status(404).send({error :error.message})
})

router.get('/users/:id/avatar',async(req,res)=>{

    try{
        const users= await user.findById(req.params.id)

        if(!users || !users.avatar){
            throw new Error()
        }
res.set('Content-Type','image/png')
res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }

})


module.exports=router