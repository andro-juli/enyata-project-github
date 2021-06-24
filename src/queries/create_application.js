const getApplications = `
SELECT * FROM applications
`;

const addApplicationQuery = `
INSERT INTO 
  applications(
      batch_id, link, instructions, file_url, app_closure_date
  ) 
VALUES ($1,$2,$3,$4,$5) RETURNING id, batch_id,link, instructions, file_url, app_closure_date`;

const findApplicationByBatchId = `
SELECT 
    id, batch_id, link, instructions, file_url, app_closure_date FROM applications WHERE batch_id=$1
`;

const updateApplicationQuery = `
UPDATE applications SET batch_id=$1, link=$2, instructions=$3, file_url=$4, app_closure_date=$5, created_at=NOW(), updated_at=NOW() WHERE id=$6
RETURNING 
    batch_id, link, instructions, file_url, app_closure_date, created_at,updated_at`;

const deleteApplicationQuery = `
DELETE FROM applications WHERE id=$1`;

module.exports = {
  getApplications,
  findApplicationByBatchId,
  updateApplicationQuery,
  deleteApplicationQuery,
  addApplicationQuery,
};
