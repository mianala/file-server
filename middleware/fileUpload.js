var express = require("express")
var multer = require("multer")
var fs = require("fs")
const util = require("util")

var upload_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var folder = `${process.env.UPLOAD_FOLDER}${req._parsedUrl.path}/${file.fieldname}`
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true })
    }
    cb(null, folder)
  },
  filename: function (req, file, cb) {
    const uniquePreffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniquePreffix + "-" + file.originalname)
  },
})

// first option
var flowFileUpload = multer({
  storage: upload_storage,
}).array("files", 10)
// first option
var mefProfilePictureUpload = multer({
  storage: upload_storage,
}).single("profile_images")

let mefFlowFileUploadMiddleware = util.promisify(flowFileUpload)
let mefProfilePictureUploadMiddleware = util.promisify(mefProfilePictureUpload)

module.exports = {
  mefFlowFileUploadMiddleware,
  mefProfilePictureUploadMiddleware,
}
