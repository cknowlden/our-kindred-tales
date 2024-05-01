// DON'T FORGET TO REPLACE SANDBOX URL WITH REAL LULU FOR CLIENT
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
// worker Saga: will be fired on "ORDER" actions
function* fetchOrders(action) {
  const url = "https://api.sandbox.lulu.com";
  const grantData = "grant_type=client_credentials";
  
  try {
    let accessToken = '';
    // Retrieve security token
    yield axios
      .post(
        `${url}/auth/realms/glasstree/protocol/openid-connect/token`,
        grantData, {headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization': "Basic MjlmYTQzNDYtNTBiMC00NDRlLTgwNjUtYmNhOGMyOGMwMTMxOmRhOFB3NzBseVdJT2ZlUVg3TVpwMlVMNkw3cUNaOTlN",
        }}
        
      )
      .then((response) => {
        accessToken = response.data.access_token;
        console.log("Response:", accessToken);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // Retrieve List of jobs
    yield 
    axios.get(`${url}/print-jobs/`, {headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }})
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
  } catch (error) {
    console.log("Error with order submit:", error);
    yield put({ type: "ORDER_FAILED" });
  }
}

function* jobsSaga() {
  yield takeLatest("FETCH_ORDERS", fetchOrders);
}

export default jobsSaga;