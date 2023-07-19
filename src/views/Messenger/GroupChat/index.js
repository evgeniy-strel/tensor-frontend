import { useState } from "react";
import "./index.scss";
import {
  PanelHeader,
  PanelHeaderBack,
  Avatar,
  PanelHeaderContent,
  Title,
  FixedLayout,
  Separator,
} from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";
import { messagesPM } from "../../../mocks/messages";
import CustomWriteBar from "../CustomWriteBar";
import JoinToChat from "./JoinToChat";
import LayoutMessages from "../LayoutMessages";
import Messages from "./Messages";

const GroupChat = ({ chat, isUserJoined }) => {
  const currentUser = {
    username: "Евгений",
    img: null,
  };

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate("/messenger");
  };

  const [messages, setMessages] = useState(messagesPM);
  const [counter, setCounter] = useState(99);

  if (counter < messages.length) {
    setTimeout(() => {
      setCounter((prev) => prev + 1);
    }, 500);
  }

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="group-chat">
      <PanelHeader
        className="group-chat__panel-header"
        before={<PanelHeaderBack onClick={onClickBack} />}>
        <PanelHeaderContent
          className="group-chat__panel-header__content"
          status={
            <span className="group-chat__panel-header__content__status">1,5к участников</span>
          }
          before={
            <Avatar
              size={36}
              src={chat?.img}
              initials={chat?.img ? "" : chat?.name[0]}
              gradientColor="blue"
            />
          }>
          <Title level="3" className="group-chat__panel-header__content__chat-name">
            Беседа
          </Title>
        </PanelHeaderContent>
      </PanelHeader>
      <FixedLayout vertical="top" className="group-chat__fixed-layout">
        <Separator wide className="group-chat__fixed-layout__separator" />
        <Title level="3" className="group-chat__fixed-layout__title">
          Прогулка гуляш
        </Title>
        <div className="group-chat__fixed-layout__description">
          <span>29 февраля, 31:99</span>
          <span>Ельцин центр</span>
        </div>
      </FixedLayout>
      <div className="messages-container-group">
        <LayoutMessages>
          <Messages messages={messages} currentUser={currentUser} />
        </LayoutMessages>
      </div>
      {isUserJoined ? (
        <CustomWriteBar onSendMessage={addMessage} user={currentUser} />
      ) : (
        <JoinToChat />
      )}
    </div>
  );
};

export default GroupChat;
