import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './JSON.css';

function JSON() {
  const dispatch = useDispatch();
  const [jsonInput, setJsonInput] = useState('');

  const submitInput = (event) => {
    event.preventDefault();
    //TO DO: dispatch to saga
  };

  return (
    <div>
      <p>Input your JSON file here</p>
      <br />
      <center>
        <form onSubmit={submitInput}>
          <textarea
            className="json-form"
            rows={25}
            cols={80}
            name="jsonInput"
            value={jsonInput}
            required
            placeholder="Enter JSON"
            onChange={(event) => setJsonInput(event.target.value)}
          />
          <div>
            <input className="btn" type="submit" />
          </div>
        </form>
      </center>
    </div>
  );
}

export default JSON;
