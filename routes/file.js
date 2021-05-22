var express = require("express")
var router = express.Router()
const fileController = require("../controller/fileUpload.controller")

router.post("/mef", fileController.uploadFile)

module.exports = router
