require("dotenv").config({path: '.env'})
const cors = require("cors")
const initDB = require("./init/initDB")
const initServer = require("./init/initServer")
const initRoute = require("./init/initRoute")
const noMatchMiddleware = require("./middleware/noMatchMiddleware")
const errorMiddleware = require("./middleware/errorMiddleware")

const express = require('express')
const app = express()

app.use(cors())//跨域
app.use(express.json()) //数据解析，请求解析
var morgan=require('morgan') //请求日志中间件
app.use(morgan('tiny')) //http请求日志，在终端打印
initRoute(app)
app.use(noMatchMiddleware) //使用404中间件
app.use(errorMiddleware) //捕捉错误中间件
//保证先启动数据库服务，再启动接口服务
const main = async () => {
    await initDB()
    await initServer(app) 
}   
main()