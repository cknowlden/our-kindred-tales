const express = require('express');
const router = express.Router();
const { Storage } = require('@google-cloud/storage');
const path = require('path');
require('dotenv').config();


// Create a new storage. Storage is an object used by GCS. Allows for uploading, downloading, deleting etc.
//see import above
const storage = new Storage({
    keyFilename: process.env.SERVICE_ACCOUNT_KEY_PATH //This is using the client key etc. from .env file
});


// GET route to fetch files from Google Cloud Storage
router.get('/files', async (req, res) => {
    try {
        // Get files in example-kindred-tales bucket from GCS
        const [files] = await storage.bucket('example-kindred-tales').getFiles();

        // Get file information
        const fileData = await Promise.all(files.map(async (file) => {
            // Read the content of each file
            const data = await file.download();

            // Determine file type based on file extension
            const fileType = path.extname(file.name).toLowerCase();
            let content;

            if (fileType === '.json') {
                // Parse JSON content for JSON files
                content = JSON.parse(data[0].toString());
            } else {
                // For other file types (e.g., text), treat content as text
                content = data[0].toString();
            }

            // Construct an object with file name and content
            return {
                name: file.name,
                content: content
            };
        }));

        res.json(fileData);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// POST route to upload JSON data to Google Cloud Storage
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

module.exports = router;
