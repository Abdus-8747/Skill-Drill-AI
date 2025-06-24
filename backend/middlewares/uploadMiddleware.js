const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isMimeType = allowedTypes.test(file.mimetype);
    const isExtName = allowedTypes.test(file.originalname.toLowerCase());

    if (isMimeType && isExtName) {
      return cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg, and .jpeg formats are allowed!"));
    }
  },
});

module.exports = upload;