const initialState = {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
}

export default initialState;