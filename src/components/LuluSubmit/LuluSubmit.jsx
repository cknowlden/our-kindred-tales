import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LuluSubmit() {
  const history = useHistory();
  const dispatch = useDispatch();
  const projectID = useSelector((store) => store.projectsID);
  let [infoToAdd, setInfoToAdd] = useState({
    id: projectID.projectID,
    cover_url: "",
    interior_url: "",
    shipping_level: "",
  });
  const handleAddCover = (event) => {
    setInfoToAdd({
      ...infoToAdd,
      cover_url: event.target.value,
    });
  };
  const handleAddContent = (event) => {
    setInfoToAdd({
      ...infoToAdd,
      interior_url: event.target.value,
    });
  };
  const handleShippingLevel = (event) => {
    setInfoToAdd({
      ...infoToAdd,
      shipping_level: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    dispatch({ type: "SUBMIT_ORDER" });
    history.push("/overview");
  };
  return (
    <div>
      <center>
        <h3>Customer Info</h3>
      </center>
      <center>
        <label>Cover URL:</label>
        <input onChange={handleAddCover} placeholder="Cover URL" id="cover" />
        <br />
        <label>Content URL:</label>
        <input onChange={handleAddContent} placeholder="Content" id="Content" />
        <br />
        <label>Shipping Level</label>
        <input
          onChange={handleShippingLevel}
          placeholder="Shipping Level"
          id="shipping"
        />
      </center>
      <br />
      <center>
        <button onClick={handleSubmit} id="submitBtn" className="btn">
          Submit
        </button>
      </center>
    </div>
  );
}
export default LuluSubmit;
