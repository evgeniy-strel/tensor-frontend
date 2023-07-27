import {
  View,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  PanelHeaderBack,
  Group,
} from "@vkontakte/vkui";
import { Icon28MenuOutline } from "@vkontakte/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveModal } from "../../store/reducers/modalSlice";
import My from "./My";
import Another from "./Another";

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isMy = params.id === "me" || user.id === params.id;

  return (
    <View id="profile" activePanel="profile">
      <Panel id="profile">
        <PanelHeader
          before={!isMy && <PanelHeaderBack onClick={() => navigate(-1)} />}
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
          {isMy ? <My user={user} /> : <Another userId={params.id} />}
        </Group>
      </Panel>
    </View>
  );
};

export default Profile;
