import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";

const rootReducers = combineReducers({
    user: userSlice
})

export const store = configureStore({
    reducer: rootReducers
})