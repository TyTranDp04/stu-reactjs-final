import { API, URL_API } from "./const.api";


export const AuthAPI = {
  login: (data) => API.post(`${URL_API}/auth/login`, data),
  loginGoogle: () => API.get(`${URL_API}/auth/google`),
  register: (data) => API.post(`${URL_API}auth/users`, data),
  getUser: (id) => API.get(`${URL_API}/user/${id}`)
}