import React from 'react';
import JSON from '../JSON/JSON';

function NewTest() {
  //TO DO: function to dispatch to saga for submitting render for test JSON data
  return (
    <div>
      <h1>top section with editable table for project name and contact info</h1>
      <div>Enter JSON here to submit to PDF formatter</div>
      <JSON />
      <center>
        <button className="btn">Submit</button>
      </center>
    </div>
  );
}

export default NewTest;
