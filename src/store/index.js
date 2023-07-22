import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
<<<<<<< HEAD
import modalSlice from "./reducers/modalSlice";

const rootReducers = combineReducers({
  user: userSlice,
  modal: modalSlice,
=======
import chatSlice from "./reducers/chatSlice";

const rootReducers = combineReducers({
  user: userSlice,
  chat: chatSlice,
>>>>>>> 84221d5b7ffc730942c1716ca12f391ed7bb2011
});

export const store = configureStore({
  reducer: rootReducers,
});
