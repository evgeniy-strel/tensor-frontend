import { useState } from "react";
import {
  View,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Group,
} from "@vkontakte/vkui";
import { Icon28MenuOutline } from "@vkontakte/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveModal } from "../../store/reducers/modalSlice";
import My from "./My";
import Another from "./Another";

const flexStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "36px 16px 53px",
  gap: "16px",
  background: "var(--vkui--color_background_content)",
  textAlign: "center",
};

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { loaderUserInfo, user } = useSelector((state) => state.user);
  const [activePanel, setActivePanel] = useState("profile");
  const isMy = params.id === "me" || user.id === params.id;

  return (
    <View id="profile" activePanel={activePanel}>
      <Panel id="profile">
        <PanelHeader
          after={
            isMy && (
              <PanelHeaderButton
                onClick={() => dispatch(changeActiveModal("settings"))}
                aria-label="menu"
              >
                <Icon28MenuOutline />
              </PanelHeaderButton>
            )
          }
        >
          Профиль
        </PanelHeader>
        <Group>
          {isMy ? (
            <My user={user} flexStyle={flexStyle} />
          ) : (
            <Another userId={params.id} flexStyle={flexStyle} />
          )}
        </Group>
      </Panel>
    </View>
  );
};

export default Profile;
