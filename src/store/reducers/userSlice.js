import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestAPI from "../../API/requests";
import initialState from "../initialState";

export const postLogin = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    const res = await RequestAPI.login(formData)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

export const postRegister = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    const res = await RequestAPI.register(formData)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      RequestAPI.logout();
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loader = false;
        state.resultLogin.error = action.payload;
      });
    builder
      .addCase(postRegister.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(postRegister.rejected, (state, action) => {
        state.loader = false;
        console.log(action);
        state.resultReg.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
