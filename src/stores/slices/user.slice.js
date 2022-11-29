// const USER_INFO_KEY = 'USER_INFO';
// const userInfoFromStorage = localStorage.getItem(USER_INFO_KEY) ? JSON.parse(localStorage.getItem(USER_INFO_KEY)) : null;
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfoState: {
    data: null,
    loading: false,
    error: null,
  },
}
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginAction(state, action) {
      // localStorage.removeItem(USER_INFO_KEY)
      state.userInfoState = {
        ...state.userInfoState,
        loading: true,
      }
    },
    loginActionSuccess(state, action) {
      // const user = action.payload;
      // localStorage.setItem(USER_INFO_KEY, JSON.stringify(token));
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        // token: token,
        data: action.payload,
      }
    },
    loginActionFailed(state, action) {
      // localStorage.removeItem(USER_INFO_KEY)
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        error: toast.error(action.payload),
      }
    },
    logoutAction(state, action) {
      console.log('logout');
      // localStorage.removeItem(USER_INFO_KEY);
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        data: null,
        // token: null,
      }
    }
  },
})
export const {
  loginAction, loginActionSuccess, loginActionFailed,
  logoutAction,
} = userSlice.actions
export const userReducer = userSlice.reducer