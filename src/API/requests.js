import axios from "./axios";
import Helper from "./helper";

export default class RequestAPI {
  // Сброс токена
  static tokenExpired() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userTags");
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
    const res = axios.post("auth/register", data);
    res.then((res) => RequestAPI.setUserInfo(res));
    return res;
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
    return res;
  }

  // Удаление пользователя
  static async deleteUser(id) {
    return axios.delete(`current`);
  }

  // Получение тегов у текущего пользователя
  static async getUserTags() {
    const res = axios.get("current/tags");
    res.then((res) =>
      localStorage.setItem("userTags", JSON.stringify(res.data))
    );
    return res;
  }

  // Обновление тегов у текущего пользователя
  static async updateUserTags(tags) {
    const formTags = tags.map((el) => el.title);
    const res = axios.post("current/tags", formTags);
    res.then((res) =>
      localStorage.setItem("userTags", JSON.stringify(res.data))
    );
    return res;
  }

  // ---------- FILES
  // Загрузка файлов(1 или более)
  static async uploadFiles(files) {
    try {
      const { data } = await axios.post("files", files);
      return data.filter((file) => typeof file === "object");
    } catch (error) {
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
    const titleTags = tags.map((el) => el.title);
    return axios.post(`chats/${chatId}/tags`, titleTags);
  }

  // Получение чатов пользователя
  static async fetchUserChats() {
    return axios.get("chats");
  }

  // Получение рекомендованных чатов
  static async fetchReccomendChats() {
    return axios.get("/chats/recomended/userschats");
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
    return axios.get(`chats/${id}/messages?limit=100000000`);
  }

  // Получение тегов чата
  static async fetchTagsByChatId(id) {
    return axios.get(`/chats/${id}/tags`);
  }

  // Добавление юзеров чата
  static async addUsersToChat(chatId, users) {
    return axios.put(`/chats/${chatId}/users`, users);
  }

  // ---------- CATEGORIES

  // Получение списка категорий
  static async fetchCategories() {
    return axios.get("categories");
  }

  // Получение списка тегов
  static async fetchTags() {
    return axios.get("tags");
  }
}
