import { put, takeEvery } from "redux-saga/effects";
import { AuthAPI } from "../../api";
import { loginAction, loginActionFailed, loginActionSuccess } from "../slices/user.slice";

function* login(action) {
  try {
    const loginPayload = action.payload;
    const response = yield AuthAPI.login({
      username: loginPayload.username,
      password: loginPayload.password,
    });
    document.cookie = `accesToken=${response.data.data.accessToken}`

    yield put(loginActionSuccess(response.data));
  } catch (e) {
    console.log("token",e);
    yield put(loginActionFailed(e.response.statusText));
  }
}
export function* userSaga() {
  yield takeEvery(loginAction, login);
}