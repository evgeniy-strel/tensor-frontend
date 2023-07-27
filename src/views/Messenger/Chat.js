import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GroupChat from "./GroupChat";
import PMChat from "./PMChat";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatById, setActiveChat } from "./../../store/reducers/chatSlice";
import {
  activeChatSelector,
  isLoadedActiveChatSelector,
} from "./../../store/selectors/chatSelectors";
import { PanelSpinner } from "@vkontakte/vkui";
import { DESTINY_CHAT } from "./../../const/chat";
import SettingsChat from "./SettingsChat/";
import JoinChat from "./JoinChat/index";

const Chat = ({ destiny }) => {
  const dispatch = useDispatch();
  const chat = useSelector(activeChatSelector);
  const isLoadedChat = useSelector(isLoadedActiveChatSelector);
  const { id } = useParams();

  // стейт нужен, чтобы при кнопке вернуться назад не сбрасывались все данные чата
  const [chatId, setChatId] = useState(id);

  useEffect(() => {
    dispatch(fetchChatById(id));
  }, [chatId]);

  if (!isLoadedChat)
    return <PanelSpinner style={{ height: "100vh" }} size="large" />;

  if (destiny == DESTINY_CHAT.join) return <JoinChat {...chat} />;

  if (destiny == DESTINY_CHAT.settings) return <SettingsChat {...chat} />;

  if (chat?.type == "private") return <PMChat {...chat} />;

  return <GroupChat {...chat} />;
};

export default Chat;
