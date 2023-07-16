const initialStateUser = {
  token: localStorage.getItem("token") || "",
  user: {},
  loader: false,
  resultLogin: {
    data: {},
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
