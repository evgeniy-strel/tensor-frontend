import React from "react";
import "./index.scss";
import { Avatar, Group, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { useNavigate } from "react-router";
import { Icon16Users } from "@vkontakte/icons";
import { useSelector } from "react-redux";
import { getFullUrlImg } from "../../../utils/helpersMethods";

const tagsMocks = [
  "Танцы",
  "Компания",
  "Поесть",
  "Песни",
  "Гитара",
  "тестовые теги",
];

const JoinChat = ({
  id,
  type,
  external: { title, avatar, isMuted, description, subChats, lastMessage },
  users,
  tags,
}) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  const isUserJoined = users.find((u) => u.id == user.id);

  const onJoin = () => {
    if (isUserJoined) return;
  };

  return (
    <div className="description-chat">
      <PanelHeader
        className="panel-header"
        before={<PanelHeaderBack onClick={onClickBack} />}>
        <span className="panel-header__title">Описание события</span>
      </PanelHeader>
      <Group className="description-chat__group">
        <main className="main">
          <div className="main__header">
            <div className="main__header__avatar">
              <Avatar size={64} src={getFullUrlImg(avatar)} />
            </div>
            <div className="main__header__info">
              <div className="main__header__info__title">{title}</div>
              <div className="main__header__info__users">
                <span className="main__header__info__users__count">
                  {users.length}
                </span>
                <span className="main__header__info__users__icon">
                  <Icon16Users />
                </span>
              </div>
            </div>
          </div>
          <div className="main__tags">
            {tagsMocks.map((tag, i) => (
              <div className="main__tags__tag" key={i}>
                {tag}
              </div>
            ))}
          </div>
          <div className="main__description">{description}</div>
          <div className="main__join">
            <div className="main__join__button" onClick={onJoin}>
              {isUserJoined ? "Вы уже присоеденены" : "Присоединиться"}
            </div>
          </div>
        </main>
      </Group>
    </div>
  );
};

export default JoinChat;
