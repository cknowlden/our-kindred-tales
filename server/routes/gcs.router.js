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

        const fileData = await Promise.all(files.map(async (file) => {
            // Read the content of each file
            const data = await file.download();

            const fileType = path.extname(file.name).toLowerCase();
            let content;

            if (fileType === '.json') {
                content = JSON.parse(data[0].toString());
            } else {
                // For other file types, treat content as text
                content = data[0].toString();
            }

            if (content && content.questions && content.metadata) {
                return {
                    questions: content.questions.map(question => ({
                        title: question.title,
                        elements: question.elements.map(element => ({
                            type: element.type,
                            value: element.value || ''
                        }))
                    })),
                    metadata: content.metadata
                };
            } else {
                return null;
            }
        }));

        // Find the first non-null file data
        const matchingFileData = fileData.find(file => file !== null);

        // If no matching file data is found, return an empty object
        const responseObject = matchingFileData || {};

        // Return the response object
        res.json(responseObject);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
;







// POST route to upload JSON data to Google Cloud Storage
// router.post('/uploadJson', async (req, res) => {
//     try {
//         const jsonData = req.body;
//         const jsonString = JSON.stringify(jsonData);

//         // Define destination file path in GCS
//         const destinationFilePath = 'json-files/data.json';

//         // Upload JSON data to GCS
//         await storage.bucket('example-kindred-tales').file(destinationFilePath).save(jsonString);

//         res.json({ message: 'JSON data uploaded to GCS successfully' });
//     } catch (error) {
//         console.error('Error uploading JSON data to GCS:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// POST route to upload PDF to Google Cloud Storage





module.exports = router;




