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
  PanelHeaderClose,
} from "@vkontakte/vkui";
import {
  Icon28MenuOutline,
  Icon28FavoriteCircleFillGreen,
} from "@vkontakte/icons";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogout, getUserInfo } from "../../store/reducers/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [activePanel, setActivePanel] = useState("profile");
  const params = useParams();

  const isMy = true;

  useEffect(() => {
    if (params.username === ":username") {
      dispatch(getUserInfo());
    }
  });

  return (
    <View id="profile" activePanel={activePanel}>
      <Panel id="profile">
        <PanelHeader
          after={
            isMy && (
              <PanelHeaderButton
                onClick={() => dispatch(postLogout())}
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
            <Avatar size={96} initials="UU">
              <Avatar.Badge>
                <Icon28FavoriteCircleFillGreen />
              </Avatar.Badge>
            </Avatar>
            <Title level="2">User User</Title>
            {isMy ? (
              <Button onClick={() => setActivePanel("edit")} size="l" stretched>
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
      </Panel>
      <Panel id="edit">
        <PanelHeader
          before={
            <PanelHeaderClose onClick={() => setActivePanel("profile")} />
          }
        >
          Редактировать
        </PanelHeader>
        <Group
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 16px",
          }}
        >
          <Avatar size={96} initials="UU" />
        </Group>
      </Panel>
    </View>
  );
};

export default Profile;
