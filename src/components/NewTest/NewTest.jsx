import React, { useState } from 'react';
import JSON from '../JSON/JSON';
import PDFMake from '../PDFMake/PDFMake';
import testJson from '../PDFMake/testfile.json';
import { useHistory } from 'react-router-dom';

function NewTest() {
  const [jsonData, setJsonData] = useState(null);
  const history = useHistory();

  const handleJSONSubmit = (data) => {
    // Handle JSON submission and update jsonData state
    //console.log('Submitted JSON Data:', data);
    setJsonData(data);
    // history.push('/overview');
  };

  return (
    <div>
      <h1>Top section with editable table for project name and contact info</h1>
      <JSON onSubmit={handleJSONSubmit} /> {/* Pass callback function */}
      {jsonData && <PDFMake jsonData={testJson} />}{' '}
    </div>
  );
}

export default NewTest;
