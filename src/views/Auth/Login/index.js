import { useState } from "react";
import {
  PanelHeader,
  PanelHeaderBack,
  Group,
  PanelSpinner,
  Div,
  Title,
  Text,
} from "@vkontakte/vkui";
import { useSelector, useDispatch } from "react-redux";
import { postLogin } from "../../../store/reducers/userSlice";
import FormLog from "./FormLog";
import classes from "../auth.module.scss";

const Login = ({ setActivePanel, formData, setFormData }) => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.user.loginState);
  const [isValid, setIsValid] = useState(true);

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setIsValid(false);
    } else {
      dispatch(
        postLogin({
          email: formData.email,
          password: formData.password,
        })
      );
    }
  };

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
          <FormLog
            setActivePanel={setActivePanel}
            formData={formData}
            setFormData={setFormData}
            isValid={isValid}
            handlerSubmit={handlerSubmit}
            loginState={loginState}
          />
        )}
      </Group>
    </>
  );
};

export default Login;
