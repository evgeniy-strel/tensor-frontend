import axios from "axios";
import RequestAPI from "./requests";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    Authorization: window.localStorage.getItem("token")
      ? "Bearer " + window.localStorage.getItem("token")
      : "",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type",
    "Access-Control-Max-Age": "1800",
    "Access-Control-Allow-Methods":
      "PUT, POST, GET, DELETE, PATCH, OPTIONS, test",
  },
  timeout: 5000,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      RequestAPI.tokenExpired();
      window.location.reload();
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
