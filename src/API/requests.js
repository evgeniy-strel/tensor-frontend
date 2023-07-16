import axios from "./axios";

export default class RequestAPI {
  // ---------- AUTH
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
    res.then((res) => {
      const token = res.data.access_token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    });
    return res;
  }

  static async logout() {
    this.tokenExpired();
  }

  static async register(formData) {
    const external = JSON.stringify({
      ...formData.external,
      username: formData.username,
      fullname: `${formData.firstName} ${formData.lastName}`,
      dateBirth: formData.dateBirth,
    });
    let formDataRegister = new FormData();
    formDataRegister.append("email", formData.email);
    formDataRegister.append("password", formData.password);
    formDataRegister.append("external", external);
    return axios.post("/auth1/register", formDataRegister);
  }

  // Подтверждение почты
  static async requestVerifyToken(email) {
    return axios.post(
      "/auth2/request-verify-token",
      JSON.stringify({ email: email })
    );
  }

  // Подтверждение почты
  static async verify(token) {
    return axios.post("/auth2/verify", JSON.stringify({ token: token }));
  }

  // Восстановление пароля
  static async forgotPassword(email) {
    return axios.post(
      "/auth3/forgot-password",
      JSON.stringify({ email: email })
    );
  }

  // Сброс пароля
  static async resetPassword(token, password) {
    return axios.post(
      "/auth3/reset-password",
      JSON.stringify({ token: token, password: password })
    );
  }

  // Получние текущего пользователя
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

  // ---------- CHAT
  // Создание чата
  static async createNewChat() {
    return axios.post("/new_chat");
  }

  // Добавление пользоватлей в чат
  static async addChatUsers() {
    return axios.post("/add_chat_users");
  }

  // Обновление чата
  static async updateChat() {
    return axios.post("/chat_delete");
  }

  // Удаление чата
  static async deleteChat() {
    return axios.post("/chat_delete");
  }

  // Получение чата
  static async getChat() {
    return axios.get("/chat");
  }

  // Получение пользоватлей чата
  static async getChatUsers() {
    return axios.get("/chat_users");
  }

  // Получание тегов чата
  static async getChatTags() {
    return axios.get("/chat_tags");
  }

  // Получение сообщений чата
  static async getChatMessages() {
    return axios.get("/chat_messages");
  }

  // Добавление нового сообщения
  static async addNewMessage() {
    return axios.post("/add_message");
  }

  // Получение чатов пользователя
  static async getChatsCurrentUser() {
    return axios.get("/user_chats");
  }

  // ---------- SEARCH
  // Создание новой категории
  static async postNewCategory() {
    return axios.post("/new_category");
  }

  // Создание нового тега
  static async postNewTag() {
    return axios.post("/new_tag");
  }
}
