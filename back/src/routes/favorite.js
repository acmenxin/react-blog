const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {addFavorite,removeFavorite} = require("../controller/favorite")

router.post("/:slug",authMiddleware,addFavorite)
router.delete("/:slug",authMiddleware,removeFavorite)
module.exports=router