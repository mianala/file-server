const upload = require("../middleware/fileUpload")

const uploadFile = async (req, res) => {
  try {
    if (req.files !== undefined) {
      await upload.mefFlowFileUploadMiddleware(req, res)
      res.status(200).send({
        files: req.files,
      })
    }

    if (req.profile_picture !== undefined) {
      await upload.mefProfilePictureUploadMiddleware(req, res)
      res.status(200).send({
        files: req.profile_picture,
      })
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
