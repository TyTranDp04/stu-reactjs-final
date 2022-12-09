import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { USER_INFO_KEY } from "../../constants";

const userInfoFromStorage = localStorage.getItem(USER_INFO_KEY)
  ? JSON.parse(localStorage.getItem(USER_INFO_KEY))
  : null;

const initialState = {
  userInfoState: {
    data: userInfoFromStorage,
    loading: false,
    error: null,
  },
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginAction(state, action) {
      localStorage.removeItem(USER_INFO_KEY);
      state.userInfoState = {
        ...state.userInfoState,
        loading: true,
      };
    },
    loginActionSuccess(state, action) {
      const data = action.payload;
      // const decodedToken = decodeJwt(data.accessToken);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(data));
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        // token: token,
        data,
      };
    },
    loginActionFailed(state, action) {
      localStorage.removeItem(USER_INFO_KEY);
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        error: toast.error(action.payload),
      };
    },

    loginGoogleAction(state, action) {
      // localStorage.removeItem(USER_INFO_KEY)
      state.userInfoState = {
        ...state.userInfoState,
        loading: true,
      };
    },
    loginGoogleActionSuccess(state, action) {
      // const data = action.payload;
      // const decodedToken = decodeJwt(data.accessToken);
      // localStorage.setItem(USER_INFO_KEY, JSON.stringify(data));
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        // token: token,
        // data,
      };
    },
    loginGoogleActionFailed(state, action) {
      // localStorage.removeItem(USER_INFO_KEY)
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        // error: toast.error(action.payload),
      };
    },

    logoutAction(state, action) {
      console.log("logout");
      localStorage.removeItem(USER_INFO_KEY);
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        data: null,
        // token: null,
      };
    },

    refreshData() {
      console.log("state");
      // const decodedToken = decodeJwt(data.accessToken);
      // state.userInfoState = {
      //   state,
      //   loading: false,
      //   // token: token,
      // }
    },
    getUserAction(state, action) {
      localStorage.removeItem(USER_INFO_KEY);
      state.userInfoState = {
        ...state.userInfoState,
        loading: true,
      };
    },
    getUserActionSuccess(state, action) {
      const data = action.payload;
      console.log('slice: ', data);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(data));
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        data,
      };
    },
    getUserActionFailed(state, action) {
      localStorage.removeItem(USER_INFO_KEY);
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        error: toast.error(action.payload),
      };
    },
  },
});
export const {
  loginAction,
  loginActionSuccess,
  loginActionFailed,
  loginGoogleAction,
  loginGoogleActionSuccess,
  loginGoogleActionFailed,
  logoutAction,
  refreshData,
  getUserAction,
  getUserActionSuccess,
  getUserActionFailed,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
