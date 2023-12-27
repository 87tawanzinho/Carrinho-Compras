import axios from "axios";
export const api = axios.create({
  baseURL: "https://crudcrud.com/api/21b2117d1f0747c497c7e22e044dbab1/",
  timeout: 1000,
});
