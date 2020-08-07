const mongoose = require("mongoose")

const task =mongoose.model('tasks',{
     description : {
    type: String,
    required : true,
    trim : true
    
    },
    completed : {
        type: String,
        required : true,
        trim : true
        
        }
      owner: {
         type : mongoose.Schema.Types.ObjectId,
         required:true
         ref:'user'
      }


    })
    
    module.exports = task