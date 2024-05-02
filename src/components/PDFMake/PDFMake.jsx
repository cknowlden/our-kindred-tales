import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Initializing fonts
pdfmake.vfs = pdfFonts.pdfMake.vfs;

// Optional: Set Roboto as the default font
pdfmake.defaultFont = 'Roboto';

//creating preferred fonts for text and headers
pdfMake.fonts = {
  merriweather: {
    normal:
      'https://fonts.googleapis.com/css2?family=Montserrat%3Aital%2Cwght%400%2C100..900&directory=3&display=block&text=%2001TWacdefghinorsty',
    bold: 'https://fonts.googleapis.com/css2?family=Montserrat%3Aital%2Cwght%400%2C100..900&directory=3&display=block&text=%2001TWacdefghinorsty',
    italics:
      'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital@0;1&display=swap',
    bolditalics:
      'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital@0;1&display=swap',
  },
};

function PDFMake({ jsonData }) {
  // Declare metadata state
  const [metadata, setMetadata] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (jsonData) {
      // Parse jsonData since input from dispatch will be string
      const data =
        typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

      // Check if metadata exists in parsed data
      if (data && data.metadata) {
        // Set metadata
        setMetadata(data.metadata);
        setData(data);
      }
    }
  }, [jsonData]);

  // If metadata is not yet available, return null
  if (!metadata) {
    return null;
  }

  // Document definition
  const documentDefinition = {
    content: [],
    pageMargins: [40, 60, 40, 60],
    defaultStyle: {
      font: 'merriweather',
    },
    pageSize: {
      //page size is in 'points', where 1 inch = 72 points.
      //will need to add other page sizes to accommodate gutters
      width: 432,
      height: 648,
    },

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

  //create table of contents
  const TOC = {
    toc: {
      // id: 'mainToc'  // optional
      title: { text: 'Table of Contents', style: 'header' },
    },
  };
  documentDefinition.content.push(TOC);
  documentDefinition.content.push({ text: '', pageBreak: 'before' });

  // variable chapter page numbers
  const chapterPageNumbers = [];

  // Iterate over each question in the JSON data to populate TOC and chapters
  data.questions.forEach((question, index) => {
    // Add page break before starting a new chapter
    if (index !== 0) {
      documentDefinition.content.push({ text: '', pageBreak: 'before' });
    }

    // Add ID for linking from TOC
    const chapterId = `Chapter${index + 1}`;

    const chapterTitle = {
      text: question.title,
      fontSize: 14,
      bold: true,
      margin: [0, 0, 0, 10], // Bottom margin
      id: chapterId, // Set ID for linking from TOC
      tocItem: true,
    };
    documentDefinition.content.push(chapterTitle);

    console.log(chapterTitle);

    // Record the page number for the current chapter
    chapterPageNumbers.push({ chapterId: chapterId, pageNumber: '?' });
    console.log('chapter page numbers', chapterPageNumbers);

    // Iterate over each element in the chapter
    question.elements.forEach((element) => {
      if (element.type === 'text') {
        const textContent = {
          text: element.value,
          fontSize: 10.5,
          margin: [20, 20, 30, 0], // Text margins
        };
        documentDefinition.content.push(textContent);
      } else if (element.type === 'image') {
        const imageContent = {
          image: element.value,
          width: 150, // Adjust the width as needed
        };
        documentDefinition.content.push(imageContent);
      }
    });

    // Add spacing between chapters
    documentDefinition.content.push({ text: '', margin: [0, 0, 0, 20] });
  });

  // Create PDF
  var pdfDoc = pdfmake.createPdf(documentDefinition);
  //opens pdf in a new tab
  pdfDoc.open();
  pdfDoc.download(`${metadata.bookTitle}`); // Download the generated PDF

  return null; // Placeholder return statement
}

export default PDFMake;
