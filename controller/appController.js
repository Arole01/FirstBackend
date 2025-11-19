const { data } = require("react-router-dom")
const userModel = require ("../models/user")
const bcrypt = require("bcryptjs")
exports.homepage = (req,res)=>{
    try {
        res.json("Welcome to my API")
    } catch (error) {
    }
}


exports.createUser = async (req,res)=>{
    try {
    const {firstName,lastName,email,password} = req.body

    if (!firstName) {
        return res.status(400).json({
            message: `First name is required`
        })
    }

    if (!lastName) {
        return res.status(400).json({
            message: `Last name is required`
        })
    }

    if (!email) {
        return res.status(400).json({
            message: `Email is required`
        })
    }

    if (!password) {
        return res.status(400).json({
            message: `Password is required`
        })
    }

    const checkuser = await userModel.findOne({email:email.trim().toLowerCase(),})
    if(checkuser) {
        return res.status(400).json({
            message:`user with this email already exists`
        })
    }

    const saltPassword = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password,saltPassword)
    const userinfo = {
        firstName:firstName.trim().charAt(0).toUpperCase()+firstName.trim().slice(1),
        lastName:lastName.trim().charAt(0).toUpperCase()+lastName.trim().slice(1),
        email:email.trim().toLowerCase(),
        password:hashpassword,
        address   
    }

        const user = await userModel.create(userinfo)
        res.status(200).json({
            message:`user created successfully`,
            data:user
        })
    } catch (error) {
        res.status(500).json({message:"Something went wrong", error:error.message})
}
}