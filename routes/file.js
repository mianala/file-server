var express = require("express")
var multer = require("multer")
var router = express.Router()

var upload = multer({ dest: "uploads/" })

/* GET home page. */
router.post("/upload", upload.array("files", 10), function (req, res, next) {})

module.exports = router
