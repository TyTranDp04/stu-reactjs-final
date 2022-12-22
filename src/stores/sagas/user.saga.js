import { put, takeEvery } from "redux-saga/effects";
import { AuthAPI } from "../../api";
import { changePasswordAPI } from "../../api/changePassword.api.js";
import {
  changePasswordAction,
  changePasswordActionFailed,
  changePasswordActionSuccess,
  loginAction,
  loginActionFailed,
  loginActionSuccess
} from "../slices/user.slice";

function* login(action) {
  try {
    const loginPayload = action.payload;
    const response = yield AuthAPI.login({
      Gmail: loginPayload.Gmail,
      Password: loginPayload.Password,
    });
    yield put(loginActionSuccess(response.data.data.user));
  } catch (e) {
    yield put(loginActionFailed(e.response.data.message));
  }
}

function* changePassword(action) {
  try {
    yield changePasswordAPI.updateChangePassword(action.payload.id, {
      Password: action.payload.Password,
    });
    yield put(changePasswordActionSuccess(action.payload));
  } catch (error) {
    yield put(changePasswordActionFailed(action));
  }
}

export function* userSaga() {
  yield takeEvery(loginAction, login);
  yield takeEvery(changePasswordAction, changePassword);
}
