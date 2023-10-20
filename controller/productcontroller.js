const multer = require("multer");
const db = require("../config/db");
const { catchasyncerror } = require("../middlewares/catchasync");
const prodcuts = db.product;
const {ErrorHandler} = require("../utils/errorhandler");
const path = require("path");
const fs = require("fs")
const Joi = require("joi")



// const storage = multer.diskStorage({
//   destination:(req, file, cb) => cb(null, 'uploads/'),
//   filename:(req,file,cb)=>{
//     const filename = `${Date.now()}-${Math.round(Math.random()* 1E9)}${path.extname(file.originalname)}`;
//     cb(null,filename)

//   }
// });

// const handle = multer({storage}).single('image');

exports.democreate = async(req, res) =>{
   try {
      const data = await prodcuts.create(req.body);
      res.status(200).send({data})
   } catch (error) {
      res.send("went " + error)
   }
}



exports.productcreate = catchasyncerror(async(req, res) =>{

   const product = await prodcuts.create(req.body)
      res.status(200).json({
          success:true,
          product,
          Message:"Product Created Successfully"
      });
    })


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
    const product = await prodcuts.findAll({})

    res.status(200).json({
        success:true,
        data:product,
        Message:"All Product"
    })
  } catch (error) {
res.status(400).send("went wrong" + error) 
  }
}