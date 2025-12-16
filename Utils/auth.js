const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

exports.authenticate = async (req,res,next)=>{
    try {
        if(!req.headers.authorization){
            return res.status(404).json({
                message:"Token not found"
            })
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,"Benson");

        const checkUser = await userModel.findById(decoded.id);
        if(!checkUser){
            return res.status(404).json({
                message:"User not found"
            })
        }

        req.user = decoded.id

        next()
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


exports.authorization = async (req,res,next)=>{
    try {
        if(!req.headers.authorization){
            return res.status(404).json({
                message:"Token not found"
            })
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,"Benson");

        const checkUser = await userModel.findById(decoded.id);
        if(!checkUser){
            return res.status(404).json({
                message:"User not found"
            })
        }

        if(checkUser.role !== "admin"){
            return res.status(401).json({
                message:"You are not authorized to perform this action"
                
            })
        }

        req.user = decoded.id

        next()
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}