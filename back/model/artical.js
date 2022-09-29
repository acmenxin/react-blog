const {DataTypes} = require("sequelize")
const sequelize = require("../db/sequelize")

const Artical = sequelize.define("Artical",{
    slug:{ //别名
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    body:{
        //内容
        type:DataTypes.TEXT,
        allowNull:true
    }
})
module.exports=Artical