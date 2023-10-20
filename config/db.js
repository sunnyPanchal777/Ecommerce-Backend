const {Sequelize} = require("sequelize")
const env = require("dotenv").config();

const dbname = process.env.dbname;
const dbuser = process.env.dbuser;
const dbpassword =process.env.dbpassword;

const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
    host:process.env.host,
    dialect: process.env.dialect
})

sequelize.sync({
//    alter:true
}).then(() =>{
    console.log("Connected to Database")
}).catch((err) =>{
    console.log(err)
})

module.exports = sequelize;