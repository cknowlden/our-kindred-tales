import React from "react";

function LuluSubmit() {
    const Order = {
        //required will have a manual entry for email
        contact_email: "support@ourkindredtales.com",
        external_id: "KindredTales",
        //required
        line_items: [
          {
            external_id: "item-reference-1",
            printable_normalization: {
              cover: {
                source_url:
                  "",
              },
              interior: {
                source_url:
                  "",
              },
              pod_package_id: "0600X0900FCSTDCW080CW444MXX",
            },
            quantity: 1,
            title: "",
          },
        ],
        //required will have a manual entry
        shipping_address: {
          city: "",
          country_code: "",
          name: "",
          phone_number: "",
          postcode: "",
          state_code: "",
          street1: "",
        },
        //required, will have a manual entry
        shipping_level: "",
      };

  const handleAddCover = (event) => {
    setOrder({
      ...orderToAdd,
      country: event.target.value,
    });
  };

  const handleAddContent = (event) => {
    setOrder({
      ...orderToAdd,
      country: event.target.value,
    });
  };

  const handleShippingLevel = (event) => {
    setOrder({
      ...orderToAdd,
      country: event.target.value,
    });
  };
  return (
    <div>
        <h3>Customer Info</h3>

      <label>Cover URL:</label>
      <input onChange={handleAddCover} placeholder="Cover URL" id="cover" />
      <br />
      <label>Content URL:</label>
      <input onChange={handleAddContent} placeholder="Content" id="Content" />
      <br />
      <label>Shipping Level</label>
      <input onchange={handleShippingLevel} placeholder="Shipping Level" id="shipping"/>
      <br />
      <button onClick={() => dispatch({ type: "SUBMIT_ORDER" })}>Submit</button>
    </div>
  );
}

export default LuluSubmit;
