const express = require("express");
const api = express.Router();
const forms = require("../../routes/forms");
const users = require("../../routes/users");
const admin = require("../../routes/admin");
const image = require("../../routes/image");
const cv = require("../../routes/cv");

api.get("/", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "Welcome to the Academy final project",
  })
);

api.use("/forms", forms);
api.use("/admin", admin);
api.use("/users", users);
api.use("/image", image);
api.use("/cv", cv);

module.exports = api;
