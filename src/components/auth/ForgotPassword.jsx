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
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const loader = useSelector((state) => state.user.loader);
  const [setActivePanel] = useOutletContext();
  const [email, setEmail] = useState("");

  const handlerSubmit = () => {
    console.log();
  };

  return (
    <>
      <PanelHeader
        before={
          <PanelHeaderBack
            onClick={() => {
              setActivePanel("login");
              navigate("/auth")
            }}
          />
        }
      >
        Восстановление пароля
      </PanelHeader>
      <Group>
        {loader ? (
          <Spinner size="medium" />
        ) : (
          <FormLayout onSubmit={handlerSubmit}>
            <FormItem top="Email" htmlFor="email">
              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormItem>
            <FormItem>
              <Button onClick={handlerSubmit} size="l" stretched>
                Отправить
              </Button>
            </FormItem>
          </FormLayout>
        )}
      </Group>
    </>
  );
};

export default ForgotPassword;
