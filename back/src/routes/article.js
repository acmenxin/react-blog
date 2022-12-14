const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {createArticle,getArticle,updataArticle,destoryArticle,getFollowerArticle,getArticles} = require("../controller/article")

router.post('/',authMiddleware,createArticle)
router.get("/follow",authMiddleware,getFollowerArticle)//获取关注作者们的文章
router.get("/:slug",authMiddleware,getArticle)//获取单个文章
router.get("/",authMiddleware,getArticles) //获取全局文章
router.put("/:slug",authMiddleware,updataArticle)
router.delete("/:slug",authMiddleware,destoryArticle)
module.exports=router