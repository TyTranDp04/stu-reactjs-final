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
    console.log("response: ", response);
    yield put(loginGoogleActionSuccess(response));
  } catch (e) {
    console.log("error: ", e);
    yield put(loginGoogleActionFailed(e.response));
  }
}

// function* getUser(action) {
//   try {
//     console.log('action: ', action.payload);
//     const response = yield AuthAPI.getUser(action.payload);
//     console.log('response: ', response);
//     yield put(getUserActionSuccess(response.data.data));
//   } catch (e) {
//     console.log('error: ', e);
//     yield put(getUserActionFailed(e.response.data.message));
//   }
// }
function* changePassword(action) {
  try {
    yield changePasswordAPI.updateChangePassword(action.payload.id, {
      Password: action.payload.Password,
    });
    yield put(changePasswordActionSuccess(action.payload))
  } catch (error) {
    yield put(changePasswordActionFailed(action))
  }
  
  // if(response.status !== 200){
  //   return;
  // }
  // yield put(changePasswordAction(action.payload.Password));
}

export function* userSaga() {
  yield takeEvery(loginAction, login);
  yield takeEvery(loginGoogleAction, loginGoogle);
  yield takeEvery(changePasswordAction, changePassword);
  // yield takeEvery(getUserAction, getUser);
}
