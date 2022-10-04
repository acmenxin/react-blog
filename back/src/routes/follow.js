const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {followController} = require("../controller/follow")

router.post('/:username',authMiddleware,followController)
module.exports=router