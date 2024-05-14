import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteProject(action) {
  try {
    const targetId = action.payload.targetId;
    console.log('Target ID for deletion:', targetId);

    const url = `/api/overview/${targetId}`;
    console.log('Delete request URL:', url);

    yield axios.delete(url);
    yield put({ type: 'DELETE_PROJECT_SUCCESS', payload: action.payload });


    yield put({ type: 'SET_DELETE_PROJECT', payload: targetId });
    yield put({ type: 'FETCH_PROJECTS' });
  } catch (error) {
    console.log('Project could not be deleted', error);
    yield put({ type: 'DELETE_PROJECT_FAILURE', payload: error });
  }
}

function* deleteSaga() {
  yield takeLatest('DELETE_PROJECT', deleteProject);
}

export default deleteSaga;

