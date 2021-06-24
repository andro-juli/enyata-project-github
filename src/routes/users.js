const express = require("express");
const router = express.Router();
const {
  loginUser,
  createUser,
  getallUsers,
} = require("../controllers/user.controller");
const { validateUserSignup, validateUserLogin } = require("../validators/user");

router.get("/users", getallUsers);
router.post("/login", validateUserLogin, loginUser);
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
