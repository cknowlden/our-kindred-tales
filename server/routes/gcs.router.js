const express = require('express');
const router = express.Router();
const { Storage } = require('@google-cloud/storage');
const path = require('path');
require('dotenv').config();
const multer = require('multer');
const upload = multer();


// Create a new storage. Storage is an object used by GCS. Allows for uploading, downloading, deleting etc.
//see import above
const storage = new Storage({
    keyFilename: process.env.SERVICE_ACCOUNT_KEY_PATH //This is using the client key etc. from .env file
});

// // GET route to fetch JSON files from Google Cloud Storage
// // don't forget to install npm install @google-cloud/storage
router.get('/files/JSON/:pdfFileId', async (req, res) => {
    try {
        //pdfFileID is unique JSON file identifier (found in each file's metadata)
        const pdfFileId = req.params.pdfFileId;
        //the folder pathway in GCS where JSON files are located. Used below in getting GCS bucket''s JSON folder
        const folderPath = 'json-files/';

        // Get the files from the GCS bucket at /json-files
        const [files] = await storage.bucket('example-kindred-tales').getFiles({
            prefix: folderPath
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
            return res.status(404).json({ message: 'PDF file not found' });
        }

        // Read the content of the file
        const data = await matchingFile.download();

        // Parse JSON to string
        const content = JSON.parse(data[0].toString());

        if (!content.metadata || !content.metadata.pdfFileId || content.metadata.pdfFileId !== pdfFileId) {
            return res.status(400).json({ message: 'Invalid PDF file' });
        }

        if (content && content.questions && content.metadata) {
            return res.json({
                questions: content.questions.map(question => ({
                    title: question.title,
                    elements: question.elements.map(element => ({
                        type: element.type,
                        value: element.value || ''
                    }))
                })),
                metadata: content.metadata
            });
        } else {
            return res.status(400).json({ message: 'Invalid JSON structure' });
        }
    } catch (error) {
        console.error('Error fetching PDF file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




// WORKING POST route to upload JSON data to Google Cloud Storage
// Was used for JSON testing form. Unsure if will use with final App.
router.post('/uploadJson', async (req, res) => {
    try {
        const jsonData = req.body;
        const jsonString = JSON.stringify(jsonData);

        // Define destination file path in GCS
        const destinationFilePath = 'json-files/data.json';

        // Upload JSON data to GCS
        await storage.bucket('example-kindred-tales').file(destinationFilePath).save(jsonString);

        res.json({ message: 'JSON data uploaded to GCS successfully' });
    } catch (error) {
        console.error('Error uploading JSON data to GCS:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




// POST route to send completed PDFMake PDF to Google Cloud Storage
// ** Remember to npm install multer (middleware for uploading the pdf)
router.post('/uploadPDF', upload.single('pdfData'), async (req, res) => {
    try {
        // Gets PDF using Multer Middleware. Buffer (aka temporary storage) contains raw binary data of PDF.
        const fileBuffer = req.file.buffer;

        // Extract book title and author from PDF data so that it can be stored on GCS by Title and Author
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
        const destinationFilePath = `pdf-files/${filename}`;

        // Upload the file buffer to GCS bucket
        await storage.bucket(bucketName).file(destinationFilePath).save(fileBuffer);

        res.send('File uploaded successfully');
    } catch (error) {
        console.error('Error uploading file to GCS:', error);
        res.status(500).send('Internal server error');
    }
});






module.exports = router;
