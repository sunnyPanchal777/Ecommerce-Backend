const nodemailer = require("nodemailer")
const dotenv = require("dotenv").config()

const sendmail = async (option) =>{
   try {
   const mail = nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:587,
      secure:false,
      service:process.env.service,
      secure: true,
      auth:{
         user:process.env.email_user,
         pass:process.env.emailpass
      },
      debug: true 
   })
    const mailoption = {
      from: process.env.email_user,
      to:option.email,
      subject:option.subject,
      text:option.message
    };

    await mail.sendMail(mailoption)
   } catch (error) {
   console.log(error)
   }
}

module.exports = {sendmail}