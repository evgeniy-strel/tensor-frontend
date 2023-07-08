import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_URL_API + "/users";

export default class RequestAPIusers {
    static async getMe() {
        // Функция получения информации о текущем пользователе.
        // TODO: В будущем адрес должен изменитьс, этот не подходящий
        return axios.get("/me")
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