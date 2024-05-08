// import axios from 'axios';
// import { put, takeEvery } from 'redux-saga/effects';

// function* fetchProjectDetails(action) {
//   try {
//     const projectDetails = yield axios.get(`/api/overview/${action.payload}`);
//     yield put({ type: 'SET_PROJECT_DETAILS', payload: projectDetails.data });
//   } catch (error) {
//     console.log('project details saga', error);
//   }
// }

// function* detailsSaga() {
//   yield takeEvery('FETCH_PROJECT_DETAILS', fetchProjectDetails);
// }

// export default detailsSaga;
