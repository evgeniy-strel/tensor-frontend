import { useState, useEffect } from "react";
import { PanelHeader, Group, Div, Title, Text } from "@vkontakte/vkui";
import FormSlctr from "./FormSlctr";
import RequestAPI from "../../../API/requests";
import { useDispatch } from "react-redux";
import { resetState } from "../../../store/reducers/userSlice";
import { TEL_REGEXP, EMAIL_REGEXP } from "../regexp";
import classes from "../auth.module.scss";

const AuthSelector = ({ setActivePanel, formData, setFormData }) => {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);

  const handlerNext = (e) => {
    e.preventDefault();
    if (
      formData.email === "" ||
      (formData.email.includes("@") && !EMAIL_REGEXP.test(formData.email)) ||
      (!formData.email.includes("@") && !TEL_REGEXP.test(formData.email))
    ) {
      setIsValid(false);
    } else {
      dispatch(resetState());
      // проверка на наличие пользователя в базе
      RequestAPI.loginFind(formData.email)
        .then((res) => setActivePanel("login"))
        .catch((rej) => setActivePanel("register"));
    }
  };

  useEffect(() => {
    setFormData({ ...formData, password: "" });
  }, []);

  return (
    <>
      <PanelHeader>Название приложения</PanelHeader>
      <Group>
        <Div className={classes.header}>
          <Title level="2" weight="3">
            Вход в приложение
          </Title>
          <Text>
            Введите номер телефона или почту, чтобы войти или зарегистрироваться
          </Text>
        </Div>
        <FormSlctr
          handlerNext={handlerNext}
          isValid={isValid}
          formData={formData}
          setFormData={setFormData}
        />
      </Group>
    </>
  );
};

export default AuthSelector;
