import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* initialpdf(action) {
  console.log(action.payload);
  try {
    yield axios.put('/api/overview/firstpass', action.payload);
  } catch (error) {
    console.log('Project could not be updated', error);
  }
}

function* initialpdfSaga() {
  yield takeLatest('CHANGE_INITIAL_STATUS', initialpdf);
}

export default initialpdfSaga;
