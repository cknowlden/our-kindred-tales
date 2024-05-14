const express = require("express");
const router = express.Router();
const { Storage } = require("@google-cloud/storage");
const path = require("path");
require("dotenv").config();
const multer = require("multer");
const upload = multer();

// Create a new storage. Storage is an object used by Google Cloud Storage (GCS).
//It Allows for uploading, downloading, deleting etc. on Google Cloud
const storage = new Storage({
  keyFilename: process.env.SERVICE_ACCOUNT_KEY_PATH, //This is the JSON client key etc. from .env file. You get this file download when you sign up for a GCS API.
});

// // GET route to fetch JSON files from Google Cloud Storage
// Used to get JSON file from GCS to turn into a PDF
// // don't forget to install npm install @google-cloud/storage
router.get("/files/JSON/:pdfFileId", async (req, res) => {
  try {
    const pdfFileId = req.params.pdfFileId;
    const folderPath = "json-files/"; //json-files is one of the folder pathways on GCS bucket

    const [files] = await storage.bucket("example-kindred-tales").getFiles({ //example-kindred-tales is name of GCS bucket
      prefix: folderPath,
    });

    let matchingFile;
    for (const file of files) {
      const data = await file.download();
      const jsonString = data[0].toString();
      const content = JSON.parse(jsonString);

      if (content.metadata && content.metadata.pdfFileId === pdfFileId) {
        matchingFile = content;
        break;
      }
    }

    if (!matchingFile) {
      return res.status(404).json({ message: "PDF file not found" });
    }

    if (!matchingFile.metadata || matchingFile.metadata.pdfFileId !== pdfFileId) {
      return res.status(400).json({ message: "Invalid PDF file" });
    }

    if (matchingFile.questions && matchingFile.metadata) {
      return res.json({
        questions: matchingFile.questions.map((question) => ({
          title: question.title,
          elements: question.elements.map((element) => ({
            type: element.type,
            value: element.value || "",
          })),
        })),
        metadata: matchingFile.metadata,
      });
    } else {
      return res.status(400).json({ message: "Invalid JSON structure" });
    }
  } catch (error) {
    console.error("Error fetching PDF file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




// POST route to send completed PDFMake PDF to Google Cloud Storage
// ** Remember to npm install multer (middleware for uploading the pdf)
router.post('/uploadPDF', upload.single('pdfData'), async (req, res) => {
  try {
      // Gets PDF using Multer Middleware. Buffer (aka temporary storage) contains raw binary data of PDF.
      const fileBuffer = req.file.buffer;

      // Extract book title and author from PDF data so that it can be stored on GCS by Title and Author name
      const bookTitle = req.body.bookTitle;
      const author = req.body.author;

      // Check if book title and author are provided
      if (!bookTitle || !author) {
          console.error('Book title or author is missing in the request');
          return res.status(400).send('Book title or author is missing');
      }

      // GCS bucket name
      const bucketName = 'example-kindred-tales';

      // Create a file name using book title and author
      const filename = `${bookTitle}_${author}.pdf`;

      // Destination file path in GCS
      const destinationFilePath = `pdf-files/${filename}`; //Here is the pathway to the pdf-files pathway on GCS hosting the PDF files

      // Upload the file buffer to GCS bucket
      await storage.bucket(bucketName).file(destinationFilePath).save(fileBuffer);

      res.send('File uploaded successfully');
  } catch (error) {
      console.error('Error uploading file to GCS:', error);
      res.status(500).send('Internal server error');
  }
});



module.exports = router;
