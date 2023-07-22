import axios from "./axios";

export default class RequestAPI {
  // Сброс токена
  static tokenExpired() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = null;
  }

  // ---------- AUTH
  // Проверка на наличие пользователя
  static async loginFind(email) {
    return axios.post("/auth/find", { email: email });
  }

  static async login({ email, password }) {
    let formDataLogin = new FormData();
    formDataLogin.append("username", email);
    formDataLogin.append("password", password);
    const res = axios.post("/auth/jwt/login", formDataLogin);
    res
      .then((res) => {
        const token = res.data.access_token;
        localStorage.setItem("token", token);
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      })
      .catch((rej) => null);
    return res;
  }

  static async logout() {
    const res = axios.post("/auth/jwt/logout");
    res
      .then((res) => RequestAPI.tokenExpired())
      .catch((rej) => RequestAPI.tokenExpired());
    return res;
  }

  static async register(formData) {
    const image = new FormData();
    image.append("avatar", formData.external.avatar);
    return axios.post("/auth/register", {
      ...formData,
      is_active: true,
      is_superuser: false,
      is_verified: false,
      external: {
        avatar: image
      }
    });
  }

  // ???
  static async requestVerifyToken(email) {
    return axios.post("/auth/request-verify-token", { email: email });
  }

  // Восстановление пароля
  static async forgotPassword(email) {
    return axios.post("/auth/forgot-password", { email: email });
  }

  // Сброс пароля
  static async resetPassword(token, password) {
    return axios.post("/auth/reset-password", {
      token: token,
      password: password,
    });
  }

  // ---------- USERS
  // Получние текущего пользователя
  static async currentUser() {
    const res = axios.get("/current");
    res
      .then((res) => {
        localStorage.setItem("user", res.data);
      })
      .catch((rej) => RequestAPI.tokenExpired());
    return res;
  }

  // Обновление информации пользователя
  static async patchCurrentUser() {
    return axios.patch("/users/me");
  }

  // Получение пользователя по id
  static async getUserById(id) {
    return axios.get(`/users/${id}`);
  }

  // Удаление пользователя
  static async deleteUser(id) {
    return axios.delete(`/users/${id}`);
  }

  // Обновление пользователя по id
  static async patchUserById(id) {
    return axios.patch(`/users/${id}`);
  }

  // ---------- CHATS

  // ---------- MESSAGES

  // ---------- CATEGORIES

  // ---------- TAGS
}
