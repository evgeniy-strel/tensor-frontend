import {
  PanelHeader,
  Group,
  ButtonGroup,
  Button,
  Header,
  SimpleCell,
} from "@vkontakte/vkui";
import { Icon28ChevronRightOutline } from '@vkontakte/icons';
import { useNavigate } from "react-router-dom";

const AuthSelector = ({ setActivePanel }) => {
  const navigate = useNavigate();

  return (
    <>
      <PanelHeader>Вход</PanelHeader>
      <Group header={<Header mode="secondary">Вход в приложение</Header>}>
        <SimpleCell
          onClick={() => setActivePanel("login")}
          expandable
          // after={<Icon28ChevronRightOutline/>}
        >
          Войти по телефону или почте
        </SimpleCell>
        <SimpleCell
          onClick={() => navigate("/register")}
          expandable
          // after={<Icon28ChevronRightOutline/>}
        >
          Зарегистрироваться 
        </SimpleCell>
        {/* <ButtonGroup mode="vertical" gap="m">
          <Button
            onClick={() => setActivePanel("login")}
            size="l"
            stretched
            appearance="neutral"
          >
            Войти по телефону или почте
          </Button>
          <Button
            onClick={() => navigate("/register")}
            size="l"
            stretched
            appearance="neutral"
          >
            Войти по телефону или почте
          </Button>
        </ButtonGroup> */}
      </Group>
    </>
  );
};

export default AuthSelector;
