import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "ORDER" actions
function* submitOrder(action) {
  let accessToken = ''
  try {
    // Retrieve security token
    const postData = new URLSearchParams();
    postData.append('grant_type', 'client_credentials');
    
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ZjJjNDdmMTctOWMxZi00ZWZlLWIzYzEtMDI4YTNlZTRjM2M3OjMzOTViZGU4LTBkMjQtNGQ0Ny1hYTRjLWM4NGM3NjI0OGRiYw=='
      }
    };
    
    axios.post('https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token', postData, config)
      .then(response => {
        console.log('Response:', response.data);
        accessToken = response.data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    // Send order to lulu

axios.post('https://api.lulu.com/print-jobs/', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error);
});

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
