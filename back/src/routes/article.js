const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {createArticle} = require("../controller/article")

router.post('/',authMiddleware,createArticle)

module.exports=router