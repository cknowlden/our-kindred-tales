const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const storage = new Storage({
  keyFilename: process.env.SERVICE_ACCOUNT_KEY_PATH //This is using the client key etc. from .env file
});

// // //pulls the project info from db
// router.get('/', (req, res) => {
//   // const queryText = `
//   //   SELECT * FROM "project_details"
//   //     ORDER BY "book_title";
//   //     `;

//   const queryText = `
//     SELECT "project_list".project_name, "project_list".contact, "project_list".last_updated, "project_list".status FROM "project_list" JOIN "project_details" ON "project_list".project_name = "project_details".book_title ORDER BY "project_details".book_title ASC;`;
//   pool
//     .query(queryText)
//     .then((dbRes) => {
//       res.send(dbRes.rows);
//     })
//     .catch((dbErr) => {
//       console.log('error getting projects', dbErr);
//       res.sendStatus(500);
//     });
// });


router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "project_list";
  `;
  pool
    .query(queryText)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('Error getting projects:', dbErr);
      res.sendStatus(500);
    });
});





// // // GET route to fetch all JSON files from GCS to display on Overview page
// // // Don't forget to install npm install @google-cloud/storage
// router.get('/files/JSON', async (req, res) => {
//   try {
//       // The folder pathway in GCS where JSON files are located
//       const folderPath = 'json-files/';

//       // Get the files from the GCS bucket at /json-files
//       const [files] = await storage.bucket('example-kindred-tales').getFiles({
//           prefix: folderPath
//       });


//       const jsonFilesMetadata = [];

//       for (const file of files) {
//           // Read the content of the file
//           const data = await file.download();

//           // Parse JSON to string
//           const jsonString = data[0].toString();

//           const content = JSON.parse(jsonString);

//           // Push metadata to the array
//           if (content && content.metadata && content.metadata.pdfFileId) {
//               jsonFilesMetadata.push({
//                   pdfFileId: content.metadata.pdfFileId,
//                   fileName: file.name,
//                   metadata: content.metadata
//               });
//           }
//       }

//       return res.json(jsonFilesMetadata);
//   } catch (error) {
//       console.error('Error fetching JSON files:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// });


// router.get('/files/JSON', async (req, res) => {
//   try {
//     // The folder pathway in GCS where JSON files are located
//     const folderPath = 'json-files/';

//     // Get the files from the GCS bucket at /json-files
//     const [files] = await storage.bucket('example-kindred-tales').getFiles({
//       prefix: folderPath
//     });

//     for (const file of files) {
//       // Read the content of the file
//       const data = await file.download();

//       // Parse JSON to string
//       const jsonString = data[0].toString();
//       const content = JSON.parse(jsonString);

//       // Insert metadata into the project_list table
//       if (content && content.metadata && content.metadata.pdfFileId) {
//         const pdfFileId = content.metadata.pdfFileId;
//         const bookTitle = content.metadata.bookTitle; // Use bookTitle as both book_title and project_name
//         const contact = content.metadata.author; // Assuming author is the contact
//         const lastUpdated = new Date(); // Assuming current timestamp for lastUpdated
//         const status = 'Pending'; // Assuming a default status
//         const action = 'None'; // Assuming a default action
//         const userId = 1; // Assuming a default user ID
//         const luluId = 0; // Assuming a default Lulu ID

//         // Insert new project into the project_list table
//         const insertProjectQuery = `
//           INSERT INTO project_list (project_name, last_updated, contact, status, action, user_id, lulu_id)
//           VALUES ($1, $2, $3, $4, $5, $6, $7);
//         `;
//         await pool.query(insertProjectQuery, [bookTitle, lastUpdated, contact, status, action, userId, luluId]);
//       }
//     }

//     // Fetch all JSON files and return their metadata
//     const jsonFilesMetadata = [];
//     for (const file of files) {
//       const data = await file.download();
//       const jsonString = data[0].toString();
//       const content = JSON.parse(jsonString);
//       if (content && content.metadata && content.metadata.pdfFileId) {
//         jsonFilesMetadata.push({
//           pdfFileId: content.metadata.pdfFileId,
//           fileName: file.name,
//           metadata: content.metadata
//         });
//       }
//     }
//     res.json(jsonFilesMetadata);
//   } catch (error) {
//     console.error('Error updating database with JSON files:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });




// router.get('/files/JSON', async (req, res) => {
//   try {
//     // The folder pathway in GCS where JSON files are located
//     const folderPath = 'json-files/';

//     // Get the files from the GCS bucket at /json-files
//     const [files] = await storage.bucket('example-kindred-tales').getFiles({
//       prefix: folderPath
//     });

//     for (const file of files) {
//       // Read the content of the file
//       const data = await file.download();

//       // Parse JSON to string
//       const jsonString = data[0].toString();
//       const content = JSON.parse(jsonString);

//       // Insert metadata into the project_list table
//       if (content && content.metadata && content.metadata.pdfFileId) {
//         const pdfFileId = content.metadata.pdfFileId;
//         const bookTitle = content.metadata.bookTitle;

//         // Insert book title into project_list table
//         const insertProjectListQuery = `
//           INSERT INTO project_list (project_name)
//           VALUES ($1);
//         `;
//         await pool.query(insertProjectListQuery, [bookTitle]);

//         // Insert book title and pdfFileId into project_details table
//         const insertProjectDetailsQuery = `
//           INSERT INTO project_details (book_title, pdf_file_id)
//           VALUES ($1, $2);
//         `;
//         await pool.query(insertProjectDetailsQuery, [bookTitle, pdfFileId]);
//       }
//     }

//     // Return success response
//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error updating database with JSON files:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



//WORKING GET AND INSERTION. JUST NEEDS TO CHECK FOR DUPLICATES IN DB
router.get('/files/JSON', async (req, res) => {
  try {
    // The folder pathway in GCS where JSON files are located
    const folderPath = 'json-files/';

    // Get the files from the GCS bucket at /json-files
    const [files] = await storage.bucket('example-kindred-tales').getFiles({
      prefix: folderPath
    });

    const jsonFilesMetadata = [];

    for (const file of files) {
      // Read the content of the file
      const data = await file.download();

      // Parse JSON to string
      const jsonString = data[0].toString();
      const content = JSON.parse(jsonString);

      // Insert metadata into the project_list table
      if (content && content.metadata && content.metadata.pdfFileId && content.metadata.pdfFileId) {
        const pdfFileId = content.metadata.pdfFileId;
        const bookTitle = content.metadata.bookTitle;
        const author = content.metadata.author;

        // Insert book title into project_list table
        const insertProjectListQuery = `
          INSERT INTO project_list (project_name, pdf_file_id)
          VALUES ($1, $2);
        `;
        await pool.query(insertProjectListQuery, [bookTitle, pdfFileId]);

        // Insert book title and pdfFileId into project_details table
        const insertProjectDetailsQuery = `
          INSERT INTO project_details (book_title, pdf_file_id, author)
          VALUES ($1, $2, $3);
        `;
        await pool.query(insertProjectDetailsQuery, [bookTitle, pdfFileId, author]);

        // Push metadata to the array
        jsonFilesMetadata.push({
          pdfFileId: pdfFileId,
          fileName: file.name,
          metadata: content.metadata
        });
      }
    }

    // Return JSON metadata
    res.json(jsonFilesMetadata);
  } catch (error) {
    console.error('Error updating database with JSON files:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;


