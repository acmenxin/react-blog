const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {createTag,getTags,destoryTag} = require("../controller/tag")

router.post('/',authMiddleware,createTag)
router.get('/',authMiddleware,getTags)
router.delete('/:tag',authMiddleware,destoryTag)
module.exports=router