const db = require("../config/db");
const user = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize")
const { ErrorHandler} = require("../utils/errorhandler")
const { sendmail } = require("../middlewares/sendmail")
const crypto = require("crypto");





exports.userdata = async  (req, res) =>{
try {
    const data =  await user.findAll({})
    res.status(200).json({success:true, data:data, Message:" User List "})
} catch (error) {
  res.status(400).send("went wrong" + error)
}
}



exports. registeruser = async (req, res, next) => {
  try {
    const { email, password, first_name, last_name, address } = req.body;

    const data = await user.findOne({
      where: {
        email: email,
      },
    });

    if (data) {
      return next(new ErrorHandler("User Already Exist", 400));
    } else {
      const hash = await bcrypt.hash(password, 10);

      const payload = {
        email,
        password: hash,
        first_name,
        last_name,
        address,
      };

      const users = await user.create(payload);

      res.status(200).json({
        success: true,
        status: 200,
        message: "users registered",
        data: users,
      });
    }
  } catch (error) {
    res.status(400).send("went worng " + error);
  }
};

exports. login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await user.findOne({
      where: {
        email: email,
      },
    });
    if (!data) {
        return next(new ErrorHandler("User Not Found", 404))
    }
    let dbpassword = data.password;
    console.log(dbpassword);
    console.log(password);
    const match = await bcrypt.compare(password, dbpassword);
    if (!match) {
      res.status(400).json({ message: "email and password did not matched" });
    }
    const token = jwt.sign(
      { email: data.email, password: data.password },
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    res
      .status(200)
      .json({ success: true, message: "logged In", data: data, token: token });
  } catch (error) {
    res.status(400).send("went wrong" + error);
  }
};


exports.logout = async(req, res) =>{
 try {
  res.cookie("access_token",null, {
    expiresIn: new Date(Date.now()),
    httpOnly:true
  });
  res.status(200).json({
    success:true,
    Message:"Logged Out"
  })
 } catch (error) {
  res.send("went wrong" + error)
  
 }
}

exports.forgotPassword = async (req, res, next) =>{
try {
  const { email } = req.body

  const data = await user.findOne({whrere:{
    email:email,
    
  }})
  
  if(!data) {
    return next(new  ErrorHandler("User Did Not Find", 404))
  }

  const token =  await crypto.randomBytes(20).toString("hex")

  await user.create({token:token})
 
// if(token){
//   await user.update({where:{
//     token:0 
//   }})
// }
  // const resetPasswordurl = `http://localhost/api/user/v1/resetPassword/${token}`

  // const message = ` Your Password Reset Link is :- \n\n ${resetPasswordurl}\n\n If you don't requested 
  //  then Ignorit `

  // const mail =  await sendmail({
  //   email:user.email,
  //   subject: 'Eccomerce Password Recovery',
  //   message
  //  });

  //  res.send("mail sented")
   res.status(200).json({
    // success:true,
    // data:mail,
    token:token,
    Message: `Email sent to ${email} successfully`
   })
} catch (error) {
  res.status(400).send("went wrong" + error)
  console.log(error)
}
}

exports.resetPassword = async(req, res , next) =>{
try {
  const { token , password} = req.body
const data = user.findOne({
  where:{
    token: token
  }
}) 
if(!data) {
  return next(new ErrorHandler("Invalid Toke", 404))

}

let dbpassword = data.password

const hash = await bcrypt.hash(password, 10)

let paylaod = {
password :hash
}

const match  =await bcrypt.compare(password, dbpassword)
if(!match){
  return next(new ErrorHandler("Invalid Password", 404))

}

data.update(paylaod)

res.status(200).json({
  success:true,
  data:data,
  Message:" Your Password Updated Successfully "
})

  
} catch (error) {
  req.status(400).send("went worng" + error )
}
}

