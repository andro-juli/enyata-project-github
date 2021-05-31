const express = require("express");
const apiV1 = require("./src/config/versioning/v1");

// initialize a variable called app
const app = express();

// Body Parse middleware to allow us to add a body
app.use(express.json());

// Gets All applicants
// app.get("/api/applicants", (req, res) => {
//   res.json(applicants);
// });

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use("/api/v1", apiV1);

module.exports = app;
