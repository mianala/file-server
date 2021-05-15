var express = require("express")
var router = express.Router()
const fileController = require("../controller/fileUpload.controller")

router.post("/uploads/mef", fileController.uploadFile)

module.exports = router
