const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {followController,cancelController} = require("../controller/follow")

router.post('/:username',authMiddleware,followController)
router.delete('/:username',authMiddleware,cancelController)
module.exports=router