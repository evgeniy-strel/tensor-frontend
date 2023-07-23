import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import chatSlice from "./reducers/chatSlice";
import modalSlice from "./reducers/modalSlice";
import categoriesSlice from "./reducers/categoriesSlice";

const rootReducers = combineReducers({
  user: userSlice,
  chat: chatSlice,
  modal: modalSlice,
  categories: categoriesSlice,
});

export const store = configureStore({
  reducer: rootReducers,
});
