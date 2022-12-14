import { put, takeEvery } from "redux-saga/effects";
import { AuthAPI } from "../../api";
import { changePasswordAPI } from "../../api/changePassword.api.js";
import {
  loginAction,
  loginActionFailed,
  loginActionSuccess,
  loginGoogleAction,
  loginGoogleActionFailed,
  loginGoogleActionSuccess,
  changePasswordAction,
  changePasswordActionSuccess,
  changePasswordActionFailed,
} from "../slices/user.slice";

function* login(action) {
  try {
    const loginPayload = action.payload;
    const response = yield AuthAPI.login({
      Gmail: loginPayload.Gmail,
      Password: loginPayload.Password,
    });
    document.cookie = `accesToken=${response.data.data.accessToken}`;
    yield put(loginActionSuccess(response.data.data));
  } catch (e) {
    yield put(loginActionFailed(e.response.data.message));
  }
}

function* loginGoogle(action) {
  try {
    const response = yield AuthAPI.loginGoogle();
    console.log("response: ", response);
    yield put(loginGoogleActionSuccess(response));
  } catch (e) {
    console.log("error: ", e);
    yield put(loginGoogleActionFailed(e.response));
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
  yield takeEvery(loginGoogleAction, loginGoogle);
  yield takeEvery(changePasswordAction, changePassword);
}
