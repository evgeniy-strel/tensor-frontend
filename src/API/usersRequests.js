import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_URL_API + "/users";

export default class RequestAPIusers {
    static async getMe() {
        return axios.get("/me")
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