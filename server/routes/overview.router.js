const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//pulls the project info from db
router.get('/', (req, res) => {
  const queryText = `
  SELECT "project_list".project_id, "project_list".project_name, "project_list".contact, "project_list".last_updated, "project_list".status, "project_details".id, "project_details".page_count FROM "project_list" 
  JOIN "project_details" ON "project_list".project_id = "project_details".id 
  ORDER BY "project_details".book_title ASC;
  `;
  pool
    .query(queryText)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('error getting projects', dbErr);
      res.sendStatus(500);
    });
});

// router.get('/:id', (req, res) => {
//   const query = `SELECT "project_list".project_name, "project_list".contact, "project_list".last_updated, "project_list".status FROM "project_list" JOIN "project_details" ON "project_list".project_name = "project_details".book_title WHERE "id"=$1;`;
//   pool
//     .query(query, [req.params.id])
//     .then((result) => {
//       res.send(result.rows[0]);
//     })
//     .catch((error) => {
//       console.log('error getting projects id', error);
//       res.sendStatus(500);
//     });
// });

router.delete('/:id', (req, res) => {
  console.log('this is the delete that i want', req.params);
  console.log(req.params.id);
  const deleteQuery = `DELETE FROM "project_list" WHERE "project_id"=$1;`;
  pool
    .query(deleteQuery, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error DELETING project', error);
      res.sendStatus(500);
    });
});

module.exports = router;
