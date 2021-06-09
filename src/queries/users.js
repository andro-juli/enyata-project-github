/**
 * find user by email
 * - email
 */
const findUserByEmail = `
SELECT id, role_id, firstname, lastname, email, phone, password, confirm_password FROM users WHERE email=$1
`;
/**
 * get all roles
 */
const getAllRoles = `
SELECT id, type  FROM roles
`;

/**
 * add user
 * - firstname
 * - lastname
 * - email
 * - phone
 * - password
 * - confirm_password
 * - role_id
 *
 */
const addUser = `
INSERT INTO 
  users(
    firstname,
    lastname,
    email,
    phone,
    password,
    confirm_password,
    role_id
  ) 
VALUES ($1,$2,$3,$4, $5, $6, $7) RETURNING id, firstname, lastname, email, phone, role_id`;

module.exports = {
  addUser,
  findUserByEmail,
  getAllRoles,
};
