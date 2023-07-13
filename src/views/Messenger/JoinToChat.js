import React from "react";
import styles from "./JoinToChat.module.scss";
import { FixedLayout, Separator, Div } from "@vkontakte/vkui";

const JoinToChat = () => {
  return (
    <FixedLayout vertical="bottom" filled>
      <div>
        <Separator wide />
        <Div className={styles.joinText}>Присоединиться</Div>
      </div>
    </FixedLayout>
  );
};

export default JoinToChat;
