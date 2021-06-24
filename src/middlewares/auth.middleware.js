const jwt = require("jsonwebtoken");
const config = require("../config/env/index");
const { findUser } = require("../services/users.services");
const { getAllRoles } = require("../queries/admin");
const { runQuery } = require("../config/database.config");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "Please supply token",
        code: 400,
        data: null,
      });
    }
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    const { email } = decoded;
    const user = await findUser(email);
    if (user.length === 0) {
      throw {
        status: "error",
        code: 400,
        message: "User does not exist",
        data: null,
      };
    }
    req.decoded = decoded;
    return next();
  } catch (error) {
    return next(error);
  }
};

const verifyAdmin = async (req, res, next) => {
  const roles = await runQuery(getAllRoles);
  const adminRoles = roles.find((element) => element.type === "super_admin");

  try {
    if (!adminRoles) {
      throw {
        code: 401,
        message: "Only admins can access this resource",
        data: null,
        status: "error",
      };
    }
    const options = {
      expiresIn: "1d",
    };

    const token = jwt.sign(
      { type: adminRoles.type },
      config.JWT_SECRET_KEY,
      options
    );
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  verifyToken,
  verifyAdmin,
};
