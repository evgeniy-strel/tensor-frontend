import { useEffect } from "react";
import {
  PanelHeader,
  PanelHeaderBack,
  Group,
  PanelSpinner,
  Div,
  Title,
  Text,
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import FormLogin from "./FormLogin";
import classes from "../auth.module.scss";

const Login = ({ setActivePanel, formData, setFormData }) => {
  const loginState = useSelector((state) => state.user.loginState);

  useEffect(() => {
    setFormData({ ...formData, password: "" });
  }, []);

  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => setActivePanel("selector")} />}
      >
        Вход
      </PanelHeader>
      <Group>
        <Div className={classes.header}>
          <Title level="2" weight="3">
            Вход в приложение
          </Title>
          <Text>Введите пароль от аккаунта</Text>
        </Div>
        {loginState.loader ? (
          <PanelSpinner size="medium" />
        ) : (
          <FormLogin
            setActivePanel={setActivePanel}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </Group>
    </>
  );
};

export default Login;
