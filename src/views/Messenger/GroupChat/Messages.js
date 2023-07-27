import "./Messages.scss";
import { Avatar, calcInitialsAvatarColor } from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import {
  getFirstDigitGuid,
  getFullUrlImg,
} from "./../../../utils/helpersMethods";

const Messages = ({ messages }) => {
  const currentUser = useSelector((state) => state.user.user);

  if (messages.length == 0)
    return (
      <div className="empty-block-messages">
        <div className="empty-block-messages__emojy">👋</div>
        <div>Напишите первое сообщение!</div>
      </div>
    );

  return (
    <>
      {messages.map(({ external: { message, user } }, i) => {
        const isMine = currentUser?.id == user?.id;

        let isFirstMessage = true;
        let isLastMessage = true;

        if (i != 0) {
          const prevMessage = messages[i - 1];
          isFirstMessage = user?.id != prevMessage?.external.user.id;
        }

        if (i != messages.length - 1) {
          const nextMessage = messages[i + 1];
          isLastMessage = user?.id != nextMessage?.external.user?.id;
        }

        const initials =
          user?.firstName &&
          user?.lastName &&
          `${user?.firstName?.substr(0, 1)}${user?.lastName?.substr(0, 1)}`;

        return (
          <div
            key={i}
            className={`message-block ${
              isFirstMessage ? "first-message" : ""
            } ${isLastMessage ? "last-message" : ""} ${isMine ? "mine" : ""}`}>
            <Avatar
              size={32}
              initials={initials}
              src={getFullUrlImg(user?.avatar)}
              className="user-avatar"
              gradientColor={calcInitialsAvatarColor(
                getFirstDigitGuid(user?.id)
              )}
            />
            <div className="message">
              <div className="username">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text">{message}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Messages;
