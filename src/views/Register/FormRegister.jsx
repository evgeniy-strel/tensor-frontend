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
} from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";

const FormRegister = ({ formData, setFormData, setActivePanel }) => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [pass2, setPass2] = useState("");
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const handlerNext = (e) => {
    e.preventDefault();
    if (
      Object.values(formData).includes("") ||
      pass2 === "" ||
      pass2 !== formData.password ||
      !EMAIL_REGEXP.test(formData.email) ||
      formData.password.length < 8
    ) {
      setIsValid(false);
    } else {
      setActivePanel("verify");
    }
  };

  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => navigate("/auth")} />}
      >
        Регистрация
      </PanelHeader>
      <Group>
        <FormLayout onSubmit={handlerNext}>
          {!isValid && (
            <FormStatus header="Ошибка" mode="error">
              Введите данные
            </FormStatus>
          )}
          <FormItem
            top="Имя пользователя"
            htmlFor="username"
            status={!isValid && formData.username === "" && "error"}
          >
            <Input
              id="username"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              value={formData.username}
            />
          </FormItem>
          <FormLayoutGroup mode="horizontal" segmented>
            <FormItem
              top="Имя"
              htmlFor="firstName"
              status={!isValid && formData.firstName === "" && "error"}
            >
              <Input
                id="firstName"
                type="text"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  })
                }
                value={formData.firstName}
              />
            </FormItem>
            <FormItem
              top="Фамилия"
              htmlFor="lastName"
              status={!isValid && formData.lastName === "" && "error"}
            >
              <Input
                id="lastName"
                type="text"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastName: e.target.value,
                  })
                }
                value={formData.lastName}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormItem
            top="Дата рождения"
            htmlFor="dateBirth"
            status={!isValid && formData.dateBirth === "" && "error"}
          >
            <Input
              id="dateBirth"
              type="date"
              onChange={(e) =>
                setFormData({ ...formData, dateBirth: e.target.value })
              }
              value={formData.dateBirth}
            />
          </FormItem>
          <FormLayoutGroup mode="horizontal" segmented>
            <FormItem
              top="Почта"
              htmlFor="email"
              status={
                !isValid &&
                (formData.email === "" || !EMAIL_REGEXP.test(formData.email)) &&
                "error"
              }
              bottom={
                !EMAIL_REGEXP.test(formData.email) &&
                formData.email !== "" &&
                "Некорректная почта!"
              }
            >
              <Input
                id="email"
                type="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormLayoutGroup>
            <FormItem
              top="Пароль"
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
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
              />
            </FormItem>
            <FormItem
              top="Повторный пароль"
              htmlFor="password2"
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
            >
              <Input
                id="password2"
                type="password"
                autoComplete="on"
                onChange={(e) => setPass2(e.target.value)}
                value={pass2}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormItem>
            <Button onClick={handlerNext} size="l" stretched>
              Дальше
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </>
  );
};

export default FormRegister;
