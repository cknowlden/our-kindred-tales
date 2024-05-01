import React from 'react';
import { useDispatch } from 'react-redux';

function SubmitOrderForm(props) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch({ type: 'SUBMIT_ORDER' })}
    >
      Submit
    </button>
  );
}

export default SubmitOrderForm;