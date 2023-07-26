import React from "react";
import { Group, List } from "@vkontakte/vkui";
import ChatItem from "./ChatItem";

const ListSubChats = ({ subChats }) => {
  return (
    <div className="subchats-group">
      <List className="subchats-group__list list-chats">
        {subChats.map((chat, i) => (
          <ChatItem key={i} hideAvatar={true} {...chat} />
        ))}
      </List>
    </div>
  );
};

export default ListSubChats;
