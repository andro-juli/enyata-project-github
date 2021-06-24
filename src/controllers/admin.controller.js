const AdminServices = require("../services/admin.services");

const createAdmin = async (req, res, next) => {
  try {
    const response = await AdminServices.createAdmin(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  try {
    const response = await AdminServices.loginAdmin(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

const createApplication = async (req, res, next) => {
  try {
    const response = await AdminServices.createApplication(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

const setQuestions = async (req, res, next) => {
  try {
    const response = await AdminServices.setQuestions(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};
const getAllQuestions = async (req, res, next) => {
  try {
    const response = await AdminServices.getAllQuestions();
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};
const getAnswers = async (req, res, next) => {
  try {
    const response = await AdminServices.getAnswers();
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};
const deletequestion = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await AdminServices.deletequestion(id);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
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
