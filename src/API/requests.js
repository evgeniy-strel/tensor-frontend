import axios from "./axios";

export default class RequestAPI {
  static tokenExpired() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = null;
  }

  static async login({ username, password }) {
    let formDataLogin = new FormData();
    formDataLogin.append("username", username);
    formDataLogin.append("password", password);
    const res = axios.post("/auth/jwt/login", formDataLogin);
    res
      .then((res) => {
        const token = res.data.access_token;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      })
      .catch((rej) => {
        RequestAPI.tokenExpired();
      });
    return res;
  }

  static async logout() {
    this.tokenExpired();
  }

  static async register(formData) {
    // let formDataRegister = new FormData();
    // formDataRegister.append("email", formData.email)
    // formDataRegister.append("password", formData.password)
    // formDataRegister.append("username", formData.username)
    // formDataRegister.append("fullname", `${formData.firstName} ${formData.lastName}`)
    // formDataRegister.append("birthdate", formData.dateBirth);
    // return axios.post("/auth1/register", formDataRegister);
    return axios.post("/auth1/register", {
      email: formData.email,
      password: formData.password,
      is_active: true,
      is_superuser: false,
      is_verified: formData.is_verified,
      username: formData.username,
      fullname: `${formData.firstName} ${formData.lastName}`,
      birthdate: formData.dateBirth,
      external: JSON.stringify(formData.external),
    });
  }

  static async requestVerifyToken(email) {
    return axios.post(
      "/auth2/request-verify-token",
      JSON.stringify({ email: email })
    );
  }

  static async verify(token) {
    return axios.post("/auth2/verify", JSON.stringify({ token: token }));
  }

  static async forgotPassword(email) {
    return axios.post(
      "/auth3/forgot-password",
      JSON.stringify({ email: email })
    );
  }

  static async resetPassword(token, password) {
    return axios.post(
      "/auth3/reset-password",
      JSON.stringify({ token: token, password: password })
    );
  }

  static async info() {
    // Функция получения информации о текущем пользователе.
    // TODO: В будущем адрес должен изменитьс, этот не подходящий
    return axios
      .get("/users/me")
      .then((res) => {
        console.log("/users/me", res.data);
        localStorage.setItem("user", res.data);
      })
      .catch((rej) => {
        localStorage.removeItem("user");
      });
  }

  static async patchCurrentUser() {
    return axios.patch("/users/me");
  }

  static async getUserById(id) {
    return axios.get(`/users/${id}`);
  }

  static async deleteUser(id) {
    return axios.delete(`/users/${id}`);
  }

  static async patchUserById(id) {
    return axios.patch(`/users/${id}`);
  }
}
