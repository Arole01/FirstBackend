const router = require("express").Router()
const {homepage, createUser,login,verifyEmail,resetPassword,resetPass} = require("../controller/appController")

router.get("/homepage",homepage)
router.post("/newUser",createUser)
router.post("/login",login)
router.put("/verify",verifyEmail)
router.post("/reset",resetPassword)
router.patch("/resetpass",resetPass)
module.exports = router
