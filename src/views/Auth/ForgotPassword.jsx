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

const ForgotPassword = ({ setActivePanel, formData, setFormData }) => {
  const dispatch = useDispatch();
  const { loader, resultForgot } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

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
        {loader ? (
          <PanelSpinner size="medium" />
        ) : (
          <FormLayout onSubmit={handlerSubmit}>
            {resultForgot.error !== "" && (
              <FormStatus header="Ошибка" mode="error">
                {resultForgot.error}
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
