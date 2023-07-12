const initialState = {
  authLoader: false,
  resultLogin: {
    data: {},
    error: "",
  },
  resultReg: {
    data: {},
    error: "",
  },
  token: localStorage.getItem("token") || "",
  user: {},
};

export default initialState;
