const express = require("express");
const router = express.Router();
const {
  loginUser,
  createUser,
  getallUsers,
  getSingleUser,
  saveScores,
  getAllScores,
} = require("../controllers/user.controller");
const { validateUserSignup, validateUserLogin } = require("../validators/user");

router.get("/", getallUsers);
router.get("/:id", getSingleUser);
router.post("/login", validateUserLogin, loginUser);
router.post("/scores", saveScores);
router.get("/scores", getAllScores);
router.post("/signup", validateUserSignup, createUser);

module.exports = router;

// {
//   "firstname":"john",
//   "lastname":"smith",
//   "email":"john@gmail.com",
//   "phone":"0123456789",
//   "password":"123456",
//   "confirm_password":"123456",
// }
