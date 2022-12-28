import { delay, put, takeEvery } from "redux-saga/effects";
import { RoleIdAPI } from "../../api";
import { getListRoleIdAction, getListRoleIdFailed, getListRoleIdSuccess } from "../slices/roleId.slice";

function* getListRoleId(action) {
  try {
    yield delay(200);
    const response = yield RoleIdAPI.get(action.payload);
    const roleIdData = response.data;
    // Put 1 action đã được định nghĩa ở slice
    yield put(
      getListRoleIdSuccess(roleIdData)
    );
  } catch (e) {
    getListRoleIdFailed(e.response.data)
  }
}

export function* roleIdSaga() {
  yield takeEvery(getListRoleIdAction, getListRoleId);
}