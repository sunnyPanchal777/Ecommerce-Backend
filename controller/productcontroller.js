const db = require("../config/db");
const prodcuts = db.product;
const {ErrorHandler} = require("../utils/errorhandler")




exports.productcreate = async(req, res) =>{
try {
    const product = await prodcuts.create(req.body)

    res.status(200).json({
        success:true,
        product,
        Message:"Product Created Successfully"
    })
} catch (error) {
    res.status(400).send("went wrong" +error)
}
}


exports.updateproduct = async(req, res, next) =>{
   try {
  
     const data = await prodcuts.findOne({
       where:{
         product_id:req.params.product_id
        }
      })
      console.log(req.params.product_id)
  if(!data){
    return next(new ErrorHandler("Product Did Not Found ", 404))
  }
  await data.update(req.body)

  res.status(200).json({
    success:true,
    data, 
    Message:"Product Updated Successfully"
  })
   } catch (error) {
    res.status(400).send("went wrong" + error)
   }
}


exports.deleteproduct = async (req, res) =>{
try {
    const data = prodcuts.findOne({
        where:{
            product_id:req.params.product_id
        }
    })
    data.destroy({})

    res.status(200).json({
        success:true,
        data,
        Message:"Product Deleted Successfully"
    })
} catch (error) {
    res.status (400).send("went worng" + error)
}
}

exports.singleproduct = async(req, res) =>{
  try {
    const data = await prodcuts.findOne({where:{
      product_id: req.params.	product_id
    }})

   res.status(200).json({
    success:true,
    data,
    Message:" Product By Id "
   })
  } catch (error) {
    res.send("went worng" + error)
  }
}

exports.allproduct = async(req, res) =>{
  try {
    const product = await prodcuts.findAll()

    res.status(200).json({
        success:true,
        data:product,
        Message:"All Product"
    })
  } catch (error) {
res.status(400).send("went wrong" + error) 
  }
    

}