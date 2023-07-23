import React from "react";
import "./ChatItem.scss";
import { Cell, Avatar, Headline } from "@vkontakte/vkui";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { activeTabChatSelector } from "./../../store/selectors/chatSelectors";
import { getFullUrlImg } from "../../utils/helpersMethods";

const SubtitleGroup = ({ lastMessage, subChats }) => {
  const subChatsFormated = subChats ? subChats.join(", ") : "";

  return (
    <>
      {Boolean(subChats) && (
        <Headline level="1" className="subchats">
          {subChatsFormated}
        </Headline>
      )}
      <Headline level="1" className="last-message">
        <span className="username">{lastMessage?.user.username}</span>
        {lastMessage?.text && ": "}
        {lastMessage?.text || "Напишите первое сообщение!"}
      </Headline>
    </>
  );
};

const SubtitlePM = ({ lastMessage }) => (
  <Headline level="1" className="last-message">
    {lastMessage?.text || "Напишите первое сообщение!"}
  </Headline>
);

const ChatItem = ({
  id,
  type,
  external: { title, avatar, subChats, lastMessage },
}) => {
  const activeTab = useSelector(activeTabChatSelector);
  const isUserJoined = activeTab == "my_chats";
  let url;

  if (isUserJoined && !subChats?.length) url = `/messenger/chat/${id}`;
  else if (isUserJoined && subChats?.length) url = `/messenger/subchats/${id}`;
  else url = `/messenger/description/${id}`;

  return (
    <Link to={url} key={id}>
      <Cell
        className={`chat-item ${type == "private" ? "" : "group-item"} ${
          subChats ? "with-subchats" : ""
        }`}
        before={
          <Avatar size={56} src={getFullUrlImg(avatar)} className="avatar" />
        }
        subtitle={
          type == "private" ? (
            <SubtitlePM lastMessage={lastMessage} />
          ) : (
            <SubtitleGroup lastMessage={lastMessage} subChats={subChats} />
          )
        }
        indicator={
          <Headline level="1" className="time-message">
            17:58
          </Headline>
        }>
        <Headline level="1" className="name-chat">
          {title}
        </Headline>
      </Cell>
    </Link>
  );
};

export default ChatItem;
