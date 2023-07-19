import React, { useState } from "react";
import "./index.scss";
import { PanelHeader, PanelHeaderBack, Avatar, PanelHeaderContent } from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";
import { messagesPM } from "../../../mocks/messages";
import CustomWriteBar from "../CustomWriteBar";
import LayoutMessages from "../LayoutMessages";

const PMChat = ({ chat }) => {
  const navigate = useNavigate();

  const currentUser = {
    username: "Евгений",
    img: null,
  };

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
    setCounter((prev) => prev + 1);
  };

  return (
    <div className="pm-chat-container">
      <PanelHeader className="panel-header-pm" before={<PanelHeaderBack onClick={onClickBack} />}>
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
        {messages.slice(0, counter).map(({ text, user }, i) => {
          return (
            <div
              key={i}
              className={`message-block ${currentUser.username == user.username ? "mine" : ""}`}>
              <div className="message">{text}</div>
            </div>
          );
        })}
      </LayoutMessages>
      <div>
        <CustomWriteBar onSendMessage={addMessage} user={currentUser} />
      </div>
    </div>
  );
};

export default PMChat;
