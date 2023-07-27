import React from "react";
import "./MyChatItem.scss";
import { Cell, Avatar, Headline } from "@vkontakte/vkui";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { activeTabChatSelector } from "../../../store/selectors/chatSelectors";
import { getFormatedDate, getFullUrlImg } from "../../../utils/helpersMethods";
import cn from "classnames";

const SubtitleGroup = ({ lastMessage, subChats }) => {
  const subChatsFormated = subChats?.length ? subChats.join(", ") : "";
  const external = lastMessage?.external;

  return (
    <>
      {Boolean(subChats?.length) && (
        <Headline level="1" className="subchats">
          {subChatsFormated}
        </Headline>
      )}
      <Headline level="1" className="last-message">
        <span className="username">{external?.user?.firstName}</span>
        <span className="text">
          {external?.message && ": "}
          {external?.message || "Напишите первое сообщение!"}
        </span>
      </Headline>
    </>
  );
};

const SubtitlePM = ({ lastMessage }) => {
  const external = lastMessage?.external;

  return (
    <Headline level="1" className="last-message">
      {external?.message || "Напишите первое сообщение!"}
    </Headline>
  );
};

const MyChatItem = ({
  id,
  type,
  external: { title: titleGroup, avatar: avatarGroup, subChats },
  hideAvatar,
  isSelected,
  lastMessage,
  user: receivedUser,
  date,
}) => {
  const isGroup = type == "group" || type == "event";

  const currentUser = useSelector((state) => state.user.user);
  const url = `/messenger/chat/${id}`;

  const title = isGroup
    ? titleGroup
    : `${receivedUser?.external?.firstName} ${receivedUser?.external?.lastName}`;

  const avatar = isGroup ? avatarGroup : receivedUser?.external?.avatar;

  let formatedDate = getFormatedDate(date);

  if (type == "private" && !receivedUser) return <></>;

  return (
    <Link to={url} key={id}>
      <Cell
        className={cn("chat-item", {
          "group-item": type != "private",
          "with-subchats": subChats?.length,
          selected: isSelected,
        })}
        before={
          !hideAvatar && (
            <Avatar size={56} src={getFullUrlImg(avatar)} className="avatar" />
          )
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
            {formatedDate}
          </Headline>
        }>
        <Headline level="1" className="name-chat">
          {title}
        </Headline>
      </Cell>
    </Link>
  );
};

export default MyChatItem;
