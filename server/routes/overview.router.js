const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: process.env.SERVICE_ACCOUNT_KEY_PATH, //This is using the client key etc. from .env file
});

//pulls the project info from db
router.get('/', (req, res) => {
  const queryText = `
    SELECT "project_list".project_name, "project_list".project_id, "project_list".contact, "project_list".last_updated, "project_list".status, "project_details".page_count, "project_details".id, "project_details".pdf_file_id FROM "project_list"
    JOIN "project_details" ON "project_details".id = "project_list".project_id
    GROUP BY "project_list".project_name, "project_list".project_id, "project_list".contact, "project_list".last_updated, "project_list".status, "project_details".page_count, "project_details".id, "project_details".pdf_file_id;  `;

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

// Route to get data from GCS
router.get('/files/JSON', async (req, res) => {
  try {
    const folderPath = 'json-files/';

    const [files] = await storage.bucket('example-kindred-tales').getFiles({
      prefix: folderPath,
    });

    const projectDetailsToUpdate = [];

    for (const file of files) {
      const data = await file.download();
      const jsonString = data[0].toString();
      const content = JSON.parse(jsonString);

      // Data from JSON
      const pdfFileId = content.metadata.pdfFileId;
      const bookTitle = content.metadata.bookTitle;
      const author = content.metadata.author;

      projectDetailsToUpdate.push({ pdfFileId, bookTitle, author });
    }

    res.status(200).json({
      message: 'Data retrieved successfully',
      projects: projectDetailsToUpdate,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST gcs data to local database
router.post('/projects', async (req, res) => {
  try {
    const projects = req.body.projects;

    for (const project of projects) {
      const { bookTitle, author, pdfFileId } = project;

      const existingProject = await pool.query(
        `SELECT * FROM "project_list" WHERE pdf_file_id = $1`,
        [pdfFileId]
      );

      if (existingProject.rows.length === 0) {
        await pool.query('BEGIN');

        // Insert project details into project_details table
        await pool.query(
          `INSERT INTO "project_details" (book_title, author, pdf_file_id)
                  VALUES ($1, $2, $3)`,
          [bookTitle, author, pdfFileId]
        );

        // Insert project name into project_list table
        await pool.query(
          `INSERT INTO "project_list" (project_name, pdf_file_id)
                  VALUES ($1, $2)`,
          [bookTitle, pdfFileId]
        );

        await pool.query('COMMIT');
      }
    }

    res.sendStatus(201);
  } catch (error) {
    console.error('Error adding projects:', error);
    res.sendStatus(500);
  }
});

router.put('/customer', (req, res) => {
  const order = req.body;
  console.log('req body', req.body);
  const updateQuery = `
    UPDATE project_list
    SET
      name = $1,
      phone = $2,
      street = $3,
      city = $4,
      state = $5,
      post = $6,
      country = $7
    WHERE
      project_id = $8
  `;

  const id = order.id;

  const values = [
    order.name,
    order.phone,
    order.street,
    order.city,
    order.state,
    order.post,
    order.country,
    id,
  ]; // Arrange parameters in order

  pool
    .query(updateQuery, values)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error updating project', error);
      res.sendStatus(500);
    });
});

module.exports = router;
