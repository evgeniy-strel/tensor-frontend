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

const AuthSelector = ({ setActivePanel, formData, setFormData }) => {
  const [isValid, setIsValid] = useState(true);
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const handlerNext = (e) => {
    e.preventDefault();
    if (formData.email === "" || !EMAIL_REGEXP.test(formData.email)) {
      setIsValid(false);
    } else {
      // проверка на наличие пользователя в базе
      if (false) setActivePanel("login");
      else setActivePanel("register");
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
              (formData.email === "" || !EMAIL_REGEXP.test(formData.email)) &&
              "error"
            }
            bottom={
              (!EMAIL_REGEXP.test(formData.email) &&
                formData.email !== "" &&
                "Некорректная почта!") ||
              (!isValid && formData.email === "" && "Введите данные")
            }
          >
            <Input
              id="email"
              type="email"
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
