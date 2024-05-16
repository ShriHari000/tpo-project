const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:[true,"email already in use"]
    },
    password:{
        required:true,
        type:String,
    },
    role:{
        type:String,
        enum:['admin','student'],
    },
    isRegistered:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('User',userSchema);