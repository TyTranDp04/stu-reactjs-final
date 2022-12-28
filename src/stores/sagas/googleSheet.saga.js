import { put, takeEvery } from "redux-saga/effects";
import { GoogleSheetAPI } from "../../api";
import { updateGoogleSheetAction, updateGoogleSheetActionFailed, updateGoogleSheetActionSuccess } from "../slices/googleSheet.slice";

function* updateGoogleSheet(action) {
  try {
    const dataPayload = action.payload;
    yield GoogleSheetAPI.updateRows(dataPayload.dayOffFrom, dataPayload.dayOffTo, dataPayload.idGooleSheets);
    yield put(updateGoogleSheetActionSuccess());
  } catch (e) {
    yield put(updateGoogleSheetActionFailed(e?.response?.data?.message));
  }
}

export function* googleSheetSaga() {
  yield takeEvery(updateGoogleSheetAction, updateGoogleSheet);
}