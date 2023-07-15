import React from "react";
import { Cell, Avatar, Headline } from "@vkontakte/vkui";
import { Link } from "react-router-dom";

const ChatItem = ({ id, name, img, isGroup, lastMessage }) => {
  return (
    <Link to={`${id}`} key={id}>
      <Cell
        className={`chat-item ${isGroup ? "group-item" : ""}`}
        before={<Avatar size={72} src={img} className="avatar" />}
        subtitle={
          <Headline level="1" className="last-message">
            {lastMessage}
          </Headline>
        }
        indicator={
          <Headline level="1" className="time-message">
            17:58
          </Headline>
        }>
        <Headline level="2" weight="2" className="name-chat">
          {name}
        </Headline>
      </Cell>
    </Link>
  );
};

export default ChatItem;
