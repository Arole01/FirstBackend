const { createProduct, getAllProduct, getAproduct, updateProduct } = require("../controller/productController")
const upload = require("../Utils/multer")
const router = require("express").Router()

router.post("/product",upload.single("image"), createProduct)
router.get("/product",getAllProduct)

router.get("/product/:id", getAproduct)
router.put("/product/:id",updateProduct)
module.exports = router

