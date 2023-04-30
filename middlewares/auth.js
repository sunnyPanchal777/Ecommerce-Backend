const jwt = require("jsonwebtoken");

const env = require("dotenv").config()

const verifyToken = (req, res, next) => {
 
  const token =  req.cookies.access_token || req.headers["token"]

  if (!token) {
    res.json({
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

// const auth = (req,res,next) =>{



// }

module.exports = { verifyToken };
