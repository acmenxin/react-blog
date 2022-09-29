const sequelize = require("../db/sequelize")
const dbConnection = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await sequelize.authenticate()
            console.log(`MYSQL connect success on ${process.env.DB_PORT}`);
            //初始化=>模型 - 建表 ：模型关系 - 表关系
            // mdel => 同步到数据库
            resolve()
        } catch (error) {
            console.log(`MYSQL connect fail on ${process.env.DB_PORT}`, error);
            reject(error)
        }
    })
}
module.exports = dbConnection