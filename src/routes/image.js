const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const { addImage } = require("../queries/forms");
const { runQuery } = require("../config/database.config");
const { verifyToken } = require("../middlewares/auth.middleware");
const jwt = require("jsonwebtoken");
const config = require("../config/env/index");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new image
    const avatar = result.secure_url;
    const cloudinary_id = result.public_id;
    // verifying token
    const image = await runQuery(addImage, [avatar, cloudinary_id]);
    // Save image
    image.push();
    res.json(image);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
