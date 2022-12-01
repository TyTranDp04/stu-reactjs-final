import { put, takeEvery } from "redux-saga/effects";
import { AuthAPI } from "../../api";
import { loginAction, loginActionFailed, loginActionSuccess, loginGoogleAction, loginGoogleActionFailed, loginGoogleActionSuccess } from "../slices/user.slice";

function* login(action) {
  try {
    const loginPayload = action.payload;
    const response = yield AuthAPI.login({
      Gmail: loginPayload.Gmail,
      Password: loginPayload.Password,
    });
    document.cookie = `accesToken=${response.data.data.accessToken}`
    // console.log('response: ', response.data.data);
    yield put(loginActionSuccess(response.data.data));
  } catch (e) {
    yield put(loginActionFailed(e.response.data.message));
  }
}

function* loginGoogle(action) {
  try {
    // const loginPayload = action.payload;
    const response = yield AuthAPI.loginGoogle();
    // document.cookie = `accesToken=${response.data.data.accessToken}`
    console.log('response: ', response);
    yield put(loginGoogleActionSuccess(response));
  } catch (e) {
    console.log('error: ', e);
    yield put(loginGoogleActionFailed(e.response));
  }
}

export function* userSaga() {
  yield takeEvery(loginAction, login);
  yield takeEvery(loginGoogleAction, loginGoogle);
}