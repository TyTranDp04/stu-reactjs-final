import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  googleSheetState: {
    data: null,
    loading: false,
    error: null,
  },
}
const googleSheetSlice = createSlice({
  name: 'googleSheet',
  initialState,
  reducers: {
    exportExcelAction(state, action) {
      state.googleSheetState = {
        ...state.googleSheetState,
        loading: true,
      }
    },
    exportExcelActionSuccess(state, action) {
      const data = action.payload;
      state.googleSheetState = {
        ...state.googleSheetState,
        loading: false,
        data,
      }
    },
    exportExcelActionFailed(state, action) {
      state.googleSheetState = {
        ...state.googleSheetState,
        loading: false,
      }
    },

    updateGoogleSheetAction(state, action) {
      state.googleSheetState = {
        ...state.googleSheetState,
        loading: true,
      }
    },
    updateGoogleSheetActionSuccess(state, action) {
      state.googleSheetState = {
        ...state.googleSheetState,
        loading: false,
        data: null,
      }
    },
    updateGoogleSheetActionFailed(state, action) {
      const data = action.payload;
      state.googleSheetState = {
        ...state.googleSheetState,
        loading: false,
        data,
      }
    },

  },
})
export const {
  exportExcelAction, exportExcelActionSuccess, exportExcelActionFailed,
  updateGoogleSheetAction, updateGoogleSheetActionSuccess, updateGoogleSheetActionFailed,
} = googleSheetSlice.actions
export const googleSheetReducer = googleSheetSlice.reducer