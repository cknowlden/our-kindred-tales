import React from 'react';
import { useDispatch } from 'react-redux';

function SubmitOrderForm() {
  const dispatch = useDispatch();
  return (
    <button
      className={submitOrder}
      onClick={() => dispatch({ type: 'SUBMIT_ORDER' })}
    >
      Submit
    </button>
  );
}

export default SubmitOrderForm;
