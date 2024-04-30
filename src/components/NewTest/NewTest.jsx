import React, { useState } from 'react';
import JSON from '../JSON/JSON';
import PDFMake from '../PDFMake/PDFMake';

function NewTest() {
  const [jsonData, setJsonData] = useState(null);

  const handleJSONSubmit = (data) => {
    // Handle JSON submission and update jsonData state
    //console.log('Submitted JSON Data:', data);
    setJsonData(data);
  };

  return (
    <div>
      <h1>Top section with editable table for project name and contact info</h1>
      <JSON onSubmit={handleJSONSubmit} /> {/* Pass callback function */}
      {jsonData && <PDFMake jsonData={jsonData} />}{' '}
    </div>
  );
}

export default NewTest;
