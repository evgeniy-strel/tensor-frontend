import { FormLayout, FormItem, Input, Button } from "@vkontakte/vkui";
import { TEL_REGEXP, EMAIL_REGEXP } from "../regexp";

const FormSlctr = ({ handlerNext, isValid, formData, setFormData }) => {
  return (
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
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />
      </FormItem>
      <FormItem>
        <Button onClick={handlerNext} size="l" stretched>
          Продолжить
        </Button>
      </FormItem>
    </FormLayout>
  );
};

export default FormSlctr;
