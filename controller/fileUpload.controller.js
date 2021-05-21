const upload = require("../middleware/fileUpload")

const uploadFile = async (req, res) => {
  try {
    await upload.mefFlowFileUploadMiddleware(req, res)

    if (req.files == undefined) {
      return res.status(400).send({ message: "Choose a file to upload" })
    }

    res.status(200).send({
      files: req.files,
    })
  } catch (err) {
    console.log(err)

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size should be less than 5MB",
      })
    }

    res.status(500).send({
      message: `Error occured: ${err}`,
    })
  }
}

module.exports = { uploadFile }
