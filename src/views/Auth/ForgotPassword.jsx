import { useState } from "react";
import {
  PanelHeader,
  PanelHeaderBack,
  Group,
  FormLayout,
  FormItem,
  Input,
  Button,
  FormStatus,
  PanelSpinner
} from "@vkontakte/vkui";
import { useSelector, useDispatch } from "react-redux";
import { postForgot } from "../../store/reducers/userSlice";
import { EMAIL_REGEXP } from "./regexp";

const ForgotPassword = ({ setActivePanel, formData, setFormData }) => {
  const dispatch = useDispatch();
  const forgotState = useSelector((state) => state.user.forgotState);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handlerSubmit = () => {
    if (EMAIL_REGEXP.test(email)) {
      dispatch(postForgot(email));
    } else {
      setIsValid(false);
    }
  };

  return (
    <>
      <PanelHeader
        before={
          <PanelHeaderBack
            onClick={() => {
              setActivePanel("login");
            }}
          />
        }
      >
        Восстановление пароля
      </PanelHeader>
      <Group>
        {forgotState.loader ? (
          <PanelSpinner size="medium" />
        ) : (
          <FormLayout onSubmit={handlerSubmit}>
            {forgotState.error !== "" && (
              <FormStatus header="Ошибка" mode="error">
                {forgotState.error}
              </FormStatus>
            )}
            <FormItem
              top="Email"
              htmlFor="email"
              status={!isValid && "error"}
              bottom={!isValid && "Некорректная почта!"}
            >
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
