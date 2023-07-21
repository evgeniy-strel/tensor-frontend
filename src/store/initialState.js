const initialStateUser = {
  token: localStorage.getItem("token") || "",
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
