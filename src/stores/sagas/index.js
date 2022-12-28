import { all, fork } from 'redux-saga/effects';
import { dpManagementSaga } from './Management.saga';
import { userSaga } from './user.saga';
import { googleSheetSaga } from './googleSheet.saga';
import { exportExcelSaga } from './dayoffHistory.saga';
import { roleIdSaga } from './roleId.saga';


export function* mySaga() {
  console.log('saga run');
  yield all([
    fork(userSaga),
    fork(dpManagementSaga),
    fork(googleSheetSaga),
    fork(exportExcelSaga),
    fork(roleIdSaga),
  ]);
}