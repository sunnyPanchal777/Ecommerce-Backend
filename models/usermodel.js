const {DataTypes ,sequelize} = require("sequelize")
const validate = require("validator")
const { default: isEmail } = require("validator/lib/isEmail")
// const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, Sequelize) => {
const user = sequelize.define("users", {
    id:{
        primaryKey: true,
        allowNull:true,
        autoIncrement: true,
        type:DataTypes.INTEGER
    },
    email:{
        allowNull:true,
        type:DataTypes.STRING,
        validate: {
            isEmail: {
              args: true,
              msg: 'Please enter a valid email address'
            }
          }
    },
    first_name:{
        allowNull:true,
        type:DataTypes.STRING
    },
    last_name:{
        allowNull:true,
        type:DataTypes.STRING
    },
    password:{
        allowNull:true,
        type:DataTypes.STRING
    },
    token:{
        type:DataTypes.STRING,
        allowNull:true
    }, 
    address:{
        allowNull:true,
        type:DataTypes.STRING
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
    },
    updatedAt:{
        field: 'created_at',
        type: DataTypes.DATE,
    },
 
})
return user
}