const express = require("express");
const router = express.Router();
const { Storage } = require("@google-cloud/storage");
const path = require("path");
require("dotenv").config();
const multer = require("multer");
const upload = multer();

// Create a new storage. Storage is an object used by GCS. Allows for uploading, downloading, deleting etc.
//see import above
const storage = new Storage({
  keyFilename: process.env.SERVICE_ACCOUNT_KEY_PATH, //This is using the client key etc. from .env file
});

// // GET route to fetch JSON files from Google Cloud Storage
// // don't forget to install npm install @google-cloud/storage
router.get("/files/JSON/:pdfFileId", async (req, res) => {
  try {
    //pdfFileID is unique JSON file identifier (found in each file's metadata)
    const pdfFileId = req.params.pdfFileId;
    //the folder pathway in GCS where JSON files are located. Used below in getting GCS bucket''s JSON folder
    const folderPath = "json-files/";

    // Get the files from the GCS bucket at /json-files
    const [files] = await storage.bucket("example-kindred-tales").getFiles({
      prefix: folderPath,
    });

    // Find file that has the matching pdfFileID (from metadata)
    const matchingFile = files.find(async (file) => {
      // Read the content of the file
      const data = await file.download();

      // Parse JSON to string
      const jsonString = data[0].toString();

      const content = JSON.parse(jsonString);

      const metadata = content.metadata;
      // Check if metadata contains the pdfFileId
      return metadata && metadata.pdfFileId === pdfFileId;
    });

    if (!matchingFile) {
      return res.status(404).json({ message: "PDF file not found" });
    }

    // Read the content of the file
    const data = await matchingFile.download();

    // Parse JSON to string
    const content = JSON.parse(data[0].toString());

    if (
      !content.metadata ||
      !content.metadata.pdfFileId ||
      content.metadata.pdfFileId !== pdfFileId
    ) {
      return res.status(400).json({ message: "Invalid PDF file" });
    }

    if (content && content.questions && content.metadata) {
      return res.json({
        questions: content.questions.map((question) => ({
          title: question.title,
          elements: question.elements.map((element) => ({
            type: element.type,
            value: element.value || "",
          })),
        })),
        metadata: content.metadata,
      });
    } else {
      return res.status(400).json({ message: "Invalid JSON structure" });
    }
  } catch (error) {
    console.error("Error fetching PDF file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
