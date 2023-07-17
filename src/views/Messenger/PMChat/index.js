import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { PanelHeader, Group, PanelHeaderBack, Avatar, PanelHeaderContent } from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";
import { messagesPM } from "../../../mocks/messages";
import CustomWriteBar from "../CustomWriteBar";
import ScrollableFeed from "react-scrollable-feed";
import { addBounceEffect, removeBounceEffect } from "../../../utils/bounceEffect";

const PMChat = ({ chat }) => {
  const navigate = useNavigate();
  const currentUser = {
    username: "Евгений",
    img: null,
  };

  const onClickBack = () => {
    navigate("/messenger");
  };

  const [counter, setCounter] = useState(0);
  const [messages, setMessages] = useState(messagesPM);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
    setCounter((prev) => prev + 1);
    scrollBottom();
  };

  if (counter < messages.length) {
    setTimeout(() => {
      setCounter((prev) => prev + 1);
    }, 500);
  }

  const scrollableRef = useRef();

  const scrollBottom = () => scrollableRef.current.scrollToBottom();

  useEffect(() => {
    scrollBottom();
  }, []);

  useEffect(() => {
    removeBounceEffect();

    return () => addBounceEffect();
  }, []);

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
      <div className="messages-container">
        <Group className="messages">
          <ScrollableFeed ref={scrollableRef}>
            <table className="table-messages">
              <tr>
                <td valign="bottom">
                  {messages.slice(0, counter).map(({ text, user }, i) => {
                    return (
                      <div key={i} className="message-block">
                        <div
                          className={`message ${
                            currentUser.username == user.username ? "mine" : ""
                          }`}>
                          {text}
                        </div>
                      </div>
                    );
                  })}
                </td>
              </tr>
            </table>
          </ScrollableFeed>
        </Group>
      </div>
      <div>
        <CustomWriteBar onSendMessage={addMessage} user={currentUser} />
      </div>
    </div>
  );
};

export default PMChat;
