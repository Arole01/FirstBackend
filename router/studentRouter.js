const {createStudent,updateStudent} = require("../controller/studentController");
const {authorization, adminAuthorization} = require("../Utils/auth");
const router = require("express").Router();

router.post("/student",authorization,createStudent);
router.put("/student/:id",adminAuthorization,updateStudent);
module.exports = router;