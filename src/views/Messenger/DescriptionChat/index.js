import React from "react";
import "./index.scss";
import { Avatar, Group, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { useNavigate } from "react-router";
import { Icon16Users } from "@vkontakte/icons";

const tags = ["Танцы", "Компания", "Поесть", "Песни", "Гитара"];

const DescriptionChat = () => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate("/messenger");
  };

  return (
    <div className="description-chat">
      <PanelHeader className="panel-header" before={<PanelHeaderBack onClick={onClickBack} />}>
        <span className="panel-header__title">Описание события</span>
      </PanelHeader>
      <Group className="description-chat__group">
        <main className="main">
          <div className="main__header">
            <div className="main__header__avatar">
              <Avatar size={64} src="/img/group-avatar.png" />
            </div>
            <div className="main__header__info">
              <div className="main__header__info__title">Песни под гитару</div>
              <div className="main__header__info__users">
                <span className="main__header__info__users__count">12</span>
                <span className="main__header__info__users__icon">
                  <Icon16Users />
                </span>
              </div>
            </div>
          </div>
          <div className="main__tags">
            {tags.map((tag) => (
              <div className="main__tags__tag">{tag}</div>
            ))}
          </div>
          <div className="main__description">
            {`Мы общаемся на тему гитар и аккордов.\nПравила чата:\n-Не кушать\n-Играть на гитаре\n`}
          </div>
          <div className="main__join">
            <div className="main__join__button">Присоединиться</div>
          </div>
        </main>
      </Group>
    </div>
  );
};

export default DescriptionChat;
