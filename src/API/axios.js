import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    Authorization: window.localStorage.getItem("token")
      ? "Bearer " + window.localStorage.getItem("token")
      : "",
    timeout: 5000,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type",
    "Access-Control-Max-Age": "1800",
    "Access-Control-Allow-Methods":
      "PUT, POST, GET, DELETE, PATCH, OPTIONS, test",
  },
});

export default instance;
