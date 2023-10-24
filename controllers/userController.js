const asyncHandler = require('express-async-handler')
// const bcrypt = require('bcrypt') //not using brypt coz its slow
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

const register = asyncHandler(async(req,res)=>{
    
        const {username,email,password} = req.body
        if(!username || !email || !password){
            res.status(400)
            throw new error("All fields are mandatory")
        }
        const userAvailable = await users.find({email:email})
        console.log(userAvailable)
        if(userAvailable.length>0){
            res.status(400)
            throw new error("User already available")
        }
        // const salt = await bcrypt.genSalt()
        // const hashedPassword =await bcrypt.hash(password,10)
        // console.log(password,hashedPassword)
        const user = await users.create({username,email,password})
        res.status(200).send(user)  
})

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    console.log("login")
    if(!email || !password){
        res.status(400)
        throw new error("All fields are mandatory")
    }

    const user = await users.findOne({email:email})

    // const check = await bcrypt.compare(password,hashedPassword)
    if(user==null || !(password===user.password) ){
       res.status(401)
       throw new error("Email or password is not valid")
    }
    const accessToken = jwt.sign({
        user:{
            username:user.username,
            email: user.email,
            id:user.id
        }
    },
    process.env.ACCESS_TOKEN)
    res.status(200).json({accessToken})
})

const current = asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)
})

module.exports = {register,login,current}