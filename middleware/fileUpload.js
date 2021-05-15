var express = require("express")
var multer = require("multer")
var fs = require("fs")
const util = require("util")

var upload_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var folder = `${process.env.UPLOAD_FOLDER}/${file.fieldname}`
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true })
    }
    cb(null, `${process.env.UPLOAD_FOLDER}/${file.fieldname}`)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix)
  },
})

// first option
var mef_upload = multer({ storage: upload_storage }).array("files", 10)

let mefFileUploadMiddleware = util.promisify(mef_upload)

module.exports = { mefFileUploadMiddleware }
