import { Avatar } from "@vkontakte/vkui";
import React from "react";

const MessageItem = ({ messages, currentUser }) => {
  return <></>;

  return (
    <>
      {messages.map(({ text, user }, i) => {
        const isMine = currentUser.username == user.username;

        let isFirstMessage = true;
        let isLastMessage = true;

        if (i != 0) {
          const prevMessage = messages[i - 1];
          isFirstMessage = user.username != prevMessage?.user.username;
        }

        if (i != messages.length - 1) {
          const nextMessage = messages[i + 1];
          isLastMessage = user.username != nextMessage?.user?.username;
        }

        const initials = user.username
          .split(" ")
          .slice(0, 2)
          .map((symbol) => (symbol.length ? symbol[0] : ""))
          .join("")
          .toUpperCase();

        return (
          <div
            key={i}
            className={`message-block ${
              isFirstMessage ? "first-message" : ""
            } ${isLastMessage ? "last-message" : ""} ${isMine ? "mine" : ""}`}>
            <Avatar
              size={32}
              initials={initials}
              src={user.img}
              className="user-avatar"
            />
            <div className="message">
              <div className="username">{user.username}</div>
              <div className="text">{text}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MessageItem;
