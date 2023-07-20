import React from "react";
import "./index.scss";
import { Icon16Muted } from "@vkontakte/icons";
import { allChats, subChats } from "../../../mocks/chats";
import {
  Avatar,
  Group,
  List,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderContent,
  Title,
} from "@vkontakte/vkui";

import { useNavigate, useParams } from "react-router-dom";
import ChatItem from "../ChatItem";

const ListSubChats = () => {
  const { id } = useParams();
  const chat = allChats.find((chat) => chat.id == id);

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate("/messenger");
  };

  return (
    <div className="subchats-container">
      <PanelHeader
        className="subchats-container__panel-header"
        before={<PanelHeaderBack onClick={onClickBack} />}>
        <PanelHeaderContent
          className="subchats-container__panel-header__content"
          before={
            <Avatar
              size={36}
              src={chat?.img}
              initials={chat?.img ? "" : chat?.name?.at(0)}
              gradientColor="blue"
            />
          }>
          <div className="subchats-container__panel-header__title-icon">
            <Title level="3" className="subchats-container__panel-header__title">
              {chat?.name}
            </Title>
            <Icon16Muted fill="#B8C1CC" className="subchats-container__panel-header__icon" />
          </div>
        </PanelHeaderContent>
      </PanelHeader>
      <Group>
        <List className="list-chats">
          {subChats.map((chat) => {
            return <ChatItem {...chat} />;
          })}
        </List>
      </Group>
    </div>
  );
};

export default ListSubChats;
