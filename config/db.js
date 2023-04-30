const sequelize = require("sequelize")
const env = require("dotenv").config()


const dbname = process.env.dbname;
const dbuser = process.env.dbuser;
const dbpassword =process.env.dbpassword;

const Sequelize = new sequelize(dbname, dbuser, dbpassword, {
    host:process.env.host,
    dialect: process.env.dialect
})

const db ={}

db.user= require("../models/usermodel")(Sequelize);
db.product= require("../models/product")(Sequelize)


Sequelize.sync({

}).then(() =>{
    console.log("Conndect to Database")
}).catch((err) =>{
    console.log(err)
})

module.exports = db