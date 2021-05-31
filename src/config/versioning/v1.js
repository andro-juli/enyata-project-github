const express = require("express");
const api = express.Router();

api.get("/", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "Welcome to R & A project",
  })
);

module.exports = api;
