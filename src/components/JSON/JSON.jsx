import React, { useState } from 'react';
import './JSON.css';

function JSON({ onSubmit }) {
  const [jsonInput, setJsonInput] = useState('');

  const submitInput = (event) => {
    event.preventDefault();
    //console.log('Submitting JSON data:', jsonInput);
    onSubmit(jsonInput); // Pass jsonInput to parent component
  };

  return (
    <div>
      <br />
      <center>
        {/* <form onSubmit={submitInput}>
          <textarea
            className="json-form"
            rows={25}
            cols={80}
            name="jsonInput"
            value={jsonInput}
            placeholder="Enter JSON"
            onChange={(event) => setJsonInput(event.target.value)}
          />
          <div>
            <input className="btn" type="submit" />
          </div>
        </form> */}
      </center>
    </div>
  );
}

export default JSON;
