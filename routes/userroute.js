const express = require("express")
const router = express.Router();
const {userdata ,getalldata, deleteuser,  registeruser, login, logout, forgotPassword, resetPassword, specificuserdata, userownupdate} = require("../controller/usercontroller")
const{ verifyToken} = require("../middlewares/auth")



// router.put("/upt/:id/:product_id", uptuser)

//UserList for Admin access role vise
// router.get("/userdata", userdata) 

router.get("/all", getalldata)
//user specific data
router.get("/user/data",  verifyToken,   specificuserdata)

//update user specfic data
router.put("/token/user", verifyToken, userownupdate)

//user Register and login 
router.post("/register", registeruser).post("/login", login)


router.post("/forget", forgotPassword)
//reset password

router.put('/reset', resetPassword)

//delete user
router.delete("/delete/:id", deleteuser)


//logout
router.get("/logout", logout)
module.exports = router