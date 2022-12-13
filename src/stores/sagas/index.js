import { all, fork } from 'redux-saga/effects';
import { userSaga } from './user.saga';


export function* mySaga() {
  console.log('saga run');
  yield all([
    fork(userSaga),
  ]);
}