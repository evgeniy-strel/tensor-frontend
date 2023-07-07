import axios from "axios";


export default class RequestAPI {
    static async login({ login, password }) {
        let formData = new FormData();
        formData.append("username", login);
        formData.append("password", password);
        console.log(formData)
        return axios.post("http://192.168.1.100:8080/auth/jwt/login", {
            data: formData,
        })
            .then(res => {
                const token = res.data.token;
                localStorage.setItem("token", token);
                axios.defaults.headers.common["Authorization"] = token;
            })
            .catch(rej => {
                localStorage.removeItem("token");
            })
    }
}