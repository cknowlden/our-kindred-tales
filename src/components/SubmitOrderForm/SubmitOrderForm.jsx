import React from 'react';
import { useDispatch } from 'react-redux';

function SubmitOrderForm(props) {
  const dispatch = useDispatch();
  return (
    <div>
    <button
      onClick={() => dispatch({ type: 'SUBMIT_ORDER' })}
    >
      Submit
    </button>

<button
onClick={() => dispatch({ type: 'FETCH_ORDERS' })}
>
Retrieve jobs
</button>
    </div>
  );
}

export default SubmitOrderForm;