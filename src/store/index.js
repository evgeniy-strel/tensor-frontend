import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import modalSlice from "./reducers/modalSlice";

const rootReducers = combineReducers({
  user: userSlice,
  modal: modalSlice,
});

export const store = configureStore({
  reducer: rootReducers,
});
