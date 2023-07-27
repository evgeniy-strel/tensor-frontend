const initialStateUser = {
  token: localStorage.getItem("token") || "",
  loaderUserInfo: false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  tags: JSON.parse(localStorage.getItem("userTags")) || [],
  activeCategory: "",
  loginState: { loader: false, error: "" },
  registerState: { loader: false, error: "" },
  forgotState: { loader: false, error: "" },
  userExist: false,
  anothUser: {},
};

export default initialStateUser;
