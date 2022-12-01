import { delay, put, takeEvery } from "redux-saga/effects";
import { changePasswordAPI } from "../../api/changePassword.api.js";
import {
  updatechangePasswordAction,
  updatechangePasswordSuccess,
  updatechangePasswordFailed,
} from "../slices/changePassword.slice.js";

function* updateChangePassword(action) {
  try {
    const response = yield changePasswordAPI.updateChangePassword(
      action.payload.id,
      action.payload.data
    );
    // Put 1 action đã được định nghĩa ở slice
    yield put(updatechangePasswordSuccess(response.data));
  } catch (e) {
    // Put 1 action đã được định nghĩa ở slice
    // console.log("error:", e);
    yield put(updatechangePasswordFailed(e.response.data));
  }
}

export function* dpAlumniSaga() {
  yield takeEvery(updateDpAlumniAction, updateDpAlumni);
}
