const router = require("express").Router()
const {homepage, createUser,login,verifyEmail,resetPassword,resetPass} = require("../controller/appController")
const {signUpValidator} = require("../Utils/validator")

router.get("/homepage",homepage)
router.post("/newUser", signUpValidator, createUser)
router.post("/login",login)
router.put("/verify",verifyEmail)
router.post("/reset",resetPassword)
router.patch("/resetpass",resetPass)
module.exports = router
