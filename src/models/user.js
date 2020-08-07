const mongoose = require("mongoose")
const validator = require('validator')
//const userschema =new mongoose.Schema()
const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const userschema = new mongoose.Schema({
    name : {
    type: String,
    required : true,
    trim : true
    
    },
    age :{
    type: Number,
    Validate(value){
        if(value < 0){
            throw new Error('age less than 0')
        }
    }
    },
    email:{
        type:String,
        unique:true,
        required: true,
        trim : true,
        lowercase: true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error('its wrong')
            }
        }
    },
    password:{
    type : String,
    required : true,
    minlength:7,
    trim : true,
    Validate(password){
        if(password.toLowerCase().includes("password")){
            throw new Error('error')
        }
    }
    
    },

    tokens: [{

        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},
{

    timestamps:true
})


userschema.virtual('tasks',{
    ref:'task',localField:'_id',foreignField:'owner'
})

    userschema.methods.toJSON= function(){
        const user = this
        const userobject = user.toObject()

delete userobject.password
delete userobject.tokens
delete  userobject.avatar


        return userobject
    }

   userschema.methods.generateAuthTokens = async function(){
       const users = this
       const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse')
       
       user.tokens=user.tokens.contact({token})

       return token
   }

userschema.statics.validuser = async(email,password)=>{
    const users =await user.findOne({email})
    if(!users){
        throw new Error('unable to login')
    } 

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
} 


    userschema.pre('save',async function(next){
        const user = this

if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password,8)
}

       next()
    })




const user =mongoose.model('user',userschema)
    
  module.exports=user