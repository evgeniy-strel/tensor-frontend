import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_URL_API;
axios.defaults.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type",
    "Access-Control-Max-Age": "1800",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
}

let token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default class RequestAPIauth {
    static async login({ username, password }) {
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        return axios.post("/auth/jwt/login", formData)
            .then(res => {
                token = res.data.access_token;
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
}
