const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User"
    },
    name : {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email : {
        type: String,
        required: [true, "Please add the contact email address"]
    },
    phone : {
        type: String,
        required:[true,"Please add the contact phone number"]
    }
},{
    timestamps:true
})

const contacts = mongoose.model("contacts",contactSchema)

module.exports = contacts