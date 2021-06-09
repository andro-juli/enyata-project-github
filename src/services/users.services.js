const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { runQuery } = require("../config/database.config");
const { findUserByEmail, getAllRoles, addUser } = require("../queries/users");
const config = require("../config/env/index");

const findUser = async (email) => {
  const user = await runQuery(findUserByEmail, [email]);
  return user;
};

const loginUser = async (body) => {
  const { email, password } = body;
  const user = await findUser(email);
  if (user.length === 0) {
    throw {
      status: "error",
      message: "wrong email and password combination",
      code: 400,
      data: null,
    };
  }
  const { password: dbPassword, role_id, id, firstname, lastname } = user[0];
  const userPassword = bcrypt.compareSync(password, dbPassword); // compare if database password matches plaintext password ie true;
  if (!userPassword) {
    throw {
      status: "error",
      message: "wrong password and email combination",
      code: 400,
      data: null,
    };
  }

  const options = {
    expiresIn: "1d",
  };
  const roles = await runQuery(getAllRoles);
  const userRole = roles.find((element) => element.id === role_id);
  const token = jwt.sign(
    {
      id,
      firstname,
      lastname,
      email,
      type: userRole.type,
    },
    config.JWT_SECRET_KEY,
    options
  );
  return {
    status: "success",
    message: "Authentication successfull",
    code: 200,
    data: {
      user: {
        id,
        role_id,
        firstname,
        lastname,
        email,
      },
      token,
    },
  };
};

const createUser = async (body) => {
  const { firstname, lastname, email, phone, password, confirm_password } =
    body;

  const user = await findUser(email);
  if (user.length > 0) {
    throw {
      code: 409,
      message: "User already exists",
      data: null,
      status: "error",
    };
  }

  const saltRounds = 12;
  const hash = bcrypt.hashSync(password, saltRounds);
  const confirm_hash = bcrypt.hashSync(confirm_password, saltRounds);

  const roles = await runQuery(getAllRoles);
  const userRole = roles.find((element) => element.type === "user");
  const response = await runQuery(addUser, [
    firstname,
    lastname,
    email,
    phone,
    hash,
    confirm_hash,
    userRole.id,
  ]);

  return {
    status: "success",
    code: 201,
    message: "New user added successfully",
    data: response[0],
  };
};

module.exports = {
  loginUser,
  createUser,
  findUser,
};
