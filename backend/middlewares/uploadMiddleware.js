const multer = require("multer");

// Use memory storage (works on Vercel)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isMimeType = allowedTypes.test(file.mimetype);
  const isExtName = allowedTypes.test(file.originalname.toLowerCase());

  if (isMimeType && isExtName) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, and .jpeg formats are allowed!"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
