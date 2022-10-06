//定义路由入口
const userRoute = require("../routes/user")
const followRoute = require("../routes/follow")
const tagRoute = require("../routes/tag")
const articleRoute = require("../routes/article")
//测试生成jwt，使用中间件
// const authMiddleware = require("../middleware/authMiddleware")
const initRoute = (app)=>{
    app.get('/',(req,res)=>{
       console.log(req.user,req.token);
        res.json({status:"API is running"})
    })
    app.use("/api/v1/users",userRoute)
    app.use("/api/v1/follows",followRoute)
    app.use("/api/v1/tags",tagRoute)
    app.use("/api/v1/articles",articleRoute)
}
module.exports = initRoute