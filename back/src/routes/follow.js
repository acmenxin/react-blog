const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {followController,cancelController,getFollowers} = require("../controller/follow")

router.post('/:username',authMiddleware,followController)
router.delete('/:username',authMiddleware,cancelController)
router.get('/:username',authMiddleware,getFollowers)
module.exports=router