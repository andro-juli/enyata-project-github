const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer.cv");
const { addCv } = require("../queries/forms");
const { runQuery } = require("../config/database.config");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, upload.single("cv"), async (req, res) => {
  try {
    // Upload cv to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new cv
    const avatar = result.secure_url;
    const cloudinary_id = result.public_id;
    // verifying token
    const files = await runQuery(addCv, [avatar, cloudinary_id]);
    // Save cv
    files.push();
    res.json(files);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
