const productModel = require("../models/Product")
const cloudinary = require("../Utils/cloudinary")
const fs = require("fs")

exports.createProduct = async (req,res)=>{
    try {
    const {ProductName,Qty,Description,Image,Category,Price} = req.body

    const uploadImg = await cloudinary.uploader.upload(req.file.path)
    const product = await productModel.create({
        ProductName,
        Quantity:Qty,
        Description,
        Image:uploadImg.secure_url,
        Category,
        Price

    })

    fs.unlinkSync(req.file.path)
    res.status(201).json({
        message:"Product created successfully",
        data:product})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

exports.getAllProduct = async(req,res)=>{
    try {
        const getAll = await productModel.find()
        if(!getAll){
            return res.status(404).json({
                message:"No product found"
            })
        }
        res.status(200).json({
            message:"All product retrieved",
            data:getAll
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.getAproduct =  async (req,res) => {
    try {
        const getOne = await productModel.findById(req.params.id)
        if(!getOne){
            return res.status(400).json({
                message:"Product not found"
            })
        }

        res.status(200).json({
            message:"Product retrieved successfully",
            data:getOne
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.updateProduct = async (req,res) => {
    try {

        const {Price} = req.body

        if(!Price){
            return res.status(400).json({
                message:"Kindly Input Price as a number"
            })
        }

    const update = await productModel.findByIdAndUpdate(req.params.id,
        {
            Price:Price
        },
        {new:true}
        )

        res.status(301).json({
            message:"Product updated successfully",
            data:update
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        }) 
    }
}