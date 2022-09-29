require("dotenv").config({path: '.env'})
const express = require('express')
const app = express()


const initDB = require("./init/initDB")
const initServer = require("./init/initServer")
//保证先启动数据库服务，再启动接口服务
const main = async () => {
    await initDB()
    await initServer(app)
}
main()