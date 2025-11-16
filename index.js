const Port = 2134;
const express = require("express")
const router = require("./router/appRouter")
const app = express()
const mongoose = require("mongoose")

app.use(router)

mongoose.connect("mongodb+srv://ajosedavidayobami_db_user:Gq7rrggHyemc7sa0@cluster0.vmq8khd.mongodb.net/").then(()=>{console.log("db connection established")}).catch((error)=>{
    console.log("Unable to connect" + error)
})
app.listen(Port,()=>{
    console.log(`My app is running on port ${Port}`)
})