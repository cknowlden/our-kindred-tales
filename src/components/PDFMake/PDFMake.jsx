import React, { useState, useEffect } from 'react';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Import your test JSON file or replace it with the actual data source
import testJSON from './testfile.json';

// Initializing fonts
pdfmake.vfs = pdfFonts.pdfMake.vfs;

// Font configuration
pdfmake.fonts = {
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
// Set default font
pdfmake.defaultFont = 'merriweather';

function PDFMake({ jsonData }) {
  const [metadata, setMetadata] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (jsonData) {
      // Parse JSON data
      const parsedData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

      if (parsedData && parsedData.metadata) {
        setMetadata(parsedData.metadata);
        setData(parsedData);
      }
    }
  }, [jsonData]);

  if (!metadata) {
    return null;
  }

  const documentDefinition = {
    content: [],
    // Define other properties like header, footer, pageMargins, etc.

    // Define your content here
  };

  useEffect(() => {
    // Fetch images and add them to the document
    const fetchAndAddImages = async () => {
      if (!data) return;

      const elementsWithImages = data.questions.flatMap(question =>
        question.elements.filter(element => element.type === 'image')
      );

      for (const element of elementsWithImages) {
        try {
          const imageDataUrl = await fetchImageAsDataUrl(element.value);
          documentDefinition.content.push({ image: imageDataUrl, width: 150, alignment: 'center', margin: [0, 10] });
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    };

    fetchAndAddImages();
  }, [data]);

  const fetchImageAsDataUrl = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  };

  // Create PDF
  const pdfDoc = pdfmake.createPdf(documentDefinition);
  pdfDoc.open();
  pdfDoc.download(`${metadata.bookTitle}`); // Download the generated PDF

  return null;
}

export default PDFMake;
