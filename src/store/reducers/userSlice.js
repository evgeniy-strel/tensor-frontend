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
    resetState(state, action) {
      state.loginState = { loader: false, error: "" };
      state.registerState = { loader: false, error: "" };
      state.forgotState = { loader: false, error: "" };
    },
  },
  extraReducers: (builder) => {
    // AUTH
    builder
      .addCase(postLogin.pending, (state, action) => {
        state.loginState.loader = true;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.loginState.loader = false;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loginState.loader = false;
        state.loginState.error =
          action.payload === "Request failed with status code 400"
            ? "Неправильный пароль"
            : action.payload;
      });
    builder
      .addCase(postForgot.pending, (state, action) => {
        state.forgotState.loader = true;
      })
      .addCase(postForgot.fulfilled, (state, action) => {
        state.forgotState.loader = false;
      })
      .addCase(postForgot.rejected, (state, action) => {
        state.forgotState.loader = false;
        state.forgotState.error = action.payload;
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
        state.registerState.loader = true;
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        state.registerState.loader = false;
      })
      .addCase(postRegister.rejected, (state, action) => {
        state.registerState.loader = false;
        state.registerState.error = action.payload;
      });

    // USERS
    builder
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
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.token = "";
      });
  },
});

export default userSlice.reducer;
export const { resetState } = userSlice.actions;
