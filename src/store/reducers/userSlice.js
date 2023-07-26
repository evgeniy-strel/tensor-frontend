import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestAPI from "../../API/requests";
import Helper from "../../API/helper";
import initialStateUser from "../initialState";

export const postLogin = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data: token } = await RequestAPI.login(formData);
      let { data: userInfo } = await RequestAPI.currentUser();
      userInfo = Helper.transformUserForUsage(userInfo);
      const { data: userTags } = await RequestAPI.getUserTags();
      return [token.access_token, userInfo, userTags];
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
  async (_, { rejectWithValue, dispatch }) => {
    const res = await RequestAPI.logout()
      .then((res) => {
        dispatch(resetStateLogout());
      })
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

export const postRegister = createAsyncThunk(
  "auth/register",
  async ([formData, file, regTags], { rejectWithValue }) => {
    try {
      let { data: userInfo } = await RequestAPI.register(formData);
      const { data: token } = await RequestAPI.login({
        email: formData.email,
        password: formData.password,
      });

      const { data: newTags } = await RequestAPI.updateUserTags(regTags);
      // регестрация -> вход -> загрузка картинки -> обновление пользователя
      if (file) {
        // регестрация -> вход -> загрузка информации о пользователе
        const newFormData = await RequestAPI.uploadFiles(file)
          .then((res) => res[0])
          .then((res) => {
            return {
              ...formData,
              avatar: res.link,
            };
          });

        let { data: newUserInfo } = await RequestAPI.updateCurrentUser(
          newFormData
        );

        newUserInfo = Helper.transformUserForUsage(newUserInfo);
        return [token.access_token, newUserInfo, newTags];
      }

      userInfo = Helper.transformUserForUsage(userInfo);
      return [token.access_token, userInfo, newTags];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "user/info",
  async (_, { rejectWithValue }) => {
    const res = await RequestAPI.currentUser()
      .then((res) => Helper.transformUserForUsage(res.data))
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
      .then((res) => Helper.transformUserForUsage(res.data))
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

export const updateUserTags = createAsyncThunk(
  "user/tags/update",
  async (editTags, { rejectWithValue }) => {
    const res = RequestAPI.updateUserTags(editTags)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message));
    return res;
  }
);

export const userInfoById = createAsyncThunk(
  "user/another",
  async (id, { rejectWithValue }) => {
    const res = RequestAPI.getUserById(id)
      .then((res) => Helper.transformUserForUsage(res.data))
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
    resetStateLogout(state, action) {
      state.token = "";
      state.user = {};
      state.tags = [];
    },
    setTag(state, action) {
      if (state.tags.map((el) => el.title).includes(action.payload.title)) {
        state.tags = [
          ...state.tags.filter((el) => el.title !== action.payload.title),
        ];
      } else {
        state.tags = [...state.tags, action.payload];
      }
    },
    resetTags(state, action) {
      state.tags = JSON.parse(localStorage.getItem("userTags"));
    },
    setCategoryModal(state, action) {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // AUTH
    builder
      .addCase(postLogin.pending, (state, action) => {
        state.loginState.loader = true;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.token = action.payload[0];
        state.user = action.payload[1];
        state.tags = action.payload[2];
        state.loginState.loader = false;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loginState.error =
          action.payload === "Request failed with status code 400"
            ? "Неправильный пароль"
            : action.payload;
        state.loginState.loader = false;
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
      .addCase(postRegister.pending, (state, action) => {
        state.registerState.loader = true;
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        state.token = action.payload[0];
        state.user = action.payload[1];
        state.registerState.loader = false;
      })
      // не будет работать, потому что возвращаю массив
      .addCase(postRegister.rejected, (state, action) => {
        state.registerState.error = action.payload;
        state.registerState.loader = false;
      });

    // USERS
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(userTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
    builder
      .addCase(updateUserTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(updateUserTags.rejected, (state, action) => {
        console.log(action);
      });
    builder
      .addCase(userInfoById.pending, (state, action) => {
        state.loaderUserInfo = true;
      })
      .addCase(userInfoById.fulfilled, (state, action) => {
        state.anothUser = action.payload;
        state.loaderUserInfo = false;
      })
      .addCase(userInfoById.rejected, (state, action) => {
        state.loaderUserInfo = false;
      });
  },
});

export default userSlice.reducer;
export const {
  resetState,
  resetStateLogout,
  setTag,
  setCategoryModal,
  resetTags,
} = userSlice.actions;
