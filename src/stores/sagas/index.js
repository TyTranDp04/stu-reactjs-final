import { all, fork } from 'redux-saga/effects';
import { changePasswordSaga } from './changePassword.saga';
import { userSaga } from './user.saga';


export function* mySaga() {
  console.log('saga run');
  yield all([
    fork(userSaga),
    fork(changePasswordSaga),
  ]);
}