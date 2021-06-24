const express = require("express");
const router = express.Router();
const {
  createAdmin,
  loginAdmin,
  createApplication,
  setQuestions,
  getAllQuestions,
  deletequestion,
  getAnswers,
} = require("../controllers/admin.controller");
const {
  validateAdminSignup,
  validateAdminLogin,
  validateCreatedApplication,
  validateQuestions,
} = require("../validators/admins.vallidate");
const { verifyAdmin } = require("../middlewares/auth.middleware");

router.post("/signup", validateAdminSignup, createAdmin);
router.post("/login", validateAdminLogin, loginAdmin);

router.post(
  "/create-application",
  validateCreatedApplication,
  createApplication
);
router.post("/questions", verifyAdmin, validateQuestions, setQuestions);
router.get("/questions", getAllQuestions);
router.get("/questions-answers", getAnswers);
router.delete("/questions/:id", deletequestion);

module.exports = router;
