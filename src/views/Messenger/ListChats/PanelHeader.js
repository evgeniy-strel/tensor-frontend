import React from "react";
import "./PanelHeader.scss";
import {
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderContent,
  Avatar,
  Title,
  calcInitialsAvatarColor,
} from "@vkontakte/vkui";
import { Icon16Muted } from "@vkontakte/icons/";
import {
  Icon28Search,
  Icon28SlidersOutline,
  Icon28AddOutline,
} from "@vkontakte/icons";
import { getFullUrlImg } from "../../../utils/helpersMethods";
import { getFirstDigitGuid } from "./../../../utils/helpersMethods";
import { useNavigate } from "react-router-dom";

const PanelHeaderSubchats = ({ title, id = "666", avatar, onClickBack }) => (
  <div className="subchats-header">
    <PanelHeader
      className="subchats-header__panel-header panel-header"
      before={<PanelHeaderBack onClick={onClickBack} />}>
      <PanelHeaderContent
        className="subchats-header__panel-header__content"
        before={
          <Avatar
            size={36}
            src={getFullUrlImg(avatar)}
            initials={title?.at(0)}
            gradientColor={calcInitialsAvatarColor(getFirstDigitGuid(id))}
          />
        }>
        <div className="subchats-header__panel-header__title-icon">
          <Title level="3" className="subchats-header__panel-header__title">
            {title}
          </Title>
          {/* <Icon16Muted
            fill="#B8C1CC"
            className="subchats-header__panel-header__icon"
          /> */}
        </div>
      </PanelHeaderContent>
    </PanelHeader>
  </div>
);

const PanelHeaderListChats = ({ showSubChats, isSearchActive, setSearch }) => {
  const navigate = useNavigate();

  const createChatFunc = () => {
    navigate("/messenger/create_chat");
  };

  return (
    <div className="chats-header">
      <PanelHeader
        className="panel-header"
        separator={false}
        after={
          <>
            <Icon28AddOutline onClick={createChatFunc} />
            {/* <Icon28SlidersOutline /> */}
            {isSearchActive ? (
              <img
                src="/icons/search-close.svg"
                onClick={() => setSearch((s) => ({ ...s, isActive: false }))}
              />
            ) : (
              <Icon28Search
                onClick={() => setSearch((s) => ({ ...s, isActive: true }))}
              />
            )}
          </>
        }>
        <span>Сообщения</span>
      </PanelHeader>
    </div>
  );
};

const PanelHeaderResult = ({
  isShownSubchats,
  hideSubChats,
  showSubChats,
  title,
  avatar,
  isSearchActive,
  setSearch,
}) => {
  if (isShownSubchats)
    return (
      <PanelHeaderSubchats
        title={title}
        avatar={avatar}
        onClickBack={hideSubChats}
      />
    );

  return (
    <PanelHeaderListChats
      setSearch={setSearch}
      isSearchActive={isSearchActive}
      showSubChats={showSubChats}
    />
  );
};

export default PanelHeaderResult;
