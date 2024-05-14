import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* publishpdf(action) {
  console.log(action.payload);
  try {
    yield axios.put('/api/overview/secondpass', action.payload);
  } catch (error) {
    console.log('Project could not be updated', error);
  }
}

function* publishpdfSaga() {
  yield takeLatest('CHANGE_STATUS_FINISH', publishpdf);
}

export default publishpdfSaga;
