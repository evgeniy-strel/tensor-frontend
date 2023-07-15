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
  Select,
  Button,
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const domain = ["@mail.ru", "@gmail.com", "@yandex.ru"];

const FormRegister = ({ formData, setFormData, setActivePanel }) => {
  const navigate = useNavigate();
  const resultReg = useSelector((state) => state.user.resultReg);
  const [isValid, setIsValid] = useState(false);

  const handlerNext = (e) => {
    e.preventDefault();
    // setFormData({...formData, email: formData.email + })
    if (Object.values(formData).includes("")) {
      setIsValid(true);
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
          <FormItem
            top="Имя пользователя"
            htmlFor="username"
            status={isValid && formData.username === "" && "error"}
            bottom={isValid && formData.username === "" && "Введите данные"}
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
              status={isValid && formData.firstName === "" && "error"}
              bottom={isValid && formData.firstName === "" && "Введите данные"}
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
              status={isValid && formData.lastName === "" && "error"}
              bottom={isValid && formData.lastName === "" && "Введите данные"}
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
            status={isValid && formData.dateBirth === "" && "error"}
            bottom={isValid && formData.dateBirth === "" && "Введите данные"}
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
              status={isValid && formData.email === "" && "error"}
              bottom={isValid && formData.email === "" && "Введите данные"}
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
            <FormItem>
              <Select
                options={domain.map((i) => ({
                  label: i,
                  value: i,
                }))}
                defaultValue={"@mail.ru"}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormItem
            top="Пароль"
            htmlFor="password"
            status={isValid && formData.password === "" && "error"}
            bottom={isValid && formData.password === "" && "Введите данные"}
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
