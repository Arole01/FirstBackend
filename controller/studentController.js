const studentModel = require("../models/student");

exports.createStudent = async (req,res)=>{
    try {
        const {firstName,lastName,email,year} = req.body;

        // const checkStudent = await studentModel.findOne({email:email.trim().toLowerCase()})
        // if(checkStudent){
        //     return res.status(400).json({
        //         message:"Student already exist"
        //     })
        // }

        const newStudent = await studentModel.create({
            firstName:firstName.trim(),
            lastName:lastName.trim(),
            email:email.trim().toLowerCase(),
            year:Number(year),
            registrar:req.user
        })
        res.status(201).json({
            message:"Student created successfully",
            data:newStudent
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.updateStudent = async (req,res)=>{
    try {
        const update = await studentModel.findByIdAndUpdate(req.params.id, {firstName:req.body.firstName, lastName:req.body.lastName},{new:true});
        res.status(302).json({
            message:"Student updated successfully",
            data:update
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}