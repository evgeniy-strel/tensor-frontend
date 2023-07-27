import React from "react";
import {
  Cell,
  Avatar,
  Headline,
  calcInitialsAvatarColor,
} from "@vkontakte/vkui";

import { Link } from "react-router-dom";
import {
  getFirstDigitGuid,
  getFullUrlImg,
} from "./../../../utils/helpersMethods";

const UserItem = ({ id, external: { avatar, firstName, lastName } }) => {
  return (
    <Link to={`/profile/${id}`} key={id}>
      <Cell
        before={
          <Avatar
            gradientColor={calcInitialsAvatarColor(getFirstDigitGuid(id))}
            size={40}
            src={getFullUrlImg(avatar)}
            className="avatar"
          />
        }>
        <Headline level="1" className="name-chat">
          {firstName} {lastName}
        </Headline>
      </Cell>
    </Link>
  );
};

export default UserItem;
