import { View, Panel } from "@vkontakte/vkui";
import { Outlet } from "react-router-dom";
import AuthSelector from "../components/auth/AuthSelector";
import useStory from "../hooks/useStory";

const panels = [
  { id: "login", title: "Вход" },
  { id: "forgot", title: "Восстановления пароля" },
];

const Auth = () => {
  const [activePanel, setActivePanel] = useStory("/auth", "selector", 2);

  return (
    <View id="auth" activePanel={activePanel}>
      <Panel id="selector">
        <AuthSelector setActivePanel={setActivePanel} />
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
