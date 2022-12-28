import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roleIdState: {
    data: null,
    loading: false,
    error: null,
  },
};

export const roleIdSlice = createSlice({
  name: 'roleId',
  initialState,
  reducers: {
    getListRoleIdAction: (state, action) => {
      state.roleIdState = {
        ...state.roleIdState,
        loading: true,
      };
    },
    getListRoleIdSuccess: (state, action) => {
      const data = action.payload;
      state.roleIdState = {
        ...state.roleIdState,
        data,
        loading: false,
      };
    },
    getListRoleIdFailed: (state, action) => {

    },
  },
})

// Action creators are generated for each case reducer function
export const {
  getListRoleIdAction,
  getListRoleIdSuccess,
  getListRoleIdFailed,
} = roleIdSlice.actions;

export const roleIdReducer = roleIdSlice.reducer;