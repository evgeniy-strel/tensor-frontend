import { useState, useEffect } from "react";
import "./index.scss";
import {
  PanelHeader,
  Image,
  PanelHeaderBack,
  Title,
  Group,
  Tabs,
  TabsItem,
  Separator,
  List,
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getCaseOfUchastnik,
  getFullUrlImg,
} from "../../../utils/helpersMethods";
import UserItem from "./UserItem";
import Tabbar from "./Tabbar";
import {
  addBounceEffect,
  removeBounceEffect,
} from "./../../../utils/bounceEffect";

const tabs = [
  {
    id: "users",
    text: "Участники",
  },
  // {
  //   id: "images",
  //   text: "Фото",
  // },
  // {
  //   id: "files",
  //   text: "Файлы",
  // },
  // {
  //   id: "links",
  //   text: "Ссылки",
  // },
];

const SettingsChat = ({ id, external: { title, avatar }, users }) => {
  console.log(id, title);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const [selected, setSelected] = useState(tabs[0].id);

  const onClickBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    removeBounceEffect();

    return () => addBounceEffect();
  }, []);

  return (
    <div className="settings-chat">
      <PanelHeader
        className="settings-chat__panel_header"
        before={<PanelHeaderBack onClick={onClickBack} />}
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
            <Tabbar id={id} />
          </div>
        </div>
        <Separator className="separator-content" />
        <div className="users-list">
          <Tabs className="users-list__tabs">
            {tabs.map(({ text, id }) => (
              <TabsItem
                className="users-list__tabs__tab"
                selected={selected === id}
                onClick={() => {
                  setSelected(id);
                }}
                id={id}
                key={id}
                aria-controls={id}>
                {text}
              </TabsItem>
            ))}
          </Tabs>
        </div>
        <List>
          {users.map(({ user }) => (
            <UserItem key={user.id} {...user} />
          ))}
        </List>
      </Group>
    </div>
  );
};

export default SettingsChat;
