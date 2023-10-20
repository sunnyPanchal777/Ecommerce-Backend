const jwt = require("jsonwebtoken");

const env = require("dotenv").config();

const{ ErrorHandler} = require("../utils/errorhandler")

const verifyToken = (req, res, next) => {
 
  const token =  req.cookies.access_token || req.headers["token"] || req.get('Authorization').split("Bearer ")[1]

  console.log(token)
  if (!token) {
   return  res.json({
      message: "A token is required for authentication",
      status: 400,
    });
  }
  try {
  jwt.verify(token, process.env.JWT_KEY , (err, user)=>{
    if(err) throw err
    req.user = user ;
  });
   
  } catch (err) {
    res.json({
      message: "Invalid Token",
      status: 401,
    });
  }
  return next();
};

 const authroles = (...roles) =>{
  return(req, res, next) =>{
        if(!roles.includes(req.user.role)){
        next (new ErrorHandler(`Role: ${req.user.role} is not allowed to access more`, 400))
        }
    
        next();
      }
 }

module.exports = { verifyToken, authroles };


