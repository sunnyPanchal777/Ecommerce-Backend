const express = require("express");
const router= express.Router();
const { verifyToken, authroles } = require("../middlewares/auth")
const { democreate, productcreate , updateproduct, deleteproduct, singleproduct, allproduct} = require("../controller/productcontroller");

router.post("/demo", democreate);
router.post("/create", verifyToken, authroles("admin") , productcreate)
router.put("/update/:product_id", updateproduct).delete("/delete/:product_id", deleteproduct)
router.get("/single/product/:product_id", singleproduct)
router.get("/all", verifyToken ,allproduct)


module.exports = router