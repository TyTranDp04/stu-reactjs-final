import { delay, put, takeEvery } from "redux-saga/effects";
import { DpManagementAPI } from "../../api/Management.api.js";
import { addDpManagementAction, addDpManagementFailed, addDpManagementSuccess, deleteDpManagementAction, deleteDpManagementFailed, deleteDpManagementSuccess, getListDpManagementAction, getListDpManagementSuccess, searchDpManagementAction, searchDpManagementSuccess, updateDpManagementAction, updateDpManagementFailed, updateDpManagementSuccess } from "../slices/ManagementUser.slice.js";

function* getListDpManagementData(action) {
  try {
    yield delay(200);
    const response = yield DpManagementAPI.getListDpManagementData(action.payload);
    const dpManagementData = response.data;
    // Put 1 action đã được định nghĩa ở slice
    yield put(
      getListDpManagementSuccess(dpManagementData)
    );
  } catch (e) {

  }
}
function* searchDpManagementData(action) {
  try {
    yield delay(200);
    const response = yield DpManagementAPI.searchDpManagementData(action.payload);
    const dpManagementData = response.data;
    // Put 1 action đã được định nghĩa ở slice
    console.log('response: ', dpManagementData);
    yield put(
      searchDpManagementSuccess(dpManagementData)
    );
  } catch (e) {

  }
}
function* addDpManagement(action) {
  try {
    const response = yield DpManagementAPI.addDpManagementData(action.payload);
    // Put 1 action đã được định nghĩa ở slice
    yield put(addDpManagementSuccess(response.data));
  } catch (e) {
    // Put 1 action đã được định nghĩa ở slice
    console.log("e:", e);
    yield put(addDpManagementFailed(e.response.data));
  }
}

function* deleteDpMagement(action) {
  try {
    const response = yield DpManagementAPI.deleteDpManagementData(action.payload);
    // Put 1 action đã được định nghĩa ở slice
    yield put(
      deleteDpManagementSuccess(response.data)
    );
  } catch (e) {
    // Put 1 action đã được định nghĩa ở slice
    yield put(deleteDpManagementFailed(e.response.data));
  }
}

function* updateDpManagement(action) {
  try {
    const response = yield DpManagementAPI.editDpManagementData(action.payload.id, action.payload.data);
    // Put 1 action đã được định nghĩa ở slice
    yield put(
      updateDpManagementSuccess(response.data)
    );
  } catch (e) {
    // Put 1 action đã được định nghĩa ở slice
    // console.log("error:", e);
    yield put(updateDpManagementFailed(e.response.data));
  }
}

export function* dpManagementSaga() {
  yield takeEvery(addDpManagementAction, addDpManagement);
  yield takeEvery(getListDpManagementAction, getListDpManagementData);
  yield takeEvery(deleteDpManagementAction, deleteDpMagement);
  yield takeEvery(updateDpManagementAction, updateDpManagement);
  yield takeEvery(searchDpManagementAction, searchDpManagementData);
}