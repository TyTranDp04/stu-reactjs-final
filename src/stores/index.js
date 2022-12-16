// Lưu tất cả những global state (redux, ...)import { configureStore } from "@reduxjs/toolkit";

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { mySaga } from "./sagas";
import { DpManagementReducer } from "./slices/ManagementUser.slice.js";
import { changePasswordReducer } from "./slices/changePassword.slice";
import { userReducer } from "./slices/user.slice";
import { googleSheetReducer } from "./slices/googleSheet.slice";
import { exportExcelReducer } from "./slices/dayoffHistory.slice";
import { roleIdReducer } from "./slices/roleId.slice";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const rootReducer = {
  users: userReducer,
  dpManagement: DpManagementReducer,
  changePassword: changePasswordReducer,
  googleSheet: googleSheetReducer,
  exportExcel: exportExcelReducer,
  roleId: roleIdReducer,
};

export const appStore = configureStore({
  reducer: rootReducer,
  // Value nhận vào là list các middleware
  // getDefaultMiddleware để ta trả về các middleware sẵn có trong redux
  // và nối với middleware vừa tạo là saga-middleware
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    ...middleware,
  ],
});

sagaMiddleware.run(mySaga);
