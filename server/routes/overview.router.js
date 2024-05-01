const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//pulls the project info from db
router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "project_details"
      ORDER BY "book_title";
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

module.exports = router;
