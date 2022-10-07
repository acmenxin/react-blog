const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {createArticle,getArticle,updataArticle,destoryArticle} = require("../controller/article")

router.post('/',authMiddleware,createArticle)
router.get("/:slug",authMiddleware,getArticle)
router.put("/:slug",authMiddleware,updataArticle)
router.delete("/:slug",authMiddleware,destoryArticle)
module.exports=router