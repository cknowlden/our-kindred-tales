import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

//initializing fonts
//figure out how to use other fonts & where to save them
pdfmake.vfs = pdfFonts.pdfMake.vfs;

// Optional: Set Roboto as the default font
pdfMake.defaultFont = 'Roboto';

function PDFMake({ jsonData }) {
  useEffect(() => {
    if (jsonData) {
      // Parse jsonData since input from dispatch will be string
      const data =
        typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

      // Check if metadata exists in parsed data
      if (data && data.metadata) {
        //declare metadata info as variable to use (for author/title page)
        const {
          bucketId,
          pdfOnly,
          addTitleDivider,
          pdfFileId,
          bookTitle,
          author,
          url,
        } = data.metadata;

        console.log('Metadata:', {
          bucketId,
          pdfOnly,
          addTitleDivider,
          pdfFileId,
          bookTitle,
          author,
          url,
        });
      }
    }
  }, [jsonData]);
}

export default PDFMake;
