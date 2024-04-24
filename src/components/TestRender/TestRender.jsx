import React from 'react';
import { Link } from 'react-router-dom';

function TestRender() {
  //TO DO: bring in buffering circle symbol while waiting for pdf to render
  return (
    <div>
      <h1>View new test project PDF render here</h1>
      <center>
        <Link to="/new-test">
          <button className="btn">Done</button>
        </Link>
      </center>
    </div>
  );
}

export default TestRender;
