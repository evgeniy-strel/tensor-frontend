import {
  FormLayout,
  FormStatus,
  FormItem,
  FormLayoutGroup,
  Input,
  Button,
} from "@vkontakte/vkui";

const FormReg = ({
  handlerNext,
  isValid,
  formData,
  setFormData,
  pass2,
  setPass2,
}) => {
  return (
    <FormLayout onSubmit={handlerNext}>
      {!isValid && (
        <FormStatus header="Ошибка" mode="error">
          Введите корректные данные
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
            maxLength={32}
            autoFocus
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
            !isValid && (pass2 === "" || formData.password !== pass2) && "error"
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
  );
};

export default FormReg;
