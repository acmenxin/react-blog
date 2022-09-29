const dbConnection = require("../db/connection")
const  User = require("../model/user")
const  Artical = require("../model/artical")
const  Tag = require("../model/Tag")
const  Comment = require("../model/Comment")
const sequelize = require("../db/sequelize")
// 定义关联关系
const initRelation = ()=>{
    User.hasMany(Artical,{
        onDelete:"CASCADE"//小瀑布
    });
    Artical.belongsTo(User)

    Artical.belongsToMany(Tag,{
        through:"TagList",
        uniqueKey:false,
        timestamps:false
    });
    Tag.belongsToMany(Artical,{
        through:"TagList",
        uniqueKey:false,
        timestamps:false
    });

    Artical.hasMany(Comment,{
        onDelete:"CASCADE"
    });
    Comment.belongsTo(Artical);

    User.hasMany(Comment,{
        onDelete:"CASCADE"
    })
    Comment.belongsTo(User)

    User.belongsToMany(User,{
        through:"Followers",
        as:"followors",
        timestamps:false
    })

    User.belongsToMany(Artical,{
        through:"Favourites",
        timestamps:false
    })
    Artical.belongsToMany(User,{
        through:"Favourites",
        timestamps:false
    })

}
const initDB = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await dbConnection()
            //初始化=>模型 - 建表 ：模型关系 - 表关系
            // model => 同步到数据库
            initRelation();
            //自动同步所有模型；
            await sequelize.sync({alter:true})
            resolve()
        } catch (error) {
            await dbConnection()
            reject(error)
        }
    })
}
module.exports = initDB