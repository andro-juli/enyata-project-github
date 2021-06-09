const express = require("express");
const router = express.Router();
const FormController = require("../controllers/forms.controller");
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middleware");

router.get("/", verifyAdmin, FormController.getAllForms);

router.post("/", verifyToken, FormController.addForm);

router.put("/:id", verifyToken, FormController.updateForm);

router.delete("/:id", verifyAdmin, FormController.deleteForm);

// trying to get a single user
// router.get("/:id", (req, res, next) => {
//   const { id } = req.params;
//   const infoExist = information.filter(
//     (information) => information.id === parseInt(req.params.id)
//   );
//   console.log(infoExist);
//   if (infoExist) {
//     res.status(200).json({
//       status: 200,
//       message: `single user with id ${id} retrieved`,
//       code: 200,
//       data: information[id],
//     });
//   }
//   return res.status(500).json({
//     status: 500,
//     message: "user information with particular id not found",
//     code: 500,
//     data: null,
//   });
// });

module.exports = router;
