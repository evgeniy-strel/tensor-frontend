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
import {
  getFirstDigitGuid,
  getFullUrlImg,
} from "./../../../utils/helpersMethods";

const GroupChat = ({
  id,
  external: { title, avatar },
  users,
  messages: historyMessages,
}) => {
  const currentUser = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  const [messages, setMessages] = useState(historyMessages);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const getCaseOfWord = () => {
    const countUsers = users.length;
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
              {users?.length} {getCaseOfWord()}
            </span>
          }
          before={
            <Avatar
              size={36}
              src={getFullUrlImg(avatar)}
              initials={title?.at(0)}
              gradientColor={calcInitialsAvatarColor(getFirstDigitGuid(id))}
            />
          }>
          <Title
            level="3"
            className="group-chat__panel-header__content__chat-name">
            {title}
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
