const { runQuery } = require("../config/database.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/env/index");
const {
  findAdminByEmail,
  addAdminUser,
  getAllRoles,
} = require("../queries/admin");
const {
  addApplicationQuery,
  findApplicationByBatchId,
} = require("../queries/create_application");
const {
  addQuestionsQuery,
  getQuestions,
  findQuestionsById,
  deleteQuestionsQuery,
  getAllAnswers,
} = require("../queries/questions");

const findAdmin = async (email) => {
  const user = await runQuery(findAdminByEmail, [email]);
  return user;
};

const getAllQuestions = async () => {
  const questions = await runQuery(getQuestions);
  return {
    status: "success",
    message: "Questions fetched successfully",
    code: 200,
    data: questions,
  };
};
const getAnswers = async () => {
  const answers = await runQuery(getAllAnswers);
  return {
    status: "success",
    message: "Answers fetched successfully",
    code: 200,
    data: answers,
  };
};

const createAdmin = async (body) => {
  const { name, email, password, phone, country, address } = body;

  const admin = await findAdmin(email);
  if (admin.length > 0) {
    throw {
      status: "error",
      message: "Admin already exists",
      code: 409,
      data: null,
    };
  }
  const saltRounds = 12;
  const hash = bcrypt.hashSync(password, saltRounds);

  const roles = await runQuery(getAllRoles);
  const adminRole = roles.find((element) => element.type === "super_admin");
  const response = await runQuery(addAdminUser, [
    name,
    email,
    hash,
    phone,
    country,
    address,
    adminRole.id,
  ]);
  return {
    status: "success",
    code: 201,
    message: "New Admin added successfully",
    data: response[0],
  };
};

const loginAdmin = async (body) => {
  const { email, password } = body;
  const admin = await runQuery(findAdminByEmail, [email]);
  if (admin.length === 0) {
    throw {
      status: "error",
      message: "wrong email and password combination",
      code: 400,
      data: null,
    };
  }
  const {
    password: storedPassword,
    name,
    country,
    address,
    role_id,
    id,
  } = admin[0];
  const adminPassword = bcrypt.compareSync(password, storedPassword); //true
  if (!adminPassword) {
    throw {
      status: "error",
      message: "Wrong password and email combination",
      code: 400,
      data: null,
    };
  }

  const options = {
    expiresIn: "1d",
  };

  const roles = await runQuery(getAllRoles);
  const adminRole = roles.find((element) => element.id === role_id);
  const token = jwt.sign(
    {
      id,
      name,
      email,
      country,
      address,
      role_id,
      type: adminRole.type,
    },
    config.JWT_SECRET_KEY,
    options
  );

  return {
    status: "success",
    message: "Admin Authenticated",
    code: 200,
    data: {
      admin: {
        id,
        name,
        email,
        country,
        address,
        role_id,
        type: adminRole.type,
      },
      token,
    },
  };
};

const createApplication = async (body) => {
  const { batch_id, link, instructions, file_url, app_closure_date } = body;

  const application = await runQuery(findApplicationByBatchId, [batch_id]);
  if (application.length > 0) {
    throw {
      status: "error",
      message: "Application with batch_id already exist",
      code: 409,
      data: null,
    };
  }
  const response = await runQuery(addApplicationQuery, [
    batch_id,
    link,
    instructions,
    file_url,
    app_closure_date,
  ]);
  return {
    status: "success",
    message: "Application created successfully",
    code: 201,
    data: response[0],
  };
};

const setQuestions = async (body) => {
  const {
    question_number,
    question_text,
    answerA,
    answerB,
    answerC,
    answerD,
    correct_answer,
  } = body;

  const response = await runQuery(addQuestionsQuery, [
    question_number,
    question_text,
    answerA,
    answerB,
    answerC,
    answerD,
    correct_answer,
  ]);
  return {
    status: "success",
    message: "Questions created successfully",
    code: 201,
    data: response[0],
  };
};

const deletequestion = async (id) => {
  const question = await runQuery(findQuestionsById.anchor, [id]);
  if (question.length === 0) {
    question.splice(question, 1);
    throw {
      status: "error",
      message: "Question not found",
      code: 400,
      data: null,
    };
  }
  const response = await runQuery(deleteQuestionsQuery, [id]);
  return {
    status: "success",
    message: "Question deleted successfully",
    code: 200,
    data: response[0],
  };
};

module.exports = {
  loginAdmin,
  createAdmin,
  createApplication,
  setQuestions,
  getAllQuestions,
  deletequestion,
  getAnswers,
};
