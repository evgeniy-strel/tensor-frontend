import axios from "axios";

// TODO: вынести в параметры. Ссылка на API-сервер
axios.defaults.baseURL = "http://192.168.1.100:8080";

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
        console.log(formData);
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
}
