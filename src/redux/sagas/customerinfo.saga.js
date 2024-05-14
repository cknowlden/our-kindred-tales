import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* customerInfo(action) {
  console.log(action.payload);
  try {
    yield axios.put(`/api/overview/customer`, action.payload);
  } catch (error) {
    console.log('Project could not be updated', error);
  }
}

function* customerInfoSaga() {
  yield takeLatest('CUSTOMER_TO_ADD', customerInfo);
}

export default customerInfoSaga;
