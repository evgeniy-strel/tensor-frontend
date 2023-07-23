import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GroupChat from "./GroupChat";
import PMChat from "./PMChat";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatById, setActiveChat } from "./../../store/reducers/chatSlice";
import { activeChatSelector } from "./../../store/selectors/chatSelectors";
import { PanelSpinner } from "@vkontakte/vkui";

const Chat = () => {
  const dispatch = useDispatch();
  const chat = useSelector(activeChatSelector);
  const { id } = useParams();

  // стейт нужен, чтобы при кнопке вернуться назад не сбрасывались все данные чата
  const [chatId, setChatId] = useState(id);

  useEffect(() => {
    dispatch(fetchChatById(id));

    return () => dispatch(setActiveChat(null));
  }, [chatId]);

  if (!chat) return <PanelSpinner style={{ height: "100vh" }} size="large" />;

  if (chat?.type == "private") return <PMChat chat={chat} />;

  return <GroupChat chat={chat} />;
};

export default Chat;
