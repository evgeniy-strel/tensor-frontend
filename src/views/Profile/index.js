import { useState, useEffect } from "react";
import {
  View,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Group,
  Card,
  Avatar,
  Title,
  Button,
  Text,
  PanelSpinner,
} from "@vkontakte/vkui";
import {
  Icon28MenuOutline,
  Icon28FavoriteCircleFillGreen,
} from "@vkontakte/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../store/reducers/userSlice";
import { changeActiveModal } from "../../store/reducers/modalSlice";

const Profile = () => {
  const params = useParams();
  const isMy = params.username === "me";
  const dispatch = useDispatch();
  const { loaderUserInfo, user } = useSelector((state) => state.user);
  const [activePanel, setActivePanel] = useState("profile");

  useEffect(() => {
    if (!isMy) {
      // Получение информации о другом пользователе
      // dispatch(getUserInfo());
    }
  }, []);

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
        {loaderUserInfo ? (
          <PanelSpinner size="medium" />
        ) : (
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
              <Avatar
                size={96}
                initials={
                  !user.avatar
                    ? user.firstName.substr(0, 1) + user.lastName.substr(0, 1)
                    : null
                }
                src={
                  user.avatar &&
                  process.env.REACT_APP_URL_API + "/" + user.avatar
                }
              >
                <Avatar.Badge>
                  <Icon28FavoriteCircleFillGreen />
                </Avatar.Badge>
              </Avatar>
              <Title level="2">
                {`${user.firstName} ${user.lastName}`}
              </Title>
              {isMy ? (
                <Button
                  onClick={() => dispatch(changeActiveModal("editprofile"))}
                  size="l"
                  stretched
                >
                  Редактировать
                </Button>
              ) : (
                <Button size="l" stretched>
                  Написать
                </Button>
              )}
              <Text style={{ lineHeight: "20px", letterSpacing: "0.2px" }}>
                Описание себя любимой тридцать раз подряд, чтоб слов побольше
                было. Описание себя любимой тридцать раз подряд, чтоб слов
                побольше было. Описание себя любимой тридцать раз подряд, чтоб
                слов побольше было.
              </Text>
            </Card>
          </Group>
        )}
      </Panel>
    </View>
  );
};

export default Profile;
