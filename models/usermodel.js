const {DataTypes ,sequelize} = require("sequelize")
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
        type:DataTypes.STRING
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