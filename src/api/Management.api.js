import { API, URL_API } from "./const.api.js";

export const DpManagementAPI = {
  getListDpManagementData: () => {
    return API.get(`${URL_API}/user`);
  },
  searchDpManagementData: (textSearch) => {
    const queryParam = `${textSearch}`;
    return API.get(`${URL_API}/user/${queryParam}`);
  },
  deleteDpManagementData: (id) => {
    return API.delete(`${URL_API}/user`, id);
  },

  addDpManagementData: (data) => {
    return API.post(`${URL_API}/user`, data);
  },

  editDpManagementData: (id, data) => {
    return API.patch(`${URL_API}/user`, id, data);
  },
}