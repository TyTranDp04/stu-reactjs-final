import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  dpManagementState: {
    data: [],
    loading: false,
    error: null,
  },
};

export const dpManagementSlice = createSlice({
  name: 'dpManagement',
  initialState,
  reducers: {
    getListDpManagementAction: (state, action) => {
      state.dpManagementState = {
        ...state.dpManagementState,
        loading: true,
      };
    },
    getListDpManagementSuccess: (state, action) => {
      const data = action.payload;
      state.dpManagementState = {
        ...state.dpManagementState,
        data,
        loading: false,
      };
    },
    getListDpManagementFailed: (state, action) => {

    },

    searchDpManagementAction: (state, action) => {
      state.dpManagementState = {
        ...state.dpManagementState,
        loading: true,
      };
    },
    searchDpManagementSuccess: (state, action) => {
      const data = action.payload;
      state.dpManagementState = {
        ...state.dpManagementState,
        data,
        loading: false,
      };
    },
    searchDpManagementFailed: (state, action) => {

    },
    addDpManagementAction: (state, action) => {
      state.dpManagementState = {
        ...state.dpManagementState,
        data: action.payload,
        loading: true,
      };
    },
    addDpManagementSuccess: (state, action) => {
      toast.success("Add to DpConcerns successfully");
      state.dpManagementState = {
        ...state.dpManagementState,
        data: action.payload,
        loading: false,
      };
    },
    addDpManagementFailed: (state, action) => {

    },

    updateDpManagementAction: (state, action) => {

    },
    updateDpManagementSuccess: (state, action) => {
      toast.success("Add to DpConcerns successfully");
    },
    updateDpManagementFailed: (state, action) => {

    },

    deleteDpManagementAction: (state, action) => {

    },
    deleteDpManagementSuccess: (state, action) => {

    },
    deleteDpManagementFailed: (state, action) => {

    },

  },
})

// Action creators are generated for each case reducer function
export const { addDpManagementAction,
  addDpManagementSuccess,
  addDpManagementFailed,
  getListDpManagementAction,
  getListDpManagementSuccess,
  getListDpManagementFailed,
  deleteDpManagementAction,
  deleteDpManagementSuccess,
  deleteDpManagementFailed,
  updateDpManagementAction,
  updateDpManagementSuccess,
  updateDpManagementFailed,
  searchDpManagementAction,
  searchDpManagementSuccess,
  searchDpManagementFailed
} = dpManagementSlice.actions;

export const DpManagementReducer = dpManagementSlice.reducer;