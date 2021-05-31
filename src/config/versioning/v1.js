const express = require("express");
const api = express.Router();

api.get("/", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "Welcome to the final project",
  })
);

// api.use('/admin', admin)
// api.use('/users', users)

module.exports = api;
