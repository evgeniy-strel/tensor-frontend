import React from "react";
import "./MyChatItem.scss";
import "./ReccomendChatItem.scss";
import {
  Cell,
  Avatar,
  Headline,
  calcInitialsAvatarColor,
} from "@vkontakte/vkui";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { activeTabChatSelector } from "../../../store/selectors/chatSelectors";
import { getFullUrlImg } from "../../../utils/helpersMethods";
import cn from "classnames";
import { getFirstDigitGuid } from "./../../../utils/helpersMethods";

const ReccomendChatItem = (item) => {
  const isGroup = item?.type == "group";
  const { id, external } = item;

  const url = isGroup ? `/messenger/join/${id}` : `/profile/${id}`;
  const title = isGroup
    ? external?.title
    : `${external?.firstName} ${external?.lastName}`;

  return (
    <Link to={url} key={id}>
      <Cell
        className={cn("chat-item", "chat-reccomend", {
          "group-item": isGroup,
        })}
        before={
          !item?.hideAvatar && (
            <Avatar
              size={56}
              src={getFullUrlImg(external?.avatar)}
              gradientColor={calcInitialsAvatarColor(getFirstDigitGuid(id))}
              initials={title?.at(0)}
              className="avatar"
            />
          )
        }
        subtitle={
          <Headline level="1">{external?.percent}% совпадений</Headline>
        }>
        <Headline level="1" className="name-chat">
          {title}
        </Headline>
      </Cell>
    </Link>
  );
};

export default ReccomendChatItem;
