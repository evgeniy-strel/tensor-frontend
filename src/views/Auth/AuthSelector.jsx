import { useState } from "react";
import {
  PanelHeader,
  Group,
  Div,
  Title,
  Text,
  FormLayout,
  FormItem,
  Input,
  Button,
} from "@vkontakte/vkui";
import classes from "./auth.module.scss";
import RequestAPI from "../../API/requests";
import { useDispatch } from "react-redux";
import { resetState } from "../../store/reducers/userSlice";
import { TEL_REGEXP, EMAIL_REGEXP } from "./regexp";

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
        <FormLayout onSubmit={handlerNext}>
          <FormItem
            htmlFor="email"
            status={
              !isValid &&
              (formData.email === "" ||
                (formData.email.includes("@") &&
                  !EMAIL_REGEXP.test(formData.email)) ||
                (!formData.email.includes("@") &&
                  !TEL_REGEXP.test(formData.email))) &&
              "error"
            }
            bottom={
              !isValid &&
              ((formData.email.includes("@") &&
                !EMAIL_REGEXP.test(formData.email) &&
                formData.email !== "" &&
                "Некорректная почта!") ||
                (!formData.email.includes("@") &&
                  !TEL_REGEXP.test(formData.email) &&
                  formData.email !== "" &&
                  "Некорректный телефон!") ||
                (!isValid && formData.email === "" && "Введите данные"))
            }
          >
            <Input
              id="email"
              type="text"
              placeholder="Телефон или почта"
              maxLength={40}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
          </FormItem>
          <FormItem>
            <Button onClick={handlerNext} size="l" stretched>
              Продолжить
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </>
  );
};

export default AuthSelector;
