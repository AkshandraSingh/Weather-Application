const multer = require('multer');
const path = require('path');

const imageConfig = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, path.join(__dirname, "..", "/uploads/userProfilePics"));
    },
    filename: (req, file, callback) => {
        var ext = file.originalname.substring(file.originalname.indexOf("."));
        callback(null, `image_${Date.now()}.${file.originalname}`)
    }
})

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("Only Image files are Supported"))
    }
}

const upload = multer({
    storage: imageConfig,
    fileFilter: isImage,
})

module.exports = {
    upload
}
