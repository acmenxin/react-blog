//定义路由入口
const userRoute = require("../routes/user")
//测试生成jwt，使用中间件
const authMiddleware = require("../middleware/authMiddleware")
const initRoute = (app)=>{
    app.get('/',authMiddleware,(req,res)=>{
       console.log(req.user,req.token);
        res.json({status:"API is running"})
    })
    app.use("/api/v1/users",userRoute)
}
module.exports = initRoute