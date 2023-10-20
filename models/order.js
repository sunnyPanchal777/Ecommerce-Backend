const { DataTypes, Sequelize} = require("sequelize");
// const usermodel = require("./usermodel");

module.exports =  (sequelize) =>{
     const orders = sequelize.define("order", {

          order_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true, 
          },
        shipping_info:{
          type:DataTypes.JSON,
          allownull:true
        },
        order_items:{
          type:DataTypes.JSON,
          allownull:false
        },
        // user's table add foreign key id 
     //    user_id:{
     //      type:DataTypes.INTEGER,
     //      allownull:true
     //    },
        payment_info:{
          type:DataTypes.JSON,
          allownull:false
        },
        createdAt:{
          type:DataTypes.DATEONLY
        }
     }) ;
     return orders


}