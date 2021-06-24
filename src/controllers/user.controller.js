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
const getallUsers = async (req, res, next) => {
  try {
    const response = await UserService.getExistingUsers(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  createUser,
  getallUsers,
};
