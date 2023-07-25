import React, { useState } from "react";
import "./index.scss";
import {
  PanelHeader,
  PanelHeaderBack,
  Avatar,
  PanelHeaderContent,
} from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";
import { messagesPM } from "../../../mocks/messages";
import CustomWriteBar from "../CustomWriteBar";
import LayoutMessages from "../LayoutMessages";
import { useSelector } from "react-redux";

const PMChat = ({ chat }) => {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.user);

  const onClickBack = () => {
    navigate("/messenger");
  };

  const [messages, setMessages] = useState(messagesPM);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="pm-chat-container">
      <PanelHeader
        className="panel-header-pm"
        before={<PanelHeaderBack onClick={onClickBack} />}>
        <PanelHeaderContent
          status={<span className="was-online">Была онлайн</span>}
          before={
            <Avatar
              size={36}
              src={chat?.img}
              initials={chat?.img ? "" : chat?.name[0]}
              gradientColor="blue"
            />
          }>
          <div className="chat-name">{chat?.name}</div>
        </PanelHeaderContent>
      </PanelHeader>
      <LayoutMessages>
        {messages.map(({ external: { text, user } }, i) => {
          return (
            <div
              key={i}
              className={`message-block ${
                currentUser.name == user.name ? "mine" : ""
              }`}>
              <div className="message">{text}</div>
            </div>
          );
        })}
      </LayoutMessages>
      <div>
        <CustomWriteBar chatId={chat.id} user={currentUser} />
      </div>
    </div>
  );
};

export default PMChat;
