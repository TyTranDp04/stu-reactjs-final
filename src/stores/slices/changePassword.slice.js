import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  changePasswordState: {
    data: [],
    loading: false,
    error: null,
  },
};

export const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {   
    updatechangePasswordAction: (state, action) => {

    },
    updatechangePasswordSuccess: (state, action) => {
      toast.success("Add to DpAlumni successfully");
    },
    updatechangePasswordFailed: (state, action) => {

    },
},})

// Action creators are generated for each case reducer function
export const { 
  updatechangePasswordAction,
  updatechangePasswordSuccess,
  updatechangePasswordFailed,
} = changePasswordSlice.actions;

export const changePasswordReducer = changePasswordSlice.reducer;