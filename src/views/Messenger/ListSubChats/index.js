import React from "react";
import "./index.scss";
import { Icon16Muted } from "@vkontakte/icons";
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
import {
  getFirstDigitGuid,
  getFullUrlImg,
} from "./../../../utils/helpersMethods";

const ListSubChats = ({
  id,
  external: { title, avatar, subChats, lastMessage },
  users,
}) => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  // TO DO: пока нет subChats, добавить их обработку

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
              src={getFullUrlImg(avatar)}
              initials={title?.at(0)}
              gradientColor={getFirstDigitGuid(id)}
            />
          }>
          <div className="subchats-container__panel-header__title-icon">
            <Title
              level="3"
              className="subchats-container__panel-header__title">
              {title}
            </Title>
            <Icon16Muted
              fill="#B8C1CC"
              className="subchats-container__panel-header__icon"
            />
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
