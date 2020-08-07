const mongoose = require("mongoose")
const validator = require('validator')
const userschema =new mongoose.Schema()
const bcrypt = require('bcryptjs')



const user =mongoose.model('users',{
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
    
    }
    
    
    })

   

userschema.statistics.findByCredentials = async(email,password)=>{
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




const User =mongoose.model('user',userschema)
    
  module.exports=User