import { API, URL_API } from "./const.api";


export const GoogleSheetAPI = {
  export: (from, to) => API.get(`${URL_API}/export?DayOffFrom=${from}&DayOffTo=${to}`),
  updateRows: (from, to, id) => API.post(`${URL_API}/update-rows?DayOffFrom=${from}&DayOffTo=${to}&idGoogleSheets=${id}`),
}