import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function CustomerInfo() {
  const dispatch = useDispatch();
  let [customerToAdd, setCustomerToAdd] = useState({
    name: "",
    phone: 0,
    street:"",
    city: "",
    state: "",
    post: 0,
    country: "",
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
    dispatch({ type: "CUSTOMER_TO_ADD", payload: customerToAdd });
    console.log(customerToAdd);
  };

return (
    <div>
      <h1>Shipping Information</h1>
      <form>
        <label>Name:</label>
        <input
          onChange={handleNameChange}
          placeholder="Name"
          id="name"
        />
        <label>Phone Number:</label>
        <input 
        onChange={handlePhoneChange}
        placeholder="(000)000-0000"
        id="phone"
        />
        <label>Street:</label>
        <input
        onChange={handleStreetChange}
        placeholder="Street address"
        id="street"
        />
        <label>City:</label>
        <input 
        onChange={handleCityChange}
        placeholder="City"
        id="city"
        />
        <label>State:</label>
        <input 
        onChange={handleStateChange}
        placeholder="State_Code"
        id="state"
        />
        <label>Post_Code:</label>
        <input 
        onChange={handlePostChange}
        placeholder="Post_code"
        id="post"
        />
        <label>Country_code:</label>
        <input 
        onChange={handleCountryChange}
        placeholder="Country_Code"
        id="country"
        />
        <button
        onClick={addCustomer}
        id="submitBtn"
        >
            Add shipping details</button>
      </form>
    </div>
  );
}

export default CustomerInfo;