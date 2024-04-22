import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Details() {
  const store = useSelector((store) => store);
  // const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
      <h2>Here lies details about a Kindred Tales project and its metadata</h2>
    </div>
  );
}

export default Details;
