var express = require("express")
var multer = require("multer")
var router = express.Router()

var upload_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(`${process.env.UPLOAD_FOLDER}/${file.fieldname}`)
    cb(null, `${process.env.UPLOAD_FOLDER}/${file.fieldname}`)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix)
  },
})

var upload = multer({ storage: upload_storage })

/* Post upload. */
router.post(
  "/upload",
  upload.array("mef-courriel-files", 10),
  function (req, res, next) {}
)

module.exports = router
