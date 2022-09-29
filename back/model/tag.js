const {DataTypes} = require("sequelize")
const sequelize = require("../db/sequelize")

const Tag = sequelize.define("Tag",{
    name:{
        //评论内容
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    }
},{
        timestamps:true
    })

    module.exports=Tag