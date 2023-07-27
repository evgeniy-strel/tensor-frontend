export const activeTabChatSelector = (state) => state.chat.activeTab;

export const chatsSelector = (state) => state.chat.chats;

export const activeChatSelector = (state) => state.chat.activeChat;

export const isLoadedActiveChatSelector = (state) =>
  state.chat.isLoaded.activeChat;
