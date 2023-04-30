const express = require("express");
const router= express.Router();
const { productcreate , updateproduct, deleteproduct, singleproduct, allproduct} = require("../controller/productcontroller");



router.post("/create", productcreate)
router.put("/update/:product_id", updateproduct).delete("/delete/:product_id", deleteproduct)
router.get("/single/product/:product_id", singleproduct)
router.get("/all", allproduct)
module.exports = router