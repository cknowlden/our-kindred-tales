// //RICHARD'S ORIGINAL CODE
// import React, { useState } from 'react';
// import JSON from '../JSON/JSON';
// import PDFMake from '../PDFMake/PDFMake';

// function NewTest() {
//   const [jsonData, setJsonData] = useState(null);

//   const handleJSONSubmit = (data) => {
//     // Handle JSON submission and update jsonData state
//     //console.log('Submitted JSON Data:', data);
//     setJsonData(data);
//   };

//   return (
//     <div>
//       <h1>Top section with editable table for project name and contact info</h1>
//       <JSON onSubmit={handleJSONSubmit} /> {/* Pass callback function */}
//       {jsonData && <PDFMake jsonData={jsonData} />}{' '}
//     </div>
//   );
// }

// export default NewTest;


//CODE WITH PHYSICAL IMPORT testfile.JSON
// import React, { useState } from 'react';
// import JSON from '../JSON/JSON';
// import PDFMake from '../PDFMake/PDFMake';
// import axios from 'axios';

// function NewTest() {
//   const [jsonDataState, setJsonDataState] = useState(null);
//   const filePdfId = '1700541671277x948515555305848800_interior';

//   const handleButtonClick = async () => {
//     try {
//       const response = await axios.get(`/api/gcs/files/JSON/${filePdfId}`);
//       setJsonDataState(response.data);
//     } catch (error) {
//       console.error('Error fetching JSON data:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Top section with editable table for project name and contact info</h1>
//       <button onClick={handleButtonClick}>Fetch JSON Data</button>
//       {jsonDataState && (
//         <div>
//           <JSON onSubmit={(data) => setJsonDataState(data)} />
//           <PDFMake jsonData={jsonDataState} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default NewTest;




//DON'T DELETE WORKING CODE
import React, { useState, useEffect } from 'react';
import JSON from '../JSON/JSON';
import PDFMake from '../PDFMake/PDFMake';
import axios from 'axios';

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


