import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { allChats, myChats } from "../../mocks/chats";
import GroupChat from "./GroupChat";
import PMChat from "./PMChat";

const Chat = () => {
  const { id } = useParams();

  // стейт нужен, чтобы при кнопке вернуться назад не сбрасывались все данные чата
  const [chatId, setChatId] = useState(id);

  const findChat = (chats, id) => {
    return chats.find((chat) => chat.id == chatId);
  };

  const chat = findChat(allChats, id);
  const isUserJoined = Boolean(findChat(myChats, id));
  const isGroupChat = chat?.isGroup;

  if (isGroupChat) return <GroupChat chat={chat} isUserJoined={isUserJoined} />;

  return <PMChat chat={chat} />;
};

export default Chat;
