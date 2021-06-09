const { runQuery } = require("../config/database.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/env/index");
const {
  findAdminByEmail,
  addAdminUser,
  getAllRoles,
} = require("../queries/admin");

const findAdmin = async (email) => {
  const user = await runQuery(findAdminByEmail, [email]);
  return user;
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

module.exports = {
  loginAdmin,
  createAdmin,
};
