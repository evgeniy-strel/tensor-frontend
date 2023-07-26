import "./Messages.scss";
import { Avatar } from "@vkontakte/vkui";
import { useSelector } from "react-redux";

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

        const initials = user?.name
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
              <div className="username">{user?.name}</div>
              <div className="text">{message}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Messages;
