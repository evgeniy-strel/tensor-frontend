import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestAPI from "../../API/requests";
import initialStateUser from "../initialState";

export const postLogin = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    const res = await RequestAPI.login(formData)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

export const postForgot = createAsyncThunk(
  "auth/forgot",
  async (email, { rejectWithValue }) => {
    const res = await RequestAPI.forgotPassword(email)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

export const postLogout = createAsyncThunk(
  "auth/logout",
  async (nothing, { rejectWithValue }) => {
    const res = await RequestAPI.logout()
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

export const getUserInfo = createAsyncThunk(
  "user/info",
  async (nothing, { rejectWithValue }) => {
    const res = RequestAPI.currentUser()
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    logout(state) {
      RequestAPI.logout();
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    // AUTH
    builder
      .addCase(postLogin.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.loader = false;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loader = false;
        if (action.payload === "Request failed with status code 400") {
          state.resultLogin.error = "Неправильный пароль";
        } else {
          state.resultLogin.error = action.payload;
        }
      });
    builder
      .addCase(postForgot.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(postForgot.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(postForgot.rejected, (state, action) => {
        state.loader = false;
        state.resultForgot.error = action.payload;
      });
    builder
      .addCase(postLogout.fulfilled, (state, action) => {
        state.token = "";
      })
      .addCase(postLogout.rejected, (state, action) => {
        state.token = "";
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
        state.resultReg.error = action.payload;
      });

    // USERS
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.loaderUserInfo = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          is_active: action.payload.is_active,
          is_verified: action.payload.is_verified,
          name: action.payload.external.name,
          tags: action.payload.external.tags,
          avatar: action.payload.external.avatar,
        };
        state.loaderUserInfo = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.token = "";
        state.loaderUserInfo = false;
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
