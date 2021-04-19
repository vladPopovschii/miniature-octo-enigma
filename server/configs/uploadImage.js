const multer = require("multer");
const fileFilter = require("../middleware/fileFilter");

// Multer configuration for uploading images

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/avatars/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 4,
    },
    fileFilter: fileFilter,
});

module.exports = { upload };
