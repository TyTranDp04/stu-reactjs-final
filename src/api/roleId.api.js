import { API, URL_API } from "./const.api";


export const RoleIdAPI = {
  get: () => API.get(`${URL_API}/role`),
}