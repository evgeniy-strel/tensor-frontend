const initialStateUser = {
  token: localStorage.getItem("token") || "",
  loaderUserInfo: false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  tags: [],
  loginState: { loader: false, error: "" },
  registerState: { loader: false, error: "" },
  forgotState: { loader: false, error: "" },
  anothUser: {},
};

export default initialStateUser;
