const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//pulls the project info from db
router.get('/', (req, res) => {});

router.put('/', (req, res) => {
  const putQuery = `UPDATE "project_details"
  SET "page_count" = $1
  WHERE "project_details".book_title =$2;`;

  const putValueQuery = [req.body.pageCount, req.body.projects.project_name];

  pool
    .query(putQuery, putValueQuery)
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('this is an issue with put', error);
      res.sendStatus(500);
    });
});

module.exports = router;
