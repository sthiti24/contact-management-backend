const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please add the user name"]
    },
    email:{
        type:String,
        required:[true, "Please add the user email"]
    },
    password:{
        type:String,
        required:[true, "Please add the user password"]
    }
},
{
    timestamps:true
})

const users = mongoose.model("users",userSchema)

module.exports = users