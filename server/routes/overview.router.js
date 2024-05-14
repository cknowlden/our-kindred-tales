const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: process.env.SERVICE_ACCOUNT_KEY_PATH, //This is using the client key etc. from .env file
});

//pulls the project info from db
router.get("/", (req, res) => {
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
      console.log("error getting projects", dbErr);
      res.sendStatus(500);
    });
});

router.put("/order", (req, res) => {
  const order = req.body;
  console.log("req body", req.body);
  const updateQuery = `
    UPDATE project_list
    SET
    cover_url = $1,
    interior_url = $2,
    shipping_level = $3
    WHERE
      project_id = $4
  `;
  const id = order.id;
  const values = [
    order.cover_url,
    order.interior_url,
    order.shipping_level,
    id,
  ]; // Arrange parameters in order
  pool
    .query(updateQuery, values)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error updating project", error);
      res.sendStatus(500);
    });
});

router.get("/customer", (req, res) => {
  const { id } = req.body; // Destructure id from req.body
  const queryText = `SELECT * FROM "project_list" WHERE project_id=$1;`;

  pool
    .query(queryText, [id])
    .then((res) => {
      res.send(res.rows);
    })
    .catch((dbErr) => {
      console.log("Error getting project:", dbErr);
      res.sendStatus(500);
    });
});





// Route to delete JSON files from GCS and from local database
router.delete("/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const folderPath = "json-files/";

    let files = [];
    let nextPageToken = null;

    // Paginate through files in the specified folder of the GCS bucket
    do {
      const [result] = await storage.bucket("example-kindred-tales").getFiles({
        prefix: folderPath,
        pageToken: nextPageToken,
      });

      files = files.concat(result);

      nextPageToken = result.nextPageToken;
    } while (nextPageToken);

    console.log("Total JSON files found:", files.length);

    const projectPdfFileIdResult = await pool.query(
      "SELECT pdf_file_id FROM project_list WHERE project_id = $1",
      [projectId]
    );
    const projectPdfFileId = projectPdfFileIdResult.rows[0]?.pdf_file_id;

    if (!projectPdfFileId) {
      console.log(
        "PDF file ID not found in local database for projectId:",
        projectId
      );
      return res.sendStatus(404);
    }

    console.log(`PDF file ID for projectId ${projectId}: ${projectPdfFileId}`);

    // Iterate through each JSON file to find the one with matching pdfFileId
    for (const file of files) {
      const data = await file.download();
      const jsonString = data[0].toString();
      const content = JSON.parse(jsonString);

      // Extract pdfFileId from the content
      const { pdfFileId } = content.metadata || {};

      console.log(`Processing file ${file.name} with pdfFileId: ${pdfFileId}`);

      // Compare projectPdfFileId with pdfFileId
      if (projectPdfFileId === pdfFileId) {
        console.log(`Matching pdfFileId found for projectId ${projectId}`);
        // Delete file from GCS
        await file.delete();
        console.log("JSON file deleted from GCS");

        await pool.query(
          'DELETE FROM "project_details" WHERE "pdf_file_id" = $1',
          [projectPdfFileId]
        );

        await pool.query('DELETE FROM "project_list" WHERE "project_id" = $1', [
          projectId,
        ]);

        console.log(
          "Project details and file entry deleted from the local database"
        );

        return res.sendStatus(200);
      }
    }

    console.log("JSON file not found in GCS for projectId:", projectId);
    return res.sendStatus(404);
  } catch (error) {
    console.error("Error deleting JSON file:", error);
    return res.sendStatus(500);
  }
});

// Route to get data from GCS
router.get("/files/JSON", async (req, res) => {
  try {
    const folderPath = "json-files/";

    const [files] = await storage.bucket("example-kindred-tales").getFiles({
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
      message: "Data retrieved successfully",
      projects: projectDetailsToUpdate,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST gcs data to local database
router.post("/projects", async (req, res) => {
  try {
    const projects = req.body.projects;

    for (const project of projects) {
      const { bookTitle, author, pdfFileId } = project;

      const existingProject = await pool.query(
        `SELECT * FROM "project_list" WHERE pdf_file_id = $1`,
        [pdfFileId]
      );

      if (existingProject.rows.length === 0) {
        await pool.query("BEGIN");

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

        await pool.query("COMMIT");
      }
    }

    res.sendStatus(201);
  } catch (error) {
    console.error("Error adding projects:", error);
    res.sendStatus(500);
  }
});

router.put("/customer", (req, res) => {
  const order = req.body;
  console.log("req body", req.body);
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
      console.log("Error updating project", error);
      res.sendStatus(500);
    });
});

module.exports = router;
