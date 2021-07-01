const express = require("express");
const router = express.Router();
const FormController = require("../controllers/forms.controller");
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middleware");
const { uploadImage } = require("../middlewares/uploads.middleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.get("/", verifyAdmin, FormController.getAllForms);

router.get("/:id", verifyAdmin, FormController.getOneForm);

router.post("/", upload.array("files", 2), uploadImage);

router.put("/:id", verifyToken, FormController.updateForm);

router.delete("/:id", verifyAdmin, FormController.deleteForm);

module.exports = router;
