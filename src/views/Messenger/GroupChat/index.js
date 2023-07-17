import React from "react";
import styles from "./index.module.scss";
import {
  PanelHeader,
  Group,
  PanelHeaderBack,
  Avatar,
  Div,
} from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";
import { messages } from "../../../mocks/messages";
import CustomWriteBar from "../CustomWriteBar";
import JoinToChat from "./JoinToChat";

const GroupChat = ({ chat, isUserJoined }) => {
  const [randomMessages, setRandomMessages] = React.useState(
    messages.filter((m) => Math.random() > 0.5)
  );

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate("/messenger");
  };

  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack onClick={onClickBack} />}
        after={
          <Avatar
            size={40}
            src={chat?.img}
            initials={chat?.img ? "" : chat?.name[0]}
            gradientColor="blue"
          />
        }>
        {chat?.name}
      </PanelHeader>
      <Group className={styles.messages}>
        {randomMessages.map(({ user, text, date }, i) => {
          return (
            <Div size="xs" key={i}>
              <div className={styles.messageBlock}>
                <Avatar
                  size={36}
                  src={user.img}
                  initials={user.img ? "" : user.username[0]}
                  gradientColor={2}
                />
                <div className={styles.message}>
                  <div className={styles.userName}>{user.username}</div>
                  <div className={styles.textDate}>
                    <span className={styles.text}>{text}</span>
                    <span className={styles.date}> 12 июля 19:29</span>
                  </div>
                </div>
              </div>
            </Div>
          );
        })}
      </Group>
      {isUserJoined ? <CustomWriteBar /> : <JoinToChat />}
    </>
  );
};

export default GroupChat;
