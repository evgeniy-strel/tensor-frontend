const initialStateUser = {
  token: localStorage.getItem("token") || "",
  loaderUserInfo: false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  loginState: { loader: false, error: "" },
  registerState: { loader: false, error: "" },
  forgotState: { loader: false, error: "" },
};

export default initialStateUser;
