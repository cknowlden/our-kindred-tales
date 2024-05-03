import React from "react";
import { useDispatch } from "react-redux";
import ActionMenu from "../ActionMenu/ActionMenu";

function SubmitOrderForm(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch({ type: "FETCH_STATUS" })}>
        Retrieve all job statuses
      </button>
      <ActionMenu />
    </div>
  );
}

export default SubmitOrderForm;
