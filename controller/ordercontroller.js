const orders = require("../models/order");

exports.create = async(req, res) =>{
try {
    const order = orders.create(req.body) ;

    res.status(200).json({success:true, Message:"Order Created", order})

} catch (error) {
    res.status(400).send("went wrong" + error)
}
}