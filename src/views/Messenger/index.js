import React from "react";
import { View, Panel } from "@vkontakte/vkui";
import { useLocation } from "react-router-dom";
import Chat from "./Chat";
import ListChats from "./ListChats";

const panels = [
  { id: "listChats", element: <ListChats /> },
  { id: "chat", element: <Chat /> },
];

// компонент необходим для плавной анимации

const Messenger = () => {
  const location = useLocation();
  const activePanel = location.pathname === "/messenger" ? "listChats" : "chat";

  return (
    <>
      <View id="messenger" activePanel={activePanel}>
        {panels.map(({ id, element }) => (
          <Panel key={id} id={id}>
            {element}
          </Panel>
        ))}
      </View>
    </>
  );
};

export default Messenger;
