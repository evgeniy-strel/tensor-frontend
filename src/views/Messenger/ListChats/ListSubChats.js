import React from "react";
import { Group, List } from "@vkontakte/vkui";
import MyChatItem from "./MyChatItem";

const ListSubChats = ({ children }) => {
  return (
    <div className="subchats-group">
      <List className="subchats-group__list list-chats">{children}</List>
    </div>
  );
};

export default ListSubChats;
