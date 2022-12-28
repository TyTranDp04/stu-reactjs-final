import { delay, put, takeEvery } from "redux-saga/effects";
import { exportExcelAction, exportExcelActionFailed, exportExcelActionSuccess } from "../slices/dayoffHistory.slice";
import { GoogleSheetAPI } from "../../api";

function* exportExcel(action) {
  try {
    yield delay(500);
    const dataPayload = action.payload;
    const response = yield GoogleSheetAPI.export(dataPayload.dayOffFrom, dataPayload.dayOffTo);
    const data = response.data;
    yield put(exportExcelActionSuccess(data));
  } catch (e) {
    yield put(exportExcelActionFailed(e.response.data));
  }
};

export function* exportExcelSaga() {
  yield takeEvery(exportExcelAction, exportExcel);
}