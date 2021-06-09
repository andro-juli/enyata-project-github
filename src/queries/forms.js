const getForms = `
SELECT * FROM forms
`;

const addFormQuery = `
INSERT INTO 
  forms(
    firstname, 
    lastname, 
    email,
    DOB,
    address,
    university,
    program,
    CGPA,
    user_id
  ) 
VALUES ($1,$2,$3,$4,$5,$6,$7, $8, $9) RETURNING firstname, lastname, email, DOB, address, university, program, CGPA, id, user_id`;

const addImage = `INSERT INTO
  images(
  avatar,
  cloudinary_id
) 
VALUES ($1, $2) RETURNING avatar, cloudinary_id, id`;

const addCv = `INSERT INTO
  cv(
  avatar,
  cloudinary_id
) 
VALUES ($1, $2) RETURNING avatar, cloudinary_id, id`;

const findFormByEmail = `
SELECT 
    firstname, 
    lastname, 
    email,
    DOB,
    address,
    university,
    program,
    CGPA
      FROM forms WHERE email=$1
`;

const findFormByFormId = `
SELECT 
    id, 
    firstname, 
    lastname, 
    email,
    DOB,
    address,
    university,
    program,
    CGPA
      FROM forms WHERE id=$1
`;

const updateFormQuery = `
UPDATE forms SET firstname=$1, lastname=$2, email=$3, DOB=$4, address=$5, university=$6, program=$7, CGPA=$8, created_at=NOW(), updated_at=NOW() WHERE id=$9
RETURNING 
    id, 
    firstname, 
    lastname, 
    email,
    DOB,
    address,
    university,
    program,
    CGPA, 
    created_at,
    updated_at`;

const deleteFormQuery = `
DELETE FROM forms WHERE id=$1`;

module.exports = {
  getForms,
  addFormQuery,
  updateFormQuery,
  deleteFormQuery,
  findFormByEmail,
  findFormByFormId,
  addImage,
  addCv,
};
