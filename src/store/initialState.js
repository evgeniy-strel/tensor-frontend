const initialStateUser = {
  token: localStorage.getItem("token") || "",
  loaderUserInfo: false,
  user: {},
  loader: false,
  resultLogin: {
    error: "",
  },
  resultForgot: {
    data: {},
    error: "",
  },
  resultReg: {
    data: {},
    error: "",
  },
};

export default initialStateUser;
