/// <reference types="vite/client" />
// DON'T FORGET TO REPLACE SANDBOX URL WITH REAL LULU FOR CLIENT
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
const luluKey = import.meta.env.VITE_LULU_KEY;

// worker Saga: will be fired on "ORDER" actions
function* submitOrder(action) {
  const url = "https://api.sandbox.lulu.com";
  const grantData = "grant_type=client_credentials";

  try {
    let accessToken = "";
    // Retrieve security token
    yield axios
      .post(
        `${url}/auth/realms/glasstree/protocol/openid-connect/token`,
        grantData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: luluKey,
          },
        }
      )
      .then((response) => {
        accessToken = response.data.access_token;
        console.log("Response:", accessToken);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // Send order to lulu
    const data = {
      //required
      contact_email: "test@test.com",
      external_id: "demo-time",
      //required
      line_items: [
        {
          external_id: "item-reference-1",
          printable_normalization: {
            cover: {
              source_url:
                "https://www.dropbox.com/s/7bv6mg2tj0h3l0r/lulu_trade_perfect_template.pdf?dl=1&raw=1",
            },
            interior: {
              source_url:
                "https://www.dropbox.com/s/r20orb8umqjzav9/lulu_trade_interior_template-32.pdf?dl=1&raw=1",
            },
            pod_package_id: "0600X0900BWSTDPB060UW444MXX",
          },
          quantity: 1,
          title: "My Book",
        },
      ],
      production_delay: 120,
      //required
      shipping_address: {
        city: "Lübeck",
        country_code: "GB",
        name: "Hans Dampf",
        phone_number: "844-212-0689",
        postcode: "PO1 3AX",
        state_code: "",
        street1: "Holstenstr. 48",
      },
      //required
      shipping_level: "MAIL",
    };
    yield;
    axios
      .post(`${url}/print-jobs/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.log("Error with order submit:", error);
    yield put({ type: "ORDER_FAILED" });
  }
}

function* orderSaga() {
  yield takeLatest("SUBMIT_ORDER", submitOrder);
}

export default orderSaga;
