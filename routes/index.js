var express = require("express")
var router = express.Router()

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(
    path.join(__dirname, "../mef-courriel/dist/mef-courriel/index.html")
  )
  return
})

module.exports = router
