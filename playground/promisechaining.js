require('../src/db/mongoose')
const user = require('../src/models/user.js')

//5f2b912be4f1e728449f4694

/*user.findByIdAndDelete('5f2b912be4f1e728449f4694',{age : 1}).then(()=>{
    console.log(user)
    return user.countDocuments({age:1})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})*/

const upage =async(id,age)=>{

    const users = await user.findByIdAndUpdate(id,{age}) 
    const count = await user.countDocuments({age})
    return count
}
upage("5f2b90d17d37512e74b7ff6a",2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})