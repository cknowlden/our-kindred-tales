import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* submitOrder(action) {
  try {
    // Retrieve security token

    // Send order to lulu

    // Retrieve order accepted status
  } catch (error) {
    console.log('Error with order submit:', error);
    yield put({ type: 'ORDER_FAILED' });
  }
}

function* orderSaga() {
  yield takeLatest('REGISTER', submitOrder);
}

export default orderSaga;
