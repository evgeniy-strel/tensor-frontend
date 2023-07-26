import { useState } from "react";
import {
  PanelHeader,
  PanelHeaderBack,
  Group,
  Div,
  Title,
} from "@vkontakte/vkui";
import classes from "../auth.module.scss";
import FormReg from "./FormReg";

const Register = ({ setActivePanel, formData, setFormData }) => {
  const [isValid, setIsValid] = useState(true);
  const [pass2, setPass2] = useState("");

  const handlerNext = (e) => {
    e.preventDefault();
    if (
      formData.password === "" ||
      pass2 === "" ||
      pass2 !== formData.password ||
      formData.password.length < 8
    ) {
      setIsValid(false);
    } else {
      setActivePanel("profsetup");
    }
  };

  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => setActivePanel("selector")} />}
      >
        Регистрация
      </PanelHeader>
      <Group>
        <Div className={classes.header_title}>
          <Title level="2" weight="3">
            Регистрация в приложении
          </Title>
        </Div>
        <FormReg
          handlerNext={handlerNext}
          isValid={isValid}
          formData={formData}
          setFormData={setFormData}
          pass2={pass2}
          setPass2={setPass2}
        />
      </Group>
    </>
  );
};

export default Register;
