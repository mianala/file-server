var dotenv = require("dotenv").config()
var createError = require("http-errors")

var express = require("express")
var cors = require("cors")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

var whitelist = ["http://localhost:4200", "http://127.0.0.1:4200"]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
}

var fileRouter = require("./routes/file")
var indexRouter = require("./routes/index")

var app = express()

// app.use(cors(corsOptions))
app.use(cors({ origin: "*" }))

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "uploads")))
app.use(
  express.static(path.join(__dirname, "../mef-courriel/dist/mef-courriel"))
)

app.use("/file", fileRouter)
app.use("/", indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
