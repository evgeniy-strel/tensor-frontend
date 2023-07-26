import { Avatar, Title, Button, Text, Card } from "@vkontakte/vkui";
import { Icon28FavoriteCircleFillGreen } from "@vkontakte/icons";
import { useDispatch } from "react-redux";
import { changeActiveModal } from "../../store/reducers/modalSlice";

const My = ({ user, flexStyle }) => {
  const dispatch = useDispatch();

  return (
    <Card mode="tint" style={flexStyle}>
      <Avatar
        size={96}
        initials={
          !user.avatar
            ? user.firstName?.substr(0, 1) + user.lastName?.substr(0, 1)
            : null
        }
        src={user.avatar && process.env.REACT_APP_URL_API + user.avatar}
      >
        <Avatar.Badge>
          <Icon28FavoriteCircleFillGreen />
        </Avatar.Badge>
      </Avatar>
      <Title level="2">{`${user.firstName} ${user.lastName}`}</Title>

      <Button
        onClick={() => dispatch(changeActiveModal("editprofile"))}
        size="l"
        stretched
      >
        Редактировать
      </Button>

      <Text
        style={{ lineHeight: "20px", letterSpacing: "0.2px", width: "100%" }}
      >
        {user.description}
      </Text>
    </Card>
  );
};

export default My;
