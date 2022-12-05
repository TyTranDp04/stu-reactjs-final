import { put, takeEvery } from "redux-saga/effects";
import { changePasswordAPI } from "../../api/changePassword.api.js";
import {
  updatechangePasswordAction, updatechangePasswordFailed, updatechangePasswordSuccess
} from "../slices/changePassword.slice.js";
import 'react-toastify/dist/ReactToastify.css';



function* updateChangePassword(action) {
  console.log('response: ', action.payload);

  try {
    const response = yield changePasswordAPI.updateChangePassword(
      action.payload.id,
      {Password : action.payload.Password}
    );
    console.log("response: ", response);
    
    // Put 1 action đã được định nghĩa ở slice
    yield put(updatechangePasswordSuccess(response.data));
  } catch (e) {
    // Put 1 action đã được định nghĩa ở slice
    // console.log("error:", e);
    yield put(updatechangePasswordFailed(e.response.data));
  }
}

export function* changePasswordSaga() {
  yield takeEvery(updatechangePasswordAction, updateChangePassword);
}
