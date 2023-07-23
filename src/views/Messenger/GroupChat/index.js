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
import CustomWriteBar from "../CustomWriteBar";
import LayoutMessages from "../LayoutMessages";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { calcInitialsAvatarColor } from "@vkontakte/vkui";

const GroupChat = ({ chat }) => {
  const currentUser = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  const [messages, setMessages] = useState(chat?.messages);

  console.log("messages", messages);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const getFirstDigitGuid = (guid) => {
    return guid.split("").find((s) => !isNaN(s));
  };

  const getCaseOfWord = () => {
    console.log("getCaseOfWord");
    const countUsers = chat?.users.length;
    let word = "участник";

    if (
      (5 <= countUsers && countUsers <= 9) ||
      (11 <= countUsers && countUsers <= 20) ||
      countUsers == 0
    ) {
      word += "ов";
    } else if (2 <= countUsers && countUsers <= 4) {
      word += "а";
    }

    return word;
  };

  return (
    <div className="group-chat">
      <PanelHeader
        className="group-chat__panel-header"
        before={<PanelHeaderBack onClick={onClickBack} />}>
        <PanelHeaderContent
          className="group-chat__panel-header__content"
          status={
            <span className="group-chat__panel-header__content__status">
              {chat?.users?.length} {getCaseOfWord()}
            </span>
          }
          before={
            <Avatar
              size={36}
              src={`${process.env.REACT_APP_URL_API}/${chat?.external?.avatar}`}
              initials={chat?.external?.title?.at(0)}
              gradientColor={calcInitialsAvatarColor(
                getFirstDigitGuid(chat?.id)
              )}
            />
          }>
          <Title
            level="3"
            className="group-chat__panel-header__content__chat-name">
            {chat?.external?.title}
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
      <CustomWriteBar onSendMessage={addMessage} user={currentUser} />
    </div>
  );
};

export default GroupChat;
