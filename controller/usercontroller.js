const db = require("../config/db");
// const user = db.user;
const user = require("../models/usermodel")
const product = db.product;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { ErrorHandler } = require("../utils/errorhandler");
const { sendmail } = require("../middlewares/sendmail");
const crypto = require("crypto");
const Joi = require("joi");
const { off } = require("process");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).required(),
  // address:Joi.string().required(),
  // role:Joi.string().required()
});

exports.registeruser = async (req, res, next) => {
  try {
    const { email, password, first_name, last_name, address } = req.body;
    // const { error, value}  = schema.validate(req.body)

    //  if(error){
    //   res.status(400).json({ error: error.details });
    //  }
    //  else{

    const data = await user.findOne({
      where: {
        email: email,
      },
    });
    if (data) {
      return next(new ErrorHandler("user alreadfy exist", 404));
    }

    // if (data) {
    //   return next(new ErrorHandler("User Already Exist", 400));
    // } else {

    const hash = await bcrypt.hash(password, 10);

    const payload = {
      email: email,
      password: hash,
      first_name: first_name,
      role: "admin",
      last_name: last_name,
      address: address,
      vin: last_name,
    };
    const vin = req.body.last_name;
    const users = await user.create(payload);
    // await user.create({vin:vin})

    res.status(200).json({
      success: true,
      status: 200,
      message: "users registered",
      data: users,
    });
    // }
    // }
  } catch (error) {
    res.status(400).send("went worng " + error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await user.findOne({
      where: {
        email: email,
      },
    });
    if (!data) {
      return next(new ErrorHandler("User Not Found", 404));
    }
    let dbpassword = data.password;

    const match = await bcrypt.compare(password, dbpassword);
    if (!match) {
      res.status(400).json({ message: "email and password did not matched" });
    }
    const token = jwt.sign(
      { email: data.email, role: data.role },
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

exports.logout = async (req, res) => {
  try {
    res.clearCookie("access_token", null, {
      expiresIn: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      Message: "Logged Out",
    });
  } catch (error) {
    res.send("went wrong" + error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    await user.findOne({
      whrere: {
        email: email,
      },
    });

    if (!user) {
      return next(new ErrorHandler("User Did Not Find", 404));
    }

    const newtoken = crypto.randomBytes(20).toString("hex");
    // const expiretoken = new Date(Date.now() + 3600000)//one hour

    await user.update(
      {
        token: newtoken,
      },
      {
        where: {
          email: email,
        },
      }
    );

    // const resetPasswordurl = `https://localhost/api/user/v1/resetPassword/${token}`

    // const message = ` Your Password Reset Link is :- \n\n ${resetPasswordurl}\n\n If you don't requested
    //  then Ignor it `

    // const mail =  await sendmail({
    //   email:user.email,
    //   subject: 'Eccomerce Password Recovery',
    //   message
    //  });

    //  res.send("mail sented")
    res.status(200).json({
      success: true,
      // data:mail,
      token: newtoken,
      // Message: `Email sent to ${email} successfully`
    });
  } catch (error) {
    res.status(400).send("went wrong" + error);
    console.log(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password, confirmpassword } = req.body;
    await user.findOne({
      where: {
        token: token,
      },
    });
    if (!user) {
      return next(new ErrorHandler("Invalid Token or it is expired ", 404));
    }

    if (password != confirmpassword) {
      return next(new ErrorHandler("Password Not Matched", 401));
    }

    const ps = await bcrypt.hash(password, 10);

    let payload = {
      password: ps,
    };

    await user.update(payload, {
      where: {
        token: token,
      },
    });

    await user.update(
      { token: null },
      {
        where: {
          token: token,
        },
      }
    );

    res
      .status(200)
      .json({ success: true, Message: "Password Updated Successfully" });
  } catch (error) {
    res.status(400).send("went worng" + error);
  }
};

// for user specifif data
exports.specificuserdata = async (req, res, next) => {
  try {
    // return res.send("sdfsdf")
    const data = await user.findOne(req.user);

    if (!data) {
      return next(new ErrorHandler("User did not found ", 404));
    }

    res.status(200).json({ success: true, data, Message: "User's Data" });
  } catch (error) {
    res.status(400).send("Something Went Wrong" + error);
  }
};

//user profile update

exports.userownupdate = async (req, res, next) => {
  try {
    const { first_name, last_name, address } = req.body;

    const payload = {
      first_name,
      last_name,
      address,
    };

    const data = await user.findOne(req.user);
    if (!data) {
      return next(new ErrorHandler("user did not found ", 404));
    }

    await data.update(payload);

    res
      .status(200)
      .json({ success: true, data, Message: "User's Data Updated" });
  } catch (error) {
    res.status(400).send("Went Wrong" + error);
  }
};

exports.deleteuser = async (req, res, next) => {
  try {
    const deleteuser = await user.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteuser) {
      return next(new ErrorHandler("User not found ", 400));
    }

    await deleteuser.destroy();

    res
      .status(200)
      .json({ success: true, Message: "user deleted", deleteuser });
  } catch (error) {
    res.status(400).send("went wrong" + error);
  }
};

exports.getalldata = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const search = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page -1) * limit

    if (keyword) {
      search.where = {
        first_name: {
          [Op.like]: `%${keyword}%`,
        },
      }
    }

    const data = await user.findAll({ where: search.where, 
    offset, limit
    });


    
    const count = data.length;
    res.status(200).json({ count, data: data });
  } catch (error) {
    res.status(400).send("went wrong" + error);
  }
};
