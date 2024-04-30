import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function PDFMake({ jsonData }) {
  useEffect(() => {
    console.log('component doing things with', jsonData);
  }, [jsonData]);
}

export default PDFMake;
