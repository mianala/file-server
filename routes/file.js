var express = require("express")
var multer = require("multer")
var router = express.Router()

var mef_courriel_upload = multer({ dest: "uploads/mef-courriel" })

/* GET home page. */
router.post(
  "/upload",
  mef_courriel_upload.array("files", 10),
  function (req, res, next) {}
)

module.exports = router
