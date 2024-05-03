import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//worker saga will be fired on "FETCH_PROJECTS" actions
function* fetchProjects() {
  try {
    const projectsResponse = yield axios.get('/api/overview');
    yield put({ type: 'SET_PROJECTS', payload: projectsResponse.data });
  } catch (error) {
    console.log('Projects get request failed', error);
  }
}

function* projectsSaga() {
  yield takeEvery('FETCH_PROJECTS', fetchProjects);
}

export default projectsSaga;
