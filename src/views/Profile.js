import {
  View,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Group,
  Card,
  Avatar,
  Title,
} from "@vkontakte/vkui";
import {
  Icon28EditOutline,
  Icon28MenuOutline,
  Icon28FavoriteCircleFillGreen,
} from "@vkontakte/icons";

const Profile = () => {
  return (
    <View id="profile" activePanel="profile">
      <Panel id="profile">
        <PanelHeader
          after={
            <>
              <PanelHeaderButton onClick={() => console.log("settings")} aria-label="settings">
                <Icon28EditOutline />
              </PanelHeaderButton>
              <PanelHeaderButton onClick={() => console.log("menu")} aria-label="menu">
                <Icon28MenuOutline />
              </PanelHeaderButton>
            </>
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
              padding: "36px 0 53px 0",
              gap: "13px",
              background: "var(--vkui--color_background_content)",
            }}
          >
            <Avatar size={96} initials="UU">
              <Avatar.Badge>
                <Icon28FavoriteCircleFillGreen />
              </Avatar.Badge>
            </Avatar>
            <Title level="2">User User</Title>
          </Card>
        </Group>
      </Panel>
    </View>
  );
};

export default Profile;
