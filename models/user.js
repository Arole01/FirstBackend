const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    otp: {
        type:String,
       
    },
    isVerified: {
        type:Boolean,
        default:false
    },

    role:{
        type:String,
        default:"user"
    }

})

const userModel = mongoose.model("Ajose",userSchema)

module.exports = userModel