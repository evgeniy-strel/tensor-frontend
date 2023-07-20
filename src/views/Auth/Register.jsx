import { useState } from "react";
import {
  PanelHeader,
  PanelHeaderBack,
  Group,
  FormLayout,
  FormStatus,
  FormItem,
  FormLayoutGroup,
  Input,
  Button,
  Div,
  Title,
} from "@vkontakte/vkui";
import classes from "./auth.module.scss";

const Register = ({ setActivePanel, formData, setFormData }) => {
  const [isValid, setIsValid] = useState(true);
  const [pass2, setPass2] = useState("");

  const handlerNext = (e) => {
    e.preventDefault();
    if (
      Object.values(formData).includes("") ||
      pass2 === "" ||
      pass2 !== formData.password ||
      formData.password.length < 8
    ) {
      setIsValid(false);
    } else {
      setActivePanel("profsetup");
    }
  };

  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => setActivePanel("selector")} />}
      >
        Регистрация
      </PanelHeader>
      <Group>
        <Div className={classes.header_title}>
          <Title level="2" weight="3">
            Регистрация в приложении
          </Title>
        </Div>
        <FormLayout onSubmit={handlerNext}>
          {!isValid && (
            <FormStatus header="Ошибка" mode="error">
              Введите данные
            </FormStatus>
          )}
          <FormLayoutGroup>
            <FormItem
              htmlFor="password"
              status={
                !isValid &&
                (formData.password === "" || formData.password.length < 8) &&
                "error"
              }
              bottom={
                formData.password !== "" &&
                formData.password.length < 8 &&
                "Длина пароля должна быть больше 8 символов"
              }
            >
              <Input
                id="password"
                type="password"
                autoComplete="on"
                placeholder="Пароль"
                maxLength={32}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
              />
            </FormItem>
            <FormItem
              htmlFor="password2"
              maxLength={32}
              status={
                !isValid &&
                (pass2 === "" || formData.password !== pass2) &&
                "error"
              }
              bottom={
                !isValid &&
                (pass2 === "" || formData.password !== pass2) &&
                "Пароли не совпадают!"
              }
              style={{ paddingTop: "4px" }}
            >
              <Input
                id="password2"
                type="password"
                autoComplete="on"
                placeholder="Повторный пароль"
                onChange={(e) => setPass2(e.target.value)}
                value={pass2}
              />
            </FormItem>
          </FormLayoutGroup>
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

export default Register;
