const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {addComment,getComments,deleteComment} = require("../controller/comment")

router.post('/:slug',authMiddleware,addComment)
router.get('/:slug',getComments) //获取评论列表
router.delete("/:slug/:id",authMiddleware,deleteComment) //删除评论，根据文章id
module.exports=router