import { PanelHeader, Group, Header, SimpleCell } from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";

const AuthSelector = ({ setActivePanel }) => {
  const navigate = useNavigate();

  return (
    <>
      <PanelHeader>Вход</PanelHeader>
      <Group header={<Header mode="secondary">Вход в приложение</Header>}>
        <SimpleCell onClick={() => setActivePanel("login")} expandable>
          Войти по телефону или почте
        </SimpleCell>
        <SimpleCell onClick={() => navigate("/register")} expandable>
          Зарегистрироваться
        </SimpleCell>
      </Group>
    </>
  );
};

export default AuthSelector;
