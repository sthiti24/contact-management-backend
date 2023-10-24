const express  = require("express");
const dotenv = require("dotenv").config();
const errorHandler  = require('./middlewares/errorHandler')
const connectDb = require("./config/dbConnection")

const app = express();

connectDb();

//middleware
app.use(express.json())
app.use("/api/contacts",require('./routes/contactRoutes'))
app.use("/api/users",require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log("Running on port",process.env.PORT)
})
