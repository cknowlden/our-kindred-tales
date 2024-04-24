import React from 'react';
import { useDispatch } from 'react-redux';

function SubmitOrderButton(props) {
  const dispatch = useDispatch();
  return (
    <button
      className={props.className}
      onClick={() => dispatch({ type: 'SUBMIT_ORDER' })}
    >
      Submit
    </button>
  );
}

export default SubmitOrderButton;
