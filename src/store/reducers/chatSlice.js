import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestAPI from "./../../API/requests";

export const fetchChatById = createAsyncThunk(
  "chat/fetchChatById",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data: info } = await RequestAPI.fetchChatById(id);
      const { data: users } = await RequestAPI.fetchUsersByChatId(id);
      const { data: messages } = await RequestAPI.fetchMessagesByChatId(id);
      const { data: tags } = await RequestAPI.fetchTagsByChatId(id);
      const chat = { ...info, users, messages, tags };

      return chat;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const activeTab = state.chat.activeTab;
    let chats = [];

    try {
      if (activeTab == "my_chats") {
        chats = (await RequestAPI.fetchUserChats()).data;
      } else {
        // chats = await ... TO DO
      }

      dispatch(setChats(chats));
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const createNewChat = createAsyncThunk(
  "chat/create",
  async ({ chat, tags }, { rejectWithValue }) => {
    try {
      const { data: chatInfo } = await RequestAPI.createNewChat(chat);
      await RequestAPI.updateChatTags(chatInfo.id, tags);
      return chatInfo;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

const initialState = {
  isLoaded: {
    activeChat: false,
  },
  activeTab: "my_chats",
  chats: [],
  activeChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setChats(state, action) {
      state.chats = action.payload;
    },
    setActiveChat(state, action) {
      state.activeChat = action.payload;
    },
    addMessage(state, action) {
      state.activeChat.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // pending
    builder.addCase(fetchChatById.pending, (state) => {
      state.activeChat = null;
      state.isLoaded.activeChat = false;
    });
    // fulfilled
    builder.addCase(fetchChatById.fulfilled, (state, action) => {
      state.activeChat = action.payload;
      state.isLoaded.activeChat = true;
    });
    // rejected
    builder.addCase(fetchChatById.rejected, (state) => {
      state.activeChat = null;
      state.isLoaded.activeChat = null;
    });
  },
});

export default chatSlice.reducer;
export const { setActiveTab, setChats, setActiveChat, addMessage } =
  chatSlice.actions;
