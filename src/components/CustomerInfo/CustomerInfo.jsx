import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CustomerInfo() {
  const dispatch = useDispatch();
  const projectID = useSelector((store) => store.projectsID);
  console.log('id:', projectID);
  let [customerToAdd, setCustomerToAdd] = useState({
    id: projectID.projectID,
    name: '',
    phone: 0,
    street: '',
    city: '',
    state: '',
    post: 0,
    country: '',
  });

  const handleNameChange = (event) => {
    setCustomerToAdd({
      ...customerToAdd,
      name: event.target.value,
    });
  };

  const handlePhoneChange = (event) => {
    setCustomerToAdd({
      ...customerToAdd,
      phone: event.target.value,
    });
  };

  const handleStreetChange = (event) => {
    setCustomerToAdd({
      ...customerToAdd,
      street: event.target.value,
    });
  };

  const handleCityChange = (event) => {
    setCustomerToAdd({
      ...customerToAdd,
      city: event.target.value,
    });
  };

  const handleStateChange = (event) => {
    setCustomerToAdd({
      ...customerToAdd,
      state: event.target.value,
    });
  };

  const handlePostChange = (event) => {
    setCustomerToAdd({
      ...customerToAdd,
      post: event.target.value,
    });
  };

  const handleCountryChange = (event) => {
    setCustomerToAdd({
      ...customerToAdd,
      country: event.target.value,
    });
  };
  const addCustomer = () => {
    dispatch({ type: 'CUSTOMER_TO_ADD', payload: customerToAdd });
    let customerInfo = customerToAdd;
    console.log(customerInfo);
  };

  return (
    <div>
      <center>
        <h1>Customer Contact Information</h1>
      </center>
      <div className="form">
        <form>
          <label>Name:</label>
          <input onChange={handleNameChange} placeholder="Name" id="name" />
          <br />
          <label>Phone Number:</label>
          <input
            onChange={handlePhoneChange}
            placeholder="(000)000-0000"
            id="phone"
          />
          <br />
          <label>Street:</label>
          <input
            onChange={handleStreetChange}
            placeholder="Street address"
            id="street"
          />
          <br />
          <label>City:</label>
          <input onChange={handleCityChange} placeholder="City" id="city" />
          <br />
          <label>State:</label>
          <input
            onChange={handleStateChange}
            placeholder="State_Code"
            id="state"
          />
          <br />
          <label>Post_Code:</label>
          <input
            onChange={handlePostChange}
            placeholder="Post_code"
            id="post"
          />
          <br />
          <label>Country_code:</label>
          <input
            onChange={handleCountryChange}
            placeholder="Country_Code"
            id="country"
          />
          <br />
          <center>
            <button onClick={addCustomer} id="submitBtn" className="btn">
              Add shipping details
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default CustomerInfo;
