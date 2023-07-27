import { Avatar, Title, Button, Text, Card } from "@vkontakte/vkui";
import { Icon28FavoriteCircleFillGreen } from "@vkontakte/icons";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveModal } from "../../store/reducers/modalSlice";
import classes from "./profile.module.scss";

const My = ({ user }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.user.tags);

  return (
    <Card mode="tint" className={classes.card}>
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
      <Text className={classes.description}>{user.description}</Text>
      <div className={classes.container_tags}>
        {tags.map((el) => (
          <div className={classes.tag} key={el.id}>
            {el.title}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default My;
