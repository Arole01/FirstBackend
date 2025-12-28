const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
    },
    lastName: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    year: {
        type:Number,
        required:true
    },
    age:{
        type:Number,
        default:function(){
            const today = new Date();
            const currentYear = today.getFullYear();
            return currentYear - this.year;
        }
    },
    registrar: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const studentModel = mongoose.model("Student",userSchema)

module.exports = studentModel