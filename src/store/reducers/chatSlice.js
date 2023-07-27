import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import RequestAPI from "./../../API/requests";

export const fetchChatById = createAsyncThunk(
  "chat/fetchChatById",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data: info } = await RequestAPI.fetchChatById(id);
      const { data: users } = await RequestAPI.fetchUsersByChatId(id);
      const { data: messages } = await RequestAPI.fetchMessagesByChatId(id);
      const { data: tags } = await RequestAPI.fetchTagsByChatId(id);

      const messagesSorted = messages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      const chat = { ...info, users, messages: messagesSorted, tags };

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
        chats = (await RequestAPI.fetchReccomendChats()).data;
      }

      return chats;
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
      if (tags) await RequestAPI.updateChatTags(chatInfo.id, tags);
      return chatInfo;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const addUsersToChat = createAsyncThunk(
  "chat/addUsersToChat",
  async ({ chatId, users }, { rejectWithValue }) => {
    try {
      await RequestAPI.addUsersToChat(chatId, users);
      const { data: chatUsers } = await RequestAPI.fetchUsersByChatId(chatId);
      return chatUsers;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

// export const createNewChatPM = createAsyncThunk(
//   "chat/create",
//   async ({ chat, receivedUser }, { rejectWithValue }) => {
//     try {
//       const { data: chatInfo } = await RequestAPI.createNewChat(chat);
//       await RequestAPI.addUsersToChat(chatInfo.id, [receivedUser]);
//       return chatInfo;
//     } catch (error) {
//       return rejectWithValue(error?.message);
//     }
//   }
// );

const initialState = {
  isLoaded: {
    activeChat: false,
    chats: false,
  },
  activeTab: "my_chats",
  chats: [],
  tagsNewChat: [],
  categoryNewChat: null,
  activeChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.chats = [];
      state.activeTab = action.payload;
    },
    setChats(state, action) {
      state.chats = action.payload;
    },
    setActiveChat(state, action) {
      state.activeChat = action.payload;
    },
    addMessage(state, action) {
      const { messages } = current(state).activeChat;
      if (!messages.find((message) => message.id == action.payload.id))
        state.activeChat.messages.push(action.payload);
    },
    setTagNewChat(state, action) {
      if (
        state.tagsNewChat.map((el) => el.title).includes(action.payload.title)
      ) {
        state.tagsNewChat = [
          ...state.tagsNewChat.filter(
            (el) => el.title !== action.payload.title
          ),
        ];
      } else {
        state.tagsNewChat = [...state.tagsNewChat, action.payload];
      }
    },
    resetTagsNewChat(state) {
      state.tagsNewChat = [];
    },
    setCategoryNewChat(state, action) {
      state.categoryNewChat = action.payload;
    },
    resetCategoryNewChat(state) {
      state.categoryNewChat = null;
    },
    resetNewChatState(state) {
      state.tagsNewChat = [];
      state.categoryNewChat = null;
    },
  },
  extraReducers: (builder) => {
    // pending
    builder.addCase(fetchChatById.pending, (state) => {
      state.activeChat = null;
      state.isLoaded.activeChat = false;
    });
    builder.addCase(fetchChats.pending, (state) => {
      state.chats = [];
      state.isLoaded.chats = false;
    });
    // fulfilled
    builder.addCase(fetchChatById.fulfilled, (state, action) => {
      state.activeChat = action.payload;
      state.isLoaded.activeChat = true;
    });
    builder.addCase(addUsersToChat.fulfilled, (state, action) => {
      state.activeChat.users = action.payload;
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.chats = action.payload;
      state.isLoaded.chats = true;
    });
    // rejected
    builder.addCase(fetchChatById.rejected, (state) => {
      state.activeChat = null;
      state.isLoaded.activeChat = null;
    });
  },
});

export default chatSlice.reducer;
export const {
  setActiveTab,
  setChats,
  setActiveChat,
  addMessage,
  setTagNewChat,
  resetTagsNewChat,
  setCategoryNewChat,
  resetCategoryNewChat,
  resetNewChatState,
} = chatSlice.actions;
