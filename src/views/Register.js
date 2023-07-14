import { useState } from "react";
import { View, Panel } from "@vkontakte/vkui";
import FormRegister from "../components/register/FormRegister";
import FormVerify from "../components/register/FormVerify";
import ProfileSetup from "../components/register/ProfileSetup";

const Register = () => {
  const [activePanel, setActivePanel] = useState("register");
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateBirth: "",
    is_verified: false,
    external: {
      name: ""
    }
  });

  return (
    <View id="register" activePanel={activePanel}>
      <Panel id="register">
        <FormRegister formData={formData} setFormData={setFormData} setActivePanel={setActivePanel}/>
      </Panel>
      <Panel id="verify">
        <FormVerify formData={formData} setFormData={setFormData} setActivePanel={setActivePanel}/>
      </Panel>
      <Panel id="profsetup">
        <ProfileSetup formData={formData} setFormData={setFormData} setActivePanel={setActivePanel}/>
      </Panel>
    </View>
  );
};

export default Register;
