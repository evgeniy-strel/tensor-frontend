import { useState } from "react";
import {
  PanelHeader,
  PanelHeaderBack,
  Group,
  FormLayout,
  FormItem,
  Input,
  Button,
  Spinner,
  Header,
  Paragraph,
  Div,
  FormLayoutGroup,
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";

const FormVerify = ({ formData, setFormData, setActivePanel }) => {
  const [isValid, setIsValid] = useState(false);
  const [code, setCode] = useState("");
  const loader = useSelector((state) => state.user.loader);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).includes("")) {
      setIsValid(true);
    } else {
      setFormData({ ...formData, is_verified: true });
      setActivePanel("profsetup");
    }
  };

  const sendAgain = () => {
    setActivePanel("profsetup");
  }; // изменить на повторную отправку

  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => setActivePanel("register")} />}
      >
        Регистрация
      </PanelHeader>
      <Group>
        <Div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Header size="large">Подтверждения почты</Header>
          <Paragraph>
            На вашу почту отправлено письмо с кодом подтверждения
          </Paragraph>
        </Div>
        {loader ? (
          <Spinner size="medium" />
        ) : (
          <FormLayout onSubmit={handlerSubmit}>
            <FormItem
              htmlFor="code"
              status={isValid && code === "" && "error"}
              bottom={isValid && code === "" && "Введите данные"}
            >
              <Input
                id="code"
                type="text"
                onChange={(e) => setCode(e.target.value)}
                value={code}
                placeholder="Ввести код"
              />
            </FormItem>
            <FormLayoutGroup>
              <FormItem>
                <Button onClick={handlerSubmit} size="l" stretched>
                  Продолжить
                </Button>
              </FormItem>
              <FormItem>
                <Button
                  onClick={sendAgain}
                  appearance="neutral"
                  size="l"
                  stretched
                >
                  Отправить код ещё раз
                </Button>
              </FormItem>
            </FormLayoutGroup>
          </FormLayout>
        )}
      </Group>
    </>
  );
};

export default FormVerify;
