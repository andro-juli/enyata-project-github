const express = require("express");
const apiV1 = require("./src/config/versioning/v1");
const {
  notFound,
  appErrorHandler,
  genericErrorHandler,
} = require("./src/middlewares/err.middleware");

// initialize a variable called app
const app = express();

// Body Parse middleware to allow us to add a body
app.use(express.json());

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use("/api/v1", apiV1);

app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

module.exports = app;
