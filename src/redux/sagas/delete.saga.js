import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* deleteProject(action) {
  try {
    const deleteResponse = yield axios.delete(
      `/api/details/${action.payload.id}`
    );
    yield put({ type: 'SET_DELETE_PROJECT', payload: deleteResponse.data });
  } catch (error) {
    console.log('Project could not be deleted', error);
  }
}
function* deleteSaga() {
  yield takeEvery('DELETE_PROJECT', deleteProject);
}

export default deleteSaga;
