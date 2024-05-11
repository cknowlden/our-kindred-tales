// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import pdfmake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';

// // shortened book file for testing
// import testJSON from './testfile.json';

// // Initializing fonts
// pdfmake.vfs = pdfFonts.pdfMake.vfs;

// //creating preferred fonts for text and headers
// pdfMake.fonts = {
//   merriweather: {
//     normal: 'Merriweather-Regular.ttf',
//     bold: 'Merriweather-Regular.ttf',
//     italics: 'Merriweather-Regular.ttf',
//     bolditalics: 'Merriweather-Regular.ttf',
//   },
//   montserrat: {
//     normal: 'Montserrat-Regular.ttf',
//     bold: 'Montserrat-Bold.ttf',
//     italics: 'Montserrat-VariableFont_wght.ttf',
//     bolditalics: 'Montserrat-VariableFont_wght.ttf',
//   },
// };
// // Optional: Set Roboto as the default font
// pdfmake.defaultFont = 'merriweather';

// function PDFMake({ jsonData }) {
//   //altering code to accept testJSON file instead of jasonData imported through state:

//   // Declare metadata state
//   const [metadata, setMetadata] = useState(null);
//   const [data, setData] = useState(null);
//   //parsing test data
//   console.log('testJSON', testJSON);

//   useEffect(() => {
//     if (jsonData) {
//       //This line is switching out the state data to instead use the testfile.json linked above
//       const data = testJSON;
//       //typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

//       // Check if metadata exists in parsed data
//       if (data && data.metadata) {
//         // Set metadata
//         setMetadata(data.metadata);
//         setData(data);
//       }
//     }
//   }, [jsonData]);

//   // If metadata is not yet available, return null
//   if (!metadata) {
//     return null;
//   }

//   // Document definition
//   const documentDefinition = {
//     content: [],

//     header: function (currentPage) {
//       if (currentPage > 3) {
//         return {
//           font: 'merriweather',
//           fontSize: 10,
//           alignment: 'center',
//           margin: [0, 20, 0, 0],
//           text: currentPage % 2 ? metadata.author : metadata.bookTitle,
//         };
//       }
//       return null;
//     },

//     // header: {
//     //   text: metadata.author,
//     //   font: 'montserrat',
//     //   fontSize: 10,
//     //   alignment: 'center',
//     //   margin: [0, 20, 0, 0],
//     // },

//     // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
//     pageMargins: [40, 60, 40, 60],
//     defaultStyle: {
//       font: 'merriweather',
//     },
//     pageSize: {
//       //page size is in 'points', where 1 inch = 72 points.
//       //will need to add other page sizes to accommodate gutters
//       width: 432,
//       height: 648,
//     },

//     // Footer
//     footer: (currentPage, pageCount) => {
//       // Exclude page numbers from the first three pages
//       if (currentPage <= 2) {
//         return null; // Return null to exclude page number
//       } else {
//         // Adjust page number to start from 1 after the third page
//         const adjustedPageNumber = currentPage - 2;

//         return {
//           //text: `Page ${currentPage} of ${pageCount}`,
//           text: `${adjustedPageNumber} `,
//           alignment: 'center',
//           fontSize: 10,
//           margin: [0, 30, 0, 0],
//         };
//       }
//     },
//   };

//   console.log(documentDefinition.pageCount);

//   // Title page
//   const titlePage = {
//     text: metadata.bookTitle,
//     fontSize: 24,
//     font: 'montserrat',
//     bold: true,
//     alignment: 'center',
//     margin: [0, 100, 0, 0],
//   };
//   documentDefinition.content.push(titlePage);

//   const authorTitle = {
//     text: metadata.author,
//     fontSize: 20,
//     font: 'montserrat',
//     bold: false,
//     alignment: 'center',
//     margin: [0, 20, 0, 0],
//   };
//   documentDefinition.content.push(authorTitle);
//   documentDefinition.content.push({ text: '', pageBreak: 'before' });

//   // Table of Contents
//   const tocTitle = {
//     text: 'Table of Contents',
//     fontSize: 18,
//     font: 'montserrat',
//     alignment: 'center',

//     bold: true,
//     margin: [0, 20, 0, 20], // Top margin
//   };
//   documentDefinition.content.push(tocTitle);

//   //create table of contents
//   const TOC = {
//     toc: {
//       // id: 'mainToc'  // optional
//     },
//   };
//   documentDefinition.content.push(TOC);
//   documentDefinition.content.push({ text: '', pageBreak: 'before' });

//   // variable chapter page numbers
//   const chapterPageNumbers = [];

//   // Iterate over each question in the JSON data to populate TOC and chapters
//   data.questions.forEach((question, index) => {
//     // Add page break before starting a new chapter
//     if (index !== 0) {
//       documentDefinition.content.push({ text: '', pageBreak: 'before' });
//     }

//     // Add ID for linking from TOC
//     const chapterId = `Chapter${index + 1}`;

//     const chapterTitle = {
//       text: question.title,
//       fontSize: 14,
//       alignment: 'center',
//       font: 'montserrat',
//       bold: false,
//       margin: [30, 20, 30, 0], // Bottom margin
//       id: chapterId, // Set ID for linking from TOC
//       tocItem: true,
//     };
//     documentDefinition.content.push(chapterTitle);

//     console.log(chapterTitle);

//     // Record the page number for the current chapter
//     chapterPageNumbers.push({ chapterId: chapterId, pageNumber: '?' });
//     console.log('chapter page numbers', chapterPageNumbers);

//     // Iterate over each element in the chapter
//     question.elements.forEach((element) => {
//       if (element.type === 'text') {
//         const textContent = {
//           text: element.value,
//           alignment: 'justify',
//           fontSize: 10.5,
//           margin: [30, 20, 30, 0], // Text margins
//         };
//         documentDefinition.content.push(textContent);
//       } else if (element.type === 'image') {
//         const imageContent = {
//           image: element.value,
//           width: 150, // Adjust the width as needed
//         };
//         documentDefinition.content.push(imageContent);
//       }
//     });

//     // Add spacing between chapters
//     documentDefinition.content.push({
//       text: '',
//       margin: [0, 0, 0, 20],
//     });
//   });

//   // Create PDF
//   var pdfDoc = pdfmake.createPdf(documentDefinition);
//   //opens pdf in a new tab
//   pdfDoc.open();
//   pdfDoc.download(`${metadata.bookTitle}`); // Download the generated PDF

//   return null; // Placeholder return statement
// }

// export default PDFMake;


import React, { useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Initializing fonts
pdfmake.vfs = pdfFonts.pdfMake.vfs;

function PDFMake({ jsonData }) {
  useEffect(() => {
    const generateAndDownloadPDF = async () => {
      try {
        if (!jsonData) return;

        // Parse jsonData since input from dispatch will be string
        const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

        // Check if metadata exists in parsed data
        if (!data || !data.metadata) return;

        const metadata = data.metadata;

        // Document definition
        const documentDefinition = {
          content: [],
          pageMargins: [40, 60, 40, 60], // Setting page margins

          // Footer
          footer: (currentPage, pageCount) => {
            return {
              text: `Page ${currentPage} of ${pageCount}`,
              alignment: 'center',
              fontSize: 10,
              margin: [0, 30, 0, 0],
            };
          },
        };

        // Title page
        const titlePage = {
          text: metadata.bookTitle,
          fontSize: 24,
          bold: true,
          alignment: 'center',
          margin: [0, 100, 0, 0],
        };
        documentDefinition.content.push(titlePage);

        const authorTitle = {
          text: metadata.author,
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 20, 0, 0],
        };
        documentDefinition.content.push(authorTitle);
        documentDefinition.content.push({ text: '', pageBreak: 'before' });

        // Create table of contents
        const TOC = {
          toc: {
            title: { text: 'Table of Contents', style: 'header' },
          },
        };
        documentDefinition.content.push(TOC);
        documentDefinition.content.push({ text: '', pageBreak: 'before' });

        // Iterate over each question in the JSON data to populate TOC and chapters
        for (const question of data.questions) {
          // Add page break before starting a new chapter
          if (documentDefinition.content.length > 0) {
            documentDefinition.content.push({ text: '', pageBreak: 'before' });
          }

          // Add ID for linking from TOC
          const chapterId = `Chapter${data.questions.indexOf(question) + 1}`;

          const chapterTitle = {
            text: question.title,
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 10], // Bottom margin
            id: chapterId, // Set ID for linking from TOC
            tocItem: true,
          };
          documentDefinition.content.push(chapterTitle);

          // Iterate over each element in the chapter
          for (const element of question.elements) {
            if (element.type === 'text') {
              const textContent = {
                text: element.value,
                fontSize: 12,
                margin: [20, 20, 30, 0], // Text margins
              };
              documentDefinition.content.push(textContent);
              //If the element is an image, fetch image and convert to data URL
            } else if (element.type === 'image') {
              const imageDataUrl = await fetchImageAsDataUrl(element.value);
              // Add the image data URL to the document content
              documentDefinition.content.push({ image: imageDataUrl, width: 150, alignment: 'center', margin: [0, 10] });
            }
          }

          // Add spacing between chapters
          documentDefinition.content.push({ text: '', margin: [0, 0, 0, 20] });
        }

        // Create PDF
        const pdfDoc = pdfmake.createPdf(documentDefinition);
        pdfDoc.open();
        pdfDoc.download(`${metadata.bookTitle}`); // Download the generated PDF

        // Generate the PDF buffer
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

  //
  const fetchImageAsDataUrl = async (imageUrl) => {
    try {
      //takes in imageURL to make GET request
      const response = await fetch(imageUrl);
      // after response is received, takes binary data (blob)
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        //FileReader allows JS to read contents of blob above
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        //FileReader reads contents and .readAsDataURL interprets blob as a data URL which is needed for PDFMake
        //readAsDataURL is provided by JS and used by FileReader which is built in with JS
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  };

  return <> </>; // Or <div></div>
}

export default PDFMake;
