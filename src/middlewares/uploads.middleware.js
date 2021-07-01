const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const { addFormQuery, findFormByEmail } = require("../queries/forms");
const { runQuery } = require("../config/database.config");
const { getAllRoles } = require("../queries/users");

const uploadImage = async (req, res) => {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req.file.path);
    // const avatar = result.secure_url;
    // const cloudinary_id = result.public_id;

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var DOB = req.body.DOB;
    var address = req.body.address;
    var university = req.body.university;
    var program = req.body.program;
    var CGPA = req.body.CGPA;

    const files = req.files;
    console.log(files);

    const findForm = await runQuery(findFormByEmail, [email]);
    if (findForm.length > 0) {
      throw {
        status: "error",
        message: "Form already exist",
        code: 409,
        data: null,
      };
    }

    const roles = await runQuery(getAllRoles);
    const userRole = roles.find((element) => element.type === "user");
    const form = await runQuery(addFormQuery, [
      firstname,
      lastname,
      email,
      DOB,
      address,
      university,
      program,
      CGPA,
      files,
      userRole.id,
    ]);
    // Save user
    form.push();
    res.json(form);
    return {
      status: "success",
      message: "Form created successfully",
      code: 201,
      data: form,
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  uploadImage,
};
