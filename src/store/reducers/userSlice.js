import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestAPIauth from "../../API/authRequests";
import RequestAPIusers from "../../API/usersRequests";
import initialState from "../initialState";

export const postLogin = createAsyncThunk(
    "auth/login",
    async (formData, {rejectWithValue}) => {
        const res = await RequestAPIauth.login(formData)
            .then(res => res.data)
            .catch(err => rejectWithValue(err.message))
        return res
    }    
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            RequestAPIauth.logout();
            state.token = "";
        }
    },
    extraReducers: {
        [postLogin.pending]: (state, action) => {
            state.loading = "loading";
        },
        [postLogin.fulfilled]: (state, action) => {
        },
        [postLogin.rejected]: (state, action) => {
        }
    }
})

export default userSlice.reducer;
export const { logout } = userSlice.actions;