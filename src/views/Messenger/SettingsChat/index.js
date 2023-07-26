import { useState } from "react";
import "./index.scss";
import {
  PanelHeader,
  Image,
  PanelHeaderBack,
  Title,
  Tabbar,
  TabbarItem,
  Group,
  Tabs,
} from "@vkontakte/vkui";
import {
  Icon28ChainOutline,
  Icon28Notifications,
  Icon28DoorArrowLeftOutline,
} from "@vkontakte/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getCaseOfUchastnik,
  getFullUrlImg,
} from "../../../utils/helpersMethods";

const tabbarItems = [
  {
    icon: <Icon28ChainOutline />,
    text: "Ссылка на чат",
  },
  {
    icon: <Icon28Notifications />,
    text: "Уведомления",
  },
  {
    icon: <Icon28DoorArrowLeftOutline />,
    text: "Выйти",
  },
];

const tabs = [
  {
    id: "users",
    text: "Участники",
  },
  {
    id: "images",
    text: "Фото",
  },
  {
    id: "files",
    text: "Файлы",
  },
  {
    id: "links",
    text: "Ссылки",
  },
];

const SettingsChat = ({
  id,
  external: { title, avatar },
  users,
  messages: historyMessages,
}) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="settings-chat">
      <PanelHeader
        className="settings-chat__panel_header"
        before={<PanelHeaderBack onClick={onClickBack} />}
        separator={false}
      />
      <Group className="settings-chat__group">
        <div className="chat-container">
          <Image size={96} borderRadius="s" src={getFullUrlImg(avatar)} />
          <div className="chat-container__text">
            <Title className="chat-container__text__title" level="2">
              {title}
            </Title>
            <div className="chat-container__text__count-users">
              {users.length} {getCaseOfUchastnik(users.length)}
            </div>
          </div>
          <div className="chat-container__buttons">
            <Tabbar className="chat-container__buttons__tabbar" shadow={false}>
              {tabbarItems.map(({ icon, text }) => (
                <TabbarItem
                  className="chat-container__buttons__tabbar-item"
                  selected={true}
                  onClick={() => {}}
                  text={text}>
                  {icon}
                </TabbarItem>
              ))}
            </Tabbar>
          </div>
        </div>
        <div className="users-list">
          {/* <Tabs className="users-list__tabbar">
            {tabs.map(({ text }) => (
              <TabsItem
                selected={selected === id}
                onClick={() => {
                  setSelected(id);
                }}
                id={id}
                aria-controls={id}>
                {text}
              </TabsItem>
            ))}
          </Tabs> */}
        </div>
      </Group>
    </div>
  );
};

export default SettingsChat;
