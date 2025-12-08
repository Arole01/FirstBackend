require("dotenv").config()
const Port = 2134;
const {homepage} = require("./controller/appController")
const express = require("express")
const router = require("./router/appRouter")
const productRoutes = require("./router/productRouter")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

app.use(productRoutes)
app.use(router)     
app.use((err,req,res,next)=>{
    if(err) {
        return res.status(500).json(err.message)
    }
    next()
})
mongoose.connect(process.env.db).then(()=>{console.log("db connection established")
    app.listen(Port,()=>{
    console.log(`My app is running on port ${Port}`)
})
}).catch((error)=>{
    console.log("Unable to connect" + error)
})    




