import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Worker saga will be fired on "FETCH_PROJECTS" actions
function* fetchProjects() {
  try {
    // Fetch data from GCS
    const gcsResponse = yield axios.get('/api/overview/files/JSON');
    const gcsProjects = gcsResponse.data.projects;

    // Post data to local database
    yield axios.post('/api/overview/projects', { projects: gcsProjects });

    // Fetch updated projects from local database
    const dbResponse = yield axios.get('/api/overview');
    const dbProjects = dbResponse.data;

    // Combine GCS and local database projects
    const mergedProjects = [...dbProjects];

    // Dispatch action to update Redux store with merged projects
    yield put({ type: 'SET_PROJECTS', payload: mergedProjects });
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}

function* projectsSaga() {
  yield takeLatest('FETCH_PROJECTS', fetchProjects);
}

export default projectsSaga;
