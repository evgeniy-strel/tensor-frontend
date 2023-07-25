import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestAPI from "../../API/requests";
import Helper from "../../API/helper";
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
  async (_, { rejectWithValue }) => {
    const res = await RequestAPI.logout()
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

export const postRegister = createAsyncThunk(
  "auth/register",
  async ([formData, file], { rejectWithValue }) => {
    await RequestAPI.register(formData)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));

    const token = await RequestAPI.login({
      email: formData.email,
      password: formData.password,
    })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));

    // регестрация -> вход -> загрузка картинки -> обновление пользователя
    if (file) {
      const newFormData = await RequestAPI.uploadFiles(file)
        .then((res) => res[0])
        .then((res) => {
          return {
            ...formData,
            avatar: res.link,
          };
        })
        .catch((err) => rejectWithValue(err.message));

      // регестрация -> вход -> загрузка информации о пользователе
      const userData = await RequestAPI.updateCurrentUser(newFormData)
        .then((res) => res.data)
        .catch((err) => rejectWithValue(err.message));

      return [token.access_token, userData];
    }

    const userData = await RequestAPI.currentUser()
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));

    return [token.access_token, userData];
  }
);

export const getUserInfo = createAsyncThunk(
  "user/info",
  async (_, { rejectWithValue }) => {
    const res = RequestAPI.currentUser()
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ([formData, file], { rejectWithValue }) => {
    let newData;
    if (file) {
      newData = await RequestAPI.uploadFiles(file)
        .then((res) => res[0])
        .then((res) => {
          return {
            ...formData,
            avatar: res.link,
          };
        })
        .catch((err) => rejectWithValue(err.message));
    }

    const res = RequestAPI.updateCurrentUser(file ? newData : formData)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

export const userTags = createAsyncThunk(
  "user/tags",
  async (_, { rejectWithValue }) => {
    const res = RequestAPI.getUserTags()
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
        state.token = action.payload[0];
        state.user = Helper.transformUserForUsage(action.payload[1]);
      })
      .addCase(postRegister.rejected, (state, action) => {
        state.registerState.loader = false;
        state.registerState.error = action.payload;
      });

    // USERS
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = Helper.transformUserForUsage(action.payload);
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.token = "";
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = Helper.transformUserForUsage(action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.token = "";
      });
    builder
      .addCase(userTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(userTags.rejected, (state, action) => {
        state.token = "";
      });
  },
});

export default userSlice.reducer;
export const { resetState } = userSlice.actions;
