import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  myProfileState: {
    data: [],
    loading: false,
    error: null,
  },
};

export const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {   
    updatemyProfileAction: (state, action) => {

    },
    updatemyProfileSuccess: (state, action) => {
      toast.success(action.payload.message);
      // console.log(action.payload.message);
    },
    updatemyProfileFailed: (state, action) => {

    },
},})

// Action creators are generated for each case reducer function
export const { 
  updatemyProfileAction,
  updatemyProfileSuccess,
  updatemyProfileFailed,
} = myProfileSlice.actions;

export const myProfileReducer = myProfileSlice.reducer;