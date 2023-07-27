import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  PanelHeader,
  PanelHeaderBack,
  Avatar,
  PanelHeaderContent,
  calcInitialsAvatarColor,
} from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";
import CustomWriteBar from "../CustomWriteBar";
import LayoutMessages from "../LayoutMessages";
import { useSelector } from "react-redux";
import { getFullUrlImg } from "../../../utils/helpersMethods";
import { getFirstDigitGuid } from "./../../../utils/helpersMethods";

const PMChat = ({ id, users, messages }) => {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.user);
  const [receivedUser, setReceivedUser] = useState();
  const title = `${receivedUser?.external?.firstName} ${receivedUser?.external?.lastName}`;

  useEffect(() => {
    setReceivedUser(users?.find(({ user }) => user.id != currentUser.id).user);
  }, [users]);

  console.log(receivedUser);

  const onClickBack = () => {
    navigate("/messenger");
  };

  const onClickReceivedUser = () => {
    navigate(`/profile/${receivedUser?.id}`);
  };

  return (
    <div className="pm-chat-container">
      <PanelHeader
        className="panel-header-pm"
        before={<PanelHeaderBack onClick={onClickBack} />}>
        <PanelHeaderContent
          // status={<span className="was-online">Была онлайн</span>}
          onClick={onClickReceivedUser}
          before={
            <Avatar
              size={36}
              src={getFullUrlImg(receivedUser?.external?.avatar)}
              initials={receivedUser?.external?.firstName?.substr(0, 1)}
              onClick={onClickReceivedUser}
              gradientColor={calcInitialsAvatarColor(
                getFirstDigitGuid(receivedUser?.id)
              )}
            />
          }>
          <div className="chat-name">{title}</div>
        </PanelHeaderContent>
      </PanelHeader>
      <LayoutMessages>
        {messages.map(({ external }, i) => {
          return (
            <div
              key={i}
              className={`message-block ${
                currentUser?.id == external?.user?.id ? "mine" : ""
              }`}>
              <div className="message">{external?.message}</div>
            </div>
          );
        })}
      </LayoutMessages>
      <div>
        <CustomWriteBar chatId={id} user={currentUser} />
      </div>
    </div>
  );
};

export default PMChat;
