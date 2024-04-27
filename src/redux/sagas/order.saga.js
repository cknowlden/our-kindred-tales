// DON'T FORGET TO REPLACE SANDBOX URL WITH REAL LULU FOR CLIENT

import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
// worker Saga: will be fired on "ORDER" actions
function* submitOrder(action) {
  const url = "https://api.sandbox.lulu.com";
  let accessToken = '';
  try {
    // Retrieve security token
    const grantData = "grant_type=client_credentials";
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': "Basic MjlmYTQzNDYtNTBiMC00NDRlLTgwNjUtYmNhOGMyOGMwMTMxOmRhOFB3NzBseVdJT2ZlUVg3TVpwMlVMNkw3cUNaOTlN",
    };
    yield axios
      .post(
        `${url}/auth/realms/glasstree/protocol/openid-connect/token`,
        grantData,
        { headers }
      )
      .then((response) => {
        accessToken = response.data;
        console.log("Response:", accessToken);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // Send order to lulu
    const data = ''
    axios.post(`${url}/print-jobs/`, data , headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
    // Retrieve order accepted status
  } catch (error) {
    console.log("Error with order submit:", error);
    yield put({ type: "ORDER_FAILED" });
  }
}

function* orderSaga() {
  yield takeLatest("SUBMIT_ORDER", submitOrder);
}

export default orderSaga;
