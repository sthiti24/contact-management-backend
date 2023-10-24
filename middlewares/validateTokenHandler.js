const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validate = asyncHandler(async(req,res,next)=>{
    let token
    let authHeader =  req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("bearer"))
    { 
        token = authHeader.split(" ")[1] //bearer token
        if(!token){
            res.status(401)
            throw new error("User is not authorized")
        }
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>
        {
            if(err){
                res.status(401)
                throw new error("User is not authorized")
            }

            req.user = decoded.user
            next()    
        }) 
        
    }


})

module.exports = validate