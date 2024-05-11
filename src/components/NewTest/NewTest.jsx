// import React, { useState } from 'react';
// import JSON from '../JSON/JSON';
// import PDFMake from '../PDFMake/PDFMake';
// import testJson from '../PDFMake/testfile.json';
// import { useHistory } from 'react-router-dom';

// function NewTest() {
//   const [jsonData, setJsonData] = useState(null);
//   const history = useHistory();

//   const handleJSONSubmit = (data) => {
//     // Handle JSON submission and update jsonData state
//     //console.log('Submitted JSON Data:', data);
//     setJsonData(data);
//     // history.push('/overview');
//   };

//   return (
//     <div>
//       <h1>Top section with editable table for project name and contact info</h1>
//       <JSON onSubmit={handleJSONSubmit} /> {/* Pass callback function */}
//       {jsonData && <PDFMake jsonData={testJson} />}{' '}
//     </div>
//   );
// }

// export default NewTest;

import React, { useState, useEffect } from 'react';
import JSON from '../JSON/JSON';
import PDFMake from '../PDFMake/PDFMake';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function NewTest() {
  const [jsonDataState, setJsonDataState] = useState(null);
  const filePdfId = '1700541671277x948515555305848800_interiorTest';

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
      <h1>Top section with editable table for project name and contact info</h1>
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
