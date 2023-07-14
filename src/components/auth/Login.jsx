import { PanelHeader, PanelHeaderBack, Group, Spinner } from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import FormLogin from "./FormLogin";
import { useOutletContext } from "react-router-dom";

const Login = () => {
  const loader = useSelector((state) => state.user.loader);
  const [setActivePanel] = useOutletContext();

  return (
    <>
      <PanelHeader before={<PanelHeaderBack onClick={() => setActivePanel("selector")}/>}>Вход</PanelHeader>
      <Group>
        {loader ? (
          <Spinner size="medium" />
        ) : (
          <FormLogin setActivePanel={setActivePanel} />
        )}
      </Group>
    </>
  );
};

export default Login;
