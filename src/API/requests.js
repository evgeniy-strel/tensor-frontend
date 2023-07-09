import axios from "axios";

// TODO: вынести в параметры. Ссылка на API-сервер
axios.defaults.baseURL = process.env.REACT_APP_URL_API;
axios.defaults.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type",
    "Access-Control-Max-Age": "1800",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
}

// При загрузке приложения загружаем токен из хранилища
const token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default class RequestAPI {
    static async login({ login, password }) {
        let formData = new FormData();
        formData.append("username", login);
        formData.append("password", password);
        return axios.post("/auth/jwt/login", formData)
            .then(res => {
                const token = res.data.access_token;
                localStorage.setItem("token", token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            })
            .catch(rej => {
                localStorage.removeItem("token");
                axios.defaults.headers.common["Authorization"] = null;
            })
    }

    static async logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common["Authorization"] = null;
    }

    static async register() {
        return axios.post()
    }

    static async requestVerifyToken(email) {
        return axios.post()
    }

    static async verify(token) {
        return axios.post()
    }

    static async forgotPassword(email) {
        return axios.post()
    }

    static async resetPassword(token, password) {
        return axios.post()
    }

    static async info() {
        // Функция получения информации о текущем пользователе.
        // TODO: В будущем адрес должен изменитьс, этот не подходящий
        return axios.get("/users/me")
            .then(res => {
                console.log("/users/me", res.data);
                localStorage.setItem("user", res.data);
            })
            .catch(rej => {
                localStorage.removeItem("user");
            })
    }

    static async patchCurrentUser() {
        return axios.patch("/me")
    }

    static async getUserById(id) {
        return axios.get(`/${id}`)
    }

    static async deleteUser(id) {
        return axios.delete(`/${id}`)
    }

    static async patchUserById(id) {
        return axios.patch(`/${id}`)
    }
}