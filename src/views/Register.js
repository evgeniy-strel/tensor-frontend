import { useState } from "react";
import {
  FormLayout,
  FormLayoutGroup,
  FormItem,
  Input,
  Select,
  Button,
  FormStatus,
  Group,
  View,
  Panel,
  PanelHeader,
} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../store/reducers/userSlice";

const domain = ["@mail.ru", "@gmail.com", "@yandex.ru"];

const Register = () => {
  const dispatch = useDispatch();
  const resultReg = useSelector((state) => state.user.resultReg);
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateBirth: "",
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    // setFormData({...formData, email: formData.email + })
    if (Object.values(formData).includes("")) {
      setIsValid(true);
    } else {
      dispatch(postRegister(formData));
    }
  };

  return (
    <View id="home" activePanel="home">
      <Panel id="home">
        <PanelHeader>Регистрация</PanelHeader>
        <Group>
          <FormLayout onSubmit={handlerSubmit}>
            {resultReg.error !== "" && (
              <FormStatus header="Ошибка" mode="error">
                {resultReg.error}
              </FormStatus>
            )}
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
                bottom={
                  isValid && formData.firstName === "" && "Введите данные"
                }
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
              <Button onClick={handlerSubmit} size="l" stretched>
                Отправить
              </Button>
            </FormItem>
          </FormLayout>
        </Group>
      </Panel>
    </View>
  );
};

export default Register;
