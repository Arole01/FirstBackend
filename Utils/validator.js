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