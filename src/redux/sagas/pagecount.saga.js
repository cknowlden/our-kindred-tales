import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updatePageCount(action) {
  try {
    yield axios.put(`/api/pdfmake`);

    yield put({
      type: 'FETCH_PROJECTS',
      payload: [action.payload.countPage, action.payload.projectName],
    });
  } catch (error) {
    console.log('Danger issues with the changing the page count', error);
  }
}

function* pagecountSaga() {
  yield takeLatest('CHANGE_PAGECOUNT', updatePageCount);
}

export default pagecountSaga;
