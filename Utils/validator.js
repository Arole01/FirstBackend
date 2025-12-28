const joi = require("joi")

exports.signUpValidator = async (req,res,next)=>{
        const schema = joi.object({

    firstName: joi.string().min(3).trim().required().messages({
        "string.empty":"First name cannot be empty",
        "string.min":"First name should have a minimum length of three",
        "string.required":"First name is required"
    }),
    lastName: joi.string().min(3).trim().required().messages({
        "string.empty":"Last  name cannot be empty",
        "string.min":"Last name should have a minimum length of three",
        "string.required":"Last name is required"
    }),
    email: joi.string().min(3).trim().email().required().messages({
        "string.empty":"Email cannot be empty",
        "string.min":"Email should have a minimum length of three",
        "string.required":"Email is required",
        "string.email":"Email must be a valid email address"
    }),
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
        "string.pattern.base":"Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "string.required":"Password is required"
    })
})

const {error} = schema.validate(req.body)
if(error){
    return res.status(400).json({
        message:`validation error ${error.message}`
    })
}
next()
}


exports.productValidator = async (req,res,next)=>{
    const schema = joi.object({
        ProductName: joi.string().min(3).trim().required().messages({
            "string.empty":"Product Name cannot be empty",
            "string.min":"Product Name should have a minimum length of three",
            "string.required":"Product Name is required",
        }),
        Qty: joi.number().required().messages({
            "number.base":"Quantity must be a number",
            "number.required":"Quantity is required",
        }),
        Description: joi.string().min(3).trim().messages({
            "string.empty":"Description cannot be empty",
            "string.min":"Description should have a minimum length of three",
        }),
        Category: joi.string().min(3).trim().required().messages({
            "string.empty":"Category cannot be empty",
            "string.min":"Category should have a minimum length of three",
            "string.required":"Category is required"
        }),
        Price: joi.number().required().messages({
            "number.base":"Price must be a number",
            "number.required":"Price is required",
            "string.required":"Price is required"
        })
        })

const {error} = schema.validate(req.body)
if(error){
    return res.status(400).json({
        message:`validation error ${error.message}`
    })
}
next()
}


exports.studentValidator = async (req,res,next)=>{
    schema = joi.object({
        firstName: joi.string().min(3).trim().required().messages({
            "string.empty":"First name cannot be empty",
            "string.min":"First name should have a minimum length of three",
        }),
        lastName: joi.string().min(3).trim().required().messages({
            "string.empty":"Last name cannot be empty",
            "string.min":"Last name should have a minimum length of three",
        }),
        email: joi.string().min(3).trim().email().required().messages({
            "string.empty":"Email cannot be empty",
            "string.min":"Email should have a minimum length of three",
            "string.email":"Email must be a valid email address"
        }),
        age: joi.number().integer().positive().messages({
            "number.base":"Age must be a number",
            "number.integer":"Age must be an integer",
            "number.positive":"Age must be a positive number"
        })
    })

    const {error} = schema.validate(req.body)
if(error){
    return res.status(400).json({
        message:`validation error ${error.message}`
    })
}
next()
}