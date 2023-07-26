import {
  FormLayout,
  FormStatus,
  FormItem,
  Input,
  Button,
  ButtonGroup,
} from "@vkontakte/vkui";

const FormLog = ({
  setActivePanel,
  formData,
  setFormData,
  isValid,
  handlerSubmit,
  loginState,
}) => {
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
          !isValid &&
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
        </ButtonGroup>
      </FormItem>
    </FormLayout>
  );
};

export default FormLog;
