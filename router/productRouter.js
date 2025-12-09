const { createProduct, getAllProduct, getAproduct, updateProduct } = require("../controller/productController")
const upload = require("../Utils/multer")
const router = require("express").Router()

const {authenticate,authorization} = require("../Utils/auth")

router.post("/product",authenticate,upload.single("image"), createProduct)
router.get("/product",getAllProduct)

router.get("/product/:id", getAproduct)
router.put("/product/:id",authorization,updateProduct)
module.exports = router

