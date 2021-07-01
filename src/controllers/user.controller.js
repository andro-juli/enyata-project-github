const UserService = require("../services/users.services");

const loginUser = async (req, res, next) => {
  try {
    const response = await UserService.loginUser(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const response = await UserService.createUser(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

const saveScores = async (req, res, next) => {
  try {
    const response = await UserService.saveScores(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};
const getallUsers = async (req, res, next) => {
  try {
    const response = await UserService.getExistingUsers();
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

const getAllScores = async (req, res, next) => {
  try {
    const response = await UserService.getUserScores();
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await UserService.getSingleUser(id);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  createUser,
  getallUsers,
  getSingleUser,
  saveScores,
  getAllScores,
};
