import { useState, useEffect } from "react";
import { View, Panel } from "@vkontakte/vkui";
import { useLocation, Outlet } from "react-router-dom";
import AuthSelector from "../components/auth/AuthSelector";

const panels = [
  { id: "login", title: "Вход" },
  { id: "forgot", title: "Восстановления пароля" },
];

const Auth = () => {
  const location = useLocation();

  const currentStory = () => {
    return location.pathname === "/auth"
      ? "selector"
      : location.pathname.split("/")[2];
  };

  const [activePanel, setActivePanel] = useState(currentStory());

  useEffect(() => {
    setActivePanel(currentStory());
  }, []);

  return (
    <View id="auth" activePanel={activePanel}>
      <Panel id="selector">
        <AuthSelector setActivePanel={setActivePanel}/>
      </Panel>
      {panels.map((el) => (
        <Panel id={el.id} key={el.id}>
          <Outlet id={activePanel} context={[setActivePanel]} />
        </Panel>
      ))}
    </View>
  );
};

export default Auth;
