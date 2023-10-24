const asyncHandler = require('express-async-handler')
const contacts = require('../models/contactModel')


const getAllContact = asyncHandler(async(req,res)=>{
    const data = await contacts.find({user_id: req.user.id})
    res.status(200).json(data) 
})

const postContact = asyncHandler(async(req,res)=>{
    const {name,email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new error("All fields are mandatory")
    }
    const user_id = req.user.id
    const contact = await contacts.create({user_id,name,email,phone})
    res.status(200).send(contact)
})

const getContact = asyncHandler(async(req,res)=>{
    const id = req.params.id
    // const userContacts = await contacts.find({user_id:req.user.id},)
    // console.log(userContacts)
    const contact = await contacts.findOne({user_id:req.user.id,_id:id})
    console.log(contact)
    if(!contact){
        res.status(404)
        throw new error("Contact not found")
    }
    res.status(200).json(contact)
})

const updateContact = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const contact = await contacts.findOne({_id:id})

    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
   
    if(req.user.id!==contact.user_id.toString()){
        res.status(403)
        throw new error("User don't have permission to update other user contact")
    }
    const {name,email,phone} = req.body
    const newContact = await contacts.findByIdAndUpdate(
        {_id:id},
        {name:name},
        {email:email},
        {phone:phone},
        {new:true}
        )

    const updatedContact = await contacts.findOne({user_id:req.user.id,_id:id})
//Have to make a new variable because the document would get
//updated but newContact would show the document before the update

    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const contact = await contacts.findOne({user_id:req.user.id,_id:id})

    if(!contact){
        res.status(404)
        throw new error("Contact not found")
    }
    if(req.user.id!==contact.user_id.toString()){
        res.status(403)
        throw new error("User don't have permission to delete other user contact")
    }
    await contacts.deleteOne({_id:id})
    res.status(200).json(contact)
})

module.exports = {getAllContact,postContact,getContact,updateContact,deleteContact}