const express = require("express")
const router = express.Router();
const {userdata , registeruser, login, logout, forgotPassword, resetPassword} = require("../controller/usercontroller")
const{ verifyToken} = require("../middlewares/auth")

//UserList for Admin access role vise
router.get("/userdata", userdata) 

//user Register and login 
router.post("/register", registeruser).post("/login", login)


router.post("/forgot", forgotPassword)
//reset password

router.put('/reset', resetPassword)

//logout
router.get("/logout", logout)
module.exports = router