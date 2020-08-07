const jwt = require('jsonwebtoken')
const user = require('../models/user')

const auth = async(req,res,next)=>{

try{
    const token = req.header("authorization").replace('Bearer','')
    const decoded = jwt.verify(token,'thisismynewcourse')
    const users = await user.findOne({_id:decoded_id,'tokens.token':token}
    
    if(!user){
        throw new Error()
    }
req.token=token
    req.users=users

}catch(e){
     res.status(401).send({error:"please authenticate"})

}

}

module.exports=auth