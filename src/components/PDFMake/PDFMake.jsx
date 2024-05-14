import React, { useEffect } from 'react';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import axios from 'axios';
import FormData from 'form-data';
import { useDispatch, useSelector } from 'react-redux';

// Initializing fonts
pdfmake.vfs = pdfFonts.pdfMake.vfs;

// Creating preferred fonts for text and headers
pdfMake.fonts = {
  merriweather: {
    normal: 'Merriweather-Regular.ttf',
    bold: 'Merriweather-Regular.ttf',
    italics: 'Merriweather-Regular.ttf',
    bolditalics: 'Merriweather-Regular.ttf',
  },
  montserrat: {
    normal: 'Montserrat-Regular.ttf',
    bold: 'Montserrat-Bold.ttf',
    italics: 'Montserrat-VariableFont_wght.ttf',
    bolditalics: 'Montserrat-VariableFont_wght.ttf',
  },
};

// Optional: Set Merriweather as the default font
pdfmake.defaultFont = 'merriweather';

//PDF MAKE - moving this functionality to the server side should speed up processing time when rendering PDF
function PDFMake({ jsonData }) {
  const dispatch = useDispatch();
  const projectsID = useSelector((store) => store.projectsID);

  // Parsing test data
  useEffect(() => {
    const generateAndDownloadPDF = async () => {
      try {
        if (!jsonData) return;

        // Parse jsonData since input from dispatch will be string
        const data =
          typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

        // Check if metadata exists in parsed data
        if (!data || !data.metadata) return;
        const metadata = data.metadata;

        // Document definition
        const documentDefinition = {
          content: [],
          header: function (currentPage) {
            if (currentPage > 3) {
              return {
                font: 'merriweather',
                fontSize: 10,
                alignment: 'center',
                margin: [0, 20, 0, 0],
                text: currentPage % 2 ? metadata.author : metadata.bookTitle,
              };
            }
            return null;
          },
          // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
          pageMargins: [40, 60, 40, 60],
          defaultStyle: {
            font: 'merriweather',
          },
          pageSize: {
            // Page size is in 'points', where 1 inch = 72 points.
            // Will need to add other page sizes to accommodate gutters
            width: 432,
            height: 648,
          },
          // Footer
          footer: (currentPage, pageCount) => {
            dispatch({
              type: 'CHANGE_PAGECOUNT',
              payload: { pcount: pageCount, detailId: projectsID },
            });
            // Exclude page numbers from the first three pages
            if (currentPage <= 2) {
              return null; // Return null to exclude page number
            } else {
              // Adjust page number to start from 1 after the third page
              const adjustedPageNumber = currentPage - 2;
              return {
                text: `${adjustedPageNumber} `,
                alignment: 'center',
                fontSize: 10,
                margin: [0, 30, 0, 0],
              };
            }
          },
        };

        // Title page
        const titlePage = {
          text: metadata.bookTitle,
          fontSize: 24,
          font: 'montserrat',
          bold: true,
          alignment: 'center',
          margin: [0, 100, 0, 0],
        };
        documentDefinition.content.push(titlePage);

        const authorTitle = {
          text: metadata.author,
          fontSize: 20,
          font: 'montserrat',
          bold: false,
          alignment: 'center',
          margin: [0, 20, 0, 0],
        };
        documentDefinition.content.push(authorTitle);

        documentDefinition.content.push({ text: '', pageBreak: 'before' });

        // Table of Contents
        const tocTitle = {
          text: 'Table of Contents',
          fontSize: 18,
          font: 'montserrat',
          alignment: 'center',
          bold: true,
          margin: [0, 20, 0, 20], // Top margin
        };
        documentDefinition.content.push(tocTitle);

        // Create table of contents
        const TOC = {
          toc: {
            // id: 'mainToc'  // optional
          },
        };
        documentDefinition.content.push(TOC);

        documentDefinition.content.push({ text: '', pageBreak: 'before' });

        // Variable chapter page numbers
        const chapterPageNumbers = [];

        const fetchAndAddImage = async (imageUrl) => {
          try {
            const response = await fetch(imageUrl);
            // After response is received, takes binary data (blob)
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
              // FileReader allows JS to read contents of blob above
              const reader = new FileReader();
              reader.onloadend = () => {
                const imageContent = reader.result;

                // Calculate the width as a percentage of the page width
                const pageWidth = 432;
                const imageWidthPercentage = 75;
                const width = (pageWidth * imageWidthPercentage) / 100;

                documentDefinition.content.push({
                  image: imageContent,
                  width: width,
                  margin: [0, 20, 0, 0], // Margins: [left, top, right, bottom]
                  alignment: 'center',
                });
                resolve();
              };
              reader.onerror = reject;
              // FileReader reads contents and .readAsDataURL interprets blob as a data URL which is needed for PDFMake
              // readAsDataURL is provided by JS and used by FileReader which is built in with JS
              reader.readAsDataURL(blob);
            });
          } catch (error) {
            console.error('Error fetching image:', error);
            throw error;
          }
        };

        async function processElements(question) {
          for (const element of question.elements) {
            if (element.type === 'text') {
              const textContent = {
                text: element.value,
                alignment: 'justify',
                fontSize: 10.5,
                margin: [30, 20, 30, 0], // Text margins
              };
              documentDefinition.content.push(textContent);
            } else if (element.type === 'image') {
              await fetchAndAddImage(element.value);
            }
          }
        }

        // Iterate over each question in the JSON data to populate TOC and chapters
        for (const [index, question] of data.questions.entries()) {
          // Add page break before starting a new chapter
          if (index !== 0) {
            documentDefinition.content.push({ text: '', pageBreak: 'before' });
          }

          // Add ID for linking from TOC
          const chapterId = `Chapter${index + 1}`;
          const chapterTitle = {
            text: question.title,
            fontSize: 14,
            alignment: 'center',
            font: 'montserrat',
            bold: false,
            margin: [30, 20, 30, 0], // Bottom margin
            id: chapterId, // Set ID for linking from TOC
            tocItem: true,
          };
          documentDefinition.content.push(chapterTitle);

          // Record the page number for the current chapter
          chapterPageNumbers.push({ chapterId: chapterId, pageNumber: '?' });
          console.log('chapter page numbers', chapterPageNumbers);

          // Call the async function
          await processElements(question);

          // Add spacing between chapters
          documentDefinition.content.push({
            text: '',
            margin: [0, 0, 0, 20],
          });
        }

        // Create PDF
        const pdfDoc = pdfmake.createPdf(documentDefinition);
        pdfDoc.open();
        pdfDoc.download(`${metadata.bookTitle}`);

        pdfDoc.getBuffer(async (buffer) => {
          // Prepare form data
          const formData = new FormData();
          formData.append('pdfData', new Blob([buffer]), 'generated.pdf');
          formData.append('bookTitle', metadata.bookTitle);
          formData.append('author', metadata.author);

          // Upload the PDF to GCS
          try {
            await axios.post('/api/gcs/uploadPDF', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log('PDF uploaded successfully');
          } catch (error) {
            console.error('Error uploading PDF:', error);
          }
        });
      } catch (error) {
        console.error('Error generating and downloading PDF:', error);
      }
    };

    generateAndDownloadPDF();
  }, [jsonData]);

  return null;
}

export default PDFMake;
