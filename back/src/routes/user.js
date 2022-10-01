const express = require("express")
const router = express.Router()

router.get("",(req,res)=>{
    res.json({
        status:200,
        message:"success",
        data:{
            code:1,
            data:{
                name:"hello"
            },
            message:"请求成功"
        }
    })
})

router.post('',(req,res)=>{
    console.log("控制器处理逻辑");
})

module.exports=router