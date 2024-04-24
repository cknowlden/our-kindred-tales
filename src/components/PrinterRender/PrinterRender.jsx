import React from 'react';
import { Link } from 'react-router-dom';

function PrinterRender() {
  return (
    <div>
      <h1>View printer friendly PDF render here.</h1>
      {/* TO DO: change button route to go back to associated project details page base on id */}
      <Link to="/overview">
        <button className="btn">Go Back</button>{' '}
      </Link>
    </div>
  );
}

export default PrinterRender;
