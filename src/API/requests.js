import axios from "./axios";
import Helper from "./helper";

export default class RequestAPI {
  // Сброс токена
  static tokenExpired() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers["Authorization"] = null;
  }

  static setUserInfo(res) {
    localStorage.setItem(
      "user",
      JSON.stringify(Helper.transformUserForUsage(res.data))
    );
  }

  // ---------- AUTH
  // Проверка на наличие пользователя
  static async loginFind(email) {
    return axios.post("auth/find", { email: email });
  }

  static async login({ email, password }) {
    let formDataLogin = new FormData();
    formDataLogin.append("username", email);
    formDataLogin.append("password", password);
    const res = axios.post("auth/jwt/login", formDataLogin);
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
    const res = axios.post("auth/jwt/logout");
    res
      .then((res) => RequestAPI.tokenExpired())
      .catch((rej) => RequestAPI.tokenExpired());
    return res;
  }

  static async register(formData) {
    const data = Helper.transformUserForFetch(formData);
    return axios.post("auth/register", data);
  }

  // Восстановление пароля
  static async forgotPassword(email) {
    return axios.post("auth/forgot-password", { email: email });
  }

  // Сброс пароля
  static async resetPassword(token, password) {
    return axios.post("auth/reset-password", {
      token: token,
      password: password,
    });
  }

  // ---------- USERS
  // Получние текущего пользователя
  static async currentUser() {
    const res = axios.get("current");
    res
      .then((res) => RequestAPI.setUserInfo(res))
      .catch((rej) => RequestAPI.tokenExpired());
    return res;
  }

  // Обновление информации пользователя
  static async updateCurrentUser(formData) {
    const res = axios.post("current", Helper.transformUserForFetch(formData));
    res
      .then((res) => RequestAPI.setUserInfo(res))
      .catch((rej) => RequestAPI.tokenExpired());
    return res;
  }

  // Получение пользователя по id
  static async getUserById(id) {
    const res = axios.get(`user/${id}`);
    res
      .then((res) => null)
      .catch((rej) => {
        console.log(rej);
        if (rej.response.status == 401) {
          RequestAPI.tokenExpired();
        }
      });
    return res;
  }

  // Удаление пользователя
  static async deleteUser(id) {
    return axios.delete(`current`);
  }

  // Получение тегов у текущего пользователя
  static async getUserTags() {
    const res = axios.get("current/tags");
    res.then((res) => null).catch((rej) => RequestAPI.tokenExpired());
    return res;
  }

  // Обновление тегов у текущего пользователя
  static async updateUserTags() {
    const res = axios.post("current/tags");
  }

  // ---------- FILES
  // Загрузка файлов(1 или более)
  static async uploadFiles(files) {
    try {
      const { data } = await axios.post("files", files);
      return data.filter((file) => typeof file === "object");
    } catch (error) {
      if (error.response.status == 401) {
        RequestAPI.tokenExpired();
      }

      console.log(error);
      return error?.message;
    }
  }

  // ---------- CHAT
  // Создание чата
  static async createNewChat(chat) {
    return axios.post("chats", chat);
  }

  // Обновление тегов чата
  static async updateChatTags(chatId, tags) {
    return axios.post(`chats/${chatId}/tags`, tags);
  }

  // Получение чатов пользователя
  static async fetchUserChats() {
    return axios.get("chats");
  }

  // Получение конкретного чата
  static async fetchChatById(id) {
    return axios.get(`chats/${id}`);
  }

  // Получение пользователей чата
  static async fetchUsersByChatId(id) {
    return axios.get(`chats/${id}/users`);
  }

  // Получение истории сообщений чата
  static async fetchMessagesByChatId(id) {
    return axios.get(`chats/${id}/messages`);
  }

  // ---------- CATEGORIES

  // Получение списка категорий
  static async fetchCategories() {
    return axios.get("categories");
  }
}
