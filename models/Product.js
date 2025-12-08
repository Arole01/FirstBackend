const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");

const productSchema = new Mongoose.Schema({
    ProductName:{
        type:String
    },
    Quantity:{
        type:Number
    },
    Description:{
        type:String
    },
    Image:{
        type:String
    },
    Category:{
        type:String
    },
    Price:{
        type:String
    }
    
    })

    const productModel = mongoose.model("Product",productSchema)

    module.exports = productModel;