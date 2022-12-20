import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  exportExcelState: {
    data: null,
    loading: false,
    error: null,
  },
}
const exportExcelSlice = createSlice({
  name: 'exportExcel',
  initialState,
  reducers: {
    exportExcelAction(state, action) {
      state.exportExcelState = {
        ...state.exportExcelState,
        loading: true,
      }
    },
    exportExcelActionSuccess(state, action) {
      const data = action.payload;
      state.exportExcelState = {
        ...state.exportExcelState,
        loading: false,
        data,
      }
    },
    exportExcelActionFailed(state, action) {
      state.exportExcelState = {
        ...state.exportExcelState,
        loading: false,
      }
    },

  },
})
export const {
  exportExcelAction, exportExcelActionSuccess, exportExcelActionFailed,
} = exportExcelSlice.actions
export const exportExcelReducer = exportExcelSlice.reducer