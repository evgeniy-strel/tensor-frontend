import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestAPI from "../../API/requests";
import initialState from "../initialState";

export const postLogin = createAsyncThunk(
    "auth/login",
    async (formData, {rejectWithValue}) => {
        const res = await RequestAPI.login(formData)
            .then(res => res.data)
            .catch(err => rejectWithValue(err.message))
        return res
    }    
)

export const postRegister = createAsyncThunk(
    "auth/register",
    async (formData, {rejectWithValue}) => {
        const res = await RequestAPI.register(formData)
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
            RequestAPI.logout();
            state.token = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postLogin.pending, (state, action) => {
            state.status = "loading";
            console.log(action)
        });
        builder.addCase(postLogin.fulfilled, (state, action) => {

        });
        builder.addCase(postLogin.rejected, (state, action) => {

        });
        builder.addCase(postRegister.pending, (state, action) => {
            
        })
        builder.addCase(postRegister.fulfilled, (state, action) => {
            
        })
        builder.addCase(postRegister.rejected, (state, action) => {
            
        })

    }
})

export default userSlice.reducer;
export const { logout } = userSlice.actions;