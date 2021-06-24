const multer = require("multer");
const path = require("path");
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".pdf" && ext !== ".docx" && ext !== ".doc") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

// const router = require("express").Router();
// const cloudinary = require("../utils/cloudinary");
// const { addFormQuery, findFormByEmail } = require("../queries/forms");
// const { runQuery } = require("../config/database.config");
// const { getAllRoles } = require("../queries/users");

// const uploadImage = async (req, res, next) => {
//   try {
//     // Upload image to cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path);
//     const avatar = result.secure_url;
//     const cloudinary_id = result.public_id;

//     const image_cv = req.file.path;

//     const {
//       firstname,
//       lastname,
//       email,
//       DOB,
//       address,
//       university,
//       program,
//       CGPA,
//     } = req.body;

//     // Create new user
//     const roles = await runQuery(getAllRoles);
//     const userRole = roles.find((element) => element.type === "user");
//     const form = await runQuery(addFormQuery, [
//       firstname,
//       lastname,
//       email,
//       DOB,
//       address,
//       university,
//       program,
//       CGPA,
//       { image_cv: [avatar, cloudinary_id] },
//       userRole.id,
//     ]);
//     // Save user
//     form.push();
//     res.json(form);
//     return next();
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = {
//   uploadImage,
// };
