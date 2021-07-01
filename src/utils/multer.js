const multer = require("multer");
const path = require("path");

// Multer config

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (
        ext !== ".jpg" &&
        ext !== ".jpeg" &&
        ext !== ".png" &&
        ext !== ".pdf" &&
        ext !== ".docx"
      ) {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".pdf" && ext !== ".docx" && ext !== ".doc") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });
