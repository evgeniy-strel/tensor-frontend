import { useState, useEffect } from "react";
import {
  View,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Group,
  Card,
  PanelSpinner,
} from "@vkontakte/vkui";
import { Icon28MenuOutline } from "@vkontakte/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveModal } from "../../store/reducers/modalSlice";
import My from "./My";
import Another from "./Another";

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
          <Card
            mode="tint"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "36px 16px 53px",
              gap: "16px",
              background: "var(--vkui--color_background_content)",
            }}
          >
            {isMy ? <My user={user} /> : <Another userId={params.id}/>}
          </Card>
        </Group>
      </Panel>
    </View>
  );
};

export default Profile;
