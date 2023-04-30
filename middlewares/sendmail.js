const nodemailer = require("nodemailer")

const sendmail = async (option) =>{
   try {
   const mail = nodemailer.createTransport({
      service:"gmail",
      secure: true,
      auth:{
         user:'panchalsunn224@gmail.com',
         pass:9624011330
      },
      debug: true 
   })
    const mailoption = {
      from:'panchalsunn224@gmail.com',
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