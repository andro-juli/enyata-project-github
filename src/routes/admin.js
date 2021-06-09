const express = require("express");
const router = express.Router();
const { createAdmin, loginAdmin } = require("../controllers/admin.controller");
const {
  validateAdminSignup,
  validateAdminLogin,
} = require("../validators/admins.vallidate");

router.post("/signup", validateAdminSignup, createAdmin);
router.post("/login", validateAdminLogin, loginAdmin);

module.exports = router;
