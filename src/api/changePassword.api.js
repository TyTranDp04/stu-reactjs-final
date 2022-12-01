import { API, URL_API } from "./const.api"; 

export const changePasswordAPI = {
    updateChangePassword: (id, data) => {
      return API.patch(`${URL_API}/change-password`, id, data);
    }
  };