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

module.exports = {
  loginAdmin,
  createAdmin,
};
