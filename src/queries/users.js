const getAllUsersQuery = `
SELECT * FROM users
`;

const getAllScores = `
SELECT * FROM scores
`;

/**
 * find user by email
 * - email
 */
const findUserByEmail = `
SELECT id, role_id, firstname, lastname, email, phone, password, confirm_password FROM users WHERE email=$1
`;
/**
 * find user by Id
 * - Id
 */
const findUserById = `
SELECT id, role_id, firstname, lastname, email, phone, password, confirm_password FROM users WHERE id=$1
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

const scores = `
INSERT INTO 
  scores(
    firstname,
    lastname,
    score
  ) 
VALUES ($1,$2,$3) RETURNING id, firstname, lastname, score, created_at`;

module.exports = {
  addUser,
  findUserByEmail,
  getAllRoles,
  getAllUsersQuery,
  findUserById,
  scores,
  getAllScores,
};
