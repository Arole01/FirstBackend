const router = require("express").Router()
const {homepage, createUser} = require("../controller/appController")

router.get("/homepage",homepage)
router.post("/newUser",createUser)

module.exports = router
