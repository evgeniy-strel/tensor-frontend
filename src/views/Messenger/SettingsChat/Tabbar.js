import React from "react";
import { Tabbar, TabbarItem, Avatar, Snackbar } from "@vkontakte/vkui";
import copy from "copy-to-clipboard";
import { useDispatch } from "react-redux";
import {
  Icon28ChainOutline,
  Icon28Notifications,
  Icon28DoorArrowLeftOutline,
  Icon16Done,
} from "@vkontakte/icons";
import { leaveUserChat } from "../../../store/reducers/chatSlice";
import { useNavigate } from "react-router";

const TabbarCustom = ({ id }) => {
  const [snackbar, setSnackbar] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openSnackbar = (isSucceeded) => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={
          <Avatar
            size={24}
            style={{ background: "var(--vkui--color_background_accent)" }}>
            <Icon16Done fill="#fff" width={14} height={14} />
          </Avatar>
        }>
        {isSucceeded
          ? "Ссылка скопирована"
          : "Не удалось скопировать ссылку, попробуйте еще раз!"}
      </Snackbar>
    );
  };

  const copyLink = () => {
    const link = `http://176.215.13.242:3000/messenger/join/${id}`; // server url
    openSnackbar(copy(link));
  };

  console.log(id);

  const leaveChat = () => {
    dispatch(leaveUserChat({ chatId: id }));
    navigate("/messenger");
  };

  const tabbarItems = [
    {
      icon: <Icon28ChainOutline />,
      text: "Ссылка на чат",
      onClick: copyLink,
    },
    // {
    //   icon: <Icon28Notifications />,
    //   text: "Уведомления",
    // },
    {
      icon: <Icon28DoorArrowLeftOutline style={{ color: "#E64646" }} />,
      text: <span style={{ color: "#E64646" }}>Выйти</span>,
      onClick: leaveChat,
    },
  ];

  return (
    <>
      <Tabbar className="chat-container__buttons__tabbar" shadow={false}>
        {tabbarItems.map(({ icon, text, onClick }, i) => (
          <TabbarItem
            className="chat-container__buttons__tabbar-item"
            selected={true}
            onClick={onClick}
            text={text}
            key={i}>
            {icon}
          </TabbarItem>
        ))}
      </Tabbar>
      {snackbar}
    </>
  );
};

export default TabbarCustom;
