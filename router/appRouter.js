const router = require("express").Router()
const {homepage} = require("../controller/appController")

router.get("/homepage",homepage)

module.exports = router
