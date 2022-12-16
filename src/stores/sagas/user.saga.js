import { put, takeEvery } from "redux-saga/effects";
import { AuthAPI } from "../../api";
import { loginAction, loginActionFailed, loginActionSuccess } from "../slices/user.slice";

function* login(action) {
  try {
    const loginPayload = action.payload;
    const response = yield AuthAPI.login({
      Gmail: loginPayload.Gmail,
      Password: loginPayload.Password,
    });
    yield put(loginActionSuccess(response.data.data));
  } catch (e) {
    yield put(loginActionFailed(e.response.data.message));
  }
}

export function* userSaga() {
  yield takeEvery(loginAction, login);
}