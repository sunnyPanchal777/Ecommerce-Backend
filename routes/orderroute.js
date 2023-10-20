const express = require("express")
const router = express();
const { create } = require("../controller/ordercontroller")

router.route("/create").post(create)
module.exports = router