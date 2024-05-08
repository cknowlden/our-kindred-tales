import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteProject(action) {
  console.log(action.payload);
  try {
    yield axios.delete(`/api/overview/${action.payload.targetId}`);

    yield put({ type: 'FETCH_PROJECTS', payload: action.payload.data });
  } catch (error) {
    console.log('Project could not be deleted', error);
  }
}
function* deleteSaga() {
  yield takeLatest('DELETE_PROJECT', deleteProject);
}

export default deleteSaga;
