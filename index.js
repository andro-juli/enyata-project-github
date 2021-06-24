const express = require("express");
const apiV1 = require("./src/config/versioning/v1");
const {
  notFound,
  appErrorHandler,
  genericErrorHandler,
} = require("./src/middlewares/err.middleware");
// const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, content-type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use("/api/v1", apiV1);

app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

module.exports = app;
