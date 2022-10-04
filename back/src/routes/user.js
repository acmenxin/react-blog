const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {createUser,loginUser,getUser,updateUser} = require("../controller/user")
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
router.post('/login',loginUser) 
router.get('/',authMiddleware,getUser) //先验证是否可以过authorization这关
router.put('/',authMiddleware,updateUser) 
module.exports=router