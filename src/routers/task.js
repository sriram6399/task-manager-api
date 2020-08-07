const express = require('express')
const router= new express.Router()
const task=require('./models/task.js')
const auth =require('../middleware/auth')

router.post('/tasks',auth,async(req,res)=>{
    const tasks =new task({...req.body, owner: req.user._id })
    
    try{
        await tasks.save()
        //const token=await users.generateAuthToken()
        res.send(tasks)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks',auth,async(req,res)=>{

const match = {}
const sort = {}

if(req.query.completed){

    match.completed=req.query.completed==='true'
}

if(req.query.sortBy){
    const parts =req.query.sortBy.split(':')
    sort[parts[0]]=parts[1]=== 'desc'?-1:1
}

    try{
       await req.user.populate({path:'tasks',match,
    
    options:{
        limit : parseInt(req.query.limt),
        skip  : parseInt(req.query.skip) ,
        sort
    }
    
    
    }).execPopulate()
        
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }

})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
       const tasks = await task.findOne({_id  ,   owner:req.user._id})
        if(!tasks){
            res.status(404)
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }

})

router.patch('/tasks/:id',auth, async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedupdates = ['description','completed']
    const isValidOperation = updates.every((update)=>
        allowedupdates.includes(update))
        if(!isValidOperation){
            return res.status(400).send({error: 'Invalid Update'})
        
        }

        try{
            
            const tasks = await task.One({_id:req.params.id, owner : req.user._id})
            

        if(!tasks){return res.status(404).send()}


        updates.forEach((update)=>
        req.tasks[update]=req.body[update]) 
        await tasks.save()

        res.send(tasks)

        }catch{
            res.status(400).send()
        }

})

router.delete('/tasks/:id',auth,async(req,res)=>{

    try{
        const tasks = await task.findOneAndDelete({_id:req.params.id,oener : req.user._id})
         if(!tasks){
             res.status(404).send()
         }
         res.send(tasks)
     }catch(e){
         res.status(500).send(e)
     }

})



module.exports = router