const express = require("express")
const router = express.Router()

const getallPlatform = require("../config/controller/GamePlatformController")


router.get("/",getallPlatform)

module.exports = router;