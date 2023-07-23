import { useState } from "react";
import {
  FormLayout,
  FormStatus,
  FormItem,
  Input,
  Button,
  ButtonGroup,
} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, getUserInfo } from "../../../store/reducers/userSlice";

const FormLogin = ({ setActivePanel, formData, setFormData }) => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.user.loginState);
  const [isValid, setIsValid] = useState(true);

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setIsValid(false);
    } else {
      // изменить запрос: username --> email/number
      dispatch(
        postLogin({
          email: formData.email,
          password: formData.password,
        })
      ).then((res) => dispatch(getUserInfo()));
    }
  };

  return (
    <FormLayout onSubmit={handlerSubmit}>
      {loginState.error !== "" && (
        <FormStatus header="Ошибка" mode="error">
          {loginState.error}
        </FormStatus>
      )}
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
        }>
        <Input
          id="password"
          type="password"
          autoComplete="on"
          placeholder="Пароль"
          autoFocus
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          value={formData.password}
        />
      </FormItem>
      <FormItem>
        <ButtonGroup mode="vertical" stretched>
          <Button onClick={handlerSubmit} size="l" stretched>
            Войти
          </Button>
          <Button
            onClick={() => setActivePanel("forgot")}
            size="l"
            stretched
            mode="secondary">
            Восстановить пароль
          </Button>
        </ButtonGroup>
      </FormItem>
    </FormLayout>
  );
};

export default FormLogin;
