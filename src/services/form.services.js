const { runQuery } = require("../config/database.config");

const {
  findFormByEmail,
  findFormByFormId,
  addFormQuery,
  updateFormQuery,
  deleteFormQuery,
  getForms,
} = require("../queries/forms");
const { getAllRoles } = require("../queries/users");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const getAllForms = async () => {
  const forms = await runQuery(getForms);
  return {
    status: "success",
    message: "Forms fetched successfully",
    code: 200,
    data: forms,
  };
};

const getOneForm = async (id) => {
  const form = await runQuery(findFormByFormId, [id]);
  if (form.length === 0) {
    throw {
      status: "error",
      message: "Form not found",
      code: 400,
      data: null,
    };
  }
  return {
    status: "success",
    message: "Form returned successfully",
    code: 200,
    data: form,
  };
};

const addForm = async (body) => {
  const {
    firstname,
    lastname,
    email,
    DOB,
    address,
    university,
    program,
    CGPA,
    files,
  } = body;

  const form = await runQuery(findFormByEmail, [email]);
  if (form.length > 0) {
    return {
      status: "error",
      message: "Form already exist",
      code: 409,
      data: null,
    };
  }

  const roles = await runQuery(getAllRoles);
  const userRole = roles.find((element) => element.type === "user");
  console.log(userRole);
  const response = await runQuery(addFormQuery, [
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
  return {
    status: "success",
    message: "Form created successfully",
    code: 201,
    data: response[0],
  };
};

const updateForm = async (id, body) => {
  const {
    firstname,
    lastname,
    email,
    DOB,
    address,
    university,
    program,
    CGPA,
  } = body;

  const form = await runQuery(findFormByFormId, [id]);
  if (form.length === 0) {
    throw {
      status: "error",
      message: "Form not found",
      code: 400,
      data: null,
    };
  }
  const response = await runQuery(updateFormQuery, [
    firstname,
    lastname,
    email,
    DOB,
    address,
    university,
    program,
    CGPA,
    id,
  ]);
  return {
    status: "success",
    message: "Form updated successfully",
    code: 200,
    data: response[0],
  };
};

const deleteForm = async (id) => {
  const form = await runQuery(findFormByFormId, [id]);
  if (form.length === 0) {
    form.splice(form, 1);
    throw {
      status: "error",
      message: "Information not found",
      code: 400,
      data: null,
    };
  }
  const response = await runQuery(deleteFormQuery, [id]);

  return {
    status: "success",
    message: "Form deleted successfully",
    code: 200,
    data: response[0],
  };
};

module.exports = {
  getAllForms,
  updateForm,
  deleteForm,
  addForm,
  getOneForm,
};
