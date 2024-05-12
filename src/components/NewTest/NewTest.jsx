import React, { useState, useEffect } from 'react';
import JSON from '../JSON/JSON';
import PDFMake from '../PDFMake/PDFMake';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function NewTest() {
  const pdfID = useSelector((store) => store.pdfID);
  const [jsonDataState, setJsonDataState] = useState(null);
  const filePdfId = pdfID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/gcs/files/JSON/${filePdfId}`);
        setJsonDataState(response.data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, [filePdfId]);

  return (
    <div>
      <h1>Your PDF has been generated. View in new tab or download folder.</h1>
      {jsonDataState && (
        <div>
          <JSON onSubmit={(data) => setJsonDataState(data)} />
          <PDFMake jsonData={jsonDataState} />
        </div>
      )}
    </div>
  );
}

export default NewTest;
