/**
 * find admin by email
 * - email
 */
const findAdminByEmail = `
SELECT id, role_id, name, email, password, phone, country, address FROM admins WHERE email=$1
`;
/**
 * get all roles
 */
const getAllRoles = `
SELECT id, type  FROM roles
`;

/**
 * add admin user
 * - name
 * - email
 * - password
 * - phone
 * - country
 * - address
 *
 *
 */
const addAdminUser = `
INSERT INTO 
  admins(
    name,
    email,
    password,
    phone,
    country,
    address, 
    role_id
  ) 
VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, name, email, phone, country, address, role_id`;

module.exports = {
  addAdminUser,
  findAdminByEmail,
  getAllRoles,
};
