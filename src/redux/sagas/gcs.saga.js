import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchGCSDetails(action) {
  try {
    const GCSResponse = yield axios.get('/api/gcs');
    yield put({ type: 'SET_GOOGLE_CLOUD', payload: GCSResponse.data });
  } catch (error) {
    console.log('Google cloud get request', error);
  }
}

function* googleCloudSaga() {
  yield takeEvery('FETCH_GCS', fetchGCSDetails);
}

export default googleCloudSaga;
