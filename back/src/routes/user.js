const express = require("express")
const router = express.Router()
const {createUser} = require("../controller/user")
// router.get("",(req,res)=>{
//     res.json({
//         status:200,
//         message:"success",
//         data:{
//             code:1,
//             data:{
//                 name:"hello"
//             },
//             message:"请求成功"
//         }
//     })
// })
router.post('/',createUser) 

module.exports=router