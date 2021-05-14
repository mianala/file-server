var express = require("express")
var multer = require("multer")
var router = express.Router()

var mef_courriel_upload = multer({
  dest: process.env.MEF_COURRIEL_UPLOAD_FOLDER,
})

/* GET home page. */
router.post(
  "/upload",
  mef_courriel_upload.array("files", 10),
  function (req, res, next) {}
)

module.exports = router
