const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/assets/images/uploads");
  },
  filename(req, file, cb) {
    const pictureName = uuidv4() + path.extname(file.originalname);
    cb(null, `announce-${pictureName}`);
  },
});

const uploadFile = (req, res, next) => {
  const upload = multer({ storage });

  return upload.fields([
    { name: "image_1", maxCount: 1 },
    { name: "image_2", maxCount: 1 },
    { name: "image_3", maxCount: 1 },
    { name: "image_4", maxCount: 1 },
  ])(req, res, next);
};

module.exports = { uploadFile };
