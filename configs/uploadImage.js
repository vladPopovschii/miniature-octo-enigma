const multer = require("multer");

// Multer configuration for uploading images

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const fileMimeTypes = ["image/jpeg", "image/png", "image/gif"];

const fileFilter = (req, file, cb) => {
    if (fileMimeTypes.includes(file.mimetype)) return cb(null, true);
    cb(null, false);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 4,
    },
    fileFilter: fileFilter,
});

module.exports = { upload };
