import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
// worker Saga: will be fired on "ORDER" actions
function* submitOrder(action) {
  try {
    // Retrieve security token
    const url = 'https://api.sandbox.lulu.com/auth/realms/glasstree/protocol/openid-connect/token';
    const data = 'grant_type=client_credentials';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic MjlmYTQzNDYtNTBiMC00NDRlLTgwNjUtYmNhOGMyOGMwMTMxOmRhOFB3NzBseVdJT2ZlUVg3TVpwMlVMNkw3cUNaOTlN'
    };
    axios.post(url, data, { headers })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
    // Send order to lulu
    
    
    // Retrieve order accepted status
  } catch (error) {
    console.log('Error with order submit:', error);
    yield put({ type: 'ORDER_FAILED' });
  }
}

function* orderSaga() {
  yield takeLatest('SUBMIT_ORDER', submitOrder);
}

export default orderSaga;
