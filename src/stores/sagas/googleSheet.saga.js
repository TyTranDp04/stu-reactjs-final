import { put, takeEvery } from "redux-saga/effects";
import { GoogleSheetAPI } from "../../api";
import { updateGoogleSheetAction, updateGoogleSheetActionFailed, updateGoogleSheetActionSuccess } from "../slices/googleSheet.slice";

function* updateGoogleSheet(action) {
  try {
    const dataPayload = action.payload;
    yield GoogleSheetAPI.updateRows(dataPayload.DayOffFrom, dataPayload.DayOffTo);
    yield put(updateGoogleSheetActionSuccess());
  } catch (e) {
    yield put(updateGoogleSheetActionFailed(e));
  }
}

export function* googleSheetSaga() {
  yield takeEvery(updateGoogleSheetAction, updateGoogleSheet);
}