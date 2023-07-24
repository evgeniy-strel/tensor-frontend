import { useState } from "react";
import { View, Panel } from "@vkontakte/vkui";
import AuthSelector from "./AuthSelector";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import ProfileSetup from "./ProfileSetup";
import Interests from "./Interests";

const Auth = () => {
  const [activePanel, setActivePanel] = useState("selector");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    external: {
      firstName: "",
      lastName: "",
      avatar: null,
      categories: [],
    },
  });

  return (
    <View id="auth" activePanel={activePanel}>
      <Panel id="selector">
        <AuthSelector
          setActivePanel={setActivePanel}
          formData={formData}
          setFormData={setFormData}
        />
      </Panel>
      <Panel id="login">
        <Login
          setActivePanel={setActivePanel}
          formData={formData}
          setFormData={setFormData}
        />
      </Panel>
      <Panel id="forgot">
        <ForgotPassword
          setActivePanel={setActivePanel}
          formData={formData}
          setFormData={setFormData}
        />
      </Panel>
      <Panel id="register">
        <Register
          setActivePanel={setActivePanel}
          formData={formData}
          setFormData={setFormData}
        />
      </Panel>
      <Panel id="profsetup">
        <ProfileSetup
          setActivePanel={setActivePanel}
          formData={formData}
          setFormData={setFormData}
        />
      </Panel>
      <Panel id="interests">
        <Interests
          setActivePanel={setActivePanel}
          formData={formData}
          setFormData={setFormData}
        />
      </Panel>
    </View>
  );
};

export default Auth;
