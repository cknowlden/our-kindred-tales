import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// this saga will fetch all the map locations

function* fetchNewPDF() {
  try {
    const locationResponse = yield axios.get('/api/initialpdf');
    yield put({
      type: 'SET_NEWPDF',
      payload: locationResponse.data,
    });
  } catch (error) {
    console.log('NEWPDF fetching doesnt work', error);
  }
}

function* newPDFSaga() {
  yield takeLatest('FETCH_NEWPDF', fetchNewPDF);
}

export default newPDFSaga;
