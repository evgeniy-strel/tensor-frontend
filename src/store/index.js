import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import chatSlice from "./reducers/chatSlice";

const rootReducers = combineReducers({
  user: userSlice,
  chat: chatSlice,
});

export const store = configureStore({
  reducer: rootReducers,
});
