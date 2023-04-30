const {DataTypes} = require("sequelize")

module.exports = (sequelize, Sequelize) =>{
    const product = sequelize.define("products", {
        product_id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true, 
            allownull:true
        },
        name:{
            type:DataTypes.STRING,
            allownull:false
        },
        description:{
            type:DataTypes.STRING,
            allownull:false
        },
        price:{
            type:DataTypes.INTEGER,
            allownull:false
        },
        rating:{
            type:DataTypes.INTEGER,
            allownull:true
        },
        images:{
            type:DataTypes.BLOB,
            allownull:false
        },
        category:{
            type:DataTypes.STRING,
            allownull:false
        },
        stock:{
            type:DataTypes.INTEGER,
            allownull:false
        },
        number_of_reviews:{
            type:DataTypes.INTEGER,
            default:0,
            
        },
        reviews:{
            type:DataTypes.JSON,
            allownull:true
        },
        createdAt:{
            type:DataTypes.DATE
        },
        updatedAt:{
            type:DataTypes.DATE
        }
    });
    return product
}