import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "my_chats",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },
});

export default chatSlice.reducer;
export const { setActiveTab } = chatSlice.actions;
