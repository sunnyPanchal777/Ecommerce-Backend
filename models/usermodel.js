const {DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const user =  sequelize.define("users", {
    id:{
        primaryKey: true,
        allowNull:true,
        autoIncrement: true,
        type:DataTypes.INTEGER
    },
    email:{
        allowNull:true,
        type:DataTypes.STRING,
        // validate: {
        //     isEmail: {
        //       args: true,
        //       msg: 'Please enter a valid email address'
        //     }
        //   }
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
        type:DataTypes.STRING,
        // validate: {
        //     len: {
        //       args: [6],
        //       msg: "Password must be at least 6 characters long"
        //     }
        //   }
    },
    role:{
        allowNull:true,
        type:DataTypes.STRING
    },
    token:{
        type:DataTypes.STRING,
        allowNull:true
    }, 
    vin:{
        type:DataTypes.STRING,
        allowNull:true
    },
    // address:{
    //     allowNull:true,
    //     type:DataTypes.TEXT,
    //     get: function () {
    //         return JSON.parse(this.getDataValue('address'));
    //     },
    //     // set: function (value) {
    //     //     this.setDataValue('value', JSON.stringify(value));
    //     // },

    // },
    address: {
        allowNull: true,
        type: DataTypes.STRING,
        get() {
            const addressData = JSON.parse(this.getDataValue('address'));
            return addressData;
          },
          set(value) {
            this.setDataValue('address', value ? JSON.stringify(value) : null);
          }
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
module.exports = user; 
