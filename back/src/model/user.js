const {DataTypes} = require("sequelize")
const sequelize = require("../db/sequelize")

const User = sequelize.define("User",{
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    avatar:{
        //头像
        type:DataTypes.TEXT,
        allowNull:true
    },
    bio:{//简介
        type:DataTypes.TEXT,
        allowNull:true
    }
})
module.exports=User