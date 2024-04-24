const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/', (req, res) => {
  // GET route code here
  pool
    .query(
      `SELECT "project-chapter".initial FROM "project-chapter" 
      GROUP BY "id";`
    )
    .then((results) => res.send(results.rows[0]))
    .catch((error) => {
      console.log('problems with the pdf info!!!!!', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log(req.body.newReview.review_analysis);
  //this is the post call for my CRUD
  const insertReviewQuery = `
  INSERT INTO "project-chapter" ("initial")
VALUES  ($1) `;
  const insertReviewValues = req.body;
  pool
    .query(insertReviewQuery, insertReviewValues)
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('this is an error in the post route', error);
      res.sendStatus(500);
    });
});

module.exports = router;
